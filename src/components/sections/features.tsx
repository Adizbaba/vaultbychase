
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { ArrowRightLeft, CheckCircle, DollarSign, ShieldCheck, Smartphone } from 'lucide-react'; // Using different icons for variety

interface FeatureItem {
  title: string;
  description: string;
  mockupSrc: string;
  mockupAlt: string;
  aiHint: string;
}

const keyFeaturesList: FeatureItem[] = [
  {
    title: 'Instant Transfers & Zelle®',
    description: 'Seamlessly send and receive money with Zelle® and internal transfers.',
    mockupSrc: 'https://placehold.co/200x380.png',
    mockupAlt: 'VaultbyChase app transfer screen',
    aiHint: 'phone transfer screen',
  },
  {
    title: 'Mobile Check Deposits',
    description: 'Deposit checks anytime, anywhere using your smartphone camera.',
    mockupSrc: 'https://placehold.co/200x380.png',
    mockupAlt: 'VaultbyChase app check deposit flow',
    aiHint: 'phone check deposit',
  },
  {
    title: 'Smart Financial Insights',
    description: 'Understand spending and reach goals with personalized analytics.',
    mockupSrc: 'https://placehold.co/200x380.png',
    mockupAlt: 'VaultbyChase app budget/analytics screen',
    aiHint: 'phone budget analytics',
  },
  {
    title: 'Bank-Grade Security',
    description: 'Multi-layered security and 24/7 access for your peace of mind.',
    mockupSrc: 'https://placehold.co/200x380.png',
    mockupAlt: 'VaultbyChase app security feature',
    aiHint: 'phone security login',
  },
];

export function KeyFeatures() {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Unlock a Smarter Way to Bank
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            VaultbyChase offers innovative features designed for your convenience and security, accessible right from your pocket.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {keyFeaturesList.map((feature) => (
            <Card key={feature.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-background overflow-hidden items-center text-center">
              <div className="p-6 bg-primary/5 w-full flex justify-center">
                <Image 
                  src={feature.mockupSrc} 
                  alt={feature.mockupAlt} 
                  width={150} // Smaller mockups for card context
                  height={300}
                  className="rounded-xl shadow-lg"
                  data-ai-hint={feature.aiHint}
                />
              </div>
              <CardHeader className="pb-2 pt-6">
                <CardTitle className="text-xl text-secondary">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
