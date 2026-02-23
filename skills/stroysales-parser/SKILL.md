---
name: stroysales-parser
description: Парсинг поставщиков и загрузка в Supabase для СтройСейлс. Поиск компаний по городам и категориям, парсинг адресов с сайтов, массовая загрузка в базу данных.
---

# StroySales Parser Skill

## Назначение

Автоматизация сбора и загрузки данных о поставщиках:
- Поиск компаний по городам и категориям
- Парсинг адресов с сайтов компаний
- Массовая загрузка в Supabase
- Управление воркерами (параллельный парсинг)

## Структура

```
skills/stroysales-parser/
├── SKILL.md                 # Этот файл
├── scripts/
│   ├── search_suppliers.py  # Поиск поставщиков
│   ├── parse_addresses.py   # Парсинг адресов с сайтов
│   ├── upload_suppliers.py  # Загрузка в Supabase
│   ├── worker_manager.py    # Управление воркерами
│   └── utils.py             # Вспомогательные функции
└── data/                    # Данные (создаётся автоматически)
    ├── suppliers/
    │   ├── spb/            # Санкт-Петербург
    │   ├── moskva/         # Москва
    │   └── ...             # Другие города
    └── parsed/
        └── addresses.json   # Результаты парсинга
```

## Быстрый старт

### 1. Поиск поставщиков

```bash
cd /root/.openclaw/workspace/skills/stroysales-parser
python3 scripts/search_suppliers.py --city "sankt-peterburg" --category "vorota" --limit 10
```

### 2. Парсинг адресов

```bash
# Один воркер
python3 scripts/parse_addresses.py --input data/suppliers/spb/vorota.json --output data/parsed/vorota_addresses.json

# Несколько воркеров (параллельно)
python3 scripts/worker_manager.py --workers 4 --input data/suppliers/spb/ --output data/parsed/
```

### 3. Загрузка в Supabase

```bash
python3 scripts/upload_suppliers.py --input data/parsed/vorota_addresses.json --city "sankt-peterburg" --category "vorota"
```

## Полный пайплайн

```bash
# Шаг 1: Поиск по всем категориям для СПб
for cat in prozrachnye-rolstavni zashchitnye-rolstavni vorota bezramnoe-osteklenie myagkie-okna rolletnye-shkafy ofisnye-peregorodki; do
    python3 scripts/search_suppliers.py --city "sankt-peterburg" --category "$cat" --limit 10
done

# Шаг 2: Парсинг адресов (4 воркера)
python3 scripts/worker_manager.py --workers 4 --input data/suppliers/spb/ --output data/parsed/

# Шаг 3: Загрузка в Supabase
python3 scripts/upload_suppliers.py --input data/parsed/ --city "sankt-peterburg"
```

## Конфигурация

### Supabase
- URL: `https://zzellrqkamskeftyprkv.supabase.co`
- Anon Key: в скриптах (безопасен для клиента)
- Service Role Key: **никогда не сохранять в Git!**

### Города (slug → name)
- `moskva` → Москва
- `sankt-peterburg` → Санкт-Петербург
- `novosibirsk` → Новосибирск
- `ekaterinburg` → Екатеринбург
- `kazan` → Казань
- `krasnodar` → Краснодар
- и др.

### Категории (slug → name)
- `prozrachnye-rolstavni` → Прозрачные рольставни
- `zashchitnye-rolstavni` → Защитные рольставни
- `vorota` → Ворота
- `bezramnoe-osteklenie` → Безрамное остекление
- `myagkie-okna` → Мягкие окна
- `rolletnye-shkafy` → Роллетные шкафы
- `ofisnye-peregorodki` → Офисные перегородки

## API Endpoints Supabase

### Города
```sql
GET /rest/v1/cities?select=*
POST /rest/v1/cities {slug, name, region}
```

### Категории
```sql
GET /rest/v1/categories?select=*
POST /rest/v1/categories {slug, name, sort_order}
```

### Компании
```sql
GET /rest/v1/companies?select=*
POST /rest/v1/companies {slug, name, website, phone, address, city_id, ...}
```

### Связь компания-категория
```sql
POST /rest/v1/company_categories {company_id, category_id}
```

## Примеры использования

### Добавить 10 компаний вручную

```python
from scripts.utils import add_company, link_category, get_city_id, get_category_id

city_id = get_city_id("sankt-peterburg")
cat_id = get_category_id("vorota")

company_id = add_company({
    "slug": "company-name-spb",
    "name": "Название компании",
    "website": "https://example.com",
    "phone": "+7 (812) 123-45-67",
    "city_id": city_id
})

link_category(company_id, cat_id)
```

### Проверить загруженные компании

```bash
curl -s "https://zzellrqkamskeftyprkv.supabase.co/rest/v1/companies?select=name,website,cities(name)" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Ограничения

- **Rate limiting**: Не более 100 запросов/сек к Supabase (бесплатный тариф)
- **Парсинг**: Задержка 0.5-1 сек между запросами к сайтам
- **Воркеры**: Рекомендуется 2-4 параллельных воркера

## Логи

Все операции логируются в:
- `data/logs/search_YYYY-MM-DD.log`
- `data/logs/parse_YYYY-MM-DD.log`
- `data/logs/upload_YYYY-MM-DD.log`

## Обновление

Последнее обновление: 2026-02-23
