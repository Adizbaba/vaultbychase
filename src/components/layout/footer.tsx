import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/" aria-label="VaultbyChase Home">
               {/* Use a white version of the logo or adjust Logo component to accept color prop */}
               <svg width="150" height="36" viewBox="0 0 150 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="VaultbyChase Logo">
                <text x="0" y="26" fontFamily="var(--font-geist-sans), Arial, sans-serif" fontSize="24" fontWeight="bold" fill="hsl(var(--secondary-foreground))">
                  VaultbyChase
                </text>
              </svg>
            </Link>
            <p className="mt-4 text-sm text-muted">
              Secure banking, powered by intelligence. Manage your money with confidence, anywhere.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-secondary-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/#features" className="text-sm hover:underline text-muted">Features</Link></li>
              <li><Link href="/#security" className="text-sm hover:underline text-muted">Security</Link></li>
              <li><Link href="/support" className="text-sm hover:underline text-muted">Support</Link></li>
              <li><Link href="/login" className="text-sm hover:underline text-muted">Login</Link></li>
              <li><Link href="/signup" className="text-sm hover:underline text-muted">Open Account</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-secondary-foreground">Connect With Us</h3>
            <div className="mt-4 flex space-x-4">
              <Link href="#" aria-label="LinkedIn" className="text-muted hover:text-secondary-foreground">
                <Linkedin size={24} />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-muted hover:text-secondary-foreground">
                <Twitter size={24} />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-muted hover:text-secondary-foreground">
                <Instagram size={24} />
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted">
              123 Finance Street, Money City, USA
            </p>
            <p className="text-sm text-muted">
              contact@vaultbychase.com
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} VaultbyChase. All rights reserved. Member FDIC.
          </p>
        </div>
      </div>
    </footer>
  );
}
