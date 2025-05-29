import Image from 'next/image';
import { ShieldCheck, Lock, KeyRound } from 'lucide-react';

export function Security() {
  return (
    <section id="security" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Your Security is Our Priority
            </h2>
            <p className="mt-6 text-lg text-foreground/80">
              At VaultbyChase, we employ state-of-the-art security measures to protect your information and transactions. Bank with confidence knowing your financial well-being is safeguarded.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-start">
                <ShieldCheck className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary">Advanced Encryption</h3>
                  <p className="text-muted-foreground">All your data is protected with end-to-end encryption, both in transit and at rest.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Lock className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary">Multi-Factor Authentication</h3>
                  <p className="text-muted-foreground">Secure your account with an extra layer of protection beyond just your password.</p>
                </div>
              </li>
              <li className="flex items-start">
                <KeyRound className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary">Fraud Monitoring</h3>
                  <p className="text-muted-foreground">We proactively monitor your accounts for suspicious activity and alert you immediately.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Abstract security visual"
              data-ai-hint="security technology"
              layout="fill"
              objectFit="cover"
              className="transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
