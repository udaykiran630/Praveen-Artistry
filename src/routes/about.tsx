import { createFileRoute, Link } from "@tanstack/react-router";
import hdImg from "@/assets/course-hd.jpg";
import trainingImg from "@/assets/course-basic.jpg";
import hairImg from "@/assets/course-hair.jpg";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { useSettings } from "@/components/site/useSettings";
import { InstagramIcon } from "@/components/site/InstagramIcon";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Praveen Artistry — Makeup Artist & Beauty Educator" },
      {
        name: "description",
        content:
          "Meet Praveen Kumar and Praveen Artistry Makeup School & Studio — makeup artistry, workshops and hands-on beauty training.",
      },
      { property: "og:title", content: "About Praveen Artistry" },
      { property: "og:description", content: "Beauty is an art. Master it with passion — the story and teaching approach behind Praveen Artistry." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const PILLARS = [
  {
    title: "Professional expertise",
    text: "Bridal, HD, party and editorial makeup with professional hairstyling — the full range of looks students need to work confidently with real clients.",
  },
  {
    title: "Artistry philosophy",
    text: "Makeup should enhance, never mask. Every look starts with the person — their skin, features, outfit and occasion — and is built with precision and restraint.",
  },
  {
    title: "Training approach",
    text: "Demonstrate, practise, correct. Students work hands-on in every session and receive personal feedback until each technique becomes second nature.",
  },
];

function About() {
  const s = useSettings();
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Beauty Is An Art. Master It With Passion."
        subtitle="The story behind Praveen Artistry Makeup School & Studio."
        image={hairImg}
      />

      <section className="py-28 md:py-36">
        <div className="mx-auto grid max-w-7xl items-start gap-16 px-5 md:grid-cols-12 md:px-8">
          <Reveal className="md:col-span-5">
            <div className="frame-gold relative z-0">
              <img
                src={s.artistPhoto ?? hdImg}
                alt={s.artistPhoto ? "Praveen Kumar, founder of Praveen Artistry" : "Flawless HD makeup finish"}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            <SectionHeading eyebrow="The Artist" title="Praveen" accent="Kumar." />
            <Reveal delay={0.1} className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                Praveen Kumar is the founder of <span className="text-foreground">Praveen Artistry Makeup School &amp; Studio</span> — a
                studio for professional makeup and a school for those who want to make beauty their career.
              </p>
              <p>
                Alongside regular courses, Praveen Artistry organises professional makeup workshops and masterclasses with
                renowned educators, including events in Vijayawada and Tirupati, giving students certified, hands-on
                exposure to the industry.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="gold" size="xl">
                <Link to="/classes">Explore classes</Link>
              </Button>
              <Button asChild variant="goldOutline" size="xl">
                <a href={s.instagram} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon /> Follow on Instagram
                </a>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-surface py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <SectionHeading eyebrow="Philosophy" title="How we" accent="teach & create." />
              <Reveal delay={0.1} className="mt-12 overflow-hidden">
                <img src={trainingImg} alt="Trainee applying eyeshadow on a model during a class" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </Reveal>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.1} className="border-b border-border py-10 first:pt-0">
                  <div className="flex gap-8">
                    <span className="font-accent-italic text-3xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-display text-2xl">{p.title}</h3>
                      <p className="mt-3 leading-relaxed text-muted-foreground">{p.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />
    </>
  );
}
