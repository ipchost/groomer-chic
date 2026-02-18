import { motion } from "framer-motion";
import { Award, Users, Clock, Star } from "lucide-react";

const about = [
  { icon: Award, title: "10+ лет", desc: "опыта на рынке товаров для грумеров" },
  { icon: Users, title: "5000+", desc: "довольных клиентов по всей России" },
  { icon: Clock, title: "24/7", desc: "поддержка и консультации" },
  { icon: Star, title: "500+", desc: "товаров в каталоге" },
];

const AboutPage = () => (
  <div className="pt-28 pb-24 min-h-screen">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-5xl heading-display mb-6">О нас</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          «Стиль Грумера» — это команда профессионалов, которые понимают потребности мастеров по уходу за животными.
          Мы тщательно отбираем каждый товар, чтобы вы могли сосредоточиться на своём мастерстве.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {about.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-3xl p-8 border border-border text-center"
          >
            <div className="w-14 h-14 bg-mint text-brand rounded-2xl flex items-center justify-center mx-auto mb-4">
              <item.icon size={28} />
            </div>
            <p className="text-3xl heading-display mb-2">{item.title}</p>
            <p className="text-muted-foreground text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-4xl p-10 md:p-16 border border-border"
      >
        <h2 className="text-2xl heading-display mb-6">Наша миссия</h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          Мы стремимся сделать работу каждого грумера комфортнее и эффективнее. Наша команда лично тестирует
          инструменты, одежду и косметику, чтобы предложить вам только лучшее. Мы верим, что качественные
          инструменты — это основа профессионального мастерства и залог здоровья питомцев.
        </p>
      </motion.div>
    </div>
  </div>
);

export default AboutPage;
