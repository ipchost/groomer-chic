import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem } = useCart();

  // Принудительно приводим ID к строке для корректной работы Link,
  // так как в Supabase это часто bigint/int8
  const productId = String(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-premium group h-full flex flex-col"
    >
      <Link to={`/product/${productId}`} className="block relative overflow-hidden rounded-t-3xl">
        <div className="aspect-[4/5] overflow-hidden relative">
          <img
            src={product.img || "/placeholder.jpg"} // Защита от пустых картинок
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          {product.badge && (
            <div className="absolute top-4 left-4">
              <span className="tag-badge">{product.badge}</span>
            </div>
          )}
          {/* Оверлей при наведении (мобильная оптимизация) */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>
      </Link>

      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <p className="text-[10px] md:text-xs text-muted-foreground font-bold uppercase mb-2 tracking-widest">
          {product.category}
        </p>
        
        <Link to={`/product/${productId}`} className="flex-grow">
          <h3 className="text-base md:text-lg font-bold mb-4 hover:text-brand transition-colors leading-snug">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-xl md:text-2xl font-bold heading-display text-[#373b3e]">
            {Number(product.price).toLocaleString("ru-RU")} ₽
          </span>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault(); // Предотвращаем переход по ссылке при клике на кнопку
              addItem(product);
            }}
            className="w-10 h-10 md:w-12 md:h-12 bg-[#373b3e] text-white rounded-full flex items-center justify-center hover:bg-[#9b1c1c] transition-colors shadow-lg"
          >
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;