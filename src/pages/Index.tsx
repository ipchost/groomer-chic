import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Стили Swiper
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
        if (data) setProducts(data);
      } catch (err) {
        console.error("Ошибка загрузки товаров:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        {/* ГЛАВНЫЙ БАННЕР (СТИЛЬ PIRANIA BRAND) */}
        <section className="relative pt-32 pb-20 px-6">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              
              {/* Левая часть: Текст */}
              <div className="lg:w-1/3 space-y-6 text-center lg:text-left z-10">
                <div className="inline-block bg-red-600 text-[10px] font-bold px-3 py-1 uppercase tracking-[0.2em]">
                  Концепция нашего бренда
                </div>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                  СТИЛЬ <br />
                  <span className="text-red-600">ГРУМЕРА</span>
                </h1>
                <p className="text-gray-400 text-lg max-w-sm mx-auto lg:mx-0 font-medium leading-relaxed">
                  Помогать бьюти — специалисту оставаться на высоте. 
                  Профессиональная одежда для тех, кто создает красоту.
                </p>
                <button className="bg-white text-black hover:bg-red-600 hover:text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300">
                  В МАГАЗИН
                </button>
              </div>

              {/* Центральная часть: Фото в рамке (как на скриншоте) */}
              <div className="lg:w-1/2 relative">
                <div className="relative z-10 border-[1px] border-white/10 p-4 md:p-8 bg-black/50 backdrop-blur-sm">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img 
                      src="https://github.com/ipchost/365/blob/main/02.webp?raw=true" 
                      className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                      alt="Стиль Грумера"
                    />
                  </div>
                  {/* Декоративные элементы по углам */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-600 -translate-x-2 -translate-y-2"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-600 translate-x-2 translate-y-2"></div>
                </div>
                {/* Фоновое свечение */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-600/5 blur-[120px] rounded-full -z-10"></div>
              </div>

              {/* Правая часть: Доп. навигация (опционально для симметрии) */}
              <div className="hidden xl:flex flex-col gap-8 text-[10px] font-bold tracking-[0.3em] text-gray-500">
                <div className="rotate-90 origin-left whitespace-nowrap uppercase">Follow us — Instagram</div>
                <div className="rotate-90 origin-left whitespace-nowrap uppercase mt-20">Established — 2026</div>
              </div>
            </div>
          </div>
        </section>

        {/* СЕКЦИЯ БЕСТСЕЛЛЕРОВ (OZON STYLE) */}
        <section className="bg-[#050505] py-24 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter inline-block relative">
                НАШИ БЕСТСЕЛЛЕРЫ
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-red-600"></span>
              </h2>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded-2xl"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            
            <div className="mt-16 text-center">
              <button className="border border-white/20 hover:border-red-600 hover:text-red-600 px-12 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all">
                Смотреть весь каталог
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;