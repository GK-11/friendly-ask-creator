
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 md:py-5 px-6 md:px-10",
        scrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-semibold tracking-tight transition-opacity hover:opacity-90"
        >
          PureDesign
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link py-1">Home</Link>
          <Link to="#features" className="nav-link py-1">Features</Link>
          <Link to="#product" className="nav-link py-1">Product</Link>
          <Link to="#" className="btn-primary">
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="relative w-6 h-5">
            <span 
              className={cn(
                "absolute block h-0.5 bg-foreground rounded-full transition-all duration-300 ease-out",
                "left-0 right-0",
                mobileMenuOpen ? "top-2 rotate-45" : "top-0"
              )} 
            />
            <span 
              className={cn(
                "absolute left-0 right-0 top-2 block h-0.5 bg-foreground rounded-full transition-opacity",
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              )} 
            />
            <span 
              className={cn(
                "absolute block h-0.5 bg-foreground rounded-full transition-all duration-300 ease-out",
                "left-0 right-0",
                mobileMenuOpen ? "top-2 -rotate-45" : "top-4"
              )} 
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-sm flex flex-col transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8 text-lg">
          <Link 
            to="/" 
            className="nav-link py-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="#features" 
            className="nav-link py-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </Link>
          <Link 
            to="#product" 
            className="nav-link py-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            Product
          </Link>
          <Link 
            to="#" 
            className="btn-primary mt-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
