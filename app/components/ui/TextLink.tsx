import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";

/**
 * A link in the page voice. External links get the small "leaves this
 * site" arrow, and only external links get it.
 */
export function TextLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  if (!external) {
    return (
      <a href={href} className={`link-quiet ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-quiet inline-block ${className}`}
    >
      {children}
      <ArrowUpRightIcon
        aria-hidden="true"
        size={12}
        weight="bold"
        className="ml-1 inline-block align-[-0.1em] opacity-70"
      />
    </a>
  );
}
