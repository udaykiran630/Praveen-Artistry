import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { GALLERY_CATEGORIES } from "@/lib/brand";
import type { GalleryItem } from "@/lib/site.functions";

const labelFor = (v: string) => GALLERY_CATEGORIES.find((c) => c.value === v)?.label ?? v;

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((v) => (v == null ? v : (v + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const current = open != null ? items[open] : undefined;

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {items.map((item, idx) => (
          <motion.button
            key={item.id}
            type="button"
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: Math.min(idx, 8) * 0.04 }}
            onClick={() => setOpen(idx)}
            className="group relative mb-5 block w-full break-inside-avoid overflow-hidden bg-card text-left"
            aria-label={`Open ${item.caption || labelFor(item.category)} photo`}
          >
            <img
              src={item.image_url}
              alt={item.caption || labelFor(item.category)}
              loading="lazy"
              className="w-full transition-transform duration-[1.4s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end justify-between bg-veil-bottom p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div>
                <p className="eyebrow">{labelFor(item.category)}</p>
                {item.caption && <p className="mt-1 font-display text-lg text-foreground">{item.caption}</p>}
              </div>
              <Expand className="h-5 w-5 text-gold" />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo preview"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button type="button" onClick={close} aria-label="Close preview" className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground">
              <X className="h-5 w-5" />
            </button>
            {items.length > 1 && (
              <>
                <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground md:left-8">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground md:right-8">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            <motion.figure
              key={current.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-h-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={current.image_url} alt={current.caption || labelFor(current.category)} className="max-h-[82vh] w-auto object-contain" />
              <figcaption className="mt-4 text-center">
                <span className="eyebrow">{labelFor(current.category)}</span>
                {current.caption && <span className="ml-3 font-display text-lg">{current.caption}</span>}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
