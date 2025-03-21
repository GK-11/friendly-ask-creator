
document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      // Toggle a class for mobile menu display
      navLinks.classList.toggle('show');
      
      // Change button text based on menu state
      menuToggle.textContent = navLinks.classList.contains('show') ? 'Close' : 'Menu';
    });
  }
  
  // Smooth scrolling for navigation links
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          // Scroll smoothly to the target
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            menuToggle.textContent = 'Menu';
          }
        }
      }
    });
  });
  
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe all sections for scroll animations
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
  });
  
  // Add additional animation to feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    // Add staggered animation delay
    card.style.transitionDelay = `${index * 100}ms`;
    observer.observe(card);
  });
  
  // Simple form validation for a contact form (if you add one later)
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form inputs
      const nameInput = contactForm.querySelector('input[name="name"]');
      const emailInput = contactForm.querySelector('input[name="email"]');
      const messageInput = contactForm.querySelector('textarea[name="message"]');
      
      // Basic validation
      let isValid = true;
      
      if (nameInput && !nameInput.value.trim()) {
        isValid = false;
        showError(nameInput, 'Please enter your name');
      }
      
      if (emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
          isValid = false;
          showError(emailInput, 'Please enter a valid email');
        }
      }
      
      if (messageInput && !messageInput.value.trim()) {
        isValid = false;
        showError(messageInput, 'Please enter a message');
      }
      
      // If form is valid, show success message
      if (isValid) {
        alert('Form submitted successfully!');
        contactForm.reset();
      }
    });
  }
  
  // Helper function to show form errors
  function showError(input, message) {
    // Get the parent element (form group)
    const formGroup = input.closest('.form-group');
    
    // Create error message if it doesn't exist
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      formGroup.appendChild(errorElement);
    }
    
    // Add error class to input
    input.classList.add('error');
    
    // Set error message
    errorElement.textContent = message;
    
    // Remove error after 3 seconds
    setTimeout(() => {
      input.classList.remove('error');
      errorElement.textContent = '';
    }, 3000);
  }
  
  // Add a simple counter animation for any number elements you might want to add
  const counterElements = document.querySelectorAll('.counter');
  
  counterElements.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = Math.ceil(target / (duration / 16)); // 60fps
    
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      
      if (current >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = current;
        requestAnimationFrame(updateCounter);
      }
    };
    
    // Start counter animation when element comes into view
    observer.observe(counter);
    counter.addEventListener('visible', updateCounter);
  });
});

// Additional styling for mobile navigation
document.addEventListener('DOMContentLoaded', function() {
  // Add custom styles for mobile navigation
  const style = document.createElement('style');
  style.textContent = `
    .nav-links.show {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: white;
      padding: 1rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      z-index: 100;
    }
    
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s, transform 0.5s;
    }
    
    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .feature-card.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
    
    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }
    
    input.error,
    textarea.error {
      border-color: #ef4444;
    }
  `;
  document.head.appendChild(style);
});
