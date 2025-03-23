/* Newsletter functionality for AIToolHub */

// Newsletter form elements
const newsletterForm = document.getElementById('newsletter-form');
const emailInput = document.getElementById('newsletter-email');
const submitButton = document.getElementById('newsletter-submit');
const successMessage = document.getElementById('newsletter-success');
const errorMessage = document.getElementById('newsletter-error');

// Lead magnet download elements
const downloadButton = document.getElementById('download-lead-magnet');
const premiumTeaser = document.getElementById('premium-newsletter-teaser');

// Newsletter signup handler
function handleNewsletterSignup(event) {
  event.preventDefault();
  
  // Basic validation
  const email = emailInput.value.trim();
  if (!email || !isValidEmail(email)) {
    showError('Please enter a valid email address');
    return;
  }
  
  // In a production environment, this would send the data to a server
  // For now, we'll simulate the signup process
  
  // Show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = 'Signing up...';
  
  // Simulate server request
  setTimeout(() => {
    // Store in localStorage for persistence
    localStorage.setItem('newsletter_signup', 'true');
    localStorage.setItem('subscriber_email', email);
    
    // Track signup in analytics
    if (window.gtag) {
      gtag('event', 'newsletter_signup', {
        'email_provided': true
      });
    }
    
    // Show success message
    hideElement(newsletterForm);
    showElement(successMessage);
    
    // Show lead magnet download option
    if (downloadButton) {
      showElement(downloadButton);
    }
    
    // Show premium newsletter teaser after successful signup
    if (premiumTeaser) {
      setTimeout(() => {
        showElement(premiumTeaser);
      }, 3000); // Show after 3 seconds
    }
  }, 1500); // Simulate 1.5s server delay
}

// Email validation function
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

// Error display function
function showError(message) {
  if (errorMessage) {
    errorMessage.textContent = message;
    showElement(errorMessage);
    
    // Hide error after 3 seconds
    setTimeout(() => {
      hideElement(errorMessage);
    }, 3000);
  }
}

// Helper functions for showing/hiding elements
function showElement(element) {
  if (element) {
    element.style.display = 'block';
  }
}

function hideElement(element) {
  if (element) {
    element.style.display = 'none';
  }
}

// Lead magnet download handler
function handleLeadMagnetDownload() {
  // Track download in analytics
  if (window.gtag) {
    gtag('event', 'lead_magnet_download', {
      'lead_magnet': 'top_50_ai_tools_guide'
    });
  }
  
  // In a production environment, this would trigger the actual download
  // For now, we'll just show a message
  alert('Your download is starting. Thank you for subscribing!');
  
  // Hide the download button after click
  hideElement(downloadButton);
}

// Premium newsletter teaser handler
function handlePremiumTeaser() {
  // Track interest in premium newsletter
  if (window.gtag) {
    gtag('event', 'premium_newsletter_interest');
  }
  
  // Show premium newsletter info
  const premiumInfo = document.getElementById('premium-newsletter-info');
  if (premiumInfo) {
    showElement(premiumInfo);
  }
}

// Exit intent detection for newsletter signup
function setupExitIntent() {
  // Only show exit intent popup if user hasn't subscribed yet
  if (localStorage.getItem('newsletter_signup') === 'true') {
    return;
  }
  
  // Get exit intent popup elements
  const exitPopup = document.getElementById('exit-intent-popup');
  const closeButton = document.getElementById('exit-popup-close');
  
  if (!exitPopup) return;
  
  // Show popup when user moves mouse out of the window (indicating they might leave)
  document.addEventListener('mouseout', function(e) {
    // If the mouse leaves the window at the top
    if (e.clientY < 5 && !localStorage.getItem('exit_popup_shown')) {
      showElement(exitPopup);
      
      // Track popup display in analytics
      if (window.gtag) {
        gtag('event', 'exit_intent_popup_shown');
      }
      
      // Remember that we've shown the popup
      localStorage.setItem('exit_popup_shown', 'true');
    }
  });
  
  // Close button functionality
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      hideElement(exitPopup);
    });
  }
}

// Initialize newsletter functionality
document.addEventListener('DOMContentLoaded', function() {
  // Set up newsletter form submission
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSignup);
  }
  
  // Set up lead magnet download
  if (downloadButton) {
    downloadButton.addEventListener('click', handleLeadMagnetDownload);
  }
  
  // Set up premium newsletter teaser
  if (premiumTeaser) {
    premiumTeaser.addEventListener('click', handlePremiumTeaser);
  }
  
  // Check if user is already subscribed
  if (localStorage.getItem('newsletter_signup') === 'true') {
    // Hide the form and show success message
    if (newsletterForm) hideElement(newsletterForm);
    if (successMessage) showElement(successMessage);
    if (downloadButton) showElement(downloadButton);
  }
  
  // Set up exit intent detection
  setupExitIntent();
});
