import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "./context/ThemeContext";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const googleSans = localFont({
  src: [
    {
      path: "./fonts/GoogleSans-Regular.ttf",
      weight: "400",
    },
    {
      path: "./fonts/GoogleSans-Medium.ttf",
      weight: "500",
    },
    {
      path: "./fonts/GoogleSans-Bold.ttf",
      weight: "700",
    },
    {
      path: "./fonts/GoogleSans-Italic.ttf",
      style: "italic",
    },
    {
      path: "./fonts/GoogleSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/GoogleSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-google-sans",
});

export const metadata: Metadata = {
  title: "Meowsica",
  description: "Anh Kiệt's Portfolio",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html suppressHydrationWarning>
      <body
        className={`${googleSans.variable} font-sans transition-colors duration-300`}
      >
        <div className="relative min-h-screen bg-surface dark:bg-dark-surface text-on-surface dark:text-dark-on-surface">
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider>{children}</ThemeProvider>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
