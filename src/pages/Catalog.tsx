import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { CATEGORIES, type Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get("filter");
  
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(filterParam);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // ИСПРАВЛЕНО: Обращаемся к правильной таблице 'groomer-shop'
        const { data, error } = await supabase
          .from('groomer-shop') 
          .select('*');

        if (error) throw error;

        if (data) {
          const formattedData = data.map(p => ({
            ...p,
            img: p.image,      // Маппим image из БД в img для компонента
            desc: p.description // Маппим description в desc
          }));
          setDbProducts(formattedData);
        }
      } catch (error: any) {
        console.error("Ошибка загрузки каталога:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const products = useMemo(() => {
    let result = [...dbProducts];

    if (filter) {
      // Фильтруем и по категории, и по подгруппе
      result = result.filter((p) => 
        (p.category && p.category.toLowerCase() === filter.toLowerCase()) || 
        (p.subgroup && p.subgroup.toLowerCase() === filter.toLowerCase())
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => 
          p.title.toLowerCase().includes(q) || 
          (p.desc && p.desc.toLowerCase().includes(q))
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

          <div className="flex-1">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin text-primary mb-4" size={40} />
                <p className="text-muted-foreground">Загрузка каталога...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">В этой категории пока нет товаров</p>
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