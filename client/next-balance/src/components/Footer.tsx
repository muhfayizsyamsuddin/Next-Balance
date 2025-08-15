"use client";

import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

interface FooterLinkProps {
  children: React.ReactNode;
}

function FooterLink({ children }: FooterLinkProps) {
  // Render plain text instead of a clickable link
  return (
    <span className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
      {children}
    </span>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
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
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-white mb-4">Products</h4>
            <nav className="space-y-3">
              <FooterLink>Men&apos;s Shoes</FooterLink>
              <FooterLink>Women&apos;s Shoes</FooterLink>
              <FooterLink>Kids&apos; Shoes</FooterLink>
              <FooterLink>Running</FooterLink>
              <FooterLink>Training</FooterLink>
              <FooterLink>Lifestyle</FooterLink>
              <FooterLink>New Arrivals</FooterLink>
              <FooterLink>Sale</FooterLink>
            </nav>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <nav className="space-y-3">
              <FooterLink>Help Center</FooterLink>
              <FooterLink>Contact Us</FooterLink>
              <FooterLink>Size Guide</FooterLink>
              <FooterLink>Shipping Info</FooterLink>
              <FooterLink>Returns & Exchanges</FooterLink>
              <FooterLink>Warranty</FooterLink>
              <FooterLink>FAQ</FooterLink>
              <FooterLink>Track Your Order</FooterLink>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <nav className="space-y-3 mb-6">
              <FooterLink>About NextBalance</FooterLink>
              <FooterLink>Careers</FooterLink>
              <FooterLink>Press</FooterLink>
              <FooterLink>Investors</FooterLink>
              <FooterLink>Sustainability</FooterLink>
              <FooterLink>Community</FooterLink>
            </nav>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  100 Guest Street
                  <br />
                  DENVER, 01234
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>1-001-NEX-BALANCE</span>
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
              <FooterLink>Privacy Policy</FooterLink>
              <FooterLink>Terms of Service</FooterLink>
              <FooterLink>Cookie Policy</FooterLink>
              <FooterLink>Accessibility</FooterLink>
              <FooterLink>Sitemap</FooterLink>
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
