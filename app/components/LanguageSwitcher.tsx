"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

const languages = [
  { code: "en", label: "English" },
  { code: "vi", label: "Tiếng Việt" },
];

export default function LanguageSwitcher({ isMobile }: { isMobile?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === locale);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLanguage = (langCode: string) => {
    const pathname = window.location.pathname;
    const currentLocale = locale;
    let newPath = pathname;

    if (pathname.startsWith(`/${currentLocale}`)) {
      newPath = pathname.substring(currentLocale.length + 1);
    } else if (pathname.startsWith("/")) {
      newPath = pathname;
    }

    router.push(`/${langCode}${newPath}`);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${isMobile ? "w-full" : ""}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors ${
          isMobile ? "w-full justify-between" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <GlobeAltIcon className="w-5 h-5" />
          <span>{currentLanguage?.label}</span>
        </div>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`${
            isMobile ? "w-full" : "absolute right-0 w-40"
          } mt-2 rounded-lg bg-surface dark:bg-dark-surface border border-secondary/20 dark:border-dark-secondary/20 py-1 z-50`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className={`w-full text-left px-4 py-2 hover:bg-primary/10 dark:hover:bg-dark-primary/10 transition-colors ${
                locale === lang.code
                  ? "text-primary dark:text-dark-primary"
                  : ""
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
