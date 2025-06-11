"use client";

import { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, Key, Fingerprint, Smartphone } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const securityFeatures = [
  {
    icon: Shield,
    title: "Bank-Level Encryption",
    description: "Your data is protected with AES-256 encryption, the same standard used by financial institutions worldwide."
  },
  {
    icon: Lock,
    title: "Multi-Factor Authentication",
    description: "Add an extra layer of security with 2FA, ensuring only you can access your account."
  },
  {
    icon: Eye,
    title: "Real-Time Monitoring",
    description: "Get instant alerts for any suspicious activity or unauthorized access attempts."
  },
  {
    icon: Key,
    title: "Secure Password Management",
    description: "Generate and store strong, unique passwords for all your accounts."
  },
  {
    icon: Fingerprint,
    title: "Biometric Authentication",
    description: "Use your fingerprint or face ID for quick and secure access to your vault."
  },
  {
    icon: Smartphone,
    title: "Mobile Security",
    description: "Secure your mobile devices with remote wipe capabilities and device management."
  }
];

export function SecuritySection() {
  const textContentRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (textContentRef.current) {
      observer.observe(textContentRef.current);
    }

    return () => {
      if (textContentRef.current) {
        observer.unobserve(textContentRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] lg:h-[500px] w-full">
            <Image
              src="https://res.cloudinary.com/dse63uv5p/image/upload/v1710864000/secured_ujcvqe.png"
              alt="Security illustration"
              fill
              className="object-cover rounded-lg shadow-xl"
              priority
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground">Your Security is Our Priority</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We employ industry-leading security measures to protect your sensitive information and ensure your peace of mind.
            </p>
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
                      "flex items-start gap-4 opacity-0 transform translate-y-5",
                      "animate-fade-in"
                    )}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
