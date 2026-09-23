/**
 * Work history, education and stack. Source of truth is the résumé.
 * Periods use a plain hyphen for ranges.
 */

export type Experience = {
  role: string;
  org: string;
  period: string;
  place?: string;
  body: string;
};

export const experience: Experience[] = [
  {
    role: "Fullstack Engineer",
    org: "Cigro",
    period: "Sep 2025 - Jul 2026",
    place: "Ho Chi Minh City",
    body: "Real-time consultation platform for 12 hotels, and financial report generation for Korea Credit Bureau.",
  },
  {
    role: "Independent developer",
    org: "Freelancing",
    period: "Oct 2023 - Aug 2026",
    body: "Google-chan (Discord TTS), Himmel, and client tooling: built, shipped, and operated on my own.",
  },
  {
    role: "Mobile Development Intern",
    org: "VNPT Group",
    period: "May 2025 - Jul 2025",
    body: "REST attendance-tracking API, plus Flutter and native Android work.",
  },
];

/**
 * The school is deliberately unnamed. 某大学 is how Japanese writes "a
 * certain university", so the mystery reads as a choice rather than as a
 * missing value; the English line underneath says it out loud. The GPA
 * stays off the page on purpose.
 */
export const education = {
  credential: "B.Sc. Software Engineering",
  period: "2022 - 2026",
  orgJp: "某大学",
  orgEn: "Ho Chi Minh City",
  note: "A certain university. Name withheld.",
};

export const credentials: { label: string; value: string }[] = [
  { label: "TOEIC 880", value: "ETS, Dec 2025" },
  { label: "Merit scholarship", value: "30% tuition" },
];

export const skills: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Kotlin", "Java", "C#"],
  },
  {
    label: "Backend",
    items: ["Nest.js", "Bun.js", "Node.js", "Elysia.js", "RESTful APIs"],
  },
  {
    label: "Frontend",
    items: ["React.js", "Next.js", "Astro", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    label: "Mobile",
    items: ["Android", "Jetpack Compose", "Flutter"],
  },
  {
    label: "Data",
    items: ["MongoDB", "Postgres", "Supabase", "MySQL", "Redis"],
  },
  {
    label: "Cloud and DevOps",
    items: [
      "Docker",
      "Nginx",
      "AWS EC2",
      "ECS Fargate",
      "S3",
      "Cloudflare Workers",
      "Linux",
      "Git",
    ],
  },
  {
    label: "Monitoring",
    items: ["Grafana", "Loki", "Prometheus"],
  },
];
