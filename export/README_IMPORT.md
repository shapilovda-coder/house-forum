# Инструкция по импорту в Google Sheets

## Быстрый старт (1 минута)

1. Открой Google Sheets: https://sheets.new
2. Создай 4 листа (вкладки внизу):
   - suppliers_master
   - completeness_report
   - issues_list
   - pinned_rules
3. Открой первый CSV файл в текстовом редакторе
4. Скопируй всё содержимое (Ctrl+A, Ctrl+C)
5. В Google Sheets выбери ячейку A1 → Ctrl+V
6. Google Sheets автоматически распарсит CSV
7. Повтори для каждого CSV на соответствующий лист

## Файлы

| Файл | Лист | Содержимое |
|------|------|------------|
| 01_suppliers_master.csv | suppliers_master | Все 110 поставщиков |
| 02_completeness_report.csv | completeness_report | Сводка по категориям |
| 03_issues_list.csv | issues_list | Проблемы (дубликаты, отсутствие данных) |
| 04_pinned_rules.csv | pinned_rules | Правила pinned |

## Что проверить в первую очередь

1. **completeness_report** — столбцы с % заполненности
2. **issues_list** — отфильтруй по issue_type:
   - DUPLICATE — дубли доменов
   - NO_PHONE — нет телефона
   - NO_ADDRESS — нет адреса
   - GARBAGE_ADDRESS — мусор в адресе

## Формулы для анализа (вставь в Google Sheets)

```
=COUNTIF(issues_list!C:C, "NO_PHONE")     // сколько без телефона
=COUNTIF(issues_list!C:C, "DUPLICATE")   // сколько дублей
=UNIQUE(suppliers_master!A:A)             // список категорий
```

## Примечания

- Все домены нормализованы (lowercase, без www)
- Punycode декодирован в display_domain
- is_pinned: true/false
- parse_status: ok/partial/bad/unknown
