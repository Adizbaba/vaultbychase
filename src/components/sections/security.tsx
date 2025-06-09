
"use client";

import Image from 'next/image';
import { ShieldCheck, Lock, KeyRound, Fingerprint, AlertTriangle, Network } from 'lucide-react'; // Added more icons
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import { cn } from '@/lib/utils';

const securityFeatures = [
  { 
    icon: ShieldCheck, 
    title: "Bank-Grade Encryption", 
    description: "Your data is protected with AES-256 bit end-to-end encryption, safeguarding your information in transit and at rest." 
  },
  { 
    icon: Lock, 
    title: "Multi-Factor Authentication", 
    description: "Enhance account security with an extra layer of verification using OTPs or biometric authentication." 
  },
  { 
    icon: Fingerprint, 
    title: "Biometric Access", 
    description: "Utilize fingerprint or facial recognition for quick, secure access to your accounts on compatible devices." 
  },
  { 
    icon: AlertTriangle, // Changed icon
    title: "Real-Time Fraud Alerts", 
    description: "Our intelligent systems proactively monitor for suspicious activity 24/7 and notify you instantly." 
  },
  {
    icon: Network, // New feature
    title: "Secure Network Infrastructure",
    description: "Built on a robust and resilient infrastructure, designed to protect against modern cyber threats."
  }
];

export function Security() {
  const { ref: sectionTitleRef, isInView: sectionTitleInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.4 });
  const { ref: imageRef, isInView: imageInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.3 });
  const { ref: textContentRef, isInView: textContentInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="security" className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={sectionTitleRef}
          className={cn(
            "text-center mb-16 opacity-0 transform translate-y-10 transition-all duration-700 ease-out",
            sectionTitleInView && "opacity-100 translate-y-0"
          )}
        >
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            Your Security, Our Utmost Priority
          </h2>
          <p className="mt-5 text-lg text-foreground/80 max-w-2xl mx-auto">
            At VaultbyChase, we employ state-of-the-art security measures to protect your information and transactions. Bank with confidence knowing your financial well-being is safeguarded by multiple layers of defense.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          <div
            ref={imageRef}
            className={cn(
              "relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl order-last lg:order-first opacity-0 transform -translate-x-12 transition-all duration-700 ease-out",
              imageInView && "opacity-100 translate-x-0 delay-300"
            )}
          >
            <Image
              src="/secured.jpg"
              alt="Abstract cybersecurity visual representing data protection and network security"
              data-ai-hint="abstract security network blue"
              layout="fill"
              objectFit="cover"
              className="transform hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-secondary/20 opacity-70"></div>
            {/* Placeholder for Lottie Animation: Could be a looping animation of a shield or network graph */}
            {/* <div className="absolute inset-0 flex items-center justify-center">
              <Image src="https://placehold.co/200x200.png" alt="Lottie Security Animation" width={200} height={200} data-ai-hint="lottie animation shield protection"/>
            </div> */}
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
                    "flex items-start p-4 bg-muted/50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-out opacity-0 transform translate-y-5",
                    textContentInView && `opacity-100 translate-y-0 delay-${100 + index * 150}`
                  )}
                >
                  <div className="p-3 bg-primary/10 rounded-lg mr-5">
                     <Icon className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-secondary mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
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
