import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { KeyFeatures } from '@/components/sections/features';
import { WhyVaultbyChase } from '@/components/sections/why-vaultbychase';
import { Testimonials } from '@/components/sections/testimonials';
import { CallToAction } from '@/components/sections/call-to-action';
import { SecuritySection } from '@/components/sections/security';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <KeyFeatures />
        <WhyVaultbyChase />
        <SecuritySection />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
