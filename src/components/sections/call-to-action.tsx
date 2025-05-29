
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function DownloadAppCTA() {
  return (
    <section id="download-app" className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 text-center">
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
            className="bg-background text-primary hover:bg-muted/90 transition-colors shadow-xl hover:shadow-2xl px-10 py-6 text-lg font-semibold"
          >
            <Link href="/signup">
              Create Your Vault
            </Link>
          </Button>
        </div>

        <div className="flex justify-center items-center space-x-4 mb-12">
          <Link href="#" aria-label="Download on the App Store">
            <Image src="https://placehold.co/160x50.png" alt="App Store" width={160} height={50} data-ai-hint="app store badge" className="rounded-md hover:opacity-90 transition-opacity"/>
          </Link>
          <Link href="#" aria-label="Get it on Google Play">
            <Image src="https://placehold.co/160x50.png" alt="Google Play" width={160} height={50} data-ai-hint="google play badge" className="rounded-md hover:opacity-90 transition-opacity"/>
          </Link>
        </div>
        
        <div className="relative flex justify-center items-end max-w-md mx-auto">
          <Image 
            src="https://placehold.co/300x580.png" 
            alt="VaultbyChase App on Phone" 
            width={300} 
            height={580} 
            className="rounded-t-3xl shadow-2xl z-10"
            data-ai-hint="phone app interface"
          />
           {/* Optional: add another device mockup slightly behind or to the side */}
        </div>
      </div>
    </section>
  );
}
