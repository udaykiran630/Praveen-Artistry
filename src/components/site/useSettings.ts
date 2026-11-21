import { useQuery } from "@tanstack/react-query";
import { settingsQuery } from "@/lib/queries";
import { DEFAULT_WHATSAPP } from "@/lib/brand";

export function useSettings() {
  const { data } = useQuery(settingsQuery);
  return {
    phonePrimary: data?.phone_primary ?? "+91 98488 99933",
    phoneSecondary: data?.phone_secondary ?? "+91 80192 08036",
    whatsapp: data?.whatsapp ?? DEFAULT_WHATSAPP,
    email: data?.email ?? null,
    instagram: data?.instagram_url ?? "https://www.instagram.com/mana_praveen/",
    address: data?.address ?? null,
    mapQuery: data?.map_query ?? null,
    artistPhoto: data?.artist_photo_url ?? null,
  };
}
