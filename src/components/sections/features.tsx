
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import { cn } from '@/lib/utils';

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

const FeatureCard = ({ feature, index }: { feature: FeatureItem; index: number }) => {
  const { ref, isInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0 transform translate-y-8 transition-all duration-700 ease-out group',
        isInView && 'opacity-100 translate-y-0',
        `delay-${index * 150}`
      )}
    >
      <Card className="shadow-lg hover:-translate-y-1.5 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col bg-background overflow-hidden items-center text-center h-full">
        <div className="p-6 bg-primary/5 w-full flex justify-center group-hover:bg-primary/10 transition-colors duration-300">
          <Image 
            src={feature.mockupSrc} 
            alt={feature.mockupAlt} 
            width={150}
            height={300}
            className="rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
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
    </div>
  );
};

export function KeyFeatures() {
  const { ref: sectionTitleRef, isInView: sectionTitleInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.5 });
  return (
    <section id="features" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={sectionTitleRef}
          className={cn(
            "text-center mb-12 opacity-0 transform translate-y-8 transition-all duration-700 ease-out",
            sectionTitleInView && "opacity-100 translate-y-0"
          )}
        >
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Unlock a Smarter Way to Bank
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            VaultbyChase offers innovative features designed for your convenience and security, accessible right from your pocket.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {keyFeaturesList.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
