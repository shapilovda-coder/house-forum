# Структура проекта СтройСейлс

## Дата: 2026-02-23

## Архитектура

### Роутинг: Catch-all `[[...slug]]`

Все страницы генерируются через единый роут `app/[[...slug]]/page.tsx`:

| URL | Описание | Генерация |
|-----|----------|-----------|
| `/` | Главная | `{ slug: [] }` |
| `/blog/` | Блог | `{ slug: ['blog'] }` |
| `/kontakty/` | Контакты | `{ slug: ['kontakty'] }` |
| `/calculator/` | Калькулятор | `{ slug: ['calculator'] }` |
| `/prozrachnye-rolstavni/` | Категория | `{ slug: ['prozrachnye-rolstavni'] }` |
| `/prozrachnye-rolstavni/moskva/` | Категория + город | `{ slug: ['prozrachnye-rolstavni', 'moskva'] }` |

## Категории (7 шт)

```typescript
const CATEGORIES = [
  { slug: 'prozrachnye-rolstavni', name: 'Прозрачные рольставни' },
  { slug: 'zashchitnye-rolstavni', name: 'Защитные рольставни' },
  { slug: 'bezramnoe-osteklenie', name: 'Безрамное остекление' },
  { slug: 'vorota', name: 'Ворота' },
  { slug: 'myagkie-okna', name: 'Мягкие окна' },
  { slug: 'rolletnye-shkafy', name: 'Роллетные шкафы' },
  { slug: 'ofisnye-peregorodki', name: 'Офисные перегородки' },
]
```

## Города (16 шт)

```typescript
const CITIES = [
  { slug: 'moskva', name: 'Москва' },
  { slug: 'sankt-peterburg', name: 'Санкт-Петербург' },
  { slug: 'novosibirsk', name: 'Новосибирск' },
  { slug: 'ekaterinburg', name: 'Екатеринбург' },
  { slug: 'kazan', name: 'Казань' },
  { slug: 'nizhniy-novgorod', name: 'Нижний Новгород' },
  { slug: 'krasnoyarsk', name: 'Красноярск' },
  { slug: 'chelyabinsk', name: 'Челябинск' },
  { slug: 'samara', name: 'Самара' },
  { slug: 'ufa', name: 'Уфа' },
  { slug: 'rostov-na-donu', name: 'Ростов-на-Дону' },
  { slug: 'krasnodar', name: 'Краснодар' },
  { slug: 'omsk', name: 'Омск' },
  { slug: 'voronezh', name: 'Воронеж' },
  { slug: 'perm', name: 'Пермь' },
  { slug: 'volgograd', name: 'Волгоград' },
]
```

## Общее количество страниц

- Главная: 1
- Статические: 4 (blog, kontakty, calculator, o-proekte)
- Категории: 7
- Категории + города: 7 × 16 = 112
- Яндекс верификация: 3
- **Итого: ~127 страниц**

## Компоненты

| Компонент | Назначение |
|-----------|------------|
| `HomePage.tsx` | Главная страница с фильтрами |
| `CategoryPage.tsx` | Страница категории |
| `CalculatorModal.tsx` | Модальное окно калькулятора |
| `Footer.tsx` | Подвал сайта |
| `layout.tsx` | Корневой layout с мета-тегами |
| `not-found.tsx` | Страница 404 |

## Данные

- **Supabase**: `https://zzellrqkamskeftyprkv.supabase.co`
- **Таблицы**: companies, categories, cities, company_categories
- **Резервная копия**: `data/backup/`

## Домены

1. `stroysales.ru` (основной)
2. `stroy-sales.ru` (алиас)
3. `хаус-форум.рф` (алиас)

## Сборка

```bash
npm run build    # Static export (output: 'export')
```

## Деплой

- **Хостинг**: Vercel
- **URL**: https://www.stroysales.ru
