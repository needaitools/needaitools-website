/* Additional SEO optimizations for AIToolHub */

/* Schema.org markup for Tool Directory */
const schemaScript = document.createElement('script');
schemaScript.type = 'application/ld+json';
schemaScript.innerHTML = `
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AIToolHub",
  "url": "https://aitoolhub.tech",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://aitoolhub.tech/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "description": "Comprehensive directory of AI tools for productivity, creativity, and business"
}
`;
document.head.appendChild(schemaScript);

/* Affiliate link tracking */
function trackAffiliateClick(toolId, affiliateId) {
  // Record click in analytics
  if (window.gtag) {
    gtag('event', 'affiliate_click', {
      'tool_id': toolId,
      'affiliate_id': affiliateId
    });
  }
  
  // Set tracking cookie for attribution
  setCookie('aff_click_' + toolId, affiliateId, 30);
  
  // Return true to allow the link to continue
  return true;
}

/* Cookie utility functions */
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

/* Newsletter signup handling */
function handleNewsletterSignup(event) {
  event.preventDefault();
  
  const email = document.getElementById('newsletter-email').value;
  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address');
    return;
  }
  
  // In a real implementation, this would send the email to a server
  // For now, we'll just simulate success
  
  // Track signup in analytics
  if (window.gtag) {
    gtag('event', 'newsletter_signup', {
      'email_provided': true
    });
  }
  
  // Show success message
  document.getElementById('newsletter-form').style.display = 'none';
  document.getElementById('newsletter-success').style.display = 'block';
  
  // Store in local storage for persistence
  localStorage.setItem('newsletter_signup', 'true');
}

/* Featured tool rotation */
function rotateFeaturedTools() {
  const featuredTools = document.querySelectorAll('.featured-tool');
  if (featuredTools.length < 2) return;
  
  // Hide all tools
  featuredTools.forEach(tool => {
    tool.style.display = 'none';
  });
  
  // Get current index from storage or default to 0
  let currentIndex = parseInt(localStorage.getItem('featured_tool_index') || '0');
  
  // Increment and wrap around if needed
  currentIndex = (currentIndex + 1) % featuredTools.length;
  
  // Show the current tool
  featuredTools[currentIndex].style.display = 'block';
  
  // Save the new index
  localStorage.setItem('featured_tool_index', currentIndex.toString());
}

// Set up rotation interval for featured tools
setInterval(rotateFeaturedTools, 10000); // Rotate every 10 seconds

/* Load tools from JSON */
async function loadTools() {
  try {
    const response = await fetch('/js/tools-data.json');
    const data = await response.json();
    
    // Process tools data
    renderTools(data.tools);
    
    // Initialize filters
    setupFilters(data.tools);
    
    // Track successful data load
    if (window.gtag) {
      gtag('event', 'tools_data_loaded', {
        'count': data.tools.length
      });
    }
  } catch (error) {
    console.error('Error loading tools data:', error);
    
    // Show error message to user
    const toolsContainer = document.getElementById('tools-container');
    if (toolsContainer) {
      toolsContainer.innerHTML = '<div class="error-message">Sorry, we encountered an error loading the tools. Please try refreshing the page.</div>';
    }
  }
}

/* Render tools to the page */
function renderTools(tools) {
  const toolsContainer = document.getElementById('tools-container');
  if (!toolsContainer) return;
  
  toolsContainer.innerHTML = '';
  
  tools.forEach(tool => {
    const toolElement = document.createElement('div');
    toolElement.className = 'tool-card';
    toolElement.setAttribute('data-category', tool.category);
    toolElement.setAttribute('data-tags', tool.tags.join(','));
    toolElement.setAttribute('data-pricing', tool.pricing);
    
    // Generate affiliate link with tracking
    const affiliateLink = tool.hasAffiliate ? tool.affiliateLink : tool.url;
    const onClickHandler = tool.hasAffiliate ? 
      `onclick="return trackAffiliateClick('${tool.id}', 'main_listing')"` : '';
    
    toolElement.innerHTML = `
      <div class="tool-header">
        <img src="${tool.logo || 'img/placeholder-logo.png'}" alt="${tool.name} logo" class="tool-logo">
        <div class="tool-title">
          <h3>${tool.name}</h3>
          <div class="tool-rating">
            ${'★'.repeat(Math.floor(tool.ratings.overall))}${'☆'.repeat(5 - Math.floor(tool.ratings.overall))}
            <span class="rating-number">${tool.ratings.overall}</span>
          </div>
        </div>
      </div>
      <p class="tool-description">${tool.shortDescription || tool.description.substring(0, 100) + '...'}</p>
      <div class="tool-category">${tool.category}</div>
      <div class="tool-pricing">${tool.pricing} ${tool.pricing !== 'Free' ? '- ' + tool.pricingAmount : ''}</div>
      <div class="tool-actions">
        <a href="tool-detail.html?id=${tool.id}" class="btn btn-secondary">View Details</a>
        <a href="${affiliateLink}" class="btn btn-primary" target="_blank" ${onClickHandler}>Visit Website</a>
      </div>
    `;
    
    toolsContainer.appendChild(toolElement);
  });
}

