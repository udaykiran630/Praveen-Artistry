import { whatsappLink } from "@/lib/brand";
import { WhatsAppIcon } from "./InstagramIcon";
import { useSettings } from "./useSettings";

export function WhatsAppFloat() {
  const s = useSettings();
  return (
    <a
      href={whatsappLink(s.whatsapp, "Hello Praveen Artistry, I'd like to know more about your beauty classes.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-deep transition-transform duration-300 hover:scale-110"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
