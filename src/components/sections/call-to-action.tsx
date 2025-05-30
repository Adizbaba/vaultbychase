
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import { cn } from '@/lib/utils';

export function DownloadAppCTA() {
  const { ref: sectionRef, isInView: sectionInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.2 });
  const { ref: imageRef, isInView: imageInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="download-app" className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary text-primary-foreground overflow-hidden">
      <div
        ref={sectionRef}
        className={cn(
          "container mx-auto px-4 md:px-6 text-center opacity-0 transform translate-y-12 transition-all duration-1000 ease-out",
          sectionInView && "opacity-100 translate-y-0"
        )}
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Bank Smarter. Bank Safer. <br className="hidden sm:block" />Start with VaultbyChase Today.
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-primary-foreground/90">
          Download our app to manage your finances on the go, with cutting-edge security and intelligent tools at your fingertips.
        </p>
        
        <div className="mt-10 mb-8">
          <Button
            size="lg"
            asChild
            className="bg-background text-primary hover:bg-muted/90 transition-all duration-300 shadow-xl hover:shadow-2xl px-10 py-6 text-lg font-semibold hover:scale-105 transform"
          >
            <Link href="/signup">
              Create Your Vault
            </Link>
          </Button>
        </div>

        <div className="flex justify-center items-center space-x-4 mb-12">
          <Link href="#" aria-label="Download on the App Store">
            <Image src="https://placehold.co/160x50.png" alt="App Store" width={160} height={50} data-ai-hint="app store badge" className="rounded-md hover:opacity-90 hover:scale-105 transform transition-all duration-300"/>
          </Link>
          <Link href="#" aria-label="Get it on Google Play">
            <Image src="https://placehold.co/160x50.png" alt="Google Play" width={160} height={50} data-ai-hint="google play badge" className="rounded-md hover:opacity-90 hover:scale-105 transform transition-all duration-300"/>
          </Link>
        </div>
        
        <div
          ref={imageRef}
          className={cn(
            "relative flex justify-center items-end max-w-md mx-auto opacity-0 transform translate-y-12 transition-all duration-1000 ease-out",
            imageInView && "opacity-100 translate-y-0 delay-300"
          )}
        >
          <Image 
            src="https://placehold.co/300x580.png" 
            alt="VaultbyChase App on Phone" 
            width={300} 
            height={580} 
            className="rounded-t-3xl shadow-2xl z-10"
            data-ai-hint="phone app interface"
          />
        </div>
      </div>
    </section>
  );
}