/* Setup filtering functionality */
function setupFilters(tools) {
  // Extract unique categories
  const categories = [...new Set(tools.map(tool => tool.category))];
  
  // Populate category filter
  const categoryFilter = document.getElementById('category-filter');
  if (categoryFilter) {
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
      categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
    });
  }
  
  // Extract unique pricing models
  const pricingModels = [...new Set(tools.map(tool => tool.pricing))];
  
  // Populate pricing filter
  const pricingFilter = document.getElementById('pricing-filter');
  if (pricingFilter) {
    pricingFilter.innerHTML = '<option value="all">All Pricing</option>';
    pricingModels.forEach(model => {
      pricingFilter.innerHTML += `<option value="${model}">${model}</option>`;
    });
  }
  
  // Set up event listeners for filters
  if (categoryFilter) {
    categoryFilter.addEventListener('change', applyFilters);
  }
  
  if (pricingFilter) {
    pricingFilter.addEventListener('change', applyFilters);
  }
  
  // Set up search functionality
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
}

/* Apply filters to tools */
function applyFilters() {
  const categoryFilter = document.getElementById('category-filter');
  const pricingFilter = document.getElementById('pricing-filter');
  const searchInput = document.getElementById('search-input');
  
  const categoryValue = categoryFilter ? categoryFilter.value : 'all';
  const pricingValue = pricingFilter ? pricingFilter.value : 'all';
  const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
  
  const toolCards = document.querySelectorAll('.tool-card');
  
  toolCards.forEach(card => {
    const category = card.getAttribute('data-category');
    const pricing = card.getAttribute('data-pricing');
    const tags = card.getAttribute('data-tags');
    const title = card.querySelector('.tool-title h3').textContent.toLowerCase();
    const description = card.querySelector('.tool-description').textContent.toLowerCase();
    
    const matchesCategory = categoryValue === 'all' || category === categoryValue;
    const matchesPricing = pricingValue === 'all' || pricing === pricingValue;
    const matchesSearch = searchValue === '' || 
                          title.includes(searchValue) || 
                          description.includes(searchValue) || 
                          tags.toLowerCase().includes(searchValue);
    
    if (matchesCategory && matchesPricing && matchesSearch) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  
  // Track filter usage
  if (window.gtag) {
    gtag('event', 'filter_applied', {
      'category': categoryValue,
      'pricing': pricingValue,
      'search': searchValue !== ''
    });
  }
}

/* Sponsored listing handling */
function setupSponsoredListings() {
  const sponsoredTools = [
    // This would typically come from a database or API
    // For now, we'll hardcode a few examples
    {
      id: 'ai-writer-pro',
      name: 'AI Writer Pro',
      description: 'Advanced AI writing assistant with premium features',
      logo: 'img/placeholder-logo.png',
      url: 'https://example.com/ai-writer-pro',
      affiliateLink: 'https://example.com/ai-writer-pro?ref=aitoolhub',
      hasAffiliate: true
    },
    {
      id: 'pixel-genius',
      name: 'PixelGenius',
      description: 'Create stunning images with AI technology',
      logo: 'img/placeholder-logo.png',
      url: 'https://example.com/pixel-genius',
      affiliateLink: 'https://example.com/pixel-genius?ref=aitoolhub',
      hasAffiliate: true
    }
  ];
  
  const sponsoredContainer = document.getElementById('sponsored-tools');
  if (!sponsoredContainer) return;
  
  sponsoredContainer.innerHTML = '<h3>Featured AI Tools</h3>';
  
  sponsoredTools.forEach(tool => {
    const toolElement = document.createElement('div');
    toolElement.className = 'sponsored-tool-card';
    
    const onClickHandler = tool.hasAffiliate ? 
      `onclick="return trackAffiliateClick('${tool.id}', 'sponsored')"` : '';
    
    toolElement.innerHTML = `
      <div class="sponsored-badge">Featured</div>
      <div class="tool-header">
        <img src="${tool.logo}" alt="${tool.name} logo" class="tool-logo">
        <h3>${tool.name}</h3>
      </div>
      <p>${tool.description}</p>
      <a href="${tool.hasAffiliate ? tool.affiliateLink : tool.url}" 
         class="btn btn-primary" 
         target="_blank"
         ${onClickHandler}>
        Try Now
      </a>
    `;
    
    sponsoredContainer.appendChild(toolElement);
  });
}

/* Initialize everything when the DOM is loaded */
document.addEventListener('DOMContentLoaded', function() {
  // Load tools data
  loadTools();
  
  // Setup sponsored listings
  setupSponsoredListings();
  
  // Initialize newsletter form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSignup);
  }
  
  // Start featured tool rotation
  rotateFeaturedTools();
  
  // Track page view
  if (window.gtag) {
    gtag('event', 'page_view');
  }
});
