import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "../context/ThemeContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import localFont from "next/font/local";
import "../globals.css";
import { notFound } from "next/navigation";
import { isValidLocale, routing } from "@/i18n/routing";

const googleSans = localFont({
  src: [
    {
      path: "../fonts/GoogleSans-Regular.ttf",
      weight: "400",
    },
    {
      path: "../fonts/GoogleSans-Medium.ttf",
      weight: "500",
    },
    {
      path: "../fonts/GoogleSans-Bold.ttf",
      weight: "700",
    },
    {
      path: "../fonts/GoogleSans-Italic.ttf",
      style: "italic",
    },
    {
      path: "../fonts/GoogleSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/GoogleSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-google-sans",
});

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
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" />
        <title>Meowsica</title>
      </head>
      <body
        className={`${googleSans.variable} font-sans transition-colors duration-300`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <div className="relative min-h-screen bg-surface dark:bg-dark-surface text-on-surface dark:text-dark-on-surface">
              <Header />
              <main className="relative">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
