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

| Тип | Количество | Пример URL |
|-----|------------|------------|
| Главная | 1 | `/` |
| Статические | 4 | `/blog/`, `/kontakty/`, `/calculator/` |
| Категории | 7 | `/prozrachnye-rolstavni/` |
| **Категория + Гео** | **112** | `/prozrachnye-rolstavni/moskva/` |
| Яндекс верификация | 3 | `/yandex_*.html` |
| **ИТОГО** | **~127** | — |

## Гео-структура (Категория + Город)

Для каждой из 7 категорий создаются страницы по 16 городам = 112 гео-страниц.

### Примеры URL:

| URL | Описание |
|-----|----------|
| `/prozrachnye-rolstavni/moskva/` | Прозрачные рольставни в Москве |
| `/prozrachnye-rolstavni/sankt-peterburg/` | Прозрачные рольставни в СПб |
| `/zashchitnye-rolstavni/krasnodar/` | Защитные рольставни в Краснодаре |
| `/vorota/ekaterinburg/` | Ворота в Екатеринбурге |
| `/bezramnoe-osteklenie/kazan/` | Безрамное остекление в Казани |
| `/myagkie-okna/novosibirsk/` | Мягкие окна в Новосибирске |

### SEO для гео-страниц:

- **Title:** `[Категория] в [Городе] — поставщики, цены, отзывы`
- **Description:** `Каталог поставщиков [категории] в [городе]. Реальные цены, отзывы, контакты.`
- **H1:** `[Категория] в [Городе]`

## Компоненты

| Компонент | Назначение |
|-----------|------------|
| `HomePage.tsx` | Главная страница с фильтрами |
| `CategoryPage.tsx` | Страница категории (и гео) |
| `CalculatorModal.tsx` | Модальное окно калькулятора |
| `Footer.tsx` | Подвал сайта |
| `layout.tsx` | Корневой layout с мета-тегами |
| `not-found.tsx` | Страница 404 |

## Данные

- **Supabase:** `https://zzellrqkamskeftyprkv.supabase.co`
- **Таблицы:** companies, categories, cities, company_categories
- **Резервная копия:** `data/backup/`

## Домены

1. `stroysales.ru` (основной)
2. `stroy-sales.ru` (алиас)
3. `хаус-форум.рф` (алиас)

## Сборка

```bash
npm run build    # Static export (output: 'export')
```

## Деплой

- **Хостинг:** Vercel
- **URL:** https://www.stroysales.ru
