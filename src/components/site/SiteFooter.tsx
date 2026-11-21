import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { telLink, whatsappLink } from "@/lib/brand";
import { InstagramIcon, WhatsAppIcon } from "./InstagramIcon";
import { Logo } from "./SiteHeader";
import { useSettings } from "./useSettings";

export function SiteFooter() {
  const s = useSettings();
  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm font-accent-italic text-2xl leading-snug text-foreground/90">
            Beauty is an art. Master it with passion.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Praveen Artistry Makeup School &amp; Studio — professional makeup and hairstyling training.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow">Explore</p>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/classes" className="hover:text-gold">Beauty Classes</Link></li>
            <li><Link to="/courses" className="hover:text-gold">Courses &amp; Fees</Link></li>
            <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link to="/register" className="hover:text-gold">Student Registration</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow">Get in touch</p>
          <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-gold" />
              <span>
                <a href={telLink(s.phonePrimary)} className="hover:text-gold">{s.phonePrimary}</a>
                {s.phoneSecondary && (
                  <>
                    <br />
                    <a href={telLink(s.phoneSecondary)} className="hover:text-gold">{s.phoneSecondary}</a>
                  </>
                )}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <WhatsAppIcon className="h-4 w-4 text-gold" />
              <a href={whatsappLink(s.whatsapp, "Hello Praveen Artistry!")} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                Chat on WhatsApp
              </a>
            </li>
            {s.email && (
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold" />
                <a href={`mailto:${s.email}`} className="hover:text-gold">{s.email}</a>
              </li>
            )}
            {s.address && (
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-gold" />
                <span className="whitespace-pre-line">{s.address}</span>
              </li>
            )}
            <li className="flex items-center gap-3">
              <InstagramIcon className="h-4 w-4 text-gold" />
              <a href={s.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                @mana_praveen
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-muted-foreground md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} Praveen Artistry. All rights reserved.</p>
          <Link to="/admin" className="tracking-[0.2em] uppercase hover:text-gold">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
