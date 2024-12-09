"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "../i18n/routing";
import Image from "next/image";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useContext } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { ThemeContext } from "./context/ThemeContext";
import Head from "next/head";

export default function NotFound() {
  const t = useTranslations("notFound");
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <Head>
        <title>404</title>
      </Head>
      <div className="absolute top-4 right-4 flex gap-2">
        <motion.button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-secondary/10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === "light" ? (
            <MoonIcon className="w-6 h-6" />
          ) : (
            <SunIcon className="w-6 h-6" />
          )}
        </motion.button>
        <LanguageSwitcher />
      </div>

      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-7xl font-bold text-primary dark:text-dark-primary mb-4">
            404
          </h1>
          <p className="text-lg text-on-surface/70 dark:text-dark-on-surface/70 mb-4">
            {t("description")}
          </p>
          <p className="text-base text-on-surface/50 dark:text-dark-on-surface/50 animate-bounce">
            {t("clickHint")}
          </p>
        </motion.div>

        <div className="relative">
          <Link href="/">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative w-72 h-72 md:w-96 md:h-96 mx-auto cursor-pointer"
            >
              <Image
                src="/kurisu.svg"
                alt="Kurisu 404"
                fill
                className="object-contain transition-all duration-300 [filter:var(--primary-filter)] dark:[filter:var(--dark-primary-filter)] hover:[filter:var(--tertiary-filter)] dark:hover:[filter:var(--dark-tertiary-filter)] motion-safe:hover:scale-105"
                priority
              />
            </motion.div>
          </Link>

          <AnimatePresence>
            {theme === "dark" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="md:absolute md:-top-16 md:left-1/2 md:transform md:-translate-x-1/2 w-[300px] md:w-[400px] mt-8 md:mt-0"
              >
                <div className="md:bg-dark-surface/95 md:border-2 md:border-dark-primary/50 md:rounded-xl md:p-4 md:shadow-lg md:shadow-dark-primary/20">
                  <p className="text-dark-on-surface/90 mb-4">
                    <span className="text-dark-primary font-bold">
                      Kurisu:{" "}
                    </span>
                    {t("darkModeHint")}
                  </p>

                  <div className="flex justify-end gap-3 text-sm">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleTheme}
                      className="px-4 py-2 bg-dark-primary/20 hover:bg-dark-primary/30 text-dark-primary rounded-lg transition-colors"
                    >
                      {t("switchToLight")}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {}}
                      className="px-4 py-2 bg-dark-surface hover:bg-dark-surface-variant text-dark-on-surface/50 rounded-lg transition-colors"
                    >
                      {t("stayInDark")}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
