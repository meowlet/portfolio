"use client";

import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { ThemeContext } from "@/app/context/ThemeContext";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const t = useTranslations("nav");

  const navItems = ["about", "projects", "skills", "contact"];

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (!isMobile) setIsMenuOpen(false);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [isMobile]);

  return (
    <header
      className={`fixed w-full top-0 z-50 ${
        isMenuOpen && isMobile
          ? "bg-surface dark:bg-dark-surface"
          : "bg-surface/80 dark:bg-dark-surface/80 backdrop-blur-md"
      } border-b border-outline-variant dark:border-dark-outline-variant`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div
          className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary dark:from-dark-primary dark:to-dark-secondary bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Meowsica
        </motion.div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-secondary/10 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
            transition={{ duration: 0.2 }}
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute top-16 left-0 right-0 bg-surface dark:bg-dark-surface shadow-sm shadow-outline-variant dark:shadow-dark-outline-variant`}
          >
            <div className="p-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 px-4 hover:bg-secondary/10 dark:hover:bg-dark-secondary/10 rounded-lg transition-colors"
                >
                  {t(item)}
                </a>
              ))}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-2 py-2 px-4 hover:bg-secondary/10 dark:hover:bg-dark-secondary/10 rounded-lg transition-colors"
              >
                {theme === "light" ? (
                  <>
                    <MoonIcon className="w-5 h-5" />
                    <span>{t("theme.dark")}</span>
                  </>
                ) : (
                  <>
                    <SunIcon className="w-5 h-5" />
                    <span>{t("theme.light")}</span>
                  </>
                )}
              </button>
              <div className="py-2 px-4">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex gap-8"
          >
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                className="hover:text-primary dark:hover:text-dark-primary transition-colors relative group"
                whileHover={{ scale: 1.05 }}
              >
                {t(item)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-dark-primary transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </motion.div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
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
          </div>
        </div>
      </nav>
    </header>
  );
}
