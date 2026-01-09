"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BookOpenIcon } from "@heroicons/react/24/outline";

export default function CoverDesign() {
  const t = useTranslations("coverDesign");

  return (
    <section className="py-20 bg-surface-variant/10 dark:bg-dark-surface-variant/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <BookOpenIcon className="w-12 h-12 text-primary dark:text-dark-primary" />
          </div>
          <h2 className="text-3xl font-bold text-primary dark:text-dark-primary mb-4">
            {t("title")}
          </h2>
          <p className="text-on-surface/70 dark:text-dark-on-surface/70 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {["cover", "gift", "typography"].map((service) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              className="bg-surface dark:bg-dark-surface p-6 rounded-xl shadow-md hover:shadow-lg shadow-primary/20 dark:shadow-dark-primary/20 transition-shadow"
            >
              <h3 className="text-xl text-center font-bold mb-4 text-primary dark:text-dark-primary">
                {t(`services.${service}`)}
              </h3>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary dark:bg-dark-primary text-on-primary dark:text-dark-on-primary rounded-full hover:opacity-90 transition-opacity"
          >
            {t("viewGallery")} →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
