import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "../globals.css";
import { notFound } from "next/navigation";
import { isValidLocale, routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    console.log("Locale not found, defaulting to", routing.defaultLocale);
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main className="relative">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
