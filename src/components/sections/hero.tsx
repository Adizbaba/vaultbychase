
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import { cn } from '@/lib/utils';

export function Hero() {
  const { ref: textContentRef, isInView: textContentInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.2 });
  const { ref: imageContainerRef, isInView: imageContainerInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="home" className="relative bg-muted py-20 md:py-32 overflow-hidden">
      {/* Subtle moving gradient background */}
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
          <div
            ref={textContentRef}
            className={cn(
              "text-center md:text-left opacity-0 transform translate-y-8 transition-all duration-1000 ease-out",
              textContentInView && "opacity-100 translate-y-0"
            )}
          >
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
              Secure Banking, <span className="block sm:inline">Powered by Intelligence</span>
            </h1>
            <p className="mt-6 max-w-xl mx-auto md:mx-0 text-lg leading-8 text-muted-foreground sm:text-xl">
              VaultbyChase gives you real-time access, smarter tools, and the confidence to manage your money anywhere.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transform">
                <Link href="/signup">
                  Open an Account <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow border-primary text-primary hover:bg-primary/5 hover:scale-105 transform">
                <Link href="/login">Log In</Link>
              </Button>
            </div>
            <div className="mt-8 flex justify-center md:justify-start space-x-4">
              <Link href="#" aria-label="Download on the App Store">
                <Image src="https://placehold.co/135x40.png" alt="App Store" width={135} height={40} data-ai-hint="app store badge" className="rounded hover:opacity-90 transition-opacity"/>
              </Link>
              <Link href="#" aria-label="Get it on Google Play">
                <Image src="https://placehold.co/135x40.png" alt="Google Play" width={135} height={40} data-ai-hint="google play badge" className="rounded hover:opacity-90 transition-opacity"/>
              </Link>
            </div>
          </div>
          <div
            ref={imageContainerRef}
            className={cn(
              "relative flex justify-center items-center mt-12 md:mt-0 opacity-0 transform scale-90 transition-all duration-1000 ease-out delay-200",
              imageContainerInView && "opacity-100 scale-100"
            )}
          >
            {/* Device Mockups */}
            <div className="relative">
              <Image 
                src="https://placehold.co/280x560.png" 
                alt="/phone.png"
                width={280} 
                height={560} 
                className="rounded-3xl shadow-2xl z-10 transform md:scale-110 transition-transform duration-300 hover:scale-115"
                data-ai-hint="phone app screen"
              />
              <div className="absolute -right-16 -bottom-8 z-0 md:-right-24 md:-bottom-12">
                <Image 
                  src="https://placehold.co/180x110.png" 
                  alt="VaultbyChase Card" 
                  width={180} 
                  height={110} 
                  className="rounded-lg shadow-xl transform rotate-6 transition-transform duration-300 hover:scale-110 hover:rotate-3"
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
