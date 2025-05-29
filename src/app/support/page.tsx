import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Phone, Mail, MessageSquare } from 'lucide-react';

export default function SupportPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">Customer Support</h1>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            We&apos;re here to help. Find answers to common questions or get in touch with our support team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information & Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-secondary">Contact Us</CardTitle>
              <CardDescription>Reach out to us through any of these channels, or send us a message directly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-primary" />
                <span>1-800-VAULT-CH (1-800-828-5824)</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-primary" />
                <span>support@vaultbychase.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-6 w-6 text-primary" />
                <span>Live Chat (Available Mon-Fri, 9am-5pm EST)</span>
              </div>
              
              <form className="space-y-4 pt-4 border-t">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">Full Name</label>
                  <Input id="name" type="text" placeholder="Your Name" className="mt-1" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">Email Address</label>
                  <Input id="email" type="email" placeholder="you@example.com" className="mt-1" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
                  <Textarea id="message" placeholder="How can we help you?" className="mt-1" rows={4} />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-secondary">Frequently Asked Questions</CardTitle>
              <CardDescription>Find quick answers to common questions below.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                  <AccordionContent>
                    You can reset your password by clicking the &quot;Forgot password?&quot; link on the login page. Follow the instructions sent to your email.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What are the transaction limits?</AccordionTrigger>
                  <AccordionContent>
                    Transaction limits vary depending on your account type and security settings. You can find detailed information in your account dashboard under &quot;Account Details&quot;.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How do I report a suspicious transaction?</AccordionTrigger>
                  <AccordionContent>
                    If you notice any suspicious activity on your account, please contact us immediately via phone or live chat. You can also flag transactions within your transaction history in the dashboard.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Is my money FDIC insured?</AccordionTrigger>
                  <AccordionContent>
                    Yes, VaultbyChase is a Member FDIC. Your eligible deposits are insured up to the maximum amount allowed by law.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
