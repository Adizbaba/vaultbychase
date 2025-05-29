
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative bg-muted py-20 md:py-32 overflow-hidden">
      {/* Subtle moving gradient background - kept from original if desired */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/10 animate-gradient-xy"></div>
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

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
              Secure Banking, <span className="block sm:inline">Powered by Intelligence</span>
            </h1>
            <p className="mt-6 max-w-xl mx-auto md:mx-0 text-lg leading-8 text-muted-foreground sm:text-xl">
              VaultbyChase gives you real-time access, smarter tools, and the confidence to manage your money anywhere.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/signup">
                  Open an Account <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow border-primary text-primary hover:bg-primary/5">
                <Link href="/login">Log In</Link>
              </Button>
            </div>
            <div className="mt-8 flex justify-center md:justify-start space-x-4">
              <Link href="#" aria-label="Download on the App Store">
                <Image src="https://placehold.co/135x40.png" alt="App Store" width={135} height={40} data-ai-hint="app store badge" className="rounded"/>
              </Link>
              <Link href="#" aria-label="Get it on Google Play">
                <Image src="https://placehold.co/135x40.png" alt="Google Play" width={135} height={40} data-ai-hint="google play badge" className="rounded"/>
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center items-center mt-12 md:mt-0">
            {/* Device Mockups */}
            <div className="relative">
              <Image 
                src="https://placehold.co/280x560.png" 
                alt="VaultbyChase App on iPhone" 
                width={280} 
                height={560} 
                className="rounded-3xl shadow-2xl z-10 transform md:scale-110"
                data-ai-hint="phone app screen"
              />
              <div className="absolute -right-16 -bottom-8 z-0 md:-right-24 md:-bottom-12">
                <Image 
                  src="https://placehold.co/180x110.png" 
                  alt="VaultbyChase Card" 
                  width={180} 
                  height={110} 
                  className="rounded-lg shadow-xl transform rotate-6"
                  data-ai-hint="credit card design"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
