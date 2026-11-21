import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const FALLBACK_SUPABASE_URL = "https://c--4d69f412-8ec7-4cd5-9bf9-5c8eb52c65d6-prod.lovable.cloud";
const FALLBACK_SUPABASE_KEY = "sb_publishable_g1Nw0YSHDW7LGh1E1qH3ag_Sl7PMNFB";

function publicClient() {
  const url = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"] || FALLBACK_SUPABASE_URL;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] || process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] || FALLBACK_SUPABASE_KEY;
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

export const DEFAULT_COURSES: Course[] = [
  {
    id: "907060cb-545a-4055-b9f6-20aea95d2923",
    slug: "professional-makeup",
    title: "Professional Makeup Course",
    tagline: "The complete foundation for a career in makeup artistry.",
    overview: "A comprehensive programme covering skin preparation, colour theory, face mapping and complete looks for every occasion, designed for aspiring professional makeup artists.",
    outcomes: [
      "Understand skin types, undertones and skin preparation",
      "Master colour correction, base and contouring",
      "Create day, evening, bridal and editorial looks",
      "Work hygienically with professional products and tools",
      "Build a portfolio and start working with clients",
    ],
    syllabus: [
      "Tools, brushes and hygiene",
      "Skin analysis and preparation",
      "Colour theory and correction",
      "Foundation, concealing and setting",
      "Contouring, highlighting and blush",
      "Eye makeup techniques",
      "Brows and lashes",
      "Lip techniques",
      "Complete looks and portfolio shoot",
    ],
    practical_details: "Hands-on practice on models in every session, with personal correction from the trainer.",
    duration: null,
    fee: null,
    registration_amount: null,
    image_url: null,
    is_active: true,
    sort_order: 1,
    created_at: "2026-11-21T06:17:04.616701+00:00",
    updated_at: "2026-11-21T06:17:04.616701+00:00",
  },
  {
    id: "76750264-7f78-49f9-8b62-4a1bd4ffc425",
    slug: "bridal-makeup",
    title: "Bridal Makeup Course",
    tagline: "Create timeless, long-lasting bridal looks.",
    overview: "Specialised training in South Indian, North Indian and contemporary bridal looks, including long-wear techniques, draping and complete bridal styling.",
    outcomes: [
      "Plan a bridal look around skin, outfit and jewellery",
      "Apply long-lasting, sweat-proof bridal bases",
      "Create traditional and modern bridal eye looks",
      "Coordinate bridal hairstyling and accessories",
      "Manage bridal clients and trial sessions",
    ],
    syllabus: [
      "Bridal consultation and trials",
      "Long-wear skin preparation",
      "Traditional bridal looks",
      "Contemporary bridal looks",
      "Bridal eye makeup and lashes",
      "Saree draping and dupatta setting",
      "Jewellery and accessory placement",
      "Reception and engagement looks",
    ],
    practical_details: "Practice on live models with complete bridal styling from start to finish.",
    duration: null,
    fee: null,
    registration_amount: null,
    image_url: null,
    is_active: true,
    sort_order: 2,
    created_at: "2026-11-21T06:17:04.616701+00:00",
    updated_at: "2026-11-21T06:17:04.616701+00:00",
  },
  {
    id: "80b12a0d-1c12-4817-88f8-83104d263556",
    slug: "hd-makeup",
    title: "HD Makeup Course",
    tagline: "Flawless, camera-ready skin for high-definition photography and video.",
    overview: "Learn high-definition makeup techniques that look seamless on camera and in person, with a focus on lightweight layering and natural skin finish.",
    outcomes: [
      "Understand how makeup reads on HD cameras",
      "Build lightweight, seamless bases",
      "Choose HD-friendly products and textures",
      "Correct skin concerns without heaviness",
      "Create camera-ready looks for shoots and events",
    ],
    syllabus: [
      "HD products and textures",
      "Skin prep for camera",
      "Layering and blending techniques",
      "Colour correction for HD",
      "Soft sculpting and highlighting",
      "HD eye and lip looks",
      "Lighting and photography basics",
    ],
    practical_details: "Practice sessions with photo checks to review how each look appears on camera.",
    duration: null,
    fee: null,
    registration_amount: null,
    image_url: null,
    is_active: true,
    sort_order: 3,
    created_at: "2026-11-21T06:17:04.616701+00:00",
    updated_at: "2026-11-21T06:17:04.616701+00:00",
  },
  {
    id: "108794e0-6c9e-4614-812e-36bff26fecfa",
    slug: "party-makeup",
    title: "Party Makeup Course",
    tagline: "Glamorous looks for parties, receptions and celebrations.",
    overview: "A focused course on quick, glamorous party and occasion makeup, from soft glam to bold evening looks.",
    outcomes: [
      "Create soft glam and bold glam looks",
      "Work quickly for party and event clients",
      "Use shimmer, glitter and lashes professionally",
      "Match makeup to outfits and occasions",
    ],
    syllabus: [
      "Quick skin preparation",
      "Soft glam base",
      "Smokey and glitter eyes",
      "Cut crease techniques",
      "Lashes and liner styles",
      "Lip combinations",
      "Complete party looks",
    ],
    practical_details: "Practice on models with timed looks to build speed and confidence.",
    duration: null,
    fee: null,
    registration_amount: null,
    image_url: null,
    is_active: true,
    sort_order: 4,
    created_at: "2026-11-21T06:17:04.616701+00:00",
    updated_at: "2026-11-21T06:17:04.616701+00:00",
  },
  {
    id: "512340a8-4e10-4164-be79-2cba727447f6",
    slug: "hairstyling",
    title: "Hairstyling Course",
    tagline: "Bridal and party hairstyles that complete every look.",
    overview: "Learn professional hairstyling for brides, parties and events, from classic buns and braids to modern open styles.",
    outcomes: [
      "Prepare hair with the right tools and products",
      "Create buns, braids and open styles",
      "Style bridal hair with flowers and accessories",
      "Use extensions and padding professionally",
    ],
    syllabus: [
      "Tools, products and hair prep",
      "Curling and straightening techniques",
      "Basic and advanced braids",
      "Buns and updos",
      "Open and half-up styles",
      "Bridal hairstyles with accessories",
      "Extensions and padding",
    ],
    practical_details: "Hands-on styling practice on models and mannequins.",
    duration: null,
    fee: null,
    registration_amount: null,
    image_url: null,
    is_active: true,
    sort_order: 5,
    created_at: "2026-11-21T06:17:04.616701+00:00",
    updated_at: "2026-11-21T06:17:04.616701+00:00",
  },
  {
    id: "380d90b8-3bc6-414f-93a3-cb70f6e2e9fa",
    slug: "basic-to-advanced",
    title: "Basic To Advanced Makeup Training",
    tagline: "Start from zero and grow into a confident makeup artist.",
    overview: "A step-by-step journey for complete beginners that builds from everyday makeup to advanced bridal and HD techniques.",
    outcomes: [
      "Learn makeup fundamentals with no prior experience",
      "Progress to advanced bridal and HD techniques",
      "Develop speed, confidence and client skills",
      "Prepare for a professional makeup career",
    ],
    syllabus: [
      "Introduction to makeup and tools",
      "Self makeup basics",
      "Skin and base fundamentals",
      "Eye, brow and lip basics",
      "Intermediate party looks",
      "Advanced bridal looks",
      "HD techniques",
      "Hairstyling basics",
      "Career guidance",
    ],
    practical_details: "Structured practice at every level, guided personally by the trainer.",
    duration: null,
    fee: null,
    registration_amount: null,
    image_url: null,
    is_active: true,
    sort_order: 6,
    created_at: "2026-11-21T06:17:04.616701+00:00",
    updated_at: "2026-11-21T06:17:04.616701+00:00",
  },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  id: 1,
  phone_primary: "+91 98488 99933",
  phone_secondary: "+91 80192 08036",
  whatsapp: "918019208036",
  email: null,
  instagram_url: "https://www.instagram.com/mana_praveen/",
  address: null,
  map_query: null,
  artist_photo_url: null,
  updated_at: "2026-11-21T06:17:04.616701+00:00",
};

export const getCourses = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const sb = publicClient();
    const [{ data: courses, error }, { data: batches }] = await Promise.all([
      sb.from("courses").select("*").eq("is_active", true).order("sort_order"),
      sb.from("batches").select("*").order("start_date", { ascending: true, nullsFirst: false }),
    ]);
    if (error || !courses || courses.length === 0) {
      return { courses: DEFAULT_COURSES, batches: batches ?? [] };
    }
    return { courses, batches: batches ?? [] };
  } catch (err) {
    console.warn("getCourses fetch warning, using fallback courses:", err);
    return { courses: DEFAULT_COURSES, batches: [] };
  }
});

