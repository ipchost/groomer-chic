import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Heart, Loader2, MessageSquare, ArrowRight } from "lucide-react";
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
      setIsLoading(true);
      const { data, error } = await supabase
        .from('groomer-shop')
        .select('*')
        .order('id', { ascending: false })
        .limit(3);

      if (!error && data) {
        const formattedData = data.map(p => ({
          ...p,
          img: p.image,
          desc: p.description
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
      <section className="h-[90vh] md:h-screen relative flex items-center">
        <div className="absolute inset-0">
          <img src={heroBg} className="w-full h-full object-cover object-center" alt="Hero Background" />
          {/* Сделали фон светлее, заменив bg-foreground/10 на белый с минимальной прозрачностью */}
          <div className="absolute inset-0 bg-white/5" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl heading-display mb-6 leading-tight"
            >
              <span className="text-[#373b3e]">СТИЛЬ</span>{" "}
              <span className="text-[#9b1c1c]">ГРУМЕРА</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-2xl font-light text-[#373b3e] mb-10 max-w-2xl leading-relaxed"
            >
              Всё для идеального ухода. Современные инструменты и одежда премиум-класса для профессионалов.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/catalog" className="bg-[#9b1c1c] text-white px-8 py-4 rounded-full font-bold hover:bg-[#7a1616] transition-colors flex items-center gap-2">
                В каталог <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl heading-display text-center mb-16"
          >
            Наши преимущества
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {advantages.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all text-center"
              >
                <div className="w-14 h-14 bg-[#f8f1f1] text-[#9b1c1c] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#373b3e]">{item.title}</h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <h2 className="text-3xl md:text-4xl heading-display">Популярные товары</h2>
            <Link to="/catalog" className="text-[#9b1c1c] font-bold text-sm uppercase tracking-widest hover:opacity-80 transition-opacity">
              Смотреть все →
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-[#9b1c1c]" size={40} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.length > 0 ? (
                featured.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))
              ) : (
                <div className="col-span-full text-center py-10 bg-slate-50 rounded-3xl">
                  <p className="text-slate-500 italic">Товары скоро появятся в продаже...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;