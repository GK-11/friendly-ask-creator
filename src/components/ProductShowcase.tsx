
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const specs = [
  {
    label: "Design",
    value: "Minimalist, timeless aesthetic"
  },
  {
    label: "Materials",
    value: "Premium, sustainable components"
  },
  {
    label: "Dimensions",
    value: "Precisely engineered for comfort"
  },
  {
    label: "Interface",
    value: "Intuitive, responsive controls"
  }
];

const images = [
  {
    src: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Premium product front view" 
  },
  {
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Premium product side view"
  },
  {
    src: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Premium product detail view"
  }
];

const ProductShowcase = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveImage((current) => (current === images.length - 1 ? 0 : current + 1));
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section 
      id="product" 
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="flex flex-col order-2 lg:order-1">
            <div className="reveal-on-scroll">
              <div className="inline-flex items-center px-3 py-1 mb-6 text-xs rounded-full bg-primary/5 text-primary-foreground/80 border border-primary/10">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary/80"></span>
                Premium Quality
              </div>
              <h2 className="text-4xl font-semibold mb-6">Exceptional in Every Detail</h2>
              <p className="text-muted-foreground mb-8 max-w-lg">
                Discover the perfect balance of innovative technology and timeless design. Each element has been considered to create an exceptional user experience.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              {specs.map((spec, index) => (
                <div 
                  key={index} 
                  className="reveal-on-scroll"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">{spec.label}</h4>
                  <p className="text-base font-medium">{spec.value}</p>
                </div>
              ))}
            </div>
            
            <div className="reveal-on-scroll">
              <a href="#" className="btn-primary">
                Explore Product
              </a>
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2 reveal-on-scroll">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative">
              {images.map((image, index) => (
                <div 
                  key={index}
                  className={cn(
                    "absolute inset-0 transition-all duration-500 ease-in-out",
                    activeImage === index ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  )}
                  style={{ zIndex: activeImage === index ? 10 : 0 }}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover rounded-2xl shadow-xl"
                    style={{ aspectRatio: "4/3" }}
                    loading="lazy"
                  />
                </div>
              ))}
              <div 
                className="relative z-0"
                style={{ opacity: 0, aspectRatio: "4/3" }}
              >
                <img 
                  src={images[0].src} 
                  alt="Invisible spacer" 
                  className="w-full rounded-2xl invisible"
                />
              </div>
            </div>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    activeImage === index 
                      ? "bg-primary w-6" 
                      : "bg-primary/30 hover:bg-primary/50"
                  )}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
