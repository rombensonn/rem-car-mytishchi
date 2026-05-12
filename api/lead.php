<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

const CONSENT_TEXT_VERSION = '[ДАТА_РЕДАКЦИИ]';

function respond(bool $success, string $message, int $status = 200): void
{
    http_response_code($status);
    echo json_encode(
        $success ? ['success' => true, 'message' => $message] : ['success' => false, 'error' => $message],
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

function envValue(string $name, string $default = ''): string
{
    $value = getenv($name);
    return $value === false ? $default : trim((string) $value);
}

function clean(?string $value, int $maxLength = 1200): string
{
    $value = trim((string) $value);
    $value = strip_tags($value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    $value = function_exists('mb_substr') ? mb_substr($value, 0, $maxLength, 'UTF-8') : substr($value, 0, $maxLength);

    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
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

function logTechnicalEvent(string $storage, string $event, array $context = []): void
{
    $allowed = [
        'time' => date('c'),
        'event' => $event,
        'form_id' => $context['form_id'] ?? '',
        'page_url' => $context['page_url'] ?? '',
        'status' => $context['status'] ?? '',
        'message' => function_exists('mb_substr')
            ? mb_substr((string) ($context['message'] ?? ''), 0, 300, 'UTF-8')
            : substr((string) ($context['message'] ?? ''), 0, 300),
    ];

    file_put_contents(
        $storage . '/lead-events.log',
        json_encode($allowed, JSON_UNESCAPED_UNICODE) . PHP_EOL,
        FILE_APPEND | LOCK_EX
    );
}

function rateLimit(string $ip, int $seconds, string $storage): void
{
    $file = $storage . '/rate_limit.json';
    $now = time();
    $data = [];

    if (is_file($file)) {
        $decoded = json_decode((string) file_get_contents($file), true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    }

    foreach ($data as $key => $timestamp) {
        if (!is_numeric($timestamp) || $now - (int) $timestamp > 86400) {
            unset($data[$key]);
        }
    }

    if (isset($data[$ip]) && $now - (int) $data[$ip] < $seconds) {
        respond(false, 'Слишком частая отправка. Попробуйте чуть позже.', 429);
    }

    $data[$ip] = $now;
    file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
}

function isTruthy(mixed $value): bool
{
    return in_array(strtolower((string) $value), ['1', 'true', 'yes', 'on'], true);
}

function buildLead(array $input): array
{
    return [
        'name' => clean($input['name'] ?? '', 160),
        'phone' => clean($input['phone'] ?? '', 40),
        'email' => clean($input['email'] ?? '', 180),
        'car_model' => clean($input['car_model'] ?? '', 180),
        'car_year' => clean($input['car_year'] ?? '', 20),
        'selected_service' => clean($input['selected_service'] ?? ($input['issue_type'] ?? ''), 180),
        'issue_type' => clean($input['issue_type'] ?? '', 180),
        'message' => clean($input['message'] ?? '', 1200),
        'contact_method' => clean($input['contact_method'] ?? '', 40),
        'page_source' => clean($input['page_source'] ?? 'landing', 80),
        'page_url' => clean($input['page_url'] ?? '', 500),
        'form_id' => clean($input['form_id'] ?? '', 120),
        'referrer' => clean($input['referrer'] ?? '', 500),
        'utm_source' => clean($input['utm_source'] ?? '', 180),
        'utm_medium' => clean($input['utm_medium'] ?? '', 180),
        'utm_campaign' => clean($input['utm_campaign'] ?? '', 180),
        'utm_content' => clean($input['utm_content'] ?? '', 180),
        'utm_term' => clean($input['utm_term'] ?? '', 180),
        'created_at' => date('c'),
        'ip' => clean($_SERVER['REMOTE_ADDR'] ?? '', 60),
        'user_agent' => clean($_SERVER['HTTP_USER_AGENT'] ?? '', 300),
        'consent_personal_data' => isTruthy($input['consent_personal_data'] ?? ''),
        'consent_policy_read' => isTruthy($input['consent_policy_read'] ?? ''),
        'consent_text_version' => clean($input['consent_text_version'] ?? CONSENT_TEXT_VERSION, 80),
        'consent_timestamp' => clean($input['consent_timestamp'] ?? date('c'), 80),
    ];
}

function validateLead(array $lead): void
{
    $nameLength = function_exists('mb_strlen') ? mb_strlen($lead['name'], 'UTF-8') : strlen($lead['name']);
    if ($lead['name'] === '' || $nameLength < 2) {
        respond(false, 'Укажите имя минимум из 2 символов.', 422);
    }

    if ($lead['phone'] === '' || !preg_match('/^[0-9+\-\s()]{7,24}$/u', $lead['phone'])) {
        respond(false, 'Укажите корректный телефон.', 422);
    }

    if ($lead['email'] !== '' && !filter_var(htmlspecialchars_decode($lead['email'], ENT_QUOTES), FILTER_VALIDATE_EMAIL)) {
        respond(false, 'Укажите корректный email или оставьте поле пустым.', 422);
    }

    if ($lead['selected_service'] === '' || $lead['message'] === '') {
        respond(false, 'Выберите услугу или проблему и коротко опишите обращение.', 422);
    }

    if (!$lead['consent_personal_data'] || !$lead['consent_policy_read']) {
        respond(false, 'Чтобы отправить заявку, подтвердите согласие и ознакомление с политикой.', 422);
    }
}

function amoRequest(string $method, string $path, array $payload): array
{
    $domain = envValue('AMOCRM_BASE_DOMAIN');
    $token = envValue('AMOCRM_ACCESS_TOKEN');

    if ($domain === '' || $token === '') {
        throw new RuntimeException('amoCRM is not configured');
    }

    $domain = preg_replace('#^https?://#', '', $domain);
    $url = 'https://' . rtrim((string) $domain, '/') . $path;
    $body = json_encode($payload, JSON_UNESCAPED_UNICODE);

    $context = stream_context_create([
        'http' => [
            'method' => $method,
            'header' => implode("\r\n", [
                'Content-Type: application/json',
                'Accept: application/json',
                'Authorization: Bearer ' . $token,
            ]),
            'content' => $body,
            'ignore_errors' => true,
            'timeout' => 12,
        ],
    ]);

    $response = @file_get_contents($url, false, $context);
    $statusLine = $http_response_header[0] ?? '';
    preg_match('/\s(\d{3})\s/', $statusLine, $matches);
    $status = isset($matches[1]) ? (int) $matches[1] : 0;
    $decoded = json_decode((string) $response, true);

    if ($status < 200 || $status >= 300) {
        throw new RuntimeException('amoCRM request failed with status ' . $status);
    }

    return is_array($decoded) ? $decoded : [];
}

function amoCustomText(string $label, string $value): string
{
    return $value === '' ? '' : $label . ': ' . htmlspecialchars_decode($value, ENT_QUOTES) . "\n";
}

function sendToAmoCrm(array $lead): void
{
    $leadName = 'Заявка с сайта Рем Кар';
    if ($lead['selected_service'] !== '') {
        $leadName .= ': ' . htmlspecialchars_decode($lead['selected_service'], ENT_QUOTES);
    }

    $leadPayload = [
        [
            'name' => $leadName,
            'pipeline_id' => envValue('AMOCRM_PIPELINE_ID') !== '' ? (int) envValue('AMOCRM_PIPELINE_ID') : null,
            'status_id' => envValue('AMOCRM_STATUS_ID') !== '' ? (int) envValue('AMOCRM_STATUS_ID') : null,
            'responsible_user_id' => envValue('AMOCRM_RESPONSIBLE_USER_ID') !== '' ? (int) envValue('AMOCRM_RESPONSIBLE_USER_ID') : null,
            '_embedded' => [
                'contacts' => [
                    [
                        'name' => htmlspecialchars_decode($lead['name'], ENT_QUOTES),
                        'custom_fields_values' => array_values(array_filter([
                            [
                                'field_code' => 'PHONE',
                                'values' => [['value' => htmlspecialchars_decode($lead['phone'], ENT_QUOTES), 'enum_code' => 'WORK']],
                            ],
                            $lead['email'] !== '' ? [
                                'field_code' => 'EMAIL',
                                'values' => [['value' => htmlspecialchars_decode($lead['email'], ENT_QUOTES), 'enum_code' => 'WORK']],
                            ] : null,
                        ])),
                    ],
                ],
            ],
        ],
    ];

    $leadPayload[0] = array_filter($leadPayload[0], static fn ($value) => $value !== null);
    $created = amoRequest('POST', '/api/v4/leads/complex', $leadPayload);
    $amoLeadId = $created[0]['id'] ?? null;

    if (!$amoLeadId) {
        return;
    }

    $noteText = ''
        . amoCustomText('Услуга/проблема', $lead['selected_service'])
        . amoCustomText('Авто', trim($lead['car_model'] . ' ' . $lead['car_year']))
        . amoCustomText('Комментарий', $lead['message'])
        . amoCustomText('Способ связи', $lead['contact_method'])
        . amoCustomText('Страница', $lead['page_url'])
        . amoCustomText('Форма', $lead['form_id'])
        . amoCustomText('Источник', $lead['page_source'])
        . amoCustomText('Referrer', $lead['referrer'])
        . amoCustomText('UTM source', $lead['utm_source'])
        . amoCustomText('UTM medium', $lead['utm_medium'])
        . amoCustomText('UTM campaign', $lead['utm_campaign'])
        . amoCustomText('UTM content', $lead['utm_content'])
        . amoCustomText('UTM term', $lead['utm_term'])
        . "Согласие на обработку ПДн: " . ($lead['consent_personal_data'] ? 'true' : 'false') . "\n"
        . "Ознакомление с политикой: " . ($lead['consent_policy_read'] ? 'true' : 'false') . "\n"
        . "Версия согласия: {$lead['consent_text_version']}\n"
        . "Время согласия: {$lead['consent_timestamp']}\n"
        . "Дата заявки: {$lead['created_at']}";

    amoRequest('POST', '/api/v4/leads/notes', [
        [
            'entity_id' => (int) $amoLeadId,
            'note_type' => 'common',
            'params' => ['text' => $noteText],
        ],
    ]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Метод не поддерживается.', 405);
}

$storage = ensureStorage();
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
rateLimit((string) $ip, (int) envValue('LEAD_RATE_LIMIT_SECONDS', '60'), $storage);

$input = $_POST;
if (empty($input)) {
    $decoded = json_decode((string) file_get_contents('php://input'), true);
    if (is_array($decoded)) {
        $input = $decoded;
    }
}

if (!empty($input['honeypot'])) {
    logTechnicalEvent($storage, 'honeypot_rejected', ['form_id' => $input['form_id'] ?? '', 'page_url' => $input['page_url'] ?? '']);
    respond(false, 'Заявка отклонена.', 400);
}

$lead = buildLead($input);
validateLead($lead);

try {
    sendToAmoCrm($lead);
    logTechnicalEvent($storage, 'lead_sent_to_amocrm', [
        'form_id' => $lead['form_id'],
        'page_url' => $lead['page_url'],
        'status' => 'success',
    ]);
    respond(true, 'Заявка отправлена. Мы свяжемся с вами в рабочее время.');
} catch (Throwable $error) {
    logTechnicalEvent($storage, 'amocrm_error', [
        'form_id' => $lead['form_id'],
        'page_url' => $lead['page_url'],
        'status' => 'error',
        'message' => $error->getMessage(),
    ]);
    respond(false, 'Не удалось отправить заявку. Попробуйте позвонить нам или повторить отправку позже.', 502);
}
