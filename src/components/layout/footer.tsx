
import Link from 'next/link';
import { Logo } from '@/components/icons/logo'; // Assuming Logo component can adapt color or we use a specific one
import { Linkedin, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="lg:col-span-2">
            {/* Logo - needs to be white on this background */}
            <Link href="/" aria-label="VaultbyChase Home">
               <svg width="150" height="36" viewBox="0 0 150 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="VaultbyChase Logo">
                <text x="0" y="26" fontFamily="var(--font-geist-sans), Arial, sans-serif" fontSize="24" fontWeight="bold" fill="hsl(var(--secondary-foreground))">
                  VaultbyChase
                </text>
              </svg>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground opacity-80"> {/* Muted foreground will be light blue/gray on dark */}
              Secure banking, powered by intelligence. Manage your money with confidence, anywhere. VaultbyChase is committed to providing innovative financial solutions.
            </p>
          </div>

          <div>
            <h3 className="text-md font-semibold text-secondary-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/#features" className="text-sm hover:underline text-muted-foreground opacity-90 hover:opacity-100">Features</Link></li>
              <li><Link href="/#why-vaultbychase" className="text-sm hover:underline text-muted-foreground opacity-90 hover:opacity-100">Why Us</Link></li>
              <li><Link href="/#security" className="text-sm hover:underline text-muted-foreground opacity-90 hover:opacity-100">Security</Link></li> {/* Assuming security section is still relevant or an anchor exists */}
              <li><Link href="/support" className="text-sm hover:underline text-muted-foreground opacity-90 hover:opacity-100">Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-semibold text-secondary-foreground mb-4">Legal & More</h3>
            <ul className="space-y-2">
              <li><Link href="/legal/privacy" className="text-sm hover:underline text-muted-foreground opacity-90 hover:opacity-100">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="text-sm hover:underline text-muted-foreground opacity-90 hover:opacity-100">Terms of Service</Link></li>
              <li><Link href="/careers" className="text-sm hover:underline text-muted-foreground opacity-90 hover:opacity-100">Careers</Link></li>
               <li><Link href="/sitemap" className="text-sm hover:underline text-muted-foreground opacity-90 hover:opacity-100">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground opacity-70">
            &copy; {new Date().getFullYear()} VaultbyChase. All rights reserved. Member FDIC.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" aria-label="LinkedIn" className="text-muted-foreground opacity-80 hover:opacity-100 hover:text-secondary-foreground transition-colors">
              <Linkedin size={20} />
            </Link>
            <Link href="#" aria-label="Twitter" className="text-muted-foreground opacity-80 hover:opacity-100 hover:text-secondary-foreground transition-colors">
              <Twitter size={20} />
            </Link>
            <Link href="#" aria-label="Instagram" className="text-muted-foreground opacity-80 hover:opacity-100 hover:text-secondary-foreground transition-colors">
              <Instagram size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
