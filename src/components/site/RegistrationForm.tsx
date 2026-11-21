import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { Check, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { formatFee, whatsappLink } from "@/lib/brand";
import {
  registrationSchema,
  submitRegistration,
  type Batch,
  type Course,
  type RegistrationInput,
} from "@/lib/site.functions";
import { WhatsAppIcon } from "./InstagramIcon";
import { Field, fieldClass } from "./fields";
import { useSettings } from "./useSettings";

const EXPERIENCE = ["Complete beginner", "Some self-learning", "Working as a makeup artist", "Salon / beauty professional"];

const formSchema = z.object({
  full_name: registrationSchema.shape.full_name,
  mobile: registrationSchema.shape.mobile,
  email: registrationSchema.shape.email,
  course_id: z.string().min(1, "Choose a course"),
  batch_choice: z.string().max(100),
  experience: z.string().max(100),
  message: z.string().trim().max(1000, "Keep your message under 1000 characters"),
});
type FormValues = z.infer<typeof formSchema>;

export function RegistrationForm({
  courses,
  batches,
  defaultCourseId,
}: {
  courses: Course[];
  batches: Batch[];
  defaultCourseId?: string | undefined;
}) {
  const settings = useSettings();
  const submit = useServerFn(submitRegistration);
  const [done, setDone] = useState<{ name: string; course: string } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      full_name: "",
      mobile: "",
      email: "",
      course_id: defaultCourseId ?? "",
      batch_choice: "",
      experience: "",
      message: "",
    },
    resolver: zodResolver(formSchema),
  });
  const { register, handleSubmit, watch, formState } = form;
  const courseId = watch("course_id");
  const course = courses.find((c) => c.id === courseId);
  const courseBatches = useMemo(
    () => batches.filter((b) => b.course_id === courseId && b.status !== "closed"),
    [batches, courseId],
  );

  const onSubmit = handleSubmit(async (v) => {
    setServerError(null);
    const batch = courseBatches.find((b) => b.id === v.batch_choice);
    const payload: RegistrationInput = {
      full_name: v.full_name,
      mobile: v.mobile,
      email: v.email,
      course_id: v.course_id,
      ...(batch ? { batch_id: batch.id, preferred_batch: batch.name } : v.batch_choice ? { preferred_batch: v.batch_choice } : {}),
      ...(v.experience ? { experience: v.experience } : {}),
      ...(v.message ? { message: v.message } : {}),
    };
    try {
      const res = await submit({ data: payload });
      setDone({ name: v.full_name.split(" ")[0] ?? v.full_name, course: res.courseTitle });
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    }
  });

  if (done) {
    const fee = formatFee(course?.registration_amount ?? course?.fee ?? null);
    return (
      <div className="border border-gold/40 bg-card p-8 text-center md:p-12" role="status">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-6 font-display text-3xl text-foreground">Thank you, {done.name}.</h3>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Your registration for <span className="text-gold">{done.course}</span> has been received. Our team will call you
          shortly to confirm your batch{fee ? ` and the registration amount of ${fee}` : ""}.
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground/80">
          Online payment isn't available yet — you can pay the registration amount at the studio.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="whatsapp" size="xl">
            <a
              href={whatsappLink(
                settings.whatsapp,
                `Hello Praveen Artistry, I just registered for the ${done.course}. My name is ${done.name}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon /> Continue on WhatsApp
            </a>
          </Button>
          <Button variant="goldOutline" size="xl" onClick={() => { form.reset(); setDone(null); }}>
            Register another student
          </Button>
        </div>
      </div>
    );
  }

  const e = formState.errors;
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-8 md:grid-cols-2">
      <Field label="Full name" htmlFor="full_name" error={e.full_name?.message}>
        <input id="full_name" autoComplete="name" className={fieldClass} placeholder="Your full name" {...register("full_name")} />
      </Field>
      <Field label="Mobile number" htmlFor="mobile" error={e.mobile?.message}>
        <input id="mobile" type="tel" autoComplete="tel" inputMode="tel" className={fieldClass} placeholder="+91" {...register("mobile")} />
      </Field>
      <Field label="Email" htmlFor="email" error={e.email?.message}>
        <input id="email" type="email" autoComplete="email" className={fieldClass} placeholder="you@example.com" {...register("email")} />
      </Field>
      <Field label="Interested course" htmlFor="course_id" error={e.course_id?.message}>
        <select id="course_id" className={`${fieldClass} [&>option]:bg-surface`} {...register("course_id")}>
          <option value="">Select a course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Preferred batch" htmlFor="batch_choice" optional>
        {courseBatches.length > 0 ? (
          <select id="batch_choice" className={`${fieldClass} [&>option]:bg-surface`} {...register("batch_choice")}>
            <option value="">Any available batch</option>
            {courseBatches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
                {b.timing ? ` · ${b.timing}` : ""}
                {b.status === "filling" ? " · Filling fast" : ""}
              </option>
            ))}
          </select>
        ) : (
          <input id="batch_choice" className={fieldClass} placeholder="e.g. Weekend / Morning" {...register("batch_choice")} />
        )}
      </Field>
      <Field label="Previous experience" htmlFor="experience" optional>
        <select id="experience" className={`${fieldClass} [&>option]:bg-surface`} {...register("experience")}>
          <option value="">Select</option>
          {EXPERIENCE.map((x) => (
            <option key={x} value={x}>{x}</option>
          ))}
        </select>
      </Field>
      <Field label="Message" htmlFor="message" optional className="md:col-span-2" error={e.message?.message}>
        <textarea id="message" rows={3} className={`${fieldClass} resize-none`} placeholder="Anything you'd like us to know" {...register("message")} />
      </Field>

      {course && (course.fee != null || course.registration_amount != null) && (
        <div className="flex flex-wrap gap-8 border-y border-border py-5 md:col-span-2">
          {course.fee != null && (
            <div>
              <p className="eyebrow">Course fee</p>
              <p className="mt-2 font-display text-2xl">{formatFee(course.fee)}</p>
            </div>
          )}
          {course.registration_amount != null && (
            <div>
              <p className="eyebrow">Registration amount</p>
              <p className="mt-2 font-display text-2xl">{formatFee(course.registration_amount)}</p>
            </div>
          )}
        </div>
      )}

      {serverError && <p role="alert" className="text-sm text-destructive md:col-span-2">{serverError}</p>}

      <div className="md:col-span-2">
        <Button type="submit" variant="gold" size="xl" disabled={formState.isSubmitting} className="w-full sm:w-auto">
          {formState.isSubmitting ? <Loader2 className="animate-spin" /> : null}
          Submit registration
        </Button>
      </div>
    </form>
  );
}
