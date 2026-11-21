import { IconAttention, IconCareer, IconGuidance, IconHands, IconPractical, IconTechnique } from "./GoldIcons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const ITEMS = [
  { Icon: IconGuidance, title: "Professional Guidance", text: "Learn directly from working artists who bring real studio and bridal experience into every class." },
  { Icon: IconPractical, title: "Practical Training", text: "Every session is built around practice — techniques are demonstrated, then performed by you." },
  { Icon: IconAttention, title: "Personal Attention", text: "Small batches mean your work is reviewed and corrected individually, not just watched." },
  { Icon: IconHands, title: "Hands-on Experience", text: "Work on live models to build the confidence and speed that real clients demand." },
  { Icon: IconTechnique, title: "Industry Techniques", text: "HD, long-wear bridal and camera-ready methods used by today's leading makeup artists." },
  { Icon: IconCareer, title: "Career Development", text: "Guidance on building a portfolio, pricing your services and growing your own clientele." },
];

export function WhyChooseUs() {
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading align="center" eyebrow="Why Choose Us" title="An education in" accent="excellence." />
        <div className="mt-20 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.1} className="group bg-background p-10 transition-colors duration-500 hover:bg-surface">
              <Icon className="h-12 w-12 text-gold transition-transform duration-500 group-hover:-translate-y-1" />
              <h3 className="mt-8 font-display text-2xl text-foreground">{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
