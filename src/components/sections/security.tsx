
import Image from 'next/image';
import { ShieldCheck, Lock, KeyRound, Fingerprint } from 'lucide-react';

export function Security() {
  return (
    <section id="security" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Your Security is Our Priority
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            At VaultbyChase, we employ state-of-the-art security measures to protect your information and transactions. Bank with confidence knowing your financial well-being is safeguarded.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 md:h-[450px] rounded-lg overflow-hidden shadow-xl order-last md:order-first">
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
          <ul className="space-y-6">
            <li className="flex items-start">
              <ShieldCheck className="h-8 w-8 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-xl text-secondary">Advanced Encryption</h3>
                <p className="text-muted-foreground mt-1">All your data is protected with AES-256 bit end-to-end encryption, both in transit and at rest.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Lock className="h-8 w-8 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-xl text-secondary">Multi-Factor Authentication (MFA)</h3>
                <p className="text-muted-foreground mt-1">Secure your account with an extra layer of protection beyond just your password, using OTPs or biometric verification.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Fingerprint className="h-8 w-8 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-xl text-secondary">Biometric Access Control</h3>
                <p className="text-muted-foreground mt-1">Utilize fingerprint or facial recognition for quick and secure access to your accounts on compatible devices.</p>
              </div>
            </li>
            <li className="flex items-start">
              <KeyRound className="h-8 w-8 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-xl text-secondary">Proactive Fraud Monitoring</h3>
                <p className="text-muted-foreground mt-1">Our intelligent systems proactively monitor your accounts for suspicious activity 24/7 and alert you immediately.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

