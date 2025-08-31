"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";

interface Experience {
  id: string;
  startDate: string;
  endDate: string;
  highlightCount: number;
}

export default function Experience() {
  const t = useTranslations("experience");
  
  const experiences: Experience[] = [
    {
      id: "freelance",
      startDate: "Oct 2024",
      endDate: "Present",
      highlightCount: 3
    },
    {
      id: "uit",
      startDate: "Oct 2022",
      endDate: "Present",
      highlightCount: 7
    },
    {
      id: "discord",
      startDate: "Jan 2023",
      endDate: "Present",
      highlightCount: 3
    },
    {
      id: "linux",
      startDate: "Sep 2022",
      endDate: "Present",
      highlightCount: 4
    },
    {
      id: "early",
      startDate: "Sep 2018",
      endDate: "Sep 2018",
      highlightCount: 1
    }
  ];

  return (
    <section id="experience" className="py-20 bg-surface-variant/10 dark:bg-dark-surface-variant/10">
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
          <p className="text-on-surface/70 dark:text-dark-on-surface/70">
            {t("description")}
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 h-full w-px bg-primary/20 dark:bg-dark-primary/20 transform -translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary dark:bg-dark-primary rounded-full transform -translate-x-1/2" />

                <div className="md:w-1/2 p-6 bg-surface dark:bg-dark-surface rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-primary dark:text-dark-primary mb-2">
                    {t(`items.${exp.id}.company`)}
                  </h3>
                  <h4 className="text-lg font-medium mb-4">
                    {t(`items.${exp.id}.position`)}
                  </h4>
                  <div className="flex flex-wrap gap-4 text-sm text-on-surface/70 dark:text-dark-on-surface/70 mb-4">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>
                        {exp.startDate} - {exp.endDate === "Present" ? t("present") : exp.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{t(`items.${exp.id}.location`)}</span>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-on-surface/70 dark:text-dark-on-surface/70">
                    {Array.from({length: exp.highlightCount}, (_, i) => (
                      <li key={i+1}>{t(`items.${exp.id}.highlights_${i+1}`)}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 
