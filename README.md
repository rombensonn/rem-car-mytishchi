# Рем Кар — лендинг автосервиса в Мытищах

Одностраничный сайт для автосервиса «Рем Кар» с React/Vite frontend и PHP endpoint для заявок в amoCRM.

## Что внутри

- React 18, TypeScript, Vite, Tailwind CSS.
- Framer Motion для мягких микроанимаций.
- React Hook Form + Zod для клиентской валидации.
- PHP 8.2+ endpoint `/api/lead.php`.
- Отправка заявок в amoCRM через backend endpoint.
- Rate limit, honeypot и server-side validation.
- SEO meta, OpenGraph, Twitter Cards, JSON-LD AutoRepair, `robots.txt`, `sitemap.xml`.
- Юридические страницы: `/privacy-policy/`, `/personal-data-consent/`, `/cookies/`.
- Технический аудит юридических и персональных данных: `LEGAL_AUDIT_REPORT.md`.

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

## Настройка amoCRM

Секреты amoCRM не должны храниться во frontend-коде. На production-сервере задайте env-переменные:

```bash
AMOCRM_BASE_DOMAIN=example.amocrm.ru
AMOCRM_ACCESS_TOKEN=...
AMOCRM_PIPELINE_ID=...
AMOCRM_STATUS_ID=...
AMOCRM_RESPONSIBLE_USER_ID=...
LEAD_RATE_LIMIT_SECONDS=60
```

Если amoCRM не настроена, endpoint вернет пользователю нейтральную ошибку отправки и запишет техническое событие в `storage/lead-events.log`.

## Сборка

```bash
npm run build
```

Результат появится в `dist/`. Для обычного PHP-хостинга загрузите содержимое `dist/`, а папки `api` и `storage` положите рядом так, чтобы путь `/api/lead.php` был доступен с сайта.

## Что нужно заменить перед публикацией

- Домен `https://rem-car.example/` в `index.html`, `public/robots.txt` и `public/sitemap.xml`.
- Плейсхолдеры в `public/privacy-policy/index.html`, `public/personal-data-consent/index.html` и `public/cookies/index.html`.
- Env-переменные amoCRM на сервере.
- Фактические сведения о месте хранения персональных данных и используемых сервисах.
