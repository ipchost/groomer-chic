import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Главная", to: "/" },
    { label: "Каталог", to: "/catalog" },
    { label: "О нас", to: "/about" },
    { label: "Контакты", to: "/contacts" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled || !isHome
          ? "glass shadow-md py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="heading-display text-2xl text-brand">
          <img src="/" alt="" className="h-20" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <div key={link.to} className="relative group">
              <Link
                to={link.to}
                className={`font-semibold uppercase text-xs tracking-[0.2em] transition-colors hover:text-[#9b1c1c] ${
  location.pathname === link.to 
    ? "text-[#9b1c1c]" 
    : "text-[#9b1c1c]"
}`}
              >
                <span className="flex items-center gap-1">
                  {link.label}
                  {link.to === "/catalog" && <ChevronDown size={14} />}
                </span>
              </Link>

              {/* Mega menu for catalog */}
              {link.to === "/catalog" && (
                <div className="mega-menu-panel -left-20 w-[600px]">
                  <div className="bg-card rounded-4xl shadow-2xl p-8 grid grid-cols-3 gap-8 border border-border">
                    {Object.entries(CATEGORIES).map(([sub, cats]) => (
                      <div key={sub}>
                        <h4 className="font-bold text-brand mb-4 text-xs uppercase tracking-[0.15em]">{sub}</h4>
                        <ul className="space-y-2">
                          {cats.map((cat) => (
                            <li key={cat}>
                              <Link
                                to={`/catalog?filter=${encodeURIComponent(cat)}`}
                                className="text-muted-foreground hover:text-brand transition-colors text-sm"
                              >
                                {cat}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2.5 rounded-full hover:bg-secondary transition-colors"
          >
            <ShoppingBag size={22} className={scrolled || !isHome ? "text-foreground" : "text-primary-foreground"} />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </button>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden p-2">
                <Menu size={26} className={scrolled || !isHome ? "text-foreground" : "text-primary-foreground"} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-8">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-bold hover:text-brand transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-10">
                <h4 className="font-bold text-brand text-xs uppercase tracking-[0.15em] mb-4">Категории</h4>
                {Object.entries(CATEGORIES).map(([sub, cats]) => (
                  <div key={sub} className="mb-4">
                    <p className="font-semibold text-sm mb-2">{sub}</p>
                    <div className="flex flex-wrap gap-2">
                      {cats.map((cat) => (
                        <Link
                          key={cat}
                          to={`/catalog?filter=${encodeURIComponent(cat)}`}
                          onClick={() => setMobileOpen(false)}
                          className="text-xs bg-secondary px-3 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {cat}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