export const getCourseBySlug = createServerFn({ method: "GET" })
  .validator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(100) }).parse(d))
  .handler(async ({ data }) => {
    try {
      const sb = publicClient();
      const { data: course } = await sb
        .from("courses")
        .select("*")
        .eq("slug", data.slug)
        .eq("is_active", true)
        .maybeSingle();

      const matchedCourse = course || DEFAULT_COURSES.find((c) => c.slug === data.slug) || null;
      if (!matchedCourse) return { course: null, batches: [] as Batch[] };

      const { data: batches } = await sb
        .from("batches")
        .select("*")
        .eq("course_id", matchedCourse.id)
        .order("start_date", { ascending: true, nullsFirst: false });

      return { course: matchedCourse, batches: batches ?? [] };
    } catch (err) {
      console.warn("getCourseBySlug warning, using fallback:", err);
      const fallback = DEFAULT_COURSES.find((c) => c.slug === data.slug) || null;
      return { course: fallback, batches: [] as Batch[] };
    }
  });

export const getGallery = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { data } = await publicClient()
      .from("gallery_items")
      .select("*")
      .order("sort_order")
      .order("created_at", { ascending: false });
    return data ?? [];
  } catch (err) {
    console.warn("getGallery warning:", err);
    return [];
  }
});

export const getTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { data } = await publicClient()
      .from("testimonials")
      .select("*")
      .eq("is_published", true)
      .order("sort_order")
      .order("created_at", { ascending: false });
    return data ?? [];
  } catch (err) {
    console.warn("getTestimonials warning:", err);
    return [];
  }
});

export const getSettings = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { data } = await publicClient().from("site_settings").select("*").eq("id", 1).maybeSingle();
    return data || DEFAULT_SETTINGS;
  } catch (err) {
    console.warn("getSettings warning, using default:", err);
    return DEFAULT_SETTINGS;
  }
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
  .validator((d: RegistrationInput) => registrationSchema.parse(d))
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
  .validator((d: EnquiryInput) => enquirySchema.parse(d))
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
