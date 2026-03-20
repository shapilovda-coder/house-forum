# Project structure (2026-03)

## Корневая структура

- `app/` - Next.js App Router, страничные компоненты.
- `public/` - статические файлы (изображения, favicon и т.д.).
- `lib/` - утилиты общего назначения для фронта/приложения.
- `data/` - входные JSON/данные для генерации страниц.
- `content/` - markdown-статьи и текстовый контент.
- `docs/` - вспомогательная документация, правила, architecture notes.
- `tools/`:
  - `tools/data-pipeline/` - сценарии импорта, нормализации, анализа (раньше `scripts/`).
  - `tools/export/` - экспортные CSV/скрипты (раньше `export/`).
  - `tools/backend/` - серверные утилиты, подготовка (раньше `backend/`).

## Настройки

- `eslint.config.cjs` - конфигурация ESLint (flat, с `ignores: ['.next/**', 'out/**', 'dist/**']`).
- `tsconfig.json` - TypeScript.
- `package.json` - скрипты: `dev`, `build`, `lint`, `type-check`, `test`.
- `.gitignore` уже включает `.next/`, `out/`, `dist/`, `dist2/`, `tools/` не игнорируется (код).

## Тесты и CI

- `tests/` - Playwright e2e-тесты.
- `playwright.config.ts` - config для Playwright.
- `.github/workflows/ci.yml` - запускает `npm ci`, `npm run type-check`, `npm run lint`, `npm run build`.
