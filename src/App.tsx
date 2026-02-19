import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialButtons from "@/components/SocialButtons";
import CartDrawer from "@/components/CartDrawer";
import Index from "./pages/Index";
import CatalogPage from "./pages/Catalog";
import ProductDetailPage from "./pages/ProductDetail";
import AdminPage from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin"; // Не забудь создать этот файл!
import AboutPage from "./pages/About";
import ContactsPage from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  // Состояние авторизации: проверяем sessionStorage, чтобы не вылетало при перезагрузке
  const [isAdmin, setIsAdmin] = useState(
    sessionStorage.getItem("isAdmin") === "true"
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          
          {/* Страница входа в админку */}
          <Route path="/admin-login" element={<AdminLogin setAuth={setIsAdmin} />} />
          
          {/* Защищенный роут админки */}
          <Route 
            path="/admin" 
            element={isAdmin ? <AdminPage /> : <Navigate to="/admin-login" replace />} 
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <SocialButtons />
            <CartDrawer />
            <ScrollToTop />
            <main className="flex-grow">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;