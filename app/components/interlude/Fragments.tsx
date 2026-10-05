import { interlude } from "@/content/site";
import { TextLink } from "@/app/components/ui/TextLink";

/**
 * 断章: six smaller pieces, laid out like something scattered rather
 * than filed. The ragged top edge is the point.
 */
const offsets = [
  "lg:mt-0",
  "lg:mt-14",
  "lg:mt-5",
  "lg:mt-16",
  "lg:mt-3",
  "lg:mt-11",
];

export function Fragments() {
  return (
    <section
      id="interlude"
      aria-labelledby="interlude-title"
      className="bg-paper"
    >
      <div className="wrap py-20 sm:py-28">
        <div className="lg:flex lg:items-start lg:justify-between lg:gap-16">
          <header className="max-w-136">
            <p
              lang="ja"
              className="font-jp-mincho text-small tracking-[0.18em] text-ink-soft"
            >
              {interlude.jp}
            </p>
            <h2
              id="interlude-title"
              className="mt-3 font-serif text-chapter"
            >
              {interlude.title}
            </h2>
            <p className="mt-3 text-lead text-ink-soft">{interlude.dek}</p>
          </header>

          {/* 不連続存在, and its reflection under the waterline */}
          <div className="mt-12 max-w-[24rem] lg:mt-1 lg:shrink-0">
            <p
              aria-hidden="true"
              lang="ja"
              className="mr-[-0.32em] font-jp-mincho text-[1.5rem] leading-none tracking-[0.32em] text-ink"
            >
              {interlude.mirror}
            </p>
            <div className="mt-3 border-t border-(--hairline-strong)" />
            <p
              aria-hidden="true"
              lang="ja"
              className="reflection mr-[-0.32em] font-jp-mincho mt-1 text-[1.5rem] leading-none tracking-[0.32em] text-ink-soft"
            >
              {interlude.mirror}
            </p>
          </div>
        </div>

        <ul className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {interlude.fragments.map((fragment, index) => (
            <li
              key={fragment.name}
              className={`border-t border-(--hairline) pt-5 ${offsets[index] ?? ""}`}
            >
              <h3 className="font-serif text-[1.3rem] leading-tight">
                {fragment.name}
              </h3>
              {fragment.context ? (
                <p className="mt-1 text-tiny text-ink-soft">
                  {fragment.context}
                </p>
              ) : null}
              <p className="mt-3 max-w-136 text-small">
                {fragment.body}
              </p>
              {fragment.links?.length ? (
                <ul className="mt-4 space-y-1.5">
                  {fragment.links.map((link) => (
                    <li key={link.href}>
                      <TextLink
                        href={link.href}
                        external={link.external}
                        className="text-tiny"
                      >
                        {link.label}
                      </TextLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
