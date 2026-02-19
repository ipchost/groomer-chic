import { useState, useMemo, useEffect } from "react"; // Добавили useEffect
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react"; // Добавили лоадер
import { motion } from "framer-motion";
import { CATEGORIES, type Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase"; // Импортируем мостик к базе

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get("filter");
  
  // СОСТОЯНИЯ
  const [dbProducts, setDbProducts] = useState<Product[]>([]); // Товары из базы
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
  const [filter, setFilter] = useState<string | null>(filterParam);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  // 1. ЗАГРУЗКА ДАННЫХ ИЗ SUPABASE
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) {
        console.error("Ошибка загрузки:", error.message);
      } else {
        // Преобразуем данные из формата БД в формат нашего интерфейса Product, 
        // если названия колонок отличаются (например, img -> image)
        const formattedData = (data || []).map(p => ({
          ...p,
          title: p.title || p.name, // На случай если в базе 'name', а в коде 'title'
          img: p.img || p.image,    // На случай если в базе 'image', а в коде 'img'
          desc: p.desc || p.description
        }));
        setDbProducts(formattedData);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  // 2. ФИЛЬТРАЦИЯ И СОРТИРОВКА (теперь используем dbProducts вместо INITIAL_PRODUCTS)
  const products = useMemo(() => {
    let result = [...dbProducts];

    if (filter) {
      result = result.filter((p) => p.category === filter || p.subgroup === filter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
      );
    }

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [dbProducts, filter, search, sort]);

  const handleFilter = (val: string | null) => {
    setFilter(val);
    if (val) {
      setSearchParams({ filter: val });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl md:text-5xl heading-display mb-8"
        >
          Каталог
        </motion.h1>

        {/* Search & Sort bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-card border border-border rounded-2xl outline-none focus:ring-2 focus:ring-primary/30 transition-all text-sm"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            )}
          </div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full sm:w-52 rounded-2xl h-12">
              <SlidersHorizontal size={16} className="mr-2" />
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">По умолчанию</SelectItem>
              <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
              <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-56 shrink-0">
            <button
              onClick={() => handleFilter(null)}
              className={`w-full text-left py-2 font-bold transition-colors ${!filter ? "text-brand" : "hover:text-brand"}`}
            >
              Все товары
            </button>
            {Object.entries(CATEGORIES).map(([sub, cats]) => (
              <div key={sub} className="mt-6">
                <button
                  onClick={() => handleFilter(sub)}
                  className={`heading-display text-xs uppercase tracking-[0.15em] mb-3 block ${
                    filter === sub ? "text-brand" : "text-muted-foreground"
                  }`}
                >
                  {sub}
                </button>
                <ul className="space-y-2 border-l-2 border-border pl-4">
                  {cats.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => handleFilter(cat)}
                        className={`text-sm transition-colors ${
                          filter === cat ? "text-brand font-bold" : "text-muted-foreground hover:text-brand"
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin text-primary mb-4" size={40} />
                <p className="text-muted-foreground">Загрузка каталога...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">Ничего не найдено</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {products.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;