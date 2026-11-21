import { queryOptions } from "@tanstack/react-query";
import { getCourses, getCourseBySlug, getGallery, getSettings, getTestimonials } from "./site.functions";

export const coursesQuery = queryOptions({ queryKey: ["courses"], queryFn: () => getCourses() });
export const courseQuery = (slug: string) =>
  queryOptions({ queryKey: ["course", slug], queryFn: () => getCourseBySlug({ data: { slug } }) });
export const galleryQuery = queryOptions({ queryKey: ["gallery"], queryFn: () => getGallery() });
export const testimonialsQuery = queryOptions({ queryKey: ["testimonials"], queryFn: () => getTestimonials() });
export const settingsQuery = queryOptions({ queryKey: ["settings"], queryFn: () => getSettings() });
