# Деплой и Workflow

## Ветки

| Ветка | Назначение | Деплой |
|-------|-----------|--------|
| `main` | Production | https://stroysales.ru |
| `ai-dev` | Разработка | Vercel Preview |
| `feature/*` | Фичи (опционально) | Vercel Preview |

## Workflow

### 1. Разработка
```bash
git checkout main
git pull origin main
git checkout ai-dev
git rebase main  # если нужно

# правим код
git add -A
git commit -m "feat: описание изменения"
git push origin ai-dev
```

### 2. Pull Request
1. Открыть https://github.com/shapilovda-coder/house-forum
2. Нажать **Compare & pull request**
3. **Base:** `main`
4. **Compare:** `ai-dev`
5. Заполнить описание
6. Создать PR

### 3. Проверка
- Vercel автоматически собирает preview
- Проверить на preview URL
- Убедиться что всё работает

### 4. Merge
- Получить approve (если требуется)
- Нажать **Merge pull request**
- Выбрать **Create a merge commit**
- Подтвердить

### 5. Проверка production
- Открыть https://stroysales.ru
- Проверить изменения

## Vercel настройки

### Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Build Command
```bash
npm run build
```

### Output Directory
```
out/
```

## Обновление данных

### 1. Экспорт из Supabase
```bash
npm run export-data
```

### 2. Коммит
```bash
git add data/
git commit -m "data: update companies"
git push origin ai-dev
```

### 3. PR и merge
См. Workflow выше.

## Откат

Если что-то сломалось:
1. Vercel Dashboard → Deployments
2. Найти предыдущий рабочий деплой
3. Нажать **Promote to Production**

## Проверка перед деплоем

- [ ] Сборка проходит (`npm run build`)
- [ ] Нет ошибок линтера
- [ ] Все env переменные настроены
- [ ] Preview работает корректно
