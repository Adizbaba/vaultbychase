import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Features } from '@/components/sections/features';
import { Security } from '@/components/sections/security';
import { Testimonials } from '@/components/sections/testimonials';
import { CallToAction } from '@/components/sections/call-to-action';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Security />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
