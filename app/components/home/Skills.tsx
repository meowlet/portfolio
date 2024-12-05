"use client";

import { motion } from "framer-motion";
import {
  CommandLineIcon,
  CodeBracketIcon,
  WrenchScrewdriverIcon,
  CircleStackIcon,
  BeakerIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline";

const skills = [
  {
    category: "Backend",
    icon: CommandLineIcon,
    items: [
      { name: "Bun.js", level: 90 },
      { name: "Elysia.js", level: 90 },
      { name: "Node.js", level: 80 },
      { name: "Express.js", level: 65 },
    ],
  },
  {
    category: "Cloud",
    icon: CloudArrowUpIcon,
    items: [
      { name: "AWS", level: 80 },
      { name: "Cloudflare", level: 70 },
    ],
  },
  {
    category: "Database",
    icon: CircleStackIcon,
    items: [
      { name: "MSSQL", level: 90 },
      { name: "MongoDB", level: 80 },
      { name: "Firebase", level: 80 },
      { name: "Redis", level: 65 },
    ],
  },
  {
    category: "Frontend",
    icon: CodeBracketIcon,
    items: [
      { name: "Astro.js", level: 65 },
      { name: "Tailwind CSS", level: 60 },
      { name: "React", level: 50 },
      { name: "Next.js", level: 50 },
    ],
  },
  {
    category: "Tools",
    icon: WrenchScrewdriverIcon,
    items: [
      { name: "Git", level: 85 },
      { name: "Vim", level: 80 },
    ],
  },
  {
    category: "Design",
    icon: BeakerIcon,
    items: [
      { name: "Adobe Illustrator", level: 95 },
      { name: "Adobe Photoshop", level: 90 },
      { name: "Figma", level: 70 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-surface dark:bg-dark-surface">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-3xl font-bold text-center mb-12 text-primary dark:text-dark-primary "
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: index * 0.2 }}
              className="p-6 rounded-xl bg-primary-container dark:bg-dark-primary-container shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <skillGroup.icon className="w-6 h-6 text-on-primary-container dark:text-dark-on-primary-container" />
                <h3 className="text-xl font-bold text-on-primary-container dark:text-dark-on-primary-container">
                  {skillGroup.category}
                </h3>
              </div>
              <div className="space-y-4">
                {skillGroup.items.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-on-primary-container dark:text-dark-on-primary-container">
                        {skill.name}
                      </span>
                      <span className="text-sm text-on-primary-container dark:text-dark-on-primary-container">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-surface dark:bg-dark-surface rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: false }}
                        transition={{ duration: 1, ease: "easeOut" }}
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
