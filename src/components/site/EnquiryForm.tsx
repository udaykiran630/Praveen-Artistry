import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/brand";
import { enquirySchema, submitEnquiry, type EnquiryInput } from "@/lib/site.functions";
import { WhatsAppIcon } from "./InstagramIcon";
import { Field, fieldClass } from "./fields";
import { useSettings } from "./useSettings";

export function EnquiryForm({ topics }: { topics: string[] }) {
  const settings = useSettings();
  const submit = useServerFn(submitEnquiry);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, formState, reset } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: "", phone: "", email: "", topic: "", message: "" },
  });

  const onSubmit = handleSubmit(async (v) => {
    setServerError(null);
    try {
      await submit({ data: v });
      setSent(true);
      reset();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  });

  if (sent) {
    return (
      <div className="border border-gold/40 bg-card p-8 text-center" role="status">
        <Check className="mx-auto h-8 w-8 text-gold" />
        <h3 className="mt-4 font-display text-2xl">Enquiry received</h3>
        <p className="mt-3 text-sm text-muted-foreground">We'll get back to you soon. For a faster reply, message us on WhatsApp.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="whatsapp" size="lg">
            <a href={whatsappLink(settings.whatsapp, "Hello Praveen Artistry, I just sent an enquiry on your website.")} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> WhatsApp us
            </a>
          </Button>
          <Button variant="goldOutline" size="lg" onClick={() => setSent(false)}>Send another</Button>
        </div>
      </div>
    );
  }

  const e = formState.errors;
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8 md:grid-cols-2">
      <Field label="Name" htmlFor="enq_name" error={e.name?.message}>
        <input id="enq_name" autoComplete="name" className={fieldClass} {...register("name")} />
      </Field>
      <Field label="Phone" htmlFor="enq_phone" error={e.phone?.message}>
        <input id="enq_phone" type="tel" autoComplete="tel" className={fieldClass} placeholder="+91" {...register("phone")} />
      </Field>
      <Field label="Email" htmlFor="enq_email" optional error={e.email?.message}>
        <input id="enq_email" type="email" autoComplete="email" className={fieldClass} {...register("email")} />
      </Field>
      <Field label="Regarding" htmlFor="enq_topic" optional>
        <select id="enq_topic" className={`${fieldClass} [&>option]:bg-surface`} {...register("topic")}>
          <option value="">General enquiry</option>
          {topics.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
          <option value="Makeup service booking">Makeup service booking</option>
          <option value="Workshop">Workshop</option>
        </select>
      </Field>
      <Field label="Message" htmlFor="enq_message" className="md:col-span-2" error={e.message?.message}>
        <textarea id="enq_message" rows={4} className={`${fieldClass} resize-none`} {...register("message")} />
      </Field>
      {serverError && <p role="alert" className="text-sm text-destructive md:col-span-2">{serverError}</p>}
      <div className="md:col-span-2">
        <Button type="submit" variant="gold" size="xl" disabled={formState.isSubmitting}>
          {formState.isSubmitting && <Loader2 className="animate-spin" />}
          Send enquiry
        </Button>
      </div>
    </form>
  );
}
