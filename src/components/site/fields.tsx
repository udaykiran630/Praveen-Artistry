import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const fieldClass =
  "w-full rounded-none border-0 border-b border-input bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-gold focus:outline-none focus:ring-0";

export function Field({
  label,
  htmlFor,
  error,
  children,
  className,
  optional,
}: {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  children: ReactNode;
  className?: string;
  optional?: boolean;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={htmlFor} className="text-[0.68rem] uppercase tracking-[0.25em] text-muted-foreground">
        {label} {optional && <span className="normal-case tracking-normal text-muted-foreground/60">(optional)</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-2 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
