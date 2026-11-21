import { formatFee } from "@/lib/brand";
import type { Batch, Course } from "@/lib/site.functions";

export function batchSummary(batches: Batch[]) {
  const open = batches.filter((b) => b.status !== "closed");
  if (batches.length === 0) return "New batches announced soon";
  if (open.length === 0) return "Current batches full — enquire for the next";
  const filling = open.some((b) => b.status === "filling");
  return `${open.length} batch${open.length > 1 ? "es" : ""} open${filling ? " · filling fast" : ""}`;
}

export function CourseFacts({ course, batches }: { course: Course; batches: Batch[] }) {
  const facts = [
    { label: "Duration", value: course.duration || "Shared on enquiry" },
    { label: "Course fee", value: formatFee(course.fee) ?? "On request" },
    { label: "Batches", value: batchSummary(batches) },
  ];
  return (
    <dl className="grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
      {facts.map((f) => (
        <div key={f.label} className="bg-background p-5">
          <dt className="eyebrow">{f.label}</dt>
          <dd className="mt-2 font-display text-lg text-foreground">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
