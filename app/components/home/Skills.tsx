"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  CommandLineIcon,
  CodeBracketIcon,
  CircleStackIcon,
  CloudArrowUpIcon,
  WrenchScrewdriverIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

export default function Skills() {
  const t = useTranslations("skills");
  const categories = useTranslations("skills.categories");

  const skills = [
    {
      category: "backend",
      icon: CommandLineIcon,
      items: [
        { name: "Bun.js", level: 90 },
        { name: "Elysia.js", level: 90 },
        { name: "Node.js", level: 70 },
        { name: "Express.js", level: 70 },
      ],
    },
    {
      category: "mobile",
      icon: DevicePhoneMobileIcon,
      items: [
        { name: "Kotlin", level: 90 },
        { name: "Jetpack Compose", level: 95 },
        { name: "Android SDK", level: 85 },
      ],
    },
    {
      category: "database",
      icon: CircleStackIcon,
      items: [
        { name: "MSSQL", level: 90 },
        { name: "MongoDB", level: 85 },
        { name: "Redis", level: 80 },
      ],
    },
    {
      category: "frontend",
      icon: CodeBracketIcon,
      items: [
        { name: "Astro", level: 60 },
        { name: "React", level: 50 },
        { name: "Next.js", level: 50 },
      ],
    },
    {
      category: "cloud",
      icon: CloudArrowUpIcon,
      items: [
        { name: "AWS", level: 80 },
        { name: "Cloudflare", level: 30 },
      ],
    },
    {
      category: "tools",
      icon: WrenchScrewdriverIcon,
      items: [
        { name: "Git", level: 80 },
        { name: "Vim", level: 95 },
        { name: "Linux", level: 85 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-primary dark:text-dark-primary mb-4">
            {t("title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              className="bg-surface dark:bg-dark-surface rounded-xl p-6 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/30 dark:shadow-primary/30 dark:hover:shadow-dark-primary/30"
            >
              <skill.icon className="w-8 h-8 text-primary dark:text-dark-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">
                {categories(skill.category)}
              </h3>
              <div className="space-y-4">
                {skill.items.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between mb-1">
                      <span>{item.name}</span>
                      <span>{item.level}%</span>
                    </div>
                    <div className="h-2 bg-surface-variant dark:bg-dark-surface-variant rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 1 }}
                        className="h-full bg-primary dark:bg-dark-primary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
