import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import heroImg from "@/assets/hero-bride.jpg";
import bridalImg from "@/assets/course-bridal.jpg";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/site/CourseCard";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { TestimonialSlider } from "@/components/site/TestimonialSlider";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { coursesQuery, galleryQuery, testimonialsQuery } from "@/lib/queries";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Praveen Artistry — Master the Art of Beauty | Makeup School & Studio" },
      {
        name: "description",
        content:
          "Learn professional, bridal, HD and party makeup and hairstyling at Praveen Artistry Makeup School & Studio. Hands-on training with personal guidance.",
      },
      { property: "og:title", content: "Praveen Artistry — Master the Art of Beauty" },
      {
        property: "og:description",
        content: "Professional makeup and hairstyling courses at Praveen Artistry Makeup School & Studio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(coursesQuery),
  component: Home,
});

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden">
      <motion.img
        src={heroImg}
        alt="Bride with luxurious bridal makeup and gold jewellery"
        style={{ y, scale }}
        className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 bg-veil" />
      <div className="absolute inset-0 bg-veil-bottom" />
      <motion.div style={{ opacity: fade }} className="relative mx-auto w-full max-w-7xl px-5 pt-24 md:px-8">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.32em" }}
          transition={{ duration: 1.4 }}
          className="eyebrow"
        >
          Praveen Artistry · Makeup School &amp; Studio
        </motion.p>
        <h1 className="mt-6 max-w-3xl font-display text-[3.2rem] leading-[0.98] text-foreground sm:text-7xl lg:text-[6.5rem]">
          <RevealText text="MASTER THE" delay={0.2} />
          <br />
          <RevealText text="ART OF" delay={0.4} />{" "}
          <span className="font-accent-italic text-gold-gradient">
            <RevealText text="Beauty" delay={0.55} />
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground"
        >
          Discover Your Passion. Learn Professional Makeup. Create Your Future.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button asChild variant="gold" size="xl">
            <Link to="/classes">Explore Beauty Classes</Link>
          </Button>
          <Button asChild variant="goldOutline" size="xl">
            <Link to="/register">Join Our Academy</Link>
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground">Scroll</span>
        <motion.span
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="h-12 w-px origin-top bg-gold"
        />
      </motion.div>
    </section>
  );
}

function Home() {
  const { data } = useSuspenseQuery(coursesQuery);
  const { data: gallery } = useQuery(galleryQuery);
  const { data: testimonials } = useQuery(testimonialsQuery);

  return (
    <>
      <Hero />

      {/* Intro */}
      <section className="relative py-28 md:py-36">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:grid-cols-12 md:px-8">
          <Reveal className="md:col-span-5">
            <div className="frame-gold relative z-0">
              <img src={bridalImg} alt="South Indian bridal makeup with temple jewellery" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </div>
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            <SectionHeading
              eyebrow="The Academy"
              title="Beauty Is An Art."
              accent="Master It With Passion."
              intro="At Praveen Artistry Makeup School & Studio, students learn the craft the way professionals work — hands-on, on real faces, with personal correction at every step. From your very first brush stroke to your first bridal client, we guide you all the way."
            />
            <Reveal delay={0.2} className="mt-10">
              <Link to="/about" className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-gold">
                Meet Praveen Artistry
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="bg-surface py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="Beauty Classes" title="Courses crafted for" accent="every ambition." />
            <Reveal>
              <Button asChild variant="goldOutline" size="lg">
                <Link to="/courses">All courses &amp; fees</Link>
              </Button>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.courses.map((c, i) => (
              <Reveal key={c.id} delay={(i % 3) * 0.1}>
                <CourseCard course={c} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      {gallery && gallery.length > 0 && (
        <section className="py-28 md:py-36">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <SectionHeading eyebrow="Portfolio" title="Recent" accent="work." />
              <Button asChild variant="goldOutline" size="lg">
                <Link to="/gallery">View full gallery</Link>
              </Button>
            </div>
            <div className="mt-14">
              <GalleryGrid items={gallery.slice(0, 6)} />
            </div>
          </div>
        </section>
      )}

      {testimonials && testimonials.length > 0 && (
        <section className="border-y border-border bg-surface py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <p className="eyebrow text-center">Student Stories</p>
            <div className="mt-10">
              <TestimonialSlider items={testimonials} />
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden py-32">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover object-[80%_center] opacity-30" />
        <div className="absolute inset-0 bg-background/70" />
        <Reveal className="relative mx-auto max-w-3xl px-5 text-center">
          <p className="eyebrow">Admissions Open</p>
          <h2 className="mt-6 font-display text-4xl leading-tight md:text-6xl">
            Your journey into <span className="font-accent-italic text-gold">artistry</span> begins here.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-muted-foreground">
            Reserve your seat in the next batch. Our team will call you to guide you to the right course.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild variant="gold" size="xl">
              <Link to="/register">Register Now</Link>
            </Button>
            <Button asChild variant="goldOutline" size="xl">
              <Link to="/contact">Talk to us</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
