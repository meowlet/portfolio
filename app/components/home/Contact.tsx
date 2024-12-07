"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const name = formData.get("name");
    const message = formData.get("message");

    window.location.href = `mailto:0911kiet@gmail.com?subject=Contact from ${name}&body=${message}%0D%0A%0D%0AFrom: ${name}%0D%0AEmail: ${email}`;
  };

  return (
    <section
      id="contact"
      className="py-20 bg-secondary/5 dark:bg-dark-secondary/5"
    >
      <div className="container mx-auto px-4 max-w-lg md:max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-primary dark:text-dark-primary mb-4">
            {t("title")}
          </h2>
          <p className="text-on-surface/70 dark:text-dark-on-surface/70">
            {t("description")}
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">
              {t("name")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 rounded-lg bg-surface dark:bg-dark-surface border border-secondary/20 dark:border-dark-secondary/20 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              {t("email")} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 rounded-lg bg-surface dark:bg-dark-surface border border-secondary/20 dark:border-dark-secondary/20 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 font-medium">
              {t("message")} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="w-full px-4 py-2 rounded-lg bg-surface dark:bg-dark-surface border border-secondary/20 dark:border-dark-secondary/20 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            className="w-full bg-primary dark:bg-dark-primary text-on-primary dark:text-dark-on-primary py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            {t("sendButton")}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
