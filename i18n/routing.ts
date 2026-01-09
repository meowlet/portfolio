import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export const routing = defineRouting({
  locales: locales,
  defaultLocale: "en" as Locale,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
