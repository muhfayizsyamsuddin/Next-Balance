"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

function FooterLink({ href, children, external = false }: FooterLinkProps) {
  const linkProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <Link
      {...linkProps}
      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
    >
      {children}
    </Link>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gray-700 hover:bg-red-600 p-3 rounded-full transition-colors duration-200 group"
      aria-label={label}
    >
      <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
        {icon}
      </span>
    </a>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Connected</h3>
              <p className="text-gray-400">
                Subscribe to our newsletter for exclusive offers, new arrivals,
                and athletic insights.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-white placeholder-gray-400"
                  suppressHydrationWarning={true}
                  aria-label="Email address for newsletter"
                />
              </div>
              <button
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                suppressHydrationWarning={true}
                aria-label="Subscribe to newsletter"
              >
                <Mail className="h-4 w-4" />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="font-bold text-2xl tracking-tight">
                Next<span className="text-red-600">Balance</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Engineered for athletes who demand excellence. Every step forward
              is a step toward greatness.
            </p>
            <div className="flex space-x-3">
              <SocialLink
                href="https://facebook.com"
                icon={<Facebook className="h-5 w-5" />}
                label="Follow us on Facebook"
              />
              <SocialLink
                href="https://twitter.com"
                icon={<Twitter className="h-5 w-5" />}
                label="Follow us on Twitter"
              />
              <SocialLink
                href="https://instagram.com"
                icon={<Instagram className="h-5 w-5" />}
                label="Follow us on Instagram"
              />
              <SocialLink
                href="https://youtube.com"
                icon={<Youtube className="h-5 w-5" />}
                label="Subscribe to our YouTube channel"
              />
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-white mb-4">Products</h4>
            <nav className="space-y-3">
              <FooterLink href="/products?category=men">
                Men&apos;s Shoes
              </FooterLink>
              <FooterLink href="/products?category=women">
                Women&apos;s Shoes
              </FooterLink>
              <FooterLink href="/products?category=kids">
                Kids&apos; Shoes
              </FooterLink>
              <FooterLink href="/products?category=running">Running</FooterLink>
              <FooterLink href="/products?category=training">
                Training
              </FooterLink>
              <FooterLink href="/products?category=lifestyle">
                Lifestyle
              </FooterLink>
              <FooterLink href="/products?filter=new">New Arrivals</FooterLink>
              <FooterLink href="/products?filter=sale">Sale</FooterLink>
            </nav>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <nav className="space-y-3">
              <FooterLink href="/help">Help Center</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/size-guide">Size Guide</FooterLink>
              <FooterLink href="/shipping">Shipping Info</FooterLink>
              <FooterLink href="/returns">Returns & Exchanges</FooterLink>
              <FooterLink href="/warranty">Warranty</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/track-order">Track Your Order</FooterLink>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <nav className="space-y-3 mb-6">
              <FooterLink href="/about">About NextBalance</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/press">Press</FooterLink>
              <FooterLink href="/investors">Investors</FooterLink>
              <FooterLink href="/sustainability">Sustainability</FooterLink>
              <FooterLink href="/community">Community</FooterLink>
            </nav>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  100 Guest Street
                  <br />
                  Boston, MA 02135
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>1-800-NEW-BALANCE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/cookies">Cookie Policy</FooterLink>
              <FooterLink href="/accessibility">Accessibility</FooterLink>
              <FooterLink href="/sitemap">Sitemap</FooterLink>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-4">
                <span>© {currentYear} NextBalance. All rights reserved.</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Powered by</span>
                <Link
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-600 transition-colors duration-200 font-semibold"
                >
                  Next.js
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Trust Badges */}
      {/* <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Free Shipping Over $75</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div> */}
    </footer>
  );
}
