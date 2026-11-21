import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import heroImg from "@/assets/course-professional.jpg";
import { Button } from "@/components/ui/button";
import { CourseFacts } from "@/components/site/CourseFacts";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { courseImage } from "@/lib/brand";
import { coursesQuery } from "@/lib/queries";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/classes")({
  head: () => ({
    meta: [
      { title: "Beauty Classes — Makeup & Hairstyling Courses | Praveen Artistry" },
      {
        name: "description",
        content:
          "Professional, bridal, HD and party makeup, hairstyling and basic-to-advanced training. Syllabus, outcomes, duration, fees and batch availability.",
      },
      { property: "og:title", content: "Beauty Classes at Praveen Artistry" },
      { property: "og:description", content: "Explore every makeup and hairstyling course — syllabus, outcomes, fees and batches." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(coursesQuery),
  component: Classes,
});

function Classes() {
  const { data } = useSuspenseQuery(coursesQuery);
  return (
    <>
      <PageHero
        eyebrow="Beauty Classes"
        title="Learn the craft. Shape your career."
        subtitle="Six focused programmes, taught hands-on with personal attention."
        image={heroImg}
      />

      <nav aria-label="Courses" className="sticky top-[60px] z-30 border-y border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl gap-8 overflow-x-auto px-5 py-4 md:px-8">
          {data.courses.map((c) => (
            <a key={c.id} href={`#${c.slug}`} className="whitespace-nowrap text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground hover:text-gold">
              {c.title.replace(" Course", "")}
            </a>
          ))}
        </div>
      </nav>

      {data.courses.map((course, i) => {
        const batches = data.batches.filter((b) => b.course_id === course.id);
        const flip = i % 2 === 1;
        return (
          <section key={course.id} id={course.slug} className={cn("scroll-mt-32 py-24 md:py-32", flip && "bg-surface")}>
            <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-12 md:px-8">
              <Reveal className={cn("md:col-span-5", flip && "md:order-2 md:col-start-8")}>
                <div className="sticky top-36 overflow-hidden">
                  <img src={courseImage(course)} alt={course.title} loading="lazy" className="aspect-[4/5] w-full object-cover object-[center_25%]" />
                  <span className="absolute left-5 top-5 font-accent-italic text-5xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                </div>
              </Reveal>
              <div className={cn("md:col-span-6", flip ? "md:order-1 md:col-start-1" : "md:col-start-7")}>
                <Reveal>
                  <p className="eyebrow">Course {String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{course.title}</h2>
                  {course.tagline && <p className="mt-4 font-accent-italic text-2xl text-gold">{course.tagline}</p>}
                  {course.overview && <p className="mt-6 leading-relaxed text-muted-foreground">{course.overview}</p>}
                </Reveal>

                <Reveal delay={0.1} className="mt-10">
                  <CourseFacts course={course} batches={batches} />
                </Reveal>

                {course.outcomes.length > 0 && (
                  <Reveal delay={0.1} className="mt-12">
                    <h3 className="eyebrow">What you'll learn</h3>
                    <ul className="mt-6 space-y-4">
                      {course.outcomes.map((o) => (
                        <li key={o} className="flex gap-4 text-foreground/90">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}

                {course.syllabus.length > 0 && (
                  <Reveal delay={0.1} className="mt-12">
                    <h3 className="eyebrow">Syllabus</h3>
                    <ol className="mt-6 grid gap-x-8 sm:grid-cols-2">
                      {course.syllabus.map((m, k) => (
                        <li key={m} className="flex gap-4 border-b border-border py-3 text-sm text-muted-foreground">
                          <span className="font-accent-italic text-base text-gold">{String(k + 1).padStart(2, "0")}</span>
                          {m}
                        </li>
                      ))}
                    </ol>
                  </Reveal>
                )}

                <Reveal delay={0.1} className="mt-12 flex flex-col gap-4 sm:flex-row">
                  <Button asChild variant="gold" size="xl">
                    <Link to="/register" search={{ course: course.slug }}>Enquire Now</Link>
                  </Button>
                  <Button asChild variant="goldOutline" size="xl">
                    <Link to="/courses/$slug" params={{ slug: course.slug }}>Full course details</Link>
                  </Button>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
