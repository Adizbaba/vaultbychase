import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CallToAction() {
  return (
    <section id="cta" className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to Take Control of Your Finances?
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-lg leading-8 text-primary-foreground/90">
          Join VaultbyChase today and experience a smarter way to bank. Secure, intelligent, and designed for you.
        </p>
        <div className="mt-10">
          <Button
            size="lg"
            asChild
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-colors shadow-xl hover:shadow-2xl"
          >
            <Link href="/signup">
              Open Your Account Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
