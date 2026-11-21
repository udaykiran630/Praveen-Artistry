import professional from "@/assets/course-professional.jpg";
import bridal from "@/assets/course-bridal.jpg";
import hd from "@/assets/course-hd.jpg";
import party from "@/assets/course-party.jpg";
import hair from "@/assets/course-hair.jpg";
import basic from "@/assets/course-basic.jpg";

const fallbackImages: Record<string, string> = {
  "professional-makeup": professional,
  "bridal-makeup": bridal,
  "hd-makeup": hd,
  "party-makeup": party,
  hairstyling: hair,
  "basic-to-advanced": basic,
};

export function courseImage(course: { slug: string; image_url: string | null }) {
  return course.image_url || fallbackImages[course.slug] || professional;
}

export const GALLERY_CATEGORIES = [
  { value: "bridal", label: "Bridal Makeup" },
  { value: "hd", label: "HD Makeup" },
  { value: "reception", label: "Reception Makeup" },
  { value: "party", label: "Party Makeup" },
  { value: "hairstyling", label: "Hairstyling" },
  { value: "student", label: "Student Work" },
] as const;

export const DEFAULT_WHATSAPP = "918019208036";

export function whatsappLink(number: string | null | undefined, text: string) {
  const n = (number || DEFAULT_WHATSAPP).replace(/[^0-9]/g, "");
  return `https://wa.me/${n}?text=${encodeURIComponent(text)}`;
}

export function telLink(phone: string) {
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}

export function formatFee(value: number | null | undefined) {
  if (value == null) return null;
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    Number(value),
  );
}
