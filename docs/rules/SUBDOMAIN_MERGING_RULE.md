# Правило объединения поддоменов

## Проблема

Одна компания может иметь много поддоменов:
- `moskva.vorota-group.ru`
- `spb.vorota-group.ru`
- `kazan.vorota-group.ru`

Это одна компания, но выглядит как разные.

## Решение

### 1. Группировка по базовому домену

```
vorota-group.ru
├── moscow.vorota-group.ru
├── spb.vorota-group.ru
├── kazan.vorota-group.ru
└── (и т.д.)
```

### 2. Отображение

| Было | Стало |
|------|-------|
| 36 отдельных карточек | 1 карточка "vorota-group.ru" |
| | + "+35 городов" |

### 3. Алгоритм

```typescript
// 1. Извлекаем базовый домен
function getBaseDomain(url: string): string {
  const domain = url.replace(/^https?:\/\//, '').replace(/^www\./, '')
  const parts = domain.split('.')
  
  // vorota-group.ru → vorota-group.ru
  // moscow.vorota-group.ru → vorota-group.ru
  if (parts.length > 2) {
    return parts.slice(-2).join('.')
  }
  return domain
}

// 2. Группируем компании
const groups: Record<string, Company[]> = {}

companies.forEach(company => {
  const base = getBaseDomain(company.website || company.slug)
  if (!groups[base]) groups[base] = []
  groups[base].push(company)
})

// 3. Создаём объединённые карточки
const mergedCompanies = Object.entries(groups).map(([baseDomain, group]) => {
  return {
    id: group[0].id, // ID первой
    name: group[0].name, // Название
    slug: baseDomain.replace(/\./g, '-'), // vorota-group-ru
    website: `https://${baseDomain}`,
    phone: group[0].phone, // Телефон первого
    address: group[0].address, // Адрес первого
    cities: group.map(c => c.cities).flat(), // Все города
    _groupCount: group.length, // Количество поддоменов
    _groupCities: group.map(c => c.cities?.name).filter(Boolean), // Список городов
  }
})
```

### 4. Отображение в карточке

```
┌─────────────────────────────────────────────────────────────┐
│ vorota-group.ru                              ┌───────────┐ │
│ 📞 +7 (495) 123-45-67                        │ На сайт   │ │
│ 📍 Москва (и +35 городов)                    ├───────────┤ │
│                                              │ Позвонить │ │
└─────────────────────────────────────────────────────────────┘
```

### 5. Обработка городов

Если у поддоменов разные города:
- Показываем первый город + "+N городов"
- При клике — список всех городов

### 6. Исключения

Не объединяем если:
- Разные названия компаний
- Разные телефоны (не связанные)
- Явно разные компании (например, франшиза)

## Примеры объединения

| Домены | Базовый | Города |
|--------|---------|--------|
| moscow.vorota-group.ru, spb.vorota-group.ru | vorota-group.ru | Москва, СПб |
| 77vorota.ru, 78vorota.ru | 77vorota.ru | Москва, СПб |
| myagkie-okna.ru, spb.myagkie-okna.ru | myagkie-okna.ru | Москва, СПб |

## Реализация

### В запросе Supabase:
```sql
-- Получаем все компании
-- Группируем на фронтенде
-- Или используем VIEW в БД
```

### В компоненте:
```tsx
<CompanyCard 
  company={mergedCompany}
  showCities={true}
/>
```

## Статус

- [x] Правило зафиксировано
- [ ] Реализовано в коде
- [ ] Проверено на данных

---

**Зафиксировано:** 2026-02-23 20:06 MSK
