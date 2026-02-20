import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Слайдер с картинкой как на твоем скриншоте */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/hero-image.jpg" // Замени на свою актуальную картинку
            className="w-full h-full object-cover opacity-80"
            alt="Hero"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-white">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
            СТИЛЬ <span className="text-red-600 uppercase">ГРУМЕРА</span>
          </h1>
          <p className="text-lg text-white/60 max-w-lg mb-8">
            Современные инструменты и одежда премиум-класса для профессионалов.
          </p>
          <button className="bg-red-700 hover:bg-white hover:text-black text-white px-10 py-4 rounded-full font-bold uppercase transition-all">
            В каталог →
          </button>
        </div>
      </section>

      {/* Сетка товаров (Ozon Style) добавится здесь */}
      <Footer />
    </div>
  );
};

export default Index;