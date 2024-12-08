"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { fadeInUp, scaleIn } from "@/app/utils/animations";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="min-h-screen flex items-center justify-center py-12 md:py-20 pt-24 md:pt-12">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        <motion.div variants={fadeInUp}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r text-primary dark:text-dark-primary">
            {t("title")}
          </h1>
          <p className="text-lg mb-8 text-on-surface/80 dark:text-dark-on-surface/80">
            {t("description")}
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-primary dark:bg-dark-primary text-on-primary dark:text-dark-on-primary px-8 py-3 rounded-full"
          >
            {t("contactButton")}
          </motion.a>
        </motion.div>
        <motion.div variants={scaleIn} className="flex justify-end">
          <Image
            src="/hero.png"
            alt="Developer"
            width={1080}
            height={1080}
            className="rounded-2xl shadow-lg object-cover w-full md:w-auto"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
