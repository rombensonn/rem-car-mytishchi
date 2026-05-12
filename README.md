# Рем Кар — лендинг автосервиса в Мытищах

Одностраничный сайт для автосервиса «Рем Кар» с React/Vite frontend и PHP endpoint для заявок.

## Что внутри

- React 18, TypeScript, Vite, Tailwind CSS.
- Framer Motion для мягких микроанимаций.
- React Hook Form + Zod для клиентской валидации.
- PHP 8.2+ endpoint `/api/lead.php`.
- Сохранение заявок в `storage/leads.json` и `storage/leads.csv`.
- Email-уведомления и опциональная отправка в Telegram.
- SEO meta, OpenGraph, Twitter Cards, JSON-LD AutoRepair, `robots.txt`, `sitemap.xml`.
- Страницы-заготовки `privacy.html` и `consent.html`.

## Запуск frontend

```bash
npm install
npm run dev
```

Сайт будет доступен на `http://localhost:5173`.

## Запуск PHP API локально

В отдельном терминале:

```bash
php -S 127.0.0.1:8081 -t .
```

Vite проксирует `/api` на `http://127.0.0.1:8081`, поэтому формы из dev-сервера будут отправляться в PHP.

## Настройка заявок

Создайте `api/config.php` на основе `api/config.example.php`:

```php
<?php

return [
    'email_to' => 'owner@example.com',
    'email_from' => 'site@example.com',
    'telegram_bot_token' => '',
    'telegram_chat_id' => '',
    'rate_limit_seconds' => 60,
];
```

Секреты не используются во frontend. Если Telegram поля пустые, отправка в Telegram пропускается.

## Сборка

```bash
npm run build
```

Результат появится в `dist/`. Для обычного PHP-хостинга загрузите содержимое `dist/`, а папки `api` и `storage` положите рядом так, чтобы путь `/api/lead.php` был доступен с сайта.

## Что нужно заменить перед публикацией

- Домен `https://rem-car.example/` в `index.html`, `public/robots.txt` и `public/sitemap.xml`.
- Юридические тексты в `public/privacy.html` и `public/consent.html`.
- `api/config.php` с реальными получателями заявок.
