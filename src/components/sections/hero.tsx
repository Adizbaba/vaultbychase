"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative bg-background py-20 md:py-32 overflow-hidden">
      {/* Subtle moving gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/20 animate-gradient-xy"></div>
      </div>
      <style jsx>{`
        @keyframes gradient-xy {
          0%, 100% {
            background-size: 400% 400%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
        }
      `}</style>

      <div className="container mx-auto px-4 text-center md:px-6">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
          Secure Banking, <span className="block sm:inline">Powered by Intelligence</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-foreground/80 sm:text-xl">
          VaultbyChase gives you real-time access, smarter tools, and the confidence to manage your money anywhere.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/signup">
              Open an Account <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
