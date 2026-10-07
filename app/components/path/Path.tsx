import { credentials, education, experience, skills } from "@/content/resume";
import { path, siteMeta } from "@/content/site";
import { TextLink } from "@/app/components/ui/TextLink";

/**
 * 歩み: the record, kept plain and scannable. Years on the left, work
 * on the right, one hairline per step.
 */
export function Path() {
  return (
    <section id="path" aria-labelledby="path-title" className="bg-wash">
      <div className="wrap py-20 sm:py-28">
        <header className="max-w-136">
          <p
            lang="ja"
            className="font-jp-mincho text-small tracking-[0.18em] text-ink-soft"
          >
            {path.jp}
          </p>
          <h2 id="path-title" className="mt-3 font-serif text-chapter">
            {path.title}
          </h2>
        </header>

        <ol className="mt-14">
          {experience.map((job) => (
            <li
              key={`${job.org}-${job.period}`}
              className="grid gap-2 border-t border-(--hairline) py-8 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8"
            >
              <p className="text-small text-ink-soft">{job.period}</p>
              <div>
                <h3 className="font-serif text-[1.35rem] leading-snug">
                  {job.role}
                </h3>
                <p className="mt-1 text-small">
                  {job.org}
                  {job.place ? `, ${job.place}` : null}
                </p>
                <p className="mt-3 max-w-[52ch] text-small text-ink-soft">
                  {job.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="grid gap-10 border-t border-(--hairline) py-8 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8">
          <p className="text-small text-ink-soft">{education.period}</p>
          <div>
            <h3 className="font-serif text-[1.35rem] leading-snug">
              {education.credential}
            </h3>
            <p className="mt-1 text-small">
              <span lang="ja" className="font-jp-mincho">
                {education.orgJp}
              </span>
              <span className="text-ink-soft">, {education.orgEn}</span>
            </p>
            <p className="mt-3 text-small text-ink-soft">{education.note}</p>
          </div>
        </div>

        <dl className="grid gap-8 border-t border-(--hairline) py-8 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8">
          <dt className="text-small text-ink-soft">Also</dt>
          <dd className="grid gap-4 sm:grid-cols-2">
            {credentials.map((item) => (
              <div key={item.label}>
                <p className="font-serif text-[1.1rem]">{item.label}</p>
                <p className="mt-0.5 text-small text-ink-soft">{item.value}</p>
              </div>
            ))}
          </dd>
        </dl>

        <div className="mt-16 border-t border-(--hairline) pt-8">
          <h3 className="font-serif text-[1.35rem]">Stack</h3>
          <dl className="mt-6 grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => (
              <div key={group.label}>
                <dt className="text-tiny text-ink-soft">{group.label}</dt>
                <dd className="mt-1 max-w-[34ch] text-small">
                  {group.items.join(", ")}
                </dd>
              </div>
            ))}
          </dl>

          <TextLink
            href={siteMeta.resume}
            external
            className="mt-10 inline-block text-small"
          >
            View résumé
          </TextLink>
        </div>
      </div>
    </section>
  );
}
