import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";

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
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        {/* HERO SECTION (PIRANIA BRAND CLONE) */}
        <section className="relative pt-[180px] pb-24 px-6">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              
              {/* Левый блок: Текст */}
              <div className="lg:w-1/2 space-y-10 order-2 lg:order-1 text-center lg:text-left">
                <div className="relative inline-block">
                  <span className="text-[11px] uppercase tracking-[0.4em] text-gray-500 font-medium">
                    Концепция нашего бренда
                  </span>
                  <div className="absolute -bottom-3 left-0 w-full h-[1px] bg-white/10"></div>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight">
                  Помогать бьюти — <br />
                  <span className="text-primary italic font-serif">специалисту</span> оставаться <br />
                  на высоте
                </h1>

                <div className="pt-4">
                  <button className="bg-black border border-white/40 hover:border-primary hover:text-primary px-12 py-4 text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-500">
                    В магазин
                  </button>
                </div>
              </div>

              {/* Правый блок: Фото в рамке */}
              <div className="lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative p-3 border border-white/5 bg-[#0f0f0f]/50 backdrop-blur-sm">
                  <div className="max-w-[500px] overflow-hidden">
                    <img 
                      src="https://github.com/ipchost/365/blob/main/02.webp?raw=true" 
                      className="w-full h-auto grayscale-[30%] hover:grayscale-0 transition-all duration-1000 ease-in-out"
                      alt="Стиль Грумера"
                    />
                  </div>
                  
                  {/* Фирменные тонкие уголки Pirania */}
                  <div className="absolute -top-[1px] -left-[1px] w-12 h-12 border-t border-l border-primary"></div>
                  <div className="absolute -bottom-[1px] -right-[1px] w-12 h-12 border-b border-r border-primary"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* СЕКЦИЯ БЕСТСЕЛЛЕРОВ (OZON STYLE GRID) */}
        <section className="bg-black py-24 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center mb-20">
              <h2 className="text-3xl md:text-4xl font-light uppercase tracking-[0.4em] text-center">
                Наши <span className="font-bold">бестселлеры</span>
              </h2>
              <div className="w-16 h-[1px] bg-primary mt-6"></div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            <div className="mt-20 text-center">
              <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-primary border-b border-transparent hover:border-primary pb-1 transition-all">
                Смотреть все товары →
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