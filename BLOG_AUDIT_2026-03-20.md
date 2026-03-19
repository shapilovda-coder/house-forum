# Полный аудит блога StroySales

## Дата аудита: 2026-03-20

### Все статьи в блоге

| # | Статья | Локация | Слов | Статус | Действие |
|---|--------|---------|------|--------|----------|
| 1 | Безрамное остекление | public/blog/ | 1415 | ✅ Готово | Ничего |
| 2 | Прозрачные рольставни для веранды | public/blog/ | 1030 | ✅ Готово | Ничего |
| 3 | Секционные ворота | public/blog/ | 778 | ⚠️ Короткая | Дописать |
| 4 | Защитные рольставни | public/blog/ | 630 | ⚠️ Короткая | Дописать |
| 5 | Как выбрать рольставни | app/blog/ | 330 | ❌ TSX | Перенести в public |

### Проблемы

1. **Две короткие статьи** (менее 1000 слов):
   - sektsionnye-vorota-garazh (778 слов)
   - zashitnye-rolstavni-dlya-dachi (630 слов)

2. **Одна статья в TSX** (не HTML):
   - kak-vybrat-prozrachnye-rolstavni в app/blog/
   - Нужно перенести в public/blog/ и расширить

3. **Историческая проблема**:
   - В коммите 5228e8a полные статьи были заменены на короткие TSX
   - Причина: рефакторинг для App Router
   - Восстановлено из коммита 88f7749

### Ссылки в index.html

Все 5 ссылок существуют:
- /blog/bezramnoe-osteklenie-terras/ ✅
- /blog/kak-vybrat-prozrachnye-rolstavni/ ✅  
- /blog/prozrachnye-rolstavni-dlya-verandy/ ✅
- /blog/sektsionnye-vorota-garazh/ ✅
- /blog/zashitnye-rolstavni-dlya-dachi/ ✅

### Рекомендации

1. Дописать 2 короткие статьи до 1500 слов
2. Перенести kak-vybrat... в public/ и расширить
3. Установить pre-commit hook для проверки объема
4. Вести CONTENT_POLICY.md
