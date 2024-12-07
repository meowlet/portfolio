"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
export default function About() {
  const t = useTranslations("about");
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary dark:text-dark-primary">
              {t("title")}
            </h2>
            <p className="text-lg">{t("description")}</p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#contact"
                className="bg-primary dark:bg-dark-primary text-on-primary dark:text-dark-on-primary px-6 py-2 rounded-full"
              >
                {t("contactButton")}
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="/cv.pdf"
                className="border border-primary dark:border-dark-primary text-primary dark:text-dark-primary px-6 py-2 rounded-full"
              >
                {t("cvButton")}
              </motion.a>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop"
              alt="About me"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
