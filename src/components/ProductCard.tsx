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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-premium group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-[4/5] overflow-hidden relative">
          <img
            src={product.img}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          {product.badge && (
            <div className="absolute top-4 left-4">
              <span className="tag-badge">{product.badge}</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-6 md:p-8">
        <p className="text-xs text-muted-foreground font-bold uppercase mb-2 tracking-wider">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold mb-4 hover:text-brand transition-colors">{product.title}</h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-2xl heading-display">{product.price.toLocaleString("ru-RU")} ₽</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => addItem(product)}
            className="w-12 h-12 btn-dark rounded-full flex items-center justify-center !p-0"
          >
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
