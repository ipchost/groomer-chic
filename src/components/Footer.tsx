import { Link } from "react-router-dom";
import { CATEGORIES } from "@/data/products";

const Footer = () => (
  <footer className="bg-foreground text-muted-foreground pt-20 pb-10">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div>
        <h3 className="text-primary-foreground text-xl heading-display mb-6">СТИЛЬ ГРУМЕРА</h3>
        <p className="text-sm leading-relaxed opacity-80">
          Лучшие товары для профессиональных грумеров. Качество, которому доверяют мастера по всей России.
        </p>
      </div>
      <div>
        <h4 className="text-primary-foreground font-bold mb-6">Навигация</h4>
        <ul className="space-y-3 text-sm">
          {[
            { label: "Главная", to: "/" },
            { label: "Каталог", to: "/catalog" },
            { label: "О нас", to: "/about" },
            { label: "Контакты", to: "/contacts" },
          ].map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="hover:text-primary-foreground transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-primary-foreground font-bold mb-6">Каталог</h4>
        <ul className="space-y-3 text-sm">
          {Object.keys(CATEGORIES).map((k) => (
            <li key={k}>
              <Link to={`/catalog?filter=${encodeURIComponent(k)}`} className="hover:text-primary-foreground transition-colors">
                {k}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-primary-foreground font-bold mb-6">Контакты</h4>
        <p className="text-sm mb-2 opacity-80">г. Москва, ул. Пушкина, 10</p>
        <p className="text-sm mb-2 opacity-80">8 (800) 555-35-35</p>
        <p className="text-sm opacity-80">info@groomstyle.ru</p>
      </div>
    </div>
    <div className="text-center border-t border-muted-foreground/20 pt-10 text-xs tracking-[0.2em] uppercase opacity-60">
      © 2026 СТИЛЬ ГРУМЕРА. ВСЕ ПРАВА ЗАЩИЩЕНЫ.
    </div>
  </footer>
);

export default Footer;
