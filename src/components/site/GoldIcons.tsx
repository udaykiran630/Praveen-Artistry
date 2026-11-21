/** Minimal single-weight gold line icons for the "Why choose us" section. */
type P = { className?: string };
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 48 48",
};

export const IconGuidance = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <circle cx="24" cy="14" r="6" />
    <path d="M12 40c0-7 5.4-12 12-12s12 5 12 12" />
    <path d="M38 8l3 3-3 3M41 11h-6" />
  </svg>
);
export const IconPractical = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M30 6l6 6-18 18-7 1 1-7z" />
    <path d="M26 10l6 6" />
    <path d="M8 42h32" />
  </svg>
);
export const IconAttention = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M4 24s7-12 20-12 20 12 20 12-7 12-20 12S4 24 4 24z" />
    <circle cx="24" cy="24" r="5" />
  </svg>
);
export const IconHands = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M14 26V12a2.5 2.5 0 015 0v10M19 22V9a2.5 2.5 0 015 0v13M24 22V11a2.5 2.5 0 015 0v13M29 24v-7a2.5 2.5 0 015 0v12c0 7-5 13-12 13-5 0-8-3-11-7l-5-7a2.5 2.5 0 014-3l3 3" />
  </svg>
);
export const IconTechnique = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M24 4l5 10 11 1.6-8 7.8 2 11L24 29l-10 5.4 2-11-8-7.8L19 14z" />
  </svg>
);
export const IconCareer = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M6 38l12-12 8 8 16-16" />
    <path d="M32 18h10v10" />
  </svg>
);
