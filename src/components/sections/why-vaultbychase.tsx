
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

const benefits = [
  { text: "FDIC Insured Deposits", icon: CheckCircle },
  { text: "Zero Monthly Maintenance Fees", icon: CheckCircle },
  { text: "Advanced Encryption & Biometric Security", icon: CheckCircle },
  { text: "24/7 Human & AI Powered Customer Support", icon: CheckCircle },
];

export function WhyVaultbyChase() {
  return (
    <section id="why-vaultbychase" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Why Choose VaultbyChase?
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Experience banking that's built around you – secure, intelligent, and always accessible.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-secondary">Your Financial Partner, Reimagined</h3>
            <p className="text-muted-foreground">
              We're committed to providing you with a banking experience that's not only secure and reliable but also intuitive and empowering. Discover the VaultbyChase difference.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <benefit.icon className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span className="text-secondary font-medium">{benefit.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 md:h-[450px] rounded-lg overflow-hidden shadow-xl flex items-center justify-center bg-muted p-8">
            <Image
              src="https://placehold.co/400x300.png" // Dashboard/App interface
              alt="VaultbyChase Dashboard Interface"
              data-ai-hint="dashboard interface"
              width={400}
              height={300}
              className="rounded-lg shadow-2xl object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
