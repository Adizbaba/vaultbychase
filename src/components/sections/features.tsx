import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Users, ArrowRightLeft, CalendarCheck, CreditCard, Landmark, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: Activity,
    title: 'Financial Insights',
    description: 'Gain a clear view of your finances with intelligent dashboards and reports.',
  },
  {
    icon: Users,
    title: 'Account Management',
    description: 'Easily manage all your accounts, view balances, and track activities in one place.',
  },
  {
    icon: ArrowRightLeft,
    title: 'Seamless Transfers',
    description: 'Move money securely between your accounts or to external recipients with ease.',
  },
  {
    icon: CalendarCheck,
    title: 'Smart Bill Pay',
    description: 'Never miss a payment with our automated bill pay system and scheduling options.',
  },
  {
    icon: CreditCard,
    title: 'Credit Card Control',
    description: 'Manage your credit cards, track rewards, and monitor spending effortlessly.',
  },
  {
    icon: Landmark,
    title: 'Loan Portal',
    description: 'Access loan information, make payments, or apply for new loans through our portal.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Everything You Need, All in One Place
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            VaultbyChase provides a comprehensive suite of tools to empower your financial journey.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <feature.icon className="h-10 w-10 text-primary" />
                <CardTitle className="text-xl text-secondary">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
