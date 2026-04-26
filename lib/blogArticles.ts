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
    slug: 'oshibki-pri-vybore-prozrachnyh-rolstavney-dlya-chastnogo-doma',
    title: 'Ошибки при выборе прозрачных рольставней для веранды и террасы: как не переплатить',
    description:
      'Разбираем главные ошибки при выборе прозрачных рольставней для частного дома: цена, сценарий использования, автоматика, монтаж, смета и выбор подрядчика.',
    excerpt:
      'Показываем, где владельцы домов чаще всего ошибаются при выборе прозрачных рольставней для веранды, террасы и беседки, и как проверить подрядчика до заказа.',
    categoryLabel: 'Прозрачные рольставни',
    categorySlug: 'prozrachnye-rolstavni',
    publishedAt: '2026-04-26',
    updatedAt: '2026-04-26',
    readingTime: '10 мин',
    coverImage: '/hero-banner.webp',
    relatedSlugs: [
      'prozrachnye-rolstavni-dlya-verandy',
      'skolko-stoyat-prozrachnye-rolstavni',
      'kak-vybrat-podryadchika-na-prozrachnye-rolstavni',
    ],
    internalLinks: [
      { href: '/prozrachnye-rolstavni/', label: 'Каталог прозрачных рольставней' },
      { href: '/prozrachnye-rolstavni/moskva-i-mo/', label: 'Компании в Москве и МО' },
      { href: '/postavshchiki/', label: 'Сравнить всех поставщиков' },
    ],
    faq: [
      {
        question: 'Какая ошибка при выборе прозрачных рольставней самая дорогая?',
        answer: 'Чаще всего дороже всего обходится выбор по минимальной цене без понимания сценария использования, состава системы и качества монтажа. Такая экономия быстро превращается в неудобство, переделки и доплаты.',
      },
      {
        question: 'Можно ли выбрать прозрачные рольставни без выезда замерщика?',
        answer: 'Для предварительной оценки бюджета можно, но для нормального выбора подрядчика и корректной сметы выезд на объект почти всегда нужен. Без замера сложно честно оценить проём, основание, управление и монтажные ограничения.',
      },
    ],
  },
  {
    slug: 'skolko-stoyat-prozrachnye-rolstavni',
    title: 'Сколько стоят прозрачные рольставни: из чего складывается цена',
    description:
      'Разбираем, сколько стоят прозрачные рольставни для веранды, террасы и беседки, какие факторы влияют на цену и где чаще всего переплачивают.',
    excerpt:
      'Показываем, из чего на самом деле складывается цена прозрачных рольставней и как сравнивать сметы подрядчиков без ошибки.',
    categoryLabel: 'Прозрачные рольставни',
    categorySlug: 'prozrachnye-rolstavni',
    publishedAt: '2026-04-22',
    updatedAt: '2026-04-22',
    readingTime: '9 мин',
    coverImage: '/hero-banner.webp',
    relatedSlugs: ['prozrachnye-rolstavni-dlya-verandy', 'oshibki-pri-vybore-prozrachnyh-rolstavney-dlya-chastnogo-doma'],
    internalLinks: [
      { href: '/prozrachnye-rolstavni/', label: 'Каталог прозрачных рольставней' },
      { href: '/prozrachnye-rolstavni/moskva-i-mo/', label: 'Компании в Москве и МО' },
      { href: '/postavshchiki/', label: 'Сравнить всех поставщиков' },
    ],
    faq: [
      {
        question: 'Сколько в среднем стоят прозрачные рольставни?',
        answer: 'Итоговая стоимость зависит от размеров проёма, материала полотна, типа управления и сложности монтажа. Поэтому корректнее сравнивать несколько смет от подрядчиков, а не ориентироваться на одну рекламную цифру.',
      },
      {
        question: 'Что сильнее всего влияет на цену?',
        answer: 'Обычно больше всего влияют размеры проёма, тип прозрачного заполнения, автоматика, количество направляющих и сложность монтажа на конкретном объекте.',
      },
    ],
  },
  {
    slug: 'kak-vybrat-podryadchika-na-prozrachnye-rolstavni',
    title: 'Как выбрать подрядчика на прозрачные рольставни и не пожалеть',
    description:
      'Пошагово разбираем, как выбрать подрядчика на прозрачные рольставни: что спрашивать, как сравнивать сметы, на что смотреть в договоре и монтаже.',
    excerpt:
      'Практичный чек-лист по выбору подрядчика: от первого звонка и замера до договора, монтажа и гарантийных обязательств.',
    categoryLabel: 'Прозрачные рольставни',
    categorySlug: 'prozrachnye-rolstavni',
    publishedAt: '2026-04-22',
    updatedAt: '2026-04-22',
    readingTime: '10 мин',
    coverImage: '/hero-banner.webp',
    relatedSlugs: ['skolko-stoyat-prozrachnye-rolstavni', 'oshibki-pri-vybore-prozrachnyh-rolstavney-dlya-chastnogo-doma'],
    internalLinks: [
      { href: '/prozrachnye-rolstavni/', label: 'Поставщики прозрачных рольставней' },
      { href: '/postavshchiki/', label: 'Все карточки компаний' },
      { href: '/kontakty/', label: 'Связаться со СтройСейлс' },
    ],
    faq: [
      {
        question: 'Достаточно ли сравнить только цену?',
        answer: 'Нет. Если смотреть только на цену, легко получить более слабый материал, неудачную автоматику или монтаж без ответственности за результат. Смету нужно сравнивать вместе с составом системы и условиями договора.',
      },
      {
        question: 'Сколько подрядчиков стоит сравнивать?',
        answer: 'На практике оптимально брать хотя бы 2–3 предложения по одному и тому же техзаданию. Так проще понять реальный рынок и увидеть, где вас пытаются упростить по комплектующим.',
      },
    ],
  },
  {
    slug: 'oshibki-pri-zakaze-bezramnogo-ostekleniya',
    title: 'Ошибки при заказе безрамного остекления: где теряют деньги и нервы',
    description:
      'Собрали главные ошибки при заказе безрамного остекления террасы и веранды: неверные ожидания по теплу, экономия на монтаже, слабый подрядчик и непрозрачная смета.',
    excerpt:
      'Разбираем типичные ошибки заказчиков при выборе безрамного остекления и показываем, как проверить подрядчика ещё до подписания договора.',
    categoryLabel: 'Безрамное остекление',
    categorySlug: 'bezramnoe-osteklenie',
    publishedAt: '2026-04-22',
    updatedAt: '2026-04-22',
    readingTime: '9 мин',
    coverImage: '/hero-banner.webp',
    relatedSlugs: ['bezramnoe-osteklenie-terras', 'bezramnoe-osteklenie-ili-prozrachnye-rolstavni'],
    internalLinks: [
      { href: '/bezramnoe-osteklenie/', label: 'Каталог безрамного остекления' },
      { href: '/bezramnoe-osteklenie/moskva-i-mo/', label: 'Поставщики в Москве и МО' },
      { href: '/postavshchiki/', label: 'Сравнить всех поставщиков' },
    ],
    faq: [
      {
        question: 'Какая ошибка самая дорогая при заказе безрамного остекления?',
        answer: 'Чаще всего дороже всего обходится неверное ожидание по сценарию использования: когда заказчик ждёт почти тёплое капитальное помещение, а получает красивую, но не рассчитанную на такой режим систему.',
      },
      {
        question: 'Нужно ли проверять монтаж отдельно от самой системы?',
        answer: 'Да. Даже хорошая система безрамного остекления может работать плохо, если основание неровное, направляющие выставлены неточно или подрядчик не учёл нагрузки и особенности проёма.',
      },
    ],
  },
  {
    slug: 'prozrachnye-rolstavni-ili-myagkie-okna-dlya-verandy',
    title: 'Прозрачные рольставни или мягкие окна для веранды: что выбрать',
    description:
      'Сравниваем прозрачные рольставни и мягкие окна для веранды: цена, срок службы, внешний вид, защита от ветра и удобство использования.',
    excerpt:
      'Разбираем, когда выгоднее ставить мягкие окна, а когда прозрачные рольставни действительно лучше по удобству, сроку службы и общему результату.',
    categoryLabel: 'Прозрачные рольставни',
    categorySlug: 'prozrachnye-rolstavni',
    publishedAt: '2026-04-21',
    updatedAt: '2026-04-21',
    readingTime: '9 мин',
    coverImage: '/hero-banner.webp',
    relatedSlugs: ['prozrachnye-rolstavni-dlya-verandy', 'skolko-stoyat-prozrachnye-rolstavni'],
    internalLinks: [
      { href: '/prozrachnye-rolstavni/', label: 'Каталог прозрачных рольставней' },
      { href: '/myagkie-okna/', label: 'Каталог мягких окон' },
      { href: '/postavshchiki/', label: 'Сравнить всех поставщиков' },
    ],
    faq: [
      {
        question: 'Что дешевле: мягкие окна или прозрачные рольставни?',
        answer: 'На старте мягкие окна обычно дешевле, но при интенсивной эксплуатации прозрачные рольставни могут оказаться выгоднее за счёт ресурса, удобства и внешнего вида.',
      },
      {
        question: 'Что лучше для круглогодичного использования?',
        answer: 'Если веранда используется регулярно и нужен быстрый сценарий открытия-закрытия, прозрачные рольставни чаще удобнее. Для сезонной эксплуатации мягкие окна часто достаточно хороши.',
      },
    ],
  },
  {
    slug: 'bezramnoe-osteklenie-ili-prozrachnye-rolstavni',
    title: 'Безрамное остекление террасы или прозрачные рольставни: что лучше',
    description:
      'Сравниваем безрамное остекление и прозрачные рольставни для террасы: тепло, удобство, сезонность, обслуживание, цена и сценарии использования.',
    excerpt:
      'Подробно разбираем два популярных решения для террасы и веранды: где выигрывает безрамное остекление, а где разумнее ставить прозрачные рольставни.',
    categoryLabel: 'Безрамное остекление',
    categorySlug: 'bezramnoe-osteklenie',
    publishedAt: '2026-04-21',
    updatedAt: '2026-04-21',
    readingTime: '10 мин',
    coverImage: '/hero-banner.webp',
    relatedSlugs: ['bezramnoe-osteklenie-terras', 'oshibki-pri-zakaze-bezramnogo-ostekleniya'],
    internalLinks: [
      { href: '/bezramnoe-osteklenie/', label: 'Каталог безрамного остекления' },
      { href: '/prozrachnye-rolstavni/', label: 'Каталог прозрачных рольставней' },
      { href: '/postavshchiki/', label: 'Все поставщики в каталоге' },
    ],
    faq: [
      {
        question: 'Что выглядит премиальнее: безрамное остекление или прозрачные рольставни?',
        answer: 'С точки зрения архитектурного эффекта и визуальной лёгкости чаще выигрывает безрамное остекление. Прозрачные рольставни обычно сильнее по функциональности и сценариям защиты.',
      },
      {
        question: 'Что проще обслуживать?',
        answer: 'Оба решения требуют ухода, но в разных точках: у безрамного остекления важна фурнитура и чистота направляющих, у прозрачных рольставней — механизм, короб и корректная настройка привода.',
      },
    ],
  },
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
    relatedSlugs: ['kak-vybrat-prozrachnye-rolstavni', 'oshibki-pri-vybore-prozrachnyh-rolstavney-dlya-chastnogo-doma'],
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
    relatedSlugs: ['prozrachnye-rolstavni-dlya-verandy', 'oshibki-pri-vybore-prozrachnyh-rolstavney-dlya-chastnogo-doma'],
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
