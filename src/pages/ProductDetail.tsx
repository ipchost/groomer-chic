import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { INITIAL_PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = INITIAL_PRODUCTS.find((p) => p.id === Number(id));
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="pt-40 min-h-screen text-center">
        <h1 className="text-3xl heading-display mb-4">Товар не найден</h1>
        <Link to="/catalog" className="text-brand font-bold">
          ← Вернуться в каталог
        </Link>
      </div>
    );
  }

  const related = INITIAL_PRODUCTS.filter(
    (p) => p.subgroup === product.subgroup && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="container mx-auto px-4">
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand font-bold mb-10 transition-colors"
        >
          <ArrowLeft size={18} /> Назад к каталогу
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-5xl overflow-hidden shadow-2xl aspect-square"
          >
            <img
              src={product.img}
              className="w-full h-full object-cover"
              alt={product.title}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <span className="text-brand heading-display uppercase tracking-[0.15em] text-sm mb-4">
              {product.subgroup} / {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl heading-display mb-6">
              {product.title}
            </h1>
            <p className="text-3xl font-bold mb-8">
              {product.price.toLocaleString("ru-RU")} ₽
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              {product.desc || "Описание товара временно отсутствует, но данный продукт является одним из лучших в нашей коллекции."}
            </p>

            {product.badge && (
              <div className="mb-8">
                <span className="tag-badge text-sm">{product.badge}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => addItem(product)}
                className="btn-cta flex items-center justify-center gap-3 flex-1"
              >
                <ShoppingBag size={20} />
                В КОРЗИНУ
              </button>
              <button className="btn-dark flex items-center justify-center gap-3 px-8">
                <Heart size={20} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="text-2xl md:text-3xl heading-display mb-10">Похожие товары</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
