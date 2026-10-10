import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/app/components/layout/Footer";
import { ROUTE_SCRIPT } from "@/app/components/layout/sky-route";
import { TopBar } from "@/app/components/layout/TopBar";
import { siteMeta, siteUrl } from "@/content/site";
import "./globals.css";

/**
 * Both faces are self-hosted, latin subset only, because Google splits
 * both families into unicode-range slices that next/font would pull in
 * wholesale (Zen Kaku Gothic New alone is ~360 files). Japanese glyphs
 * are set in the system mincho stack, so the latin slices are the whole
 * need. Licences live next to the files.
 */
const newsreader = localFont({
  src: [
    {
      path: "./fonts/newsreader-latin-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/newsreader-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-newsreader",
});

const zenKaku = localFont({
  src: [
    {
      path: "./fonts/zen-kaku-gothic-new-latin-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/zen-kaku-gothic-new-latin-500.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-zen-kaku",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: siteMeta.title,
  description: siteMeta.description,
  applicationName: siteMeta.name,
  authors: [{ name: siteMeta.fullName }],
  creator: siteMeta.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl(),
    siteName: siteMeta.name,
    title: siteMeta.title,
    description: siteMeta.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7fbfe" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1722" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="day"
      className={`${newsreader.variable} ${zenKaku.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* the sky is chosen before the first paint */}
        <script dangerouslySetInnerHTML={{ __html: ROUTE_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:border focus:border-(--hairline-strong) focus:bg-paper focus:px-4 focus:py-2 focus:text-small"
        >
          Skip to content
        </a>
        <TopBar />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
