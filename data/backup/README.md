# Бэкап базы данных СтройСейлс

Дата создания: 2026-02-23

## Файлы

| Файл | Размер | Описание |
|------|--------|----------|
| `companies.json` | 114 KB | 432 компании |
| `categories.json` | 779 B | 7 категорий |
| `cities.json` | 633 B | 16+ городов |
| `company_categories.json` | 32 KB | 493 связи |

## Структура

### companies
- id, name, slug, phone, website, address
- rating, clicks, is_verified, status
- city_id, created_at, updated_at

### categories
- id, name, slug, description, icon
- sort_order, is_active

### cities
- id, name, slug, region

### company_categories
- company_id, category_id

## Восстановление

```bash
# Загрузить в Supabase через REST API
curl -X POST https://zzellrqkamskeftyprkv.supabase.co/rest/v1/companies \
  -H "apikey: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d @companies.json
```

## Источник
- Supabase Project: zzellrqkamskeftyprkv
- URL: https://zzellrqkamskeftyprkv.supabase.co
