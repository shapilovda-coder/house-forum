# Урок: Dev/Staging/Production workflow

## Что было сделано неправильно

❌ Деплой напрямую в production
❌ Нет тестового окружения
❌ Нет проверки перед деплоем
❌ Слишком много деплоев подряд

## Правильный workflow

```
┌─────────┐    ┌─────────┐    ┌─────────┐
│  Dev    │───▶│ Staging │───▶│Production│
│(localhost)│   │(Vercel  │   │(Vercel  │
│          │    │ Preview)│    │  main)  │
└─────────┘    └─────────┘    └─────────┘
     │              │              │
   Проверка     Проверка       Проверка
   вручную      на тесте       финальная
```

## Шаги

### 1. Dev (локально)
```bash
npm run dev
# Проверяем на localhost:3000
```

### 2. Staging (Vercel Preview)
```bash
# Автоматически при push в ветку staging
# URL: https://project-staging.vercel.app
```

### 3. Production (Vercel main)
```bash
# Только после проверки staging
# URL: https://project.vercel.app
```

## Лимиты Vercel (бесплатный)

| Параметр | Лимит | Мы использовали |
|----------|-------|-----------------|
| Деплоев/день | 100 | ~50 |
| Трафик/мес | 100 GB | ~1 GB |
| Build time | 45 мин | ~5 мин |

**Причина блокировки:** Слишком частые деплои подряд без пауз.

## Что делать сейчас

1. ✅ Подождать 24 часа — лимиты сбросятся
2. ✅ Создать ветку `staging` в Git
3. ✅ Настроить preview deploy
4. ✅ Тестировать на staging
5. ✅ Только потом деплоить в production

## Предупреждения на будущее

- ⚠️ Не более 10 деплоев/час
- ⚠️ Всегда staging перед production
- ⚠️ Проверять билд локально
- ⚠️ Git commit перед каждым деплоем

## Git workflow

```bash
# 1. Работаем в dev
 git checkout -b feature/new-page
 
# 2. Коммитим
 git add .
 git commit -m "Add new page"
 
# 3. Push в staging
 git push origin feature/new-page
 
# 4. PR в staging → автодеплой preview
 
# 5. Проверяем preview
 
# 6. PR staging → main → production deploy
```

---

**Урок:** Всегда staging перед production.
**Виноват:** Я, не предупредил о лимитах.
**Исправление:** Настраиваем workflow правильно.
