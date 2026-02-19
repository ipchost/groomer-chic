import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, MessageSquare, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg1.png";
import ProductCard from "@/components/ProductCard";
import { type Product } from "@/data/products";
import { supabase } from "@/lib/supabase";

const advantages = [
  { title: "Качество", desc: "Только проверенные бренды и сертифицированные материалы", icon: ShieldCheck },
  { title: "Доставка", desc: "Быстрая доставка по всей России от 1 дня", icon: Truck },
  { title: "Поддержка MAX", desc: "Консультации в мессенджере max.ru", icon: MessageSquare },
];

const HomePage = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      // Запрашиваем только необходимые поля для ускорения ответа
      const { data, error } = await supabase
        .from('groomer-shop')
        .select('id, title, price, image, category, subgroup, badge') 
        .order('id', { ascending: false })
        .limit(3);

      if (!error && data) {
        const formattedData = data.map(p => ({
          ...p,
          img: p.image,
          desc: "" // На главной описание не нужно, экономим байты
        }));
        setFeatured(formattedData);
      }
      setIsLoading(false);
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="h-[85vh] md:h-screen relative flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            className="w-full h-full object-cover object-center" 
            alt="Style" 
            fetchPriority="high" // Важно для скорости LCP
          />
          <div className="absolute inset-0 bg-white/10" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl heading-display mb-6 leading-[1.1] text-[#373b3e]"
            >
              СТИЛЬ <span className="text-[#9b1c1c]">ГРУМЕРА</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-2xl font-light text-[#373b3e]/90 mb-10 max-w-2xl leading-relaxed"
            >
              Современные инструменты и одежда премиум-класса для профессионалов.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <Link to="/catalog" className="inline-flex items-center gap-3 bg-[#9b1c1c] text-white px-10 py-4 rounded-full font-bold hover:shadow-xl transition-all active:scale-95">
                В каталог <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {advantages.map((item, i) => (
              <div key={item.title} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 text-[#9b1c1c] mb-6">
                  <item.icon size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl heading-display mb-2">Популярное</h2>
              <div className="h-1 w-12 bg-[#9b1c1c]" />
            </div>
            <Link to="/catalog" className="hidden sm:block text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-[#9b1c1c] transition-colors">
              Весь каталог
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Скелетоны вместо лоадера
              [1, 2, 3].map((n) => (
                <div key={n} className="h-[400px] bg-slate-200 animate-pulse rounded-3xl" />
              ))
            ) : (
              featured.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))
            )}
          </div>
          
          <Link to="/catalog" className="sm:hidden mt-10 w-full flex items-center justify-center py-4 border border-slate-200 rounded-2xl font-bold text-[#9b1c1c]">
            СМОТРЕТЬ ВСЕ
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;