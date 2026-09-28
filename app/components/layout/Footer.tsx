import { footer, siteMeta } from "@/content/site";
import { Seal } from "@/app/components/ui/Seal";
import { TextLink } from "@/app/components/ui/TextLink";
import { EasterEgg } from "./EasterEgg";

export function Footer() {
  return (
    <footer className="border-t border-(--hairline) bg-wash py-14">
      <div className="wrap flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex max-w-md flex-col gap-4">
          <div className="flex items-center gap-3">
            <Seal size="1.6rem" />
            <span className="text-[1.3125rem] leading-none font-medium">
              {siteMeta.name}
            </span>
          </div>
          <p className="text-small text-ink-soft">
            {siteMeta.homageFooter.lead}{" "}
            <span lang="ja" className="font-jp-mincho">
              {siteMeta.homageTitle}
            </span>
            . {siteMeta.homageFooter.tail}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <TextLink href={siteMeta.source} external>
            {footer.sourceLabel}
          </TextLink>
          <TextLink href={siteMeta.resume} external>
            View résumé
          </TextLink>
          <EasterEgg />
          <p className="text-tiny text-ink-soft">{footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
