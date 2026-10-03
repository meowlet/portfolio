import type { Chapter as ChapterData } from "@/content/site";
import { TextLink } from "@/app/components/ui/TextLink";
import { Diagram } from "./Diagram";

/**
 * One chapter. Both chapters share this frame on purpose: in a book,
 * a chapter looks like a chapter. What changes inside is the system
 * being described.
 */
export function Chapter({
  chapter,
  anchor,
  band = "paper",
}: {
  chapter: ChapterData;
  anchor?: string;
  band?: "paper" | "wash";
}) {
  return (
    <section
      id={anchor}
      className={band === "wash" ? "bg-wash" : "bg-paper"}
      aria-labelledby={`${chapter.id}-title`}
    >
      <div className="wrap py-20 sm:py-28">
        <div className="lg:grid lg:grid-cols-[6rem_minmax(0,1fr)] lg:gap-10">
          <div className="mb-8 flex items-baseline gap-4 lg:sticky lg:top-28 lg:mb-0 lg:block lg:self-start">
            <p className="font-serif text-[1.75rem] leading-none">
              {chapter.number}
            </p>
            <p
              lang="ja"
              className="font-jp-mincho text-small tracking-[0.14em] text-ink-soft lg:vertical-jp lg:mt-5 lg:text-[0.85rem] lg:leading-[1.4]"
            >
              {chapter.jp}
            </p>
          </div>

          <div>
            <h2
              id={`${chapter.id}-title`}
              className="font-serif text-chapter"
            >
              {chapter.title}
            </h2>
            <p className="mt-2 font-serif text-dek italic text-ink-soft">
              {chapter.dek}
            </p>
            <p className="mt-6 text-small text-ink-soft">{chapter.kicker}</p>

            <p className="prose-aozora mt-8 text-prose">{chapter.prose}</p>

            <div className="mt-14 border-t border-(--hairline) pt-10">
              <Diagram spec={chapter.diagram} />
            </div>

            <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-(--hairline) pt-8 sm:grid-cols-3">
              {chapter.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-tiny text-ink-soft">{fact.label}</dt>
                  <dd className="mt-1 font-serif text-[1.5rem] leading-tight">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            {chapter.links.length > 0 ? (
              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3">
                {chapter.links.map((link) => (
                  <TextLink
                    key={link.href}
                    href={link.href}
                    external={link.external}
                    className="text-small"
                  >
                    {link.label}
                  </TextLink>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
