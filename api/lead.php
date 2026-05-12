<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$configPath = __DIR__ . '/config.php';
$config = [
    'email_to' => '',
    'email_from' => 'no-reply@localhost',
    'telegram_bot_token' => '',
    'telegram_chat_id' => '',
    'rate_limit_seconds' => 60,
];

if (is_file($configPath)) {
    $loaded = require $configPath;
    if (is_array($loaded)) {
        $config = array_merge($config, $loaded);
    }
}

function respond(bool $success, string $message, int $status = 200): void
{
    http_response_code($status);
    echo json_encode(
        $success ? ['success' => true, 'message' => $message] : ['success' => false, 'error' => $message],
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

function clean(?string $value): string
{
    return htmlspecialchars(strip_tags(trim((string) $value)), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function ensureStorage(): string
{
    $storage = realpath(__DIR__ . '/../storage');
    if ($storage === false) {
        $storage = __DIR__ . '/../storage';
        mkdir($storage, 0755, true);
    }

    return $storage;
}

function rateLimit(string $ip, int $seconds, string $storage): void
{
    $file = $storage . '/rate_limit.json';
    $now = time();
    $data = [];

    if (is_file($file)) {
        $raw = file_get_contents($file);
        $decoded = json_decode((string) $raw, true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    }

    foreach ($data as $key => $timestamp) {
        if (!is_int($timestamp) && !ctype_digit((string) $timestamp)) {
            unset($data[$key]);
            continue;
        }
        if ($now - (int) $timestamp > 86400) {
            unset($data[$key]);
        }
    }

    if (isset($data[$ip]) && $now - (int) $data[$ip] < $seconds) {
        respond(false, 'Слишком частая отправка. Попробуйте чуть позже.', 429);
    }

    $data[$ip] = $now;
    file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
}

function sendTelegram(array $config, string $message): void
{
    if (empty($config['telegram_bot_token']) || empty($config['telegram_chat_id'])) {
        return;
    }

    $token = preg_replace('/[^0-9:A-Za-z_-]/', '', (string) $config['telegram_bot_token']);
    $url = 'https://api.telegram.org/bot' . $token . '/sendMessage';
    $payload = http_build_query([
        'chat_id' => (string) $config['telegram_chat_id'],
        'text' => $message,
        'parse_mode' => 'HTML',
    ]);

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $payload,
            'timeout' => 5,
        ],
    ]);

    @file_get_contents($url, false, $context);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Метод не поддерживается.', 405);
}

$storage = ensureStorage();
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
rateLimit((string) $ip, (int) $config['rate_limit_seconds'], $storage);

$input = $_POST;
if (empty($input)) {
    $raw = file_get_contents('php://input');
    $decoded = json_decode((string) $raw, true);
    if (is_array($decoded)) {
        $input = $decoded;
    }
}

if (!empty($input['honeypot'])) {
    respond(false, 'Заявка отклонена.', 400);
}

$lead = [
    'date' => date('c'),
    'ip' => clean((string) $ip),
    'name' => clean($input['name'] ?? ''),
    'phone' => clean($input['phone'] ?? ''),
    'car_model' => clean($input['car_model'] ?? ''),
    'car_year' => clean($input['car_year'] ?? ''),
    'issue_type' => clean($input['issue_type'] ?? ''),
    'message' => clean($input['message'] ?? ''),
    'contact_method' => clean($input['contact_method'] ?? ''),
    'page_source' => clean($input['page_source'] ?? 'landing'),
    'consent_personal_data' => !empty($input['consent_personal_data']) ? 'yes' : 'no',
    'consent_policy' => !empty($input['consent_policy']) ? 'yes' : 'no',
];

if ($lead['name'] === '' || strlen($lead['name']) < 2) {
    respond(false, 'Укажите имя минимум из 2 символов.', 422);
}

if ($lead['phone'] === '' || !preg_match('/^[0-9+\-\s()]{7,24}$/u', $lead['phone'])) {
    respond(false, 'Укажите корректный телефон.', 422);
}

if ($lead['issue_type'] === '' || $lead['message'] === '') {
    respond(false, 'Опишите проблему автомобиля.', 422);
}

if ($lead['consent_personal_data'] !== 'yes' || $lead['consent_policy'] !== 'yes') {
    respond(false, 'Необходимо подтвердить оба согласия.', 422);
}

$jsonFile = $storage . '/leads.json';
$csvFile = $storage . '/leads.csv';
$existing = [];
if (is_file($jsonFile)) {
    $decoded = json_decode((string) file_get_contents($jsonFile), true);
    if (is_array($decoded)) {
        $existing = $decoded;
    }
}
$existing[] = $lead;
file_put_contents($jsonFile, json_encode($existing, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);

$csvExists = is_file($csvFile);
$csv = fopen($csvFile, 'ab');
if ($csv !== false) {
    if (!$csvExists) {
        fputcsv($csv, array_keys($lead), ';');
    }
    fputcsv($csv, array_values($lead), ';');
    fclose($csv);
}

$message = "Новая заявка с сайта «Рем Кар»\n"
    . "Имя: {$lead['name']}\n"
    . "Телефон: {$lead['phone']}\n"
    . "Авто: {$lead['car_model']} {$lead['car_year']}\n"
    . "Проблема: {$lead['issue_type']}\n"
    . "Комментарий: {$lead['message']}\n"
    . "Способ связи: {$lead['contact_method']}\n"
    . "Источник: {$lead['page_source']}\n"
    . "Дата: {$lead['date']}";

if (!empty($config['email_to'])) {
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . (string) $config['email_from'],
    ];
    @mail((string) $config['email_to'], 'Новая заявка с сайта Рем Кар', $message, implode("\r\n", $headers));
}

sendTelegram($config, htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));

respond(true, 'Заявка отправлена. Мы свяжемся с вами в рабочее время.');
