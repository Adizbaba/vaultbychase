"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import { cn } from '@/lib/utils';

export function Hero() {
  const { ref: textContentRef, isInView: textContentInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.2 });
  const { ref: imageContainerRef, isInView: imageContainerInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.3, rootMargin: "-100px 0px" });
  const { ref: lottieRef, isInView: lottieInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.5 });

  return (
    <section id="home" className="relative bg-gradient-to-br from-muted via-background to-primary/5 py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 -z-10 opacity-50 dark:opacity-30">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-secondary/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-accent/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full filter blur-3xl animate-blob animation-delay-1000"></div>
      </div>
      <style jsx>{`
        .animate-blob {
          animation: blob 12s infinite alternate;
        }
        .animation-delay-1000 {
          animation-delay: -1s;
        }
        .animation-delay-2000 {
          animation-delay: -2s;
        }
        .animation-delay-4000 {
          animation-delay: -4s;
        }
        @keyframes blob {
          0% { transform: scale(1) translate(0px, 0px) rotate(0deg); }
          33% { transform: scale(1.1) translate(30px, -50px) rotate(120deg); }
          66% { transform: scale(0.9) translate(-20px, 20px) rotate(240deg); }
          100% { transform: scale(1) translate(0px, 0px) rotate(360deg); }
        }
      `}</style>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            ref={textContentRef}
            className={cn(
              "text-center lg:text-left opacity-0 transform translate-y-10 transition-all duration-1000 ease-out",
              textContentInView && "opacity-100 translate-y-0"
            )}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Next-Gen Banking Platform</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Banking Reimagined. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary to-secondary animate-gradient">
                Smart, Secure, Seamless.
              </span>
            </h1>
            <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              VaultbyChase empowers you with intelligent financial tools, bank-grade security, and real-time access to manage your money with confidence, anywhere.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button 
                size="lg" 
                asChild 
                className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transform px-8 py-6 text-base font-semibold"
              >
                <Link href="/signup">
                  <span className="relative z-10 flex items-center">
                    Open Your Account <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-primary/50 text-primary hover:bg-primary/5 hover:scale-105 transform px-8 py-6 text-base font-semibold"
              >
                <Link href="/login">
                  <span className="relative z-10">Log In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex justify-center lg:justify-start space-x-4 opacity-80">
              <Link href="#" aria-label="Download on the App Store" className="group">
                <Image 
                  src="https://res.cloudinary.com/dse63uv5p/image/upload/v1749602189/App_Store_c47thz.png" 
                  alt="App Store" 
                  width={135} 
                  height={40} 
                  data-ai-hint="app store badge dark" 
                  className="rounded-md transition-all duration-300 filter grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 group-hover:shadow-lg"
                />
              </Link>
              <Link href="#" aria-label="Get it on Google Play" className="group">
                <Image 
                  src="https://res.cloudinary.com/dse63uv5p/image/upload/v1749602189/Google_Play_o4ehxz.png" 
                  alt="Google Play" 
                  width={135} 
                  height={40} 
                  data-ai-hint="google play badge dark" 
                  className="rounded-md transition-all duration-300 filter grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 group-hover:shadow-lg"
                />
              </Link>
            </div>
          </div>
          <div
            ref={imageContainerRef}
            className={cn(
              "relative flex justify-center items-center mt-12 lg:mt-0 opacity-0 transform scale-90 transition-all duration-1000 ease-out",
              imageContainerInView && "opacity-100 scale-100 delay-200"
            )}
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-[2.5rem] blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient"></div>
              <Image 
                src="https://res.cloudinary.com/dse63uv5p/image/upload/v1749602190/card_copy_dwu31u.jpg" 
                alt="VaultbyChase app on a modern smartphone"
                width={320} 
                height={640} 
                priority
                className="relative rounded-[2.5rem] shadow-2xl z-[1] transform transition-all duration-500 group-hover:scale-105 border-4 border-foreground/5"
                data-ai-hint="modern banking app phone glowing"
              />
              <div
                ref={lottieRef} 
                className={cn(
                  "absolute -bottom-10 -right-10 w-48 h-48 opacity-0 transform scale-75 transition-all duration-700 ease-out z-[2]",
                  lottieInView && "opacity-100 scale-100 delay-500"
                )}
              >
                <Image 
                  src="/phone.png" 
                  alt="Abstract financial technology animation" 
                  width={250} 
                  height={150}
                  className="filter hover:scale-110 transition-transform duration-300" 
                  data-ai-hint="lottie animation abstract tech data"
                />
              </div>
              <div className="absolute -top-8 -left-12 bg-background/80 backdrop-blur-sm p-3 rounded-xl shadow-xl z-[3] transform transition-all duration-500 hover:scale-110 group-hover:shadow-primary/20">
                <ShieldCheck className="w-10 h-10 text-primary"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
