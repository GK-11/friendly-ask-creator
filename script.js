
// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      menuToggle.textContent = navLinks.classList.contains('show') ? 'Close' : 'Menu';
    });
  }
  
  // Smooth scrolling for navigation links
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the target element
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Scroll smoothly to the target
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Account for fixed header
          behavior: 'smooth'
        });
        
        // Set active link
        document.querySelectorAll('.nav-links a').forEach(navLink => {
          navLink.classList.remove('active');
        });
        this.classList.add('active');
        
        // Close mobile menu if open
        if (navLinks.classList.contains('show')) {
          navLinks.classList.remove('show');
          menuToggle.textContent = 'Menu';
        }
      }
    });
  });
  
  // Add active class to nav links based on scroll position
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        document.querySelectorAll('.nav-links a').forEach(navLink => {
          navLink.classList.remove('active');
          if (navLink.getAttribute('href') === `#${sectionId}`) {
            navLink.classList.add('active');
          }
        });
      }
    });
  });
  
  // Fade in elements on scroll
  const fadeElements = document.querySelectorAll('.service-card, .about-content, .contact-container');
  
  // Create an Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fadeIn');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe each fade element
  fadeElements.forEach(element => {
    observer.observe(element);
  });
  
  // Form validation and submission handling
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form inputs
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Basic validation
      let isValid = true;
      
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Please enter your name');
        isValid = false;
      } else {
        removeError(nameInput);
      }
      
      if (!emailInput.value.trim()) {
        showError(emailInput, 'Please enter your email');
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
      } else {
        removeError(emailInput);
      }
      
      if (!messageInput.value.trim()) {
        showError(messageInput, 'Please enter your message');
        isValid = false;
      } else {
        removeError(messageInput);
      }
      
      // If form is valid, show success message
      if (isValid) {
        const formData = {
          name: nameInput.value,
          email: emailInput.value,
          message: messageInput.value
        };
        
        // Here you would normally send the data to a server
        console.log('Form submitted with data:', formData);
        
        // Show success message
        contactForm.innerHTML = `
          <div class="success-message">
            <h3>Thank you for your message!</h3>
            <p>We have received your inquiry and will get back to you soon.</p>
          </div>
        `;
      }
    });
  }
  
  // Helper function to show form errors
  function showError(input, message) {
    // Remove any existing error
    removeError(input);
    
    // Get the parent element (form group)
    const formGroup = input.parentElement;
    
    // Create error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // Add error class to input
    input.classList.add('error');
    
    // Append error message to form group
    formGroup.appendChild(errorElement);
  }
  
  // Helper function to remove form errors
  function removeError(input) {
    // Get the parent element (form group)
    const formGroup = input.parentElement;
    
    // Remove error class from input
    input.classList.remove('error');
    
    // Remove any existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
  }
  
  // Helper function to validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Button click effect
  const ctaButton = document.getElementById('cta-button');
  
  if (ctaButton) {
    ctaButton.addEventListener('click', function() {
      this.classList.add('clicked');
      
      // Show a popup or perform an action
      alert('Welcome to MyWebApp! This is where you would sign up or start using the app.');
      
      // Remove the effect after animation
      setTimeout(() => {
        this.classList.remove('clicked');
      }, 300);
    });
  }
  
  // Add some CSS for the form validation and button effect
  const style = document.createElement('style');
  style.textContent = `
    .error-message {
      color: #e53e3e;
      font-size: 14px;
      margin-top: 5px;
    }
    
    .form-group input.error,
    .form-group textarea.error {
      border-color: #e53e3e;
    }
    
    .success-message {
      background-color: #d4edda;
      color: #155724;
      padding: 20px;
      border-radius: 4px;
      text-align: center;
    }
    
    .clicked {
      transform: scale(0.95);
      transition: transform 0.1s;
    }
  `;
  document.head.appendChild(style);
});
