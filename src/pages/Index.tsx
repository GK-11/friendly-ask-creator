
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductShowcase from "@/components/ProductShowcase";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    const loadObserver = () => {
      const revealElements = document.querySelectorAll('.reveal-on-scroll');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
      
      revealElements.forEach(element => {
        observer.observe(element);
      });
    };
    
    // Wait for all elements to be in the DOM
    setTimeout(loadObserver, 100);
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <ProductShowcase />
      <Footer />
    </main>
  );
};

export default Index;
