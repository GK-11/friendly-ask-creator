
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            titleRef.current?.classList.add("animate-slide-down");
            subtitleRef.current?.classList.add("animate-slide-up");
            ctaRef.current?.classList.add("animate-fade-in");
            imageRef.current?.classList.add("animate-scale-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[90vh] pt-20 overflow-hidden flex items-center"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />
      
      <div className="container relative z-10 px-6 pt-20 pb-24 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="flex flex-col items-start justify-center">
            <div className="inline-flex items-center px-3 py-1 mb-6 text-xs rounded-full bg-primary/5 text-primary-foreground/80 border border-primary/10">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary/80"></span>
              Introducing a new experience
            </div>
            
            <h1 
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight opacity-0"
            >
              Simple. <br className="hidden sm:block" />
              <span className="text-primary/80">Beautiful.</span> <br className="hidden sm:block" />
              Functional.
            </h1>
            
            <p 
              ref={subtitleRef}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-md opacity-0"
            >
              Experience perfect harmony of form and function. A product designed with meticulous attention to every detail.
            </p>
            
            <div 
              ref={ctaRef}
              className="mt-10 flex flex-wrap gap-4 opacity-0"
            >
              <a href="#" className="btn-primary">
                Get Started
                <svg 
                  className="ml-1.5 w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
              <a href="#features" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl blur-xl opacity-50 animate-image-glow"></div>
            <div className="relative flex items-center justify-center">
              <div className="w-full h-full absolute bg-gradient-to-br from-secondary/40 to-background/5 rounded-2xl blur-2xl"></div>
              <img 
                ref={imageRef}
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Minimalist product display" 
                className="relative z-10 rounded-2xl shadow-xl object-cover w-full max-w-lg mx-auto opacity-0 transition-all duration-700"
                style={{ aspectRatio: "4/3" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
        <span className="text-sm text-muted-foreground/70 mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-muted-foreground/20 rounded-full flex justify-center">
          <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-[bounce_1.5s_infinite] mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
