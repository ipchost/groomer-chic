export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  subgroup: string;
  img: string;
  desc: string;
  badge?: string;
}

export const CATEGORIES: Record<string, string[]> = {
  "Одежда": ["Блузы", "Брюки", "Платья", "Фартуки", "Костюмы и Комбинезоны", "Обувь"],
  "Инструменты": ["Ножницы", "Машинки", "Гребни", "Пуходерки"],
  "Косметика": ["Шампуни", "Кондиционеры", "Маски", "Парфюм"],
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Блуза 'Элегант'",
    price: 3200,
    category: "Блузы",
    subgroup: "Одежда",
    img: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600&q=80",
    desc: "Профессиональная блуза из водоотталкивающей ткани. Идеально подходит для ежедневной работы в салоне.",
    badge: "Хит",
  },
  {
    id: 2,
    title: "Ножницы 7.0 Straight",
    price: 8500,
    category: "Ножницы",
    subgroup: "Инструменты",
    img: "https://images.unsplash.com/photo-1521673461164-de300ebcfb17?w=600&q=80",
    desc: "Сталь высокого качества для точного среза. Эргономичная рукоятка снижает усталость руки.",
    badge: "Новинка",
  },
  {
    id: 3,
    title: "Шампунь 'Шелк'",
    price: 1500,
    category: "Шампуни",
    subgroup: "Косметика",
    img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80",
    desc: "Увлажняющий состав для длинной шерсти. Придаёт блеск и облегчает расчёсывание.",
  },
  {
    id: 4,
    title: "Фартук 'Про Стиль'",
    price: 2800,
    category: "Фартуки",
    subgroup: "Одежда",
    img: "https://images.unsplash.com/photo-1516222338250-863216ce01ea?w=600&q=80",
    desc: "Водонепроницаемый фартук с регулируемыми лямками. Множество карманов для инструментов.",
    badge: "Популярное",
  },
  {
    id: 5,
    title: "Машинка Moser Max50",
    price: 12900,
    category: "Машинки",
    subgroup: "Инструменты",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
    desc: "Профессиональная роторная машинка для стрижки. Тихая работа, мощный мотор.",
    badge: "Премиум",
  },
  {
    id: 6,
    title: "Кондиционер 'Сияние'",
    price: 1800,
    category: "Кондиционеры",
    subgroup: "Косметика",
    img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80",
    desc: "Глубокое питание и восстановление шерсти. Подходит для всех типов.",
  },
  {
    id: 7,
    title: "Брюки 'Комфорт'",
    price: 3600,
    category: "Брюки",
    subgroup: "Одежда",
    img: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&q=80",
    desc: "Эластичные профессиональные брюки. Устойчивы к шерсти и влаге.",
  },
  {
    id: 8,
    title: "Гребень металлический",
    price: 950,
    category: "Гребни",
    subgroup: "Инструменты",
    img: "https://images.unsplash.com/photo-1587015990127-424b954b4da2?w=600&q=80",
    desc: "Антистатический гребень из нержавеющей стали. Закруглённые зубья для безопасности.",
  },
  {
    id: 9,
    title: "Парфюм 'Свежесть'",
    price: 2200,
    category: "Парфюм",
    subgroup: "Косметика",
    img: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&q=80",
    desc: "Лёгкий аромат для финального штриха. Гипоаллергенная формула.",
  },
];
