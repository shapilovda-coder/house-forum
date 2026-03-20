# Архитектура проекта

## Общая структура

```
app/
├── [[...slug]]/          # Catch-all роут (127+ страниц)
│   ├── page.tsx          # Главный компонент страницы
│   ├── layout.tsx        # Layout для категорий
│   └── ...               # Динамические сегменты
├── components/           # Общие компоненты
│   ├── ClientSearch.tsx  # Клиентский поиск
│   └── ...
├── blog/                 # Страницы блога
├── calculator/           # Калькулятор
├── kontakty/             # Контакты
└── layout.tsx            # Корневой layout

content/
└── articles/             # MDX статьи

data/
└── (только для dev)      # JSON данные (в .gitignore)

public/
└── images/               # Статические файлы
```

## Роутинг

Используется **Catch-all сегмент** `[[...slug]]`:

| URL | Описание |
|-----|----------|
| `/` | Главная |
| `/prozrachnye-rolstavni/` | Категория |
| `/prozrachnye-rolstavni/moskva/` | Категория + город |

**Всего страниц:** 127
- 1 главная
- 4 статические
- 7 категорий
- 112 geo-страниц (7×16)
- 3 верификации

## Компоненты

### Страницы
- `page.tsx` — единая точка входа для всех роутов
- `HomePage.tsx` — главная страница
- `CategoryPage.tsx` — страница категории

### UI
- `ClientSearch.tsx` — поиск по компаниям
- `CalculatorModal.tsx` — модальное окно калькулятора
- `Footer.tsx` — подвал

## Данные

### Источники
1. **Supabase** — редактирование, верификация
2. **JSON** — production (static export)

### Поток данных
```
Supabase (правка данных)
    ↓
export-data.ts (экспорт в JSON)
    ↓
Git commit
    ↓
Vercel build (static)
    ↓
Production
```

## Сборка

**Static Export:**
```javascript
// next.config.js
output: 'export'
```

Генерируется 127 HTML файлов в `out/`.

## SEO

- Уникальные title/description для каждой страницы
- generateStaticParams — все URL при билде
- trailingSlash: true

## Ограничения static export

- Нет API routes
- Нет ISR
- Данные обновляются через пересборку
