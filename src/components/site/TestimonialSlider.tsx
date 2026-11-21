import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/lib/site.functions";

export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  const count = items.length;
  useEffect(() => {
    if (count < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % count), 7000);
    return () => clearInterval(t);
  }, [count]);
  const item = items[i];
  if (!item) return null;

  return (
    <div className="relative mx-auto max-w-3xl text-center">
      <span className="block font-display text-7xl leading-none text-gold/60" aria-hidden>
        &ldquo;
      </span>
      <div className="relative min-h-[220px]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.figure
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6 }}
          >
            <blockquote className="font-accent-italic text-2xl leading-relaxed text-foreground md:text-3xl">
              {item.quote}
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-center gap-4">
              {item.photo_url && (
                <img src={item.photo_url} alt="" className="h-12 w-12 rounded-full border border-gold/50 object-cover" />
              )}
              <span className="text-left">
                <span className="block text-sm uppercase tracking-[0.25em] text-foreground">{item.name}</span>
                {item.course && <span className="mt-1 block text-xs text-gold">{item.course}</span>}
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      {count > 1 && (
        <div className="mt-10 flex items-center justify-center gap-6">
          <button type="button" aria-label="Previous testimonial" onClick={() => setI((v) => (v - 1 + count) % count)} className="flex h-11 w-11 items-center justify-center border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {items.map((t, k) => (
              <button key={t.id} type="button" aria-label={`Show testimonial ${k + 1}`} onClick={() => setI(k)} className={`h-px w-8 transition-colors ${k === i ? "bg-gold" : "bg-muted-foreground/40"}`} />
            ))}
          </div>
          <button type="button" aria-label="Next testimonial" onClick={() => setI((v) => (v + 1) % count)} className="flex h-11 w-11 items-center justify-center border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
