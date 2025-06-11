"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import { cn } from '@/lib/utils';

export function CallToAction() {
  const { ref: sectionRef, isInView: sectionInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.2 });
  const { ref: videoRef, isInView: videoInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="download-app" className="py-20 md:py-32 bg-gradient-to-br from-primary via-secondary to-primary/80 text-primary-foreground overflow-hidden relative">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 -z-10 opacity-20 mix-blend-overlay">
        <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-white/10 rounded-full animate-pulse_slow_cta"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-80 h-80 bg-white/15 rounded-full animate-pulse_slower_cta"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-white/5 rounded-full animate-pulse_slow_cta animation-delay-3000_cta"></div>
      </div>
      <style jsx>{`
        @keyframes pulse_slow_cta { 0%, 100% { opacity: 0.3; transform: scale(0.9) rotate(0deg); } 50% { opacity: 0.6; transform: scale(1.1) rotate(10deg); } }
        @keyframes pulse_slower_cta { 0%, 100% { opacity: 0.2; transform: scale(1) rotate(0deg); } 50% { opacity: 0.4; transform: scale(0.85) rotate(-10deg); } }
        .animate-pulse_slow_cta { animation: pulse_slow_cta 15s infinite ease-in-out; }
        .animate-pulse_slower_cta { animation: pulse_slower_cta 18s infinite ease-in-out; }
        .animation-delay-3000_cta { animation-delay: -3s; }
      `}</style>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div
            ref={sectionRef}
            className={cn(
              "text-center lg:text-left opacity-0 transform translate-y-12 transition-all duration-1000 ease-out",
              sectionInView && "opacity-100 translate-y-0"
            )}
          >
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl !leading-tight">
              Experience Banking <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-background to-background/80">
                Like Never Before
              </span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-primary-foreground/90">
              Join thousands of satisfied customers. Download our award-winning app to manage your finances on the go, with cutting-edge security and intelligent tools at your fingertips.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                size="lg"
                asChild
                className="bg-background text-primary hover:bg-muted/90 transition-all duration-300 shadow-2xl hover:shadow-primary/30 px-8 py-6 text-lg font-semibold hover:scale-105 transform"
              >
                <Link href="/signup">
                  Create Your Free Account <ArrowRight className="ml-2 h-5 w-5"/>
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex justify-center lg:justify-start space-x-6">
              <Link href="#" aria-label="Download on the App Store">
                <Image src="/App Store.png" alt="App Store badge" width={180} height={60} className="rounded-lg hover:opacity-90 hover:scale-105 transform transition-all duration-300"/>
              </Link>
              <Link href="#" aria-label="Get it on Google Play">
                <Image src="/Google Play.png" alt="Google Play badge" width={180} height={60} className="rounded-lg hover:opacity-90 hover:scale-105 transform transition-all duration-300"/>
              </Link>
            </div>
          </div>

          {/* Right Column - Video */}
          <div
            ref={videoRef}
            className={cn(
              "relative flex justify-center items-center opacity-0 transform scale-95 transition-all duration-1000 ease-out",
              videoInView && "opacity-100 scale-100"
            )}
          >
            <div className="relative w-full max-w-[600px] aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-background/20">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="https://res.cloudinary.com/dse63uv5p/video/upload/v1749602200/videos_o188fx.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-background/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-background/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
