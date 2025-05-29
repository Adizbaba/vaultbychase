
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  avatarFallback: string;
  quote: string;
  rating: number;
  aiHint: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah L.',
    role: 'Small Business Owner',
    avatar: 'https://placehold.co/100x100.png',
    avatarFallback: 'SL',
    quote: "VaultbyChase has revolutionized how I manage my business finances. The insights are invaluable!",
    rating: 5,
    aiHint: 'person portrait',
  },
  {
    name: 'John B.',
    role: 'Freelancer',
    avatar: 'https://placehold.co/100x100.png',
    avatarFallback: 'JB',
    quote: "The mobile app is fantastic and the security features give me peace of mind. Highly recommended.",
    rating: 5,
    aiHint: 'person portrait',
  },
  {
    name: 'Maria G.',
    role: 'Investor',
    avatar: 'https://placehold.co/100x100.png',
    avatarFallback: 'MG',
    quote: "Transferring funds and managing my investments has never been easier. Top-notch service!",
    rating: 4,
    aiHint: 'person portrait',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Trusted by Thousands
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-xl mx-auto">
            See what our satisfied customers are saying about VaultbyChase.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-background">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4 border-2 border-primary/20">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                    <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-secondary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-2">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} />
                  ))}
                </div>
                <blockquote className="text-foreground/90 italic text-sm">
                  "{testimonial.quote}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
