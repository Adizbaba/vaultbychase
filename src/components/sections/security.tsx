
"use client";

import Image from 'next/image';
import { ShieldCheck, Lock, KeyRound, Fingerprint } from 'lucide-react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import { cn } from '@/lib/utils';

const securityFeatures = [
  { 
    icon: ShieldCheck, 
    title: "Advanced Encryption", 
    description: "All your data is protected with AES-256 bit end-to-end encryption, both in transit and at rest." 
  },
  { 
    icon: Lock, 
    title: "Multi-Factor Authentication (MFA)", 
    description: "Secure your account with an extra layer of protection beyond just your password, using OTPs or biometric verification." 
  },
  { 
    icon: Fingerprint, 
    title: "Biometric Access Control", 
    description: "Utilize fingerprint or facial recognition for quick and secure access to your accounts on compatible devices." 
  },
  { 
    icon: KeyRound, 
    title: "Proactive Fraud Monitoring", 
    description: "Our intelligent systems proactively monitor your accounts for suspicious activity 24/7 and alert you immediately." 
  },
];

export function Security() {
  const { ref: sectionTitleRef, isInView: sectionTitleInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.5 });
  const { ref: imageRef, isInView: imageInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.3 });
  const { ref: textContentRef, isInView: textContentInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="security" className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={sectionTitleRef}
          className={cn(
            "text-center mb-12 opacity-0 transform translate-y-8 transition-all duration-700 ease-out",
            sectionTitleInView && "opacity-100 translate-y-0"
          )}
        >
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Your Security is Our Priority
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            At VaultbyChase, we employ state-of-the-art security measures to protect your information and transactions. Bank with confidence knowing your financial well-being is safeguarded.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            ref={imageRef}
            className={cn(
              "relative h-80 md:h-[450px] rounded-lg overflow-hidden shadow-xl order-last md:order-first opacity-0 transform -translate-x-12 transition-all duration-700 ease-out",
              imageInView && "opacity-100 translate-x-0 delay-200"
            )}
          >
            <Image
              src="https://placehold.co/600x450.png"
              alt="Abstract security visual with a shield and lock"
              data-ai-hint="security technology shield"
              layout="fill"
              objectFit="cover"
              className="transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
          </div>
          <ul
            ref={textContentRef}
            className="space-y-6"
          >
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <li
                  key={index}
                  className={cn(
                    "flex items-start opacity-0 transform translate-x-8 transition-all duration-500 ease-out",
                    textContentInView && `opacity-100 translate-x-0 delay-${index * 150}`
                  )}
                >
                  <Icon className="h-8 w-8 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-xl text-secondary">{feature.title}</h3>
                    <p className="text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
