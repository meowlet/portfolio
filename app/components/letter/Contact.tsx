import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { letter, siteMeta } from "@/content/site";

/**
 * 手紙: the closing page. One sentence, two doors, the address.
 */
export function Contact() {
  return (
    <section id="letter" aria-labelledby="letter-title" className="bg-paper">
      <div className="wrap py-24 sm:py-32">
        <p
          lang="ja"
          className="font-jp-mincho text-small tracking-[0.18em] text-ink-soft"
        >
          {letter.jp}
        </p>
        <h2 id="letter-title" className="mt-3 font-serif text-chapter">
          {letter.title}
        </h2>
        <p className="mt-4 max-w-[52ch] text-lead text-ink-soft">
          {letter.body}
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a href={letter.primary.href} className="btn btn--primary">
            {letter.primary.label}
          </a>
          <a
            href={letter.secondary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--quiet"
          >
            {letter.secondary.label}
            <ArrowUpRightIcon
              aria-hidden="true"
              size={12}
              weight="bold"
              className="opacity-70"
            />
          </a>
        </div>

        <div className="mt-16 border-t border-(--hairline) pt-6">
          <p className="text-small text-ink-soft sm:text-right">
            {siteMeta.location}
          </p>
        </div>
      </div>
    </section>
  );
}
