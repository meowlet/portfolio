/**
 * Every visible string on the site. Edit here, never in a component.
 *
 * House rules for this file:
 * - English is the voice; Japanese is used as a marker, not decoration.
 * - No em-dashes or en-dashes. Periods, commas, colons, or a line break.
 * - Numbers stay exactly as the résumé states them. No rounding up.
 */

export type Fact = {
  label: string;
  value: string;
};

export type LinkRef = {
  label: string;
  href: string;
  external?: boolean;
};

export type StarMagnitude = 1 | 2 | 3;

export type DiagramStar = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  /** 3 is the brightest star: size and weight on the chart */
  magnitude: StarMagnitude;
  kind: "path" | "support" | "external";
  labelPlace?: "above" | "below";
  /** only twinkles on the night route */
  twinkle?: boolean;
};

export type DiagramEdge = {
  from: string;
  to: string;
  /** path: solid blue; support: dashed amber; external: dotted violet */
  kind: "path" | "support" | "external";
  arrow?: "end" | "both" | "none";
  /** what travels this link, set in a small caption along the line */
  label?: string;
  /** where that caption sits in the viewBox, baseline point */
  labelAt?: { x: number; y: number };
};

export type DiagramSpec = {
  ariaLabel: string;
  /** fixed viewBox; stars are placed as points in it */
  width: number;
  height: number;
  /** array order is the reading order, and drives the stagger */
  stars: DiagramStar[];
  edges: DiagramEdge[];
};

export type Chapter = {
  id: string;
  number: string;
  jp: string;
  title: string;
  dek: string;
  kicker: string;
  prose: string;
  facts: Fact[];
  links: LinkRef[];
  diagram: DiagramSpec;
};

export const siteMeta = {
  name: "meowsica",
  fullName: "Ngo Van Anh Kiet",
  title: "meowsica - real-time systems and cloud architecture",
  description:
    "Full-stack engineer building real-time platforms and cloud systems. A small, sky-colored portfolio.",
  url: "https://meowsica.me",
  location: "Tan Son Nhat Ward, Ho Chi Minh City",
  email: "0911kiet@gmail.com",
  github: "https://github.com/meowlet",
  githubLabel: "github.com/meowlet",
  resume: "/cv.pdf",
  source: "https://github.com/meowlet/meowsica-portfolio",
  homageTitle: "素晴らしき日々～不連続存在～",
  homageFooter: {
    lead: "A fan's homage to",
    tail: "No official assets are used.",
  },
} as const;

/**
 * The absolute URL this deployment answers on. On Vercel that is the
 * project's production domain (your own domain once it is attached,
 * otherwise the .vercel.app one); everywhere else it is the site url
 * above. Metadata, robots and the sitemap all read from here, so a
 * deploy never advertises a domain that is not live yet.
 */
export function siteUrl() {
  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  return vercel ? `https://${vercel}` : siteMeta.url;
}

/**
 * Anchors are absolute on purpose: the bar also renders on the 404 page,
 * where a bare "#work" would only add a hash to the dead URL.
 */
export const nav: { href: string; label: string; jp: string }[] = [
  { href: "/#work", label: "Work", jp: "作品" },
  { href: "/#interlude", label: "Interlude", jp: "断章" },
  { href: "/#path", label: "Experience", jp: "経歴" },
  { href: "/#letter", label: "Contact", jp: "連絡先" },
];

export const hero = {
  homageNote: {
    lead: "A personal homage to",
    title: siteMeta.homageTitle,
  },
  headline: "I build real-time systems that keep the conversation going.",
  sub: "Full-stack engineer focused on cloud architecture, high-throughput backends, and real-time products.",
  primaryCta: { label: "Explore the work", href: "#work" },
  secondaryCta: { label: "View résumé", href: siteMeta.resume },
  epigraphJp: "この空の下、世界は今日も静かに動いている。",
  epigraphEn: "Beneath this sky, the world keeps quietly running.",
} as const;

export type Fragment = {
  name: string;
  context?: string;
  body: string;
  links?: LinkRef[];
};

