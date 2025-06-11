"use client";

import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={cn(
      "border-t border-border/10 mt-auto transition-colors duration-300",
      theme === "dark" 
        ? "bg-background text-foreground" 
        : "bg-muted text-foreground"
    )}>
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" aria-label="VaultbyChase Home">
              <Logo className="w-[180px] h-[40px]" />
            </Link>
            <p className="mt-5 text-sm text-muted-foreground opacity-90 max-w-md">
              Empowering your financial future with intelligent, secure, and accessible banking solutions. Experience the future of finance, today.
            </p>
          </div>

          <div>
            <h3 className="text-md font-semibold tracking-wider uppercase text-foreground mb-5">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm hover:underline text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-sm hover:underline text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="/press" className="text-sm hover:underline text-muted-foreground hover:text-foreground transition-colors">Press</Link></li>
              <li><Link href="/blog" className="text-sm hover:underline text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-semibold tracking-wider uppercase text-foreground mb-5">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/support" className="text-sm hover:underline text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="text-sm hover:underline text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="text-sm hover:underline text-muted-foreground hover:text-foreground transition-colors">FAQs</Link></li>
              <li><Link href="/#security" className="text-sm hover:underline text-muted-foreground hover:text-foreground transition-colors">Security Information</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold tracking-wider uppercase text-foreground mb-5">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/legal/privacy" className="text-sm hover:underline text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="text-sm hover:underline text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal/disclosures" className="text-sm hover:underline text-muted-foreground hover:text-foreground transition-colors">Disclosures</Link></li>
              <li><Link href="/sitemap" className="text-sm hover:underline text-muted-foreground hover:text-foreground transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/20 pt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} VaultbyChase Financial Corp. All rights reserved. Member FDIC. Equal Housing Lender.
          </p>
          <div className="flex space-x-5 mt-6 md:mt-0">
            <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110">
              <Linkedin size={22} />
            </Link>
            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110">
              <Twitter size={22} />
            </Link>
            <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110">
              <Instagram size={22} />
            </Link>
            <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110">
              <Facebook size={22} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
