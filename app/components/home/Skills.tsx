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
import { useState } from "react";

export default function Skills() {
  const [showSecrets, setShowSecrets] = useState(false);
  const t = useTranslations("skills");
  const categories = useTranslations("skills.categories");

  const skills = [
    {
      category: "backend",
      icon: CommandLineIcon,
      items: [
        { name: "Bun.js", level: 75 },
        { name: "Elysia.js", level: 90 },
        { name: "Node.js", level: 65 },
        { name: "Express.js", level: 60 },
      ],
    },
    {
      category: "mobile",
      icon: DevicePhoneMobileIcon,
      items: [
        { name: "Kotlin", level: 80 },
        { name: "Jetpack Compose", level: 75 },
        { name: "Android SDK", level: 75 },
      ],
    },
    {
      category: "database",
      icon: CircleStackIcon,
      items: [
        { name: "MSSQL", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "Redis", level: 65 },
      ],
    },
    {
      category: "frontend",
      icon: CodeBracketIcon,
      items: [
        { name: "Astro", level: 60 },
        { name: "React", level: 55 },
        { name: "Next.js", level: 50 },
      ],
    },
    {
      category: "cloud",
      icon: CloudArrowUpIcon,
      items: [
        { name: "AWS", level: 60 },
        { name: "Cloudflare", level: 40 },
      ],
    },
    {
      category: "tools",
      icon: WrenchScrewdriverIcon,
      items: [
        { name: "Git", level: 75 },
        { name: "Linux", level: 70 },
        { name: "Vim", level: 95 },
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
          <div className="inline-block mb-4 font-mono text-sm">
            <div className="bg-primary-container/40 dark:bg-dark-primary-container/40 rounded-lg px-4 py-2 mb-2">
              <span className="text-on-primary-container/70 dark:text-dark-on-primary-container/70">
                {`$ analyzing_skills.sh --verbose`}
              </span>
            </div>
            {showSecrets && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-error-container dark:bg-dark-error-container/40 rounded-lg px-4 py-2 text-on-error-container dark:text-dark-on-error-container/70"
              >
                <span className="">{`$ cat ~/.secret_stats`}</span>
                <div className="mt-2 space-y-1 text-left">
                  <p>Gaming hours: 1000+</p>
                  <p>Visual novels read: 999</p>
                  <p>Keyboard destroyed: 2</p>
                  <p>Bugs created: ∞</p>
                </div>
              </motion.div>
            )}
            <button
              onClick={() => setShowSecrets(!showSecrets)}
              className="mt-2 text-primary/70 dark:text-dark-primary/70 hover:text-primary dark:hover:text-dark-primary"
            >
              {showSecrets ? "$ hide_secrets.sh" : "$ show_secrets.sh"}
            </button>
          </div>
          <h2 className="text-3xl font-bold text-primary dark:text-dark-primary mb-2">
            {t("title")}
          </h2>
          <div className="text-sm font-mono text-on-primary-container/70 dark:text-dark-on-primary-container/70">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
              <span>{`${skills.reduce(
                (acc, curr) => acc + curr.items.length,
                0
              )} skills loaded`}</span>
              <span>{`${skills.length} categories`}</span>
              <span>{`${skills
                .reduce(
                  (acc, curr) =>
                    acc +
                    curr.items.reduce((sum, item) => sum + item.level, 0) /
                      curr.items.length,
                  0
                )
                .toFixed(1)}% average proficiency`}</span>
            </div>
          </div>
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