export const interlude: {
  jp: string;
  title: string;
  dek: string;
  mirror: string;
  fragments: Fragment[];
} = {
  jp: "断章",
  title: "Fragments",
  dek: "Smaller pieces, same sky.",
  mirror: "不連続存在",
  fragments: [
    {
      name: "KCB",
      context: "Cigro client",
      body: "Financial report generation. Reusable report templates and a Playwright-based PDF pipeline: server-side rendering, charts, 50+ report types, and 100+ exports per cycle.",
    },
    {
      name: "Batch image pipeline",
      context: "wedding photography client",
      body: "500 to 1,000 RAW files per session, around 30MB each. EXIF-aware orientation detection with Sharp.js streaming cut hours of manual overlay work down to minutes.",
    },
    {
      name: "Himmel",
      body: "Manga reading platform. Elysia.js, Next.js, MongoDB and AWS, with premium subscriptions through MoMo and VNPay.",
      links: [
        { label: "github.com/meowlet/elysia-himmel", href: "https://github.com/meowlet/elysia-himmel", external: true },
        { label: "himmel.meowsica.me", href: "https://himmel.meowsica.me", external: true },
      ],
    },
    {
      name: "Tsukinari",
      body: "Android manga reader published on Google Play. Kotlin, Jetpack Compose, Firebase.",
      links: [
        { label: "github.com/meowlet/tsukinari", href: "https://github.com/meowlet/tsukinari", external: true },
      ],
    },
    {
      name: "The Booker",
      body: "E-commerce book platform with a full catalog and order flow. Astro, Tailwind, Supabase.",
      links: [
        { label: "github.com/meowlet/the-booker", href: "https://github.com/meowlet/the-booker", external: true },
      ],
    },
    {
      name: "Mercury",
      body: "Real-time chat over WebSockets, built with Flutter.",
      links: [
        { label: "github.com/meowlet/mercury-flutter", href: "https://github.com/meowlet/mercury-flutter", external: true },
      ],
    },
  ] as Fragment[],
};

export const path = {
  jp: "歩み",
  title: "Where I have worked",
  cta: { label: "Full details in the résumé", href: siteMeta.resume },
} as const;

export const letter = {
  jp: "手紙",
  title: "Let's talk",
  body: "Open to full-stack, backend, and cloud-infrastructure roles. The fastest way to reach me is email.",
  primary: { label: siteMeta.email, href: `mailto:${siteMeta.email}` },
  secondary: { label: siteMeta.githubLabel, href: siteMeta.github, external: true },
} as const;

export const footer = {
  rights: "© 2026 Ngo Van Anh Kiet",
  sourceLabel: "View source",
  easterEggLabel: "不連続",
  easterEggNote: "A note that is not part of the story",
  easterEggStats: [
    { label: "Gaming hours", value: "1000+" },
    { label: "Visual novels read", value: "999" },
    { label: "Keyboards destroyed", value: "2" },
    { label: "Bugs created", value: "∞" },
  ],
} as const;

export const notFound = {
  title: "This page drifted off like a cloud.",
  body: "Whatever was here is not in the sky anymore.",
  cta: { label: "Back to the sky", href: "/" },
} as const;

/* ------------------------------------------------------------------
   Chapters
   ------------------------------------------------------------------ */

