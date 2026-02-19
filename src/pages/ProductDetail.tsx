import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingBag, Heart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      try {
        // 1. Загружаем основной товар по ID из Supabase
        const { data, error } = await supabase
          .from('groomer-shop')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        if (data) {
          const formattedProduct = {
            ...data,
            img: data.image,
            desc: data.description
          };
          setProduct(formattedProduct);

          // 2. Загружаем похожие товары (той же категории)
          const { data: relatedData } = await supabase
            .from('groomer-shop')
            .select('*')
            .eq('category', data.category)
            .neq('id', id)
            .limit(3);

          if (relatedData) {
            setRelated(relatedData.map(p => ({ ...p, img: p.image, desc: p.description })));
          }
        }
      } catch (err) {
        console.error("Ошибка при загрузке товара:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="pt-40 min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-brand mb-4" size={40} />
        <p className="text-muted-foreground">Загружаем детали товара...</p>
      </div>
    );
  }

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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-5xl overflow-hidden shadow-2xl aspect-[4/5] bg-white"
          >
            <img
              src={product.img}
              className="w-full h-full object-cover"
              alt={product.title}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <span className="text-brand heading-display uppercase tracking-[0.15em] text-sm mb-4">
              {product.subgroup} / {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl heading-display mb-6">
              {product.title}
            </h1>
            <p className="text-3xl font-bold mb-8">
              {Number(product.price).toLocaleString("ru-RU")} ₽
            </p>
            <div className="prose prose-slate mb-10">
                <p className="text-muted-foreground text-lg leading-relaxed">
                {product.desc && product.desc !== "EMPTY" ? product.desc : "Описание товара скоро появится. Этот инструмент станет незаменимым помощником в вашей работе."}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => addItem(product)}
                className="btn-cta flex items-center justify-center gap-3 flex-1 bg-brand text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all"
              >
                <ShoppingBag size={20} />
                В КОРЗИНУ
              </button>
              <button className="flex items-center justify-center gap-3 px-8 py-4 border border-border rounded-2xl hover:bg-secondary transition-all">
                <Heart size={20} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
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