import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { courseImage } from "@/lib/brand";
import type { Course } from "@/lib/site.functions";

export function CourseCard({ course, index }: { course: Course; index: number }) {
  return (
    <Link
      to="/courses/$slug"
      params={{ slug: course.slug }}
      className="group relative block overflow-hidden bg-card"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={courseImage(course)}
          alt={course.title}
          loading="lazy"
          className="h-full w-full object-cover object-[center_25%] transition-transform duration-[1.6s] ease-out group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-veil-bottom" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <p className="font-accent-italic text-lg text-gold">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="mt-1 font-display text-2xl leading-tight text-foreground">{course.title}</h3>
        <div className="mt-4 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.25em] text-muted-foreground transition-colors group-hover:text-gold">
          View course <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 border border-gold/0 transition-colors duration-700 group-hover:border-gold/50" />
    </Link>
  );
}
