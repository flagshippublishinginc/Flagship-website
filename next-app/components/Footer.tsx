import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity";

interface LinkType {
  type: "internal" | "external";
  external?: string;
  internal?: {
    slug: string;
    _type: string;
  };
}

interface FooterLink extends LinkType {
  label: string;
}

interface SocialLink {
  icon: any;
  url: string;
}

interface FooterProps {
  data?: {
    logo?: any;
    description?: string;
    quickLinks?: FooterLink[];
    readerServices?: FooterLink[];
    newsletterTitle?: string;
    newsletterDescription?: string;
    socialLinks?: SocialLink[];
    legalLinks?: FooterLink[];
    copyright?: string;
  };
}

const Footer = ({ data }: FooterProps) => {
  if (!data) return null;

  const {
    logo,
    description,
    quickLinks,
    readerServices,
    newsletterTitle,
    newsletterDescription,
    socialLinks,
    legalLinks,
    copyright,
  } = data;

  const resolveLink = (link: LinkType) => {
    if (link.type === "external" && link.external) return link.external;
    if (link.type === "internal" && link.internal) {
      // Basic slug resolution - adjust based on your routing
      return `/${link.internal.slug}`;
    }
    return "/";
  };

  return (
    <footer className="w-full bg-[#8B2D1D] text-white pt-16 pb-8 px-4 lg:px-20 font-sans">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 border-b border-white/20 pb-12">
          {/* Logo and Description */}
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
            {logo && (
              <div className="relative md:w-48 h-auto flex justify-center md:justify-start">
                <Link href="/">
                  <Image
                    src={urlForImage(logo)?.url() || ""}
                    alt="Footer Logo"
                    width={200}
                    height={80}
                    className="object-contain"
                  />
                </Link>
              </div>
            )}
            {description && (
              <div className="text-center md:text-left w-full">
                <p className="text-sm leading-relaxed md:max-w-sm opacity-90">
                  {description}
                </p>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <p className="font-body font-semibold mb-6">Quick Links</p>
            <ul className="space-y-4">
              {quickLinks?.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={resolveLink(item)}
                    className="text-[14px] text-white hover:opacity-80 transition-opacity">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reader Services */}
          <div className="lg:col-span-2">
            <p className="font-body font-semibold mb-6">Reader Services</p>
            <ul className="space-y-4">
              {readerServices?.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={resolveLink(item)}
                    className="text-[14px] font-medium text-white hover:opacity-80 transition-opacity">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 pl-0 lg:pl-8">
            <h3 className="font-heading text-2xl mb-2">{newsletterTitle}</h3>
            <p className="text-sm opacity-90 mb-6">{newsletterDescription}</p>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent border border-white px-4 py-3 text-sm placeholder:text-white/70 focus:outline-none focus:border-white transition-colors"
                required
              />
              <div className="flex items-start">
                <button
                  type="submit"
                  className="bg-white cursor-pointer text-primary px-8 py-4 text-sm font-semibold hover:bg-gray-100 transition-colors w-auto text-center">
                  Subscribe Now
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-4 text-xs lg:text-sm">
          {/* Left: Socials */}
          <div className="flex items-center gap-6 order-3 md:order-1">
            <span className="font-semibold">Follow us on</span>
            <div className="flex gap-4">
              {socialLinks?.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity">
                  {item.icon && (
                    <Image
                      src={urlForImage(item.icon)?.url() || ""}
                      alt="Social Icon"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain brightness-0 invert bg-transparent"
                    />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Center: Legal Links */}
          <div className="flex gap-8 order-2">
            {legalLinks?.map((item, idx) => (
              <Link
                key={idx}
                href={resolveLink(item)}
                className="text-[14px] font-medium text-white hover:opacity-100 transition-opacity">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right: Copyright */}
          <div className="text-center md:text-right order-1 md:order-3 text-[14px] font-semibold text-white hover:opacity-100 transition-opacity">
            {copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
