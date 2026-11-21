import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export type Course = Database["public"]["Tables"]["courses"]["Row"];
export type Batch = Database["public"]["Tables"]["batches"]["Row"];
export type GalleryItem = Database["public"]["Tables"]["gallery_items"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
export type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];

export const getCourses = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const [{ data: courses, error }, { data: batches }] = await Promise.all([
    sb.from("courses").select("*").eq("is_active", true).order("sort_order"),
    sb.from("batches").select("*").order("start_date", { ascending: true, nullsFirst: false }),
  ]);
  if (error) throw new Error("Could not load courses");
  return { courses: courses ?? [], batches: batches ?? [] };
});

export const getCourseBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(100) }).parse(d))
  .handler(async ({ data }) => {
    const sb = publicClient();
    const { data: course } = await sb
      .from("courses")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_active", true)
      .maybeSingle();
    if (!course) return { course: null, batches: [] as Batch[] };
    const { data: batches } = await sb
      .from("batches")
      .select("*")
      .eq("course_id", course.id)
      .order("start_date", { ascending: true, nullsFirst: false });
    return { course, batches: batches ?? [] };
  });

export const getGallery = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("gallery_items")
    .select("*")
    .order("sort_order")
    .order("created_at", { ascending: false });
  return data ?? [];
});

export const getTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("sort_order")
    .order("created_at", { ascending: false });
  return data ?? [];
});

export const getSettings = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient().from("site_settings").select("*").eq("id", 1).maybeSingle();
  return data;
});

const phone = z
  .string()
  .trim()
  .regex(/^\+?[0-9\s-]{10,15}$/, "Enter a valid mobile number");

export const registrationSchema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(100),
  mobile: phone,
  email: z.string().trim().email("Enter a valid email").max(255),
  course_id: z.string().uuid("Choose a course"),
  batch_id: z.string().uuid().optional(),
  preferred_batch: z.string().trim().max(100).optional(),
  experience: z.string().trim().max(100).optional(),
  message: z.string().trim().max(1000).optional(),
});
export type RegistrationInput = z.infer<typeof registrationSchema>;

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((d: RegistrationInput) => registrationSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: course } = await supabaseAdmin
      .from("courses")
      .select("id, title, registration_amount, fee, is_active")
      .eq("id", data.course_id)
      .maybeSingle();
    if (!course || !course.is_active) throw new Error("This course is not available right now.");
    let batchId: string | null = null;
    if (data.batch_id) {
      const { data: batch } = await supabaseAdmin
        .from("batches")
        .select("id, course_id, status")
        .eq("id", data.batch_id)
        .maybeSingle();
      if (batch && batch.course_id === course.id && batch.status !== "closed") batchId = batch.id;
    }
    const { data: row, error } = await supabaseAdmin
      .from("registrations")
      .insert({
        full_name: data.full_name,
        mobile: data.mobile,
        email: data.email,
        course_id: course.id,
        course_title: course.title,
        batch_id: batchId,
        preferred_batch: data.preferred_batch || null,
        experience: data.experience || null,
        message: data.message || null,
        amount_due: course.registration_amount ?? course.fee ?? null,
      })
      .select("id")
      .single();
    if (error || !row) {
      console.error("registration insert failed", error);
      throw new Error("We couldn't save your registration. Please try again.");
    }
    return { id: row.id, courseTitle: course.title };
  });

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  phone,
  email: z.union([z.string().trim().email("Enter a valid email").max(255), z.literal("")]).optional(),
  topic: z.string().trim().max(150).optional(),
  message: z.string().trim().min(5, "Tell us a little more").max(1000),
});
export type EnquiryInput = z.infer<typeof enquirySchema>;

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((d: EnquiryInput) => enquirySchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("enquiries").insert({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      topic: data.topic || null,
      message: data.message,
    });
    if (error) {
      console.error("enquiry insert failed", error);
      throw new Error("We couldn't send your enquiry. Please try again.");
    }
    return { ok: true };
  });