export const chapters: Chapter[] = [
  {
    id: "google-chan",
    number: "01",
    jp: "声の届く場所",
    title: "Google-chan",
    dek: "a voice across five thousand servers",
    kicker: "A Discord text-to-speech bot, built and operated solo",
    prose:
      "I built a Discord text-to-speech bot that grew into a small platform: officially verified, running in 5,000+ servers, reaching 600,000+ members across them. Three gateway shards keep the connection stable, Redis remembers every session, and FFmpeg streams audio in real time. It runs on auto-scaled AWS ECS Fargate and has held 99.8% uptime through peaks of 1,300 concurrent requests.",
    facts: [
      { label: "Servers", value: "5,000+" },
      { label: "Members across them", value: "600,000+" },
      { label: "Concurrent requests", value: "1,300" },
      { label: "Uptime", value: "99.8%" },
      { label: "Operated", value: "5 years" },
    ],
    links: [
      {
        label: "Source on GitHub",
        href: "https://github.com/meowlet/meowsica-discord-bot",
        external: true,
      },
      // TODO: fill in the Discord application id, then restore the invite link.
      // { label: "Add to Discord", href: "https://discord.com/oauth2/authorize?client_id=...", external: true },
    ],
    diagram: {
      ariaLabel:
        "The request flow, drawn as a constellation. Three Discord gateway shards send text requests into a request queue, which hands queued jobs to bot workers running FFmpeg. The workers stream audio into voice channels and get their speech from Google TTS, while Redis holds every session and the workers run on auto-scaled AWS ECS Fargate.",
      width: 1100,
      height: 400,
      stars: [
        {
          id: "gateway",
          label: "Discord gateway",
          sub: "3 shards",
          x: 120,
          y: 195,
          magnitude: 3,
          kind: "path",
          labelPlace: "below",
        },
        {
          id: "queue",
          label: "Request queue",
          sub: "buffers requests",
          x: 395,
          y: 130,
          magnitude: 2,
          kind: "path",
        },
        {
          id: "workers",
          label: "Bot workers",
          sub: "FFmpeg",
          x: 690,
          y: 150,
          magnitude: 3,
          kind: "path",
        },
        {
          id: "voice",
          label: "Voice channels",
          sub: "5,000+ servers",
          x: 960,
          y: 105,
          magnitude: 2,
          kind: "path",
          twinkle: true,
          labelPlace: "below",
        },
        {
          id: "redis",
          label: "Redis",
          sub: "sessions",
          x: 280,
          y: 320,
          magnitude: 2,
          kind: "support",
          labelPlace: "below",
        },
        {
          id: "fargate",
          label: "ECS Fargate",
          sub: "autoscaling",
          x: 665,
          y: 320,
          magnitude: 2,
          kind: "support",
          labelPlace: "below",
        },
        {
          id: "gtts",
          label: "Google TTS",
          sub: "text to speech",
          x: 945,
          y: 320,
          magnitude: 2,
          kind: "support",
          labelPlace: "below",
        },
      ],
      edges: [
        {
          from: "gateway",
          to: "queue",
          kind: "path",
          arrow: "end",
          label: "text requests",
          labelAt: { x: 257, y: 148 },
        },
        {
          from: "queue",
          to: "workers",
          kind: "path",
          arrow: "end",
          label: "queued jobs",
          labelAt: { x: 542, y: 126 },
        },
        {
          from: "workers",
          to: "voice",
          kind: "path",
          arrow: "end",
          label: "audio stream",
          labelAt: { x: 825, y: 112 },
        },
        {
          from: "redis",
          to: "queue",
          kind: "support",
          arrow: "end",
          label: "session state",
          labelAt: { x: 287, y: 222 },
        },
        {
          from: "workers",
          to: "fargate",
          kind: "support",
          arrow: "end",
          label: "autoscales",
          labelAt: { x: 725, y: 232 },
        },
        {
          from: "workers",
          to: "gtts",
          kind: "support",
          arrow: "end",
          label: "text in, audio back",
          labelAt: { x: 817, y: 214 },
        },
      ],
    },
  },
  {
    id: "sr-hotel",
    number: "02",
    jp: "言葉をつなぐ街",
    title: "SR Hotel",
    dek: "conversations across twelve hotels",
    kicker: "Multilingual hotel consultation platform, built at Cigro",
    prose:
      "For a multilingual hotel-consultation platform, I built the backend that carries a guest from kiosk to consultant. A WebSocket-driven queue assigns each session to the right hotel's consultant pool; realtime chat, video calls, and a translation pipeline connect Google STT, TTS, Translate and Gemini. The platform produced 70,000+ transcripts archived to S3 and 2,500+ AI-assisted conversations from 3,000+ guest sessions, deployed on AWS ECS Fargate with a hybrid link to the client's on-premise database.",
    facts: [
      { label: "Hotels", value: "12" },
      { label: "Guest sessions", value: "3,000+" },
      { label: "Consultation calls", value: "2,000+" },
      { label: "Live transcripts", value: "70,000+" },
      { label: "AI conversations", value: "2,500+" },
    ],
    links: [],
    diagram: {
      ariaLabel:
        "The guest journey, drawn as a constellation. The kiosk reaches the API and WebSocket hub over a WebSocket, and the hub routes each session by hotel into the ElastiCache queue, which assigns it to consultant pools across twelve hotels. Audio streams out to Google STT, through Translate with cached phrases, into TTS, which sends the voice reply back to the hub and archives transcripts to S3. The Gemini assistant answers from the client's own data, over a hybrid link to the on-premise database.",
      width: 1100,
      height: 515,
      stars: [
        {
          id: "api",
          label: "API and WebSocket",
          sub: "central hub",
          x: 400,
          y: 62,
          magnitude: 3,
          kind: "path",
        },
        {
          id: "kiosk",
          label: "Kiosk",
          sub: "guest-facing device",
          x: 105,
          y: 180,
          magnitude: 2,
          kind: "path",
          labelPlace: "below",
        },
        {
          id: "queue",
          label: "Hotel-scoped queue",
          sub: "ElastiCache",
          x: 705,
          y: 180,
          magnitude: 3,
          kind: "path",
          labelPlace: "below",
        },
        {
          id: "pools",
          label: "Consultant pools",
          sub: "12 hotels",
          x: 960,
          y: 82,
          magnitude: 2,
          kind: "path",
          twinkle: true,
          labelPlace: "below",
        },
        {
          id: "gemini",
          label: "Gemini assistant",
          sub: "answers from client data",
          x: 400,
          y: 235,
          magnitude: 1,
          kind: "external",
          twinkle: true,
          labelPlace: "below",
        },
        {
          id: "onprem",
          label: "On-premise database",
          sub: "client's own data",
          x: 400,
          y: 350,
          magnitude: 1,
          kind: "external",
          labelPlace: "below",
        },
        {
          id: "stt",
          label: "Google STT",
          sub: "speech to text",
          x: 205,
          y: 350,
          magnitude: 2,
          kind: "support",
          labelPlace: "below",
        },
        {
          id: "translate",
          label: "Translate",
          sub: "cached phrases",
          x: 472,
          y: 445,
          magnitude: 2,
          kind: "support",
          labelPlace: "below",
        },
        {
          id: "tts",
          label: "TTS",
          sub: "voice back to the call",
          x: 740,
          y: 350,
          magnitude: 2,
          kind: "support",
          labelPlace: "below",
        },
        {
          id: "s3",
          label: "S3",
          sub: "transcript archive",
          x: 1000,
          y: 445,
          magnitude: 1,
          kind: "support",
          labelPlace: "below",
        },
      ],
      edges: [
        {
          from: "kiosk",
          to: "api",
          kind: "path",
          arrow: "end",
          label: "WebSocket",
          labelAt: { x: 247, y: 108 },
        },
        {
          from: "api",
          to: "queue",
          kind: "path",
          arrow: "end",
          label: "route by hotel",
          labelAt: { x: 558, y: 108 },
        },
        { from: "queue", to: "pools", kind: "path", arrow: "end" },
        {
          from: "api",
          to: "gemini",
          kind: "external",
          arrow: "end",
          label: "ask Gemini",
          labelAt: { x: 448, y: 152 },
        },
        {
          from: "gemini",
          to: "onprem",
          kind: "external",
          arrow: "end",
          label: "hybrid link",
          labelAt: { x: 448, y: 300 },
        },
        {
          from: "api",
          to: "stt",
          kind: "support",
          arrow: "end",
          label: "audio stream",
          labelAt: { x: 250, y: 203 },
        },
        { from: "stt", to: "translate", kind: "support", arrow: "end" },
        { from: "translate", to: "tts", kind: "support", arrow: "end" },
        {
          from: "tts",
          to: "s3",
          kind: "support",
          arrow: "end",
          label: "transcripts",
          labelAt: { x: 875, y: 384 },
        },
        {
          from: "tts",
          to: "api",
          kind: "support",
          arrow: "end",
          label: "voice reply",
          labelAt: { x: 579, y: 195 },
        },
      ],
    },
  },
];
