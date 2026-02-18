import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, BarChart3, Users, ShoppingBag, TrendingUp } from "lucide-react";
import { INITIAL_PRODUCTS, CATEGORIES, type Product } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const stats = [
  { label: "Продажи", value: "₽ 847 200", icon: TrendingUp, change: "+12%" },
  { label: "Заказы", value: "156", icon: ShoppingBag, change: "+8%" },
  { label: "Клиенты", value: "89", icon: Users, change: "+23%" },
  { label: "Конверсия", value: "3.2%", icon: BarChart3, change: "+0.4%" },
];

const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [view, setView] = useState<"dashboard" | "list" | "form">("dashboard");
  const [editItem, setEditItem] = useState<Product | null>(null);
  const { toast } = useToast();

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newItem: Product = {
      id: editItem?.id || Date.now(),
      title: fd.get("title") as string,
      price: Number(fd.get("price")),
      category: fd.get("category") as string,
      subgroup: fd.get("subgroup") as string,
      img: fd.get("img") as string,
      desc: fd.get("desc") as string,
    };

    if (editItem) {
      setProducts(products.map((p) => (p.id === editItem.id ? newItem : p)));
      toast({ title: "Товар обновлён", description: newItem.title });
    } else {
      setProducts([...products, newItem]);
      toast({ title: "Товар добавлен", description: newItem.title });
    }
    setEditItem(null);
    setView("list");
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    toast({ title: "Товар удалён", variant: "destructive" });
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-secondary">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl heading-display">Панель управления</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setView("dashboard")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                view === "dashboard" ? "bg-primary text-primary-foreground" : "bg-card border border-border"
              }`}
            >
              Статистика
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                view === "list" ? "bg-primary text-primary-foreground" : "bg-card border border-border"
              }`}
            >
              Товары
            </button>
            <button
              onClick={() => { setEditItem(null); setView("form"); }}
              className="btn-primary !py-2 !px-4 text-sm flex items-center gap-2"
            >
              <Plus size={16} /> Добавить
            </button>
          </div>
        </div>

        {view === "dashboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-3xl p-6 border border-border"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-mint text-brand rounded-xl flex items-center justify-center">
                      <s.icon size={20} />
                    </div>
                    <span className="text-xs font-bold text-brand bg-mint px-2 py-1 rounded-full">{s.change}</span>
                  </div>
                  <p className="text-2xl heading-display">{s.value}</p>
                  <p className="text-muted-foreground text-sm">{s.label}</p>
                </motion.div>
              ))}
            </div>
            <div className="bg-card rounded-3xl p-8 border border-border">
              <h3 className="font-bold mb-4">Последние товары</h3>
              <div className="space-y-3">
                {products.slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                    <img src={p.img} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <span className="font-medium flex-1">{p.title}</span>
                    <span className="text-muted-foreground text-sm">{p.category}</span>
                    <span className="font-bold">{p.price.toLocaleString("ru-RU")} ₽</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {view === "list" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-3xl overflow-hidden border border-border">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-secondary border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-muted-foreground font-bold">Товар</th>
                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-muted-foreground font-bold">Категория</th>
                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-muted-foreground font-bold">Цена</th>
                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-muted-foreground font-bold">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={p.img} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          <span className="font-bold">{p.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{p.category}</td>
                      <td className="px-6 py-4 font-mono font-bold">{p.price.toLocaleString("ru-RU")} ₽</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setEditItem(p); setView("form"); }}
                            className="p-2 rounded-lg hover:bg-secondary transition-colors text-brand"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-destructive"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {view === "form" && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSave}
            className="bg-card p-8 md:p-10 rounded-3xl border border-border space-y-6"
          >
            <h2 className="text-xl font-bold">{editItem ? "Редактировать товар" : "Новый товар"}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold">Название</label>
                <input
                  name="title"
                  defaultValue={editItem?.title}
                  required
                  className="w-full p-4 bg-secondary rounded-2xl border border-border outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Цена (₽)</label>
                <input
                  name="price"
                  type="number"
                  defaultValue={editItem?.price}
                  required
                  className="w-full p-4 bg-secondary rounded-2xl border border-border outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Подгруппа</label>
                <select
                  name="subgroup"
                  defaultValue={editItem?.subgroup}
                  className="w-full p-4 bg-secondary rounded-2xl border border-border outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                >
                  {Object.keys(CATEGORIES).map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Ссылка на фото</label>
                <input
                  name="img"
                  defaultValue={editItem?.img}
                  required
                  className="w-full p-4 bg-secondary rounded-2xl border border-border outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Категория</label>
              <input
                name="category"
                defaultValue={editItem?.category}
                required
                placeholder="Напр: Блузы, Ножницы"
                className="w-full p-4 bg-secondary rounded-2xl border border-border outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Описание</label>
              <textarea
                name="desc"
                defaultValue={editItem?.desc}
                rows={4}
                className="w-full p-4 bg-secondary rounded-2xl border border-border outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
              />
            </div>
            <div className="flex gap-4 pt-4">
              <button type="submit" className="btn-primary flex-1">Сохранить</button>
              <button type="button" onClick={() => setView("list")} className="flex-1 bg-secondary py-4 rounded-full font-bold border border-border hover:bg-muted transition-colors">
                Отмена
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
