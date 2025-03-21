
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/30 border-t border-border/30 pt-16 pb-8">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link 
              to="/" 
              className="text-xl font-semibold tracking-tight mb-6 inline-block"
            >
              PureDesign
            </Link>
            <p className="text-muted-foreground max-w-md mt-2 mb-6">
              Creating products with the perfect balance of form and function. 
              We believe in the power of simplicity and attention to detail.
            </p>
            <div className="flex space-x-4">
              {["Twitter", "Instagram", "LinkedIn", "GitHub"].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label={social}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Downloads", "Updates"].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              {["About", "Blog", "Careers", "Contact"].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} PureDesign. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
