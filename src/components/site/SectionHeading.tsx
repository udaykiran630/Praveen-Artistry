import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 font-display text-4xl leading-[1.1] text-foreground md:text-5xl">
        {title} {accent && <span className="font-accent-italic text-gold">{accent}</span>}
      </h2>
      <div className={cn("gold-rule mt-7 w-24", align === "center" && "mx-auto")} />
      {intro && <p className="mt-7 text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>}
    </Reveal>
  );
}
