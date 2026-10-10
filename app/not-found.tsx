import Link from "next/link";
import type { Metadata } from "next";
import { Backdrop } from "@/app/components/sky/Backdrop";
import { notFound, siteMeta } from "@/content/site";

export const metadata: Metadata = {
  title: `Page not found - ${siteMeta.name}`,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative isolate flex flex-1 flex-col justify-center overflow-hidden"
    >
      <Backdrop />
      <div className="wrap relative z-10 py-24 sm:py-32">
        <p
          aria-hidden="true"
          lang="ja"
          className="font-jp-mincho text-small tracking-[0.18em] text-ink-soft"
        >
          迷子
        </p>
        <h1 className="mt-3 max-w-[24ch] font-serif text-chapter">
          {notFound.title}
        </h1>
        <p className="mt-4 max-w-[46ch] text-lead text-ink-soft">
          {notFound.body}
        </p>
        <Link href={notFound.cta.href} className="btn btn--primary mt-9">
          {notFound.cta.label}
        </Link>
      </div>
    </main>
  );
}
