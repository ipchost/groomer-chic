import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Index = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(12);
        
        if (error) throw error;
        if (data) setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Шапка теперь компактная и прозрачная, как мы настроили в Navbar.tsx */}
      <Navbar />
      
      <main className="flex-grow">
        {/* HERO SECTION / SLIDER */}
        <section className="h-screen w-full relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            effect="fade"
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="h-full w-full"
          >
            <SwiperSlide>
              <div className="relative h-full w-full flex items-center">
                {/* Фоновое изображение */}
                <div className="absolute inset-0">
                  <img 
                    src="https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=2070" 
                    className="w-full h-full object-cover opacity-60"
                    alt="Main Banner"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-white">
                  <div className="max-w-3xl">
                    <h1 className="text-6xl md:text-8xl font-[900] uppercase tracking-tighter leading-[0.9] mb-6">
                      СТИЛЬ <br />
                      <span className="text-red-600">ГРУМЕРА</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/70 max-w-xl mb-10 font-medium">
                      Профессиональная одежда и инструменты премиум-класса. 
                      Создано для тех, кто ценит эстетику и комфорт в работе.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button className="bg-red-600 hover:bg-white hover:text-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 transform hover:scale-105">
                        В КАТАЛОГ
                      </button>
                      <button className="bg-transparent border border-white/20 hover:border-white text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300">
                        О БРЕНДЕ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Дополнительный слайд для динамики */}
            <SwiperSlide>
              <div className="relative h-full w-full flex items-center">
                <div className="absolute inset-0">
                  <img 
                    src="https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?q=80&w=2080" 
                    className="w-full h-full object-cover opacity-50"
                    alt="Secondary Banner"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white">
                    НОВАЯ КОЛЛЕКЦИЯ
                  </h2>
                  <button className="bg-white text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                    СМОТРЕТЬ
                  </button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </section>

        {/* PRODUCT GRID (OZON STYLE) */}
        <section className="bg-[#0a0a0a] py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12 border-l-4 border-red-600 pl-6">
              <div>
                <h2 className="text-3xl font-black text-white uppercase tracking-wider">Бестселлеры</h2>
                <p className="text-gray-500 text-sm uppercase tracking-widest mt-2">Выбор профессионалов</p>
              </div>
              <a href="/catalog" className="text-red-600 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors">
                Смотреть все →
              </a>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded-2xl"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;