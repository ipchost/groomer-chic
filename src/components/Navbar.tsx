import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User, ShoppingBag, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Структура каталога как у Pirania
  const catalogData = [
    {
      title: "ОДЕЖДА",
      items: ["Блузы", "Брюки", "Платья", "Фартуки", "Костюмы", "Обувь"]
    },
    {
      title: "ИНСТРУМЕНТЫ",
      items: ["Ножницы", "Машинки", "Гребни", "Пуходерки"]
    },
    {
      title: "КОСМЕТИКА",
      items: ["Шампуни", "Кондиционеры", "Маски", "Парфюм"]
    }
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
      isScrolled ? "bg-black/90 backdrop-blur-md py-2 border-b border-white/10" : "bg-transparent py-4"
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex flex-col">
          <span className="text-lg font-[900] tracking-tighter text-white uppercase leading-none">
            GROOMER <span className="text-red-600">CHIC</span>
          </span>
        </Link>

        {/* NAVIGATION */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className="nav-link">ГЛАВНАЯ</Link>
          
          {/* ВЫПАДАЮЩИЙ КАТАЛОГ */}
          <div className="group relative py-2">
            <button className="nav-link flex items-center gap-1">
              КАТАЛОГ <ChevronDown size={12} className="group-hover:rotate-180 transition-transform" />
            </button>
            
            {/* Панель меню (скрыта по умолчанию) */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 pt-4">
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 shadow-2xl grid grid-cols-3 gap-8">
                {catalogData.map((section) => (
                  <div key={section.title}>
                    <h4 className="text-red-600 font-black text-[10px] tracking-widest mb-4 uppercase">
                      {section.title}
                    </h4>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item}>
                          <Link to={`/catalog?category=${item}`} className="text-gray-400 hover:text-white text-[12px] transition-colors">
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link to="/about" className="nav-link">О НАС</Link>
          <Link to="/contacts" className="nav-link">КОНТАКТЫ</Link>
        </div>

        {/* ICONS */}
        <div className="flex items-center gap-5 text-white">
          <Search size={18} className="cursor-pointer hover:text-red-600 transition-colors" />
          <Link to="/admin"><User size={18} className="hover:text-red-600" /></Link>
          <div className="relative cursor-pointer">
            <ShoppingBag size={18} />
            <span className="absolute -top-2 -right-2 bg-red-600 text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </div>
        </div>
      </div>

      <style>{`
        .nav-link {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.8);
          text-transform: uppercase;
          transition: all 0.3s;
        }
        .nav-link:hover { color: #dc2626; }
      `}</style>
    </nav>
  );
};

export default Navbar;