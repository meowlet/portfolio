"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  CodeBracketIcon,
  CommandLineIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

export default function FeaturedProjects() {
  const t = useTranslations("projects");
  const featured = useTranslations("projects.featured");

  const featuredProjects = [
    {
      id: "tsukinari",
      icon: DevicePhoneMobileIcon,
      github: "https://github.com/yourusername/tsukinari",
      demo: "https://play.google.com/store/apps/details?id=your.app.id",
      tech: ["Kotlin", "Jetpack Compose", "Firebase", "Material Design"],
    },
    {
      id: "discord_tts",
      icon: CommandLineIcon,
      github: "https://github.com/yourusername/discord-tts",
      tech: ["Node.js", "Discord.js", "AWS"],
    },
    {
      id: "himmel",
      icon: CodeBracketIcon,
      github: "https://github.com/yourusername/himmel",
      demo: "https://your-demo-url.com",
      tech: ["Elysia.js", "Next.js", "MongoDB", "Redis"],
    },
  ];

  return (
    <section
      id="projects"
      className="py-20 bg-surface/50 dark:bg-dark-surface/50"
    >
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
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-surface dark:bg-dark-surface rounded-xl shadow-lg shadow-outline/20 dark:shadow-dark-outline/20 overflow-hidden group"
            >
              <div className="p-6">
                <project.icon className="w-12 h-12 text-primary dark:text-dark-primary mb-4" />
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">
                  {featured(`${project.id}.title`)}
                </h3>
                <p className="text-on-surface/70 dark:text-dark-on-surface/70 mb-4">
                  {featured(`${project.id}.description`)}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-primary/10 dark:bg-dark-primary/10 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary dark:text-dark-primary hover:underline"
                  >
                    {t("viewDetails")}
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary dark:text-dark-primary hover:underline"
                    >
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
