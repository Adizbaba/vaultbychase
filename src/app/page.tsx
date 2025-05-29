
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { KeyFeatures } from '@/components/sections/features'; // Renamed for clarity, points to updated features.tsx
import { WhyVaultbyChase } from '@/components/sections/why-vaultbychase';
import { Testimonials } from '@/components/sections/testimonials';
import { DownloadAppCTA } from '@/components/sections/call-to-action'; // Renamed for clarity, points to updated call-to-action.tsx

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <KeyFeatures />
        <WhyVaultbyChase />
        <Testimonials />
        <DownloadAppCTA />
      </main>
      <Footer />
    </>
  );
}
