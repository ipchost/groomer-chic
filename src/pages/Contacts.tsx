import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contacts = [
  { icon: MapPin, label: "Адрес", value: "г. Москва, ул. Пушкина, 10" },
  { icon: Phone, label: "Телефон", value: "8 (800) 555-35-35" },
  { icon: Mail, label: "Email", value: "info@groomstyle.ru" },
  { icon: Clock, label: "Режим работы", value: "Пн–Сб: 9:00–20:00" },
];

const ContactsPage = () => (
  <div className="pt-28 pb-24 min-h-screen">
    <div className="container mx-auto px-4 max-w-4xl">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl md:text-5xl heading-display mb-12 text-center">
        Контакты
      </motion.h1>

      <div className="grid sm:grid-cols-2 gap-6 mb-16">
        {contacts.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-3xl p-8 border border-border flex items-start gap-4"
          >
            <div className="w-12 h-12 bg-mint text-brand rounded-xl flex items-center justify-center shrink-0">
              <c.icon size={22} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{c.label}</p>
              <p className="font-bold">{c.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-4xl p-10 border border-border"
      >
        <h2 className="text-xl heading-display mb-6">Напишите нам</h2>
        <form className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input placeholder="Ваше имя" className="w-full p-4 bg-secondary rounded-2xl border border-border outline-none focus:ring-2 focus:ring-primary/30" />
            <input placeholder="Email" type="email" className="w-full p-4 bg-secondary rounded-2xl border border-border outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <textarea placeholder="Сообщение" rows={4} className="w-full p-4 bg-secondary rounded-2xl border border-border outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
          <button type="button" className="btn-primary">Отправить</button>
        </form>
      </motion.div>
    </div>
  </div>
);

export default ContactsPage;
