# СтройСейлс — Каталог поставщиков

Агрегатор поставщиков рольставней, ворот, мягких окон и остекления в России.

## Стек

- **Framework:** Next.js 15 (App Router)
- **React:** 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deploy:** Vercel (Static Export)
- **Data:** Supabase (редактирование) → JSON (production)

## Быстрый старт

```bash
npm install
npm run build    # Static export
```

## Структура

- `app/` — Next.js App Router
- `app/[[...slug]]/` — Динамические страницы (127+ URL)
- `app/components/` — React компоненты
- `content/` — MDX статьи
- `data/` — Данные (не коммитить backup/)

## Деплой

- **Production:** https://stroysales.ru (из main)
- **Preview:** Vercel preview (из ai-dev)

## Данные

- Редактирование: Supabase Dashboard
- Production: JSON файлы
- Экспорт: `npm run export-data`

## Документация

- `docs/ARCHITECTURE.md` — Архитектура проекта
- `docs/AI_RULES.md` — Правила работы с AI
- `docs/DEPLOYMENT.md` — Деплой и workflow
- `docs/SEO_GUIDE.md` — SEO стратегия

## Команды

```bash
npm run dev      # Development
npm run build    # Production build (static)
npm run lint     # ESLint
```
