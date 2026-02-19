import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Heart, Loader2 } from "lucide-react";
import heroBg from "@/assets/hero-bg1.png";
import ProductCard from "@/components/ProductCard";
import { type Product } from "@/data/products";
import { supabase } from "@/lib/supabase";

const advantages = [
  { title: "Качество", desc: "Только проверенные бренды и сертифицированные материалы", icon: ShieldCheck },
  { title: "Доставка", desc: "Быстрая доставка по всей России от 1 дня", icon: Truck },
  { title: "Поддержка", desc: "Персональный подбор инструмента от экспертов", icon: Heart },
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
        .order('id', { ascending: false }) // Сначала новые
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
    <div>
      {/* Hero */}
      <section className="h-screen relative flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-foreground/10" />
        </div>
        <div className="container relative z-10 flex flex-col items-start text-left ml-4 md:ml-12">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl heading-display mb-6"
          >
            <span className="text-[#373b3e]">СТИЛЬ</span>{" "}
            <span className="text-[#9b1c1c]">ГРУМЕРА</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-left md:text-2xl font-light text-primary-foreground/90 mb-10 max-w-3xl"
          >
            Всё для идеального ухода. Современные инструменты и одежда премиум-класса для профессионалов.
          </motion.p>
        </div>
      </section>

      {/* Advantages */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl heading-display text-center mb-16"
          >
            Наши преимущества
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-10 rounded-4xl bg-secondary border border-border hover:shadow-xl transition-all duration-500 text-center"
              >
                <div className="w-16 h-16 bg-mint text-brand rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl heading-display">Популярные товары</h2>
            <Link to="/catalog" className="text-brand font-bold text-sm uppercase tracking-wider hover:underline">
              Все товары →
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={40} />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.length > 0 ? (
                featured.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))
              ) : (
                <p className="text-muted-foreground col-span-full text-center">Товары скоро появятся...</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;