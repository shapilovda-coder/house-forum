export interface BlogArticleFaqItem {
  question: string
  answer: string
}

export interface BlogArticle {
  slug: string
  title: string
  description: string
  excerpt: string
  categoryLabel: string
  categorySlug: string
  publishedAt: string
  updatedAt: string
  readingTime: string
  coverImage: string
  relatedSlugs: string[]
  internalLinks: { href: string; label: string }[]
  faq: BlogArticleFaqItem[]
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'bezramnoe-osteklenie-terras',
    title: 'Безрамное остекление террас и веранд: цены, виды, установка',
    description:
      'Безрамное остекление террас и веранд: виды конструкций, цены за м², монтаж. Сравнение с обычным остеклением. Где заказать безрамное остекление в Москве и регионах.',
    excerpt:
      'Полное руководство: виды конструкций, цены за м², плюсы и минусы, технические требования к монтажу.',
    categoryLabel: 'Безрамное остекление',
    categorySlug: 'bezramnoe-osteklenie',
    publishedAt: '2026-03-19',
    updatedAt: '2026-04-21',
    readingTime: '9 мин',
    coverImage: '/hero-banner.webp',
    relatedSlugs: ['prozrachnye-rolstavni-dlya-verandy', 'kak-vybrat-prozrachnye-rolstavni'],
    internalLinks: [
      { href: '/bezramnoe-osteklenie/', label: 'Каталог безрамного остекления' },
      { href: '/bezramnoe-osteklenie/moskva-i-mo/', label: 'Поставщики в Москве и МО' },
      { href: '/postavshchiki/', label: 'Все поставщики' },
    ],
    faq: [
      {
        question: 'Сколько стоит безрамное остекление террасы?',
        answer: 'Ориентир зависит от типа профиля, размеров проёма и сложности монтажа. Для точного расчёта лучше сравнить несколько подрядчиков из каталога.',
      },
      {
        question: 'Подходит ли безрамное остекление для зимнего использования?',
        answer: 'Да, но итоговый комфорт зависит от типа системы, уплотнений и общего контура утепления помещения.',
      },
    ],
  },
  {
    slug: 'prozrachnye-rolstavni-dlya-verandy',
    title: 'Прозрачные рольставни для веранды: как выбрать и не переплатить',
    description:
      'Как выбрать прозрачные рольставни для веранды. Сравнение поликарбоната и ПВХ, виды управления, цены с установкой.',
    excerpt:
      'Разбираем, как работают прозрачные роллеты, чем они выгодно отличаются от классического остекления и на чём можно сэкономить без потери качества.',
    categoryLabel: 'Прозрачные рольставни',
    categorySlug: 'prozrachnye-rolstavni',
    publishedAt: '2026-03-17',
    updatedAt: '2026-04-21',
    readingTime: '8 мин',
    coverImage: '/hero-banner.webp',
    relatedSlugs: ['kak-vybrat-prozrachnye-rolstavni', 'bezramnoe-osteklenie-terras'],
    internalLinks: [
      { href: '/prozrachnye-rolstavni/', label: 'Каталог прозрачных рольставней' },
      { href: '/prozrachnye-rolstavni/moskva-i-mo/', label: 'Компании в Москве и МО' },
      { href: '/postavshchiki/', label: 'Все поставщики' },
    ],
    faq: [
      {
        question: 'Что лучше для веранды: прозрачные рольставни или мягкие окна?',
        answer: 'Для круглогодичного использования и лучшей защиты от ветра чаще выбирают прозрачные рольставни, а мягкие окна подходят как более бюджетный сезонный вариант.',
      },
      {
        question: 'Нужно ли брать электропривод?',
        answer: 'Для частого использования и больших проёмов электропривод заметно повышает удобство и снижает нагрузку на механизм.',
      },
    ],
  },
  {
    slug: 'kak-vybrat-prozrachnye-rolstavni',
    title: 'Как выбрать прозрачные рольставни: полное руководство 2025',
    description:
      'Руководство по выбору прозрачных рольставней: материалы, профили, управление, цены. Советы по установке и обслуживанию.',
    excerpt:
      'Подробный гид по материалам, профилям, управлению, цене и обслуживанию прозрачных рольставней для дома и бизнеса.',
    categoryLabel: 'Прозрачные рольставни',
    categorySlug: 'prozrachnye-rolstavni',
    publishedAt: '2025-02-20',
    updatedAt: '2026-04-21',
    readingTime: '10 мин',
    coverImage: '/hero-banner.webp',
    relatedSlugs: ['prozrachnye-rolstavni-dlya-verandy', 'sektsionnye-vorota-garazh'],
    internalLinks: [
      { href: '/prozrachnye-rolstavni/', label: 'Все поставщики прозрачных рольставней' },
      { href: '/prozrachnye-rolstavni/moskva-i-mo/', label: 'Поставщики в Москве и МО' },
      { href: '/kontakty/', label: 'Связаться со СтройСейлс' },
    ],
    faq: [
      {
        question: 'Какой материал прозрачных рольставней выбрать?',
        answer: 'Для большинства проектов оптимален качественный поликарбонат: он легче, дешевле стекла и хорошо подходит для веранд, террас и витрин.',
      },
      {
        question: 'На что смотреть при выборе подрядчика?',
        answer: 'Сравните примеры работ, сроки изготовления, гарантию, условия монтажа и наличие понятного договора с техническим описанием системы.',
      },
    ],
  },
  {
    slug: 'zashitnye-rolstavni-dlya-dachi',
    title: 'Защитные рольставни для дачи: защита от взлома и непрошеных гостей',
    description:
      'Защитные рольставни для дачи — надёжная защита от взлома. Экструдерный и стальной профиль, замки, автоматика. Установка и цены.',
    excerpt:
      'Что выбрать для дачи: экструдерный или стальной профиль, какой замок надёжнее и когда нужна автоматика.',
    categoryLabel: 'Защитные рольставни',
    categorySlug: 'zashitnye-rolstavni',
    publishedAt: '2026-03-17',
    updatedAt: '2026-04-21',
    readingTime: '8 мин',
    coverImage: '/hero-banner.webp',
    relatedSlugs: ['sektsionnye-vorota-garazh', 'kak-vybrat-prozrachnye-rolstavni'],
    internalLinks: [
      { href: '/zashitnye-rolstavni/', label: 'Каталог защитных рольставней' },
      { href: '/zashitnye-rolstavni/moskva-i-mo/', label: 'Поставщики в Москве и МО' },
      { href: '/postavshchiki/', label: 'Смотреть всех поставщиков' },
    ],
    faq: [
      {
        question: 'Какие рольставни лучше защищают дачу от взлома?',
        answer: 'Для повышенной защиты чаще выбирают экструдерный или стальной профиль, а также усиливают замковую группу и автоматику.',
      },
      {
        question: 'Можно ли установить рольставни на уже построенный дом?',
        answer: 'Да, большинство систем монтируются на готовые проёмы, но точный вариант зависит от размеров, фасада и способа крепления.',
      },
    ],
  },
  {
    slug: 'sektsionnye-vorota-garazh',
    title: 'Секционные ворота для гаража: полное руководство по выбору',
    description:
      'Как выбрать секционные ворота для гаража. Размеры, утепление, автоматика, цены. Сравнение с откатными и рулонными воротами.',
    excerpt:
      'Разбираем размеры, автоматику, утепление, цену и сравниваем секционные ворота с альтернативами.',
    categoryLabel: 'Ворота',
    categorySlug: 'vorota',
    publishedAt: '2026-03-17',
    updatedAt: '2026-04-21',
    readingTime: '8 мин',
    coverImage: '/hero-banner.webp',
    relatedSlugs: ['zashitnye-rolstavni-dlya-dachi', 'rolletnye-shkafy-dlya-garazha'],
    internalLinks: [
      { href: '/vorota/', label: 'Каталог поставщиков ворот' },
      { href: '/vorota/moskva-i-mo/', label: 'Ворота в Москве и МО' },
      { href: '/postavshchiki/', label: 'Все компании в каталоге' },
    ],
    faq: [
      {
        question: 'Какие ворота лучше для тёплого гаража?',
        answer: 'Для отапливаемого гаража обычно выбирают утеплённые секционные ворота с хорошими уплотнителями и корректным монтажом по проёму.',
      },
      {
        question: 'Когда нужна автоматика для ворот?',
        answer: 'Если воротами пользуются регулярно, автоматика значительно повышает комфорт и помогает продлить срок службы за счёт плавной работы.',
      },
    ],
  },
  {
    slug: 'rolletnye-shkafy-dlya-garazha',
    title: 'Роллетные шкафы для гаража: компактное хранение с защитой',
    description:
      'Роллетные шкафы для гаража — компактное хранение инструментов и садовой техники. Виды, цены, установка. Сравнение с обычными шкафами.',
    excerpt:
      'Как выбрать роллетный шкаф для гаража, на что смотреть по материалам, размеру, запиранию и удобству ежедневного использования.',
    categoryLabel: 'Роллетные шкафы',
    categorySlug: 'rolletnye-shkafy',
    publishedAt: '2025-03-21',
    updatedAt: '2026-04-21',
    readingTime: '7 мин',
    coverImage: '/hero-banner.webp',
    relatedSlugs: ['sektsionnye-vorota-garazh', 'prozrachnye-rolstavni-dlya-verandy'],
    internalLinks: [
      { href: '/rolletnye-shkafy/', label: 'Каталог роллетных шкафов' },
      { href: '/rolletnye-shkafy/moskva-i-mo/', label: 'Поставщики в Москве и МО' },
      { href: '/postavshchiki/', label: 'Все поставщики' },
    ],
    faq: [
      {
        question: 'Чем роллетный шкаф лучше обычного металлического?',
        answer: 'Он экономит место при открывании, удобен в узких помещениях и хорошо подходит для парковок, гаражей и технических зон.',
      },
      {
        question: 'Можно ли поставить роллетный шкаф на улице?',
        answer: 'Да, но для уличного размещения нужно выбирать материалы и фурнитуру, рассчитанные на влагу, перепады температур и коррозионную нагрузку.',
      },
    ],
  },
]

export function getAllBlogArticles() {
  return BLOG_ARTICLES
}

export function getBlogArticle(slug: string) {
  return BLOG_ARTICLES.find((article) => article.slug === slug) ?? null
}
