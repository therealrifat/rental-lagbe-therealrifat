import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  BadgeCheck,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "All equipment", href: "/equipment" },
  {
    label: "Construction gear",
    href: "/equipment?category=construction-equipment",
  },
  { label: "How it works", href: "/#how-it-work" },
  { label: "My favorites", href: "/dashboard/customer/favorites" },
];

const ownerLinks = [
  { label: "List your equipment", href: "/dashboard/owner/add-equipment" },
  { label: "My equipment", href: "/dashboard/owner/equipment" },
  { label: "Equipment rentals", href: "/dashboard/owner/equipment-rentals" },
  { label: "Owner dashboard", href: "/dashboard/owner" },
];

const contactItems = [
  {
    icon: Mail,
    label: "hello@rentallagbe.com",
    href: "mailto:hello@rentallagbe.com",
  },
  {
    icon: Phone,
    label: "+880 1712-345678",
    href: "tel:+8801712345678",
  },
  { icon: MapPin, label: "Dhaka, Bangladesh" },
];

const socialLinks = [
  { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
];

const Footer = () => {
  return (
    <footer className="relative z-20 w-full bg-[#020617] text-slate-300">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-5">
          <div className="sm:col-span-2">
            <Link href="/" className="inline-flex items-center" aria-label="Rental Lagbe home">
              <Image
                src="/image/logo.png"
                width={130}
                height={48}
                alt="Rental Lagbe"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Rental Lagbe connects renters with verified equipment owners across
              Bangladesh. Find the right gear, book with confidence, and get your
              project moving.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                <BadgeCheck className="size-3.5 text-emerald-400" />
                Verified owners
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                <ShieldCheck className="size-3.5 text-emerald-400" />
                Secure checkout
              </span>
            </div>

            <div className="mt-6 flex items-center gap-2.5">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Explore</h2>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-slate-400 [&>a]:transition-colors [&>a:hover]:text-white">
              {exploreLinks.map(({ label, href }) => (
                <Link key={label} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">For owners</h2>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-slate-400 [&>a]:transition-colors [&>a:hover]:text-white">
              {ownerLinks.map(({ label, href }) => (
                <Link key={label} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Get in touch</h2>
            <div className="mt-4 flex flex-col gap-3">
              {contactItems.map(({ icon: Icon, label, href }) => {
                const content = (
                  <>
                    <Icon className="size-4 shrink-0 text-slate-500" />
                    <span>{label}</span>
                  </>
                );

                return href ? (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {content}
                  </a>
                ) : (
                  <p key={label} className="flex items-center gap-2 text-sm text-slate-400">
                    {content}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Rental Lagbe. All rights reserved.</p>
          <p className="sm:text-right">Built for renters and owners across Bangladesh.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-1 font-medium text-slate-400 transition-colors hover:text-white"
          >
            Back to top
            <ArrowUp className="size-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
