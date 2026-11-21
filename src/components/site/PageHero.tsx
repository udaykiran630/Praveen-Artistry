import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealText } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  return (
    <section ref={ref} className="relative flex min-h-[62vh] items-end overflow-hidden pb-16 pt-40 md:min-h-[70vh]">
      <motion.img
        src={image}
        alt=""
        style={{ y }}
        className="absolute inset-0 h-[120%] w-full object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-veil" />
      <div className="absolute inset-0 bg-veil-bottom" />
      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="eyebrow">
          {eyebrow}
        </motion.p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.05] text-foreground md:text-7xl">
          <RevealText text={title} delay={0.1} />
        </h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
