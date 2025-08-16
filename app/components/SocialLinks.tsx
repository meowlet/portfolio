import { useState } from "react";
import { motion } from "framer-motion";
import {
  GithubIcon,
  DiscordIcon,
  YoutubeIcon,
  OsuIcon,
  FacebookIcon,
} from "@/app/components/icons/SocialIcons";
import { useTranslations } from "next-intl";

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

export default function SocialLinks({ className = "", iconClassName = "w-6 h-6" }: SocialLinksProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const t = useTranslations("social");

  const socialLinks = [
    {
      name: "Facebook",
      icon: FacebookIcon,
      href: "https://www.facebook.com/meowsica",
      color: "hover:text-[#1877F2]",
    },
    {
      name: "GitHub",
      icon: GithubIcon,
      href: "https://github.com/meowlet",
      color: "hover:text-[#333] dark:hover:text-white",
    },
    {
      name: "Discord",
      icon: DiscordIcon,
      username: "meowsicologist",
      color: "hover:text-[#5865F2]",
      onClick: async () => {
        await navigator.clipboard.writeText("meowsica");
        setCopiedText("Discord");
        setTimeout(() => setCopiedText(null), 2000);
      },
    },
    {
      name: "YouTube",
      icon: YoutubeIcon,
      href: "https://youtube.com/@meow0911",
      color: "hover:text-[#FF0000]",
    },
    {
      name: "osu!",
      icon: OsuIcon,
      href: "https://osu.ppy.sh/users/24451208",
      color: "hover:text-[#FF66AA]",
    },
  ];

  return (
    <div className={`inline-flex items-center gap-6 ${className}`}>
      {socialLinks.map((link) => (
        <motion.div
          key={link.name}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative flex items-center justify-center"
        >
          {link.href ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center transition-colors ${link.color}`}
              title={link.name}
            >
              <link.icon className={`${iconClassName} transition-transform`} />
            </a>
          ) : (
            <button
              onClick={link.onClick}
              className={`flex items-center justify-center transition-colors ${link.color}`}
              title={`Copy ${link.name} username`}
            >
              <link.icon className={`${iconClassName} transition-transform`} />
            </button>
          )}
          {copiedText === link.name && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-surface-variant dark:bg-dark-surface-variant px-2 py-1 rounded whitespace-nowrap"
            >
              {t("copied")}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
} 