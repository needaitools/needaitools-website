/* SEO optimization for AIToolHub */

// Meta tag optimization
function optimizeMetaTags() {
  // Set canonical URL
  const canonicalLink = document.createElement('link');
  canonicalLink.rel = 'canonical';
  canonicalLink.href = window.location.href.split('?')[0]; // Remove query parameters
  document.head.appendChild(canonicalLink);
  
  // Add meta description if not present
  if (!document.querySelector('meta[name="description"]')) {
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    
    // Set appropriate description based on page
    if (window.location.pathname.includes('tool-detail')) {
      // For tool detail pages
      const toolName = document.querySelector('h1')?.textContent || 'AI Tool';
      metaDescription.content = `Discover ${toolName} - features, pricing, alternatives, and reviews. Find the best AI tools at AIToolHub.`;
    } else if (window.location.pathname.includes('compare')) {
      // For comparison pages
      metaDescription.content = 'Compare AI tools side-by-side. See features, pricing, pros and cons to find the perfect AI tool for your needs.';
    } else {
      // For homepage and other pages
      metaDescription.content = 'Discover the best AI tools for productivity, creativity, and business. Comprehensive AI tool directory with reviews, comparisons, and recommendations.';
    }
    
    document.head.appendChild(metaDescription);
  }
  
  // Add open graph tags for social sharing
  addOpenGraphTags();
  
  // Add Twitter card tags
  addTwitterCardTags();
}

// Open Graph tags for better social sharing
function addOpenGraphTags() {
  const ogTags = {
    'og:type': 'website',
    'og:site_name': 'AIToolHub',
    'og:url': window.location.href,
    'og:title': document.title,
    'og:description': document.querySelector('meta[name="description"]')?.content || 'Discover the best AI tools at AIToolHub.'
  };
  
  // Add image tag if we have a featured image
  const featuredImage = document.querySelector('.featured-image') || document.querySelector('.tool-logo');
  if (featuredImage) {
    ogTags['og:image'] = featuredImage.src;
  } else {
    ogTags['og:image'] = '/img/aitoolhub-social.png'; // Default social sharing image
  }
  
  // Create and append OG tags
  Object.entries(ogTags).forEach(([property, content]) => {
    if (!document.querySelector(`meta[property="${property}"]`)) {
      const metaTag = document.createElement('meta');
      metaTag.setAttribute('property', property);
      metaTag.content = content;
      document.head.appendChild(metaTag);
    }
  });
}

// Twitter card tags for better Twitter sharing
function addTwitterCardTags() {
  const twitterTags = {
    'twitter:card': 'summary_large_image',
    'twitter:site': '@AIToolHub',
    'twitter:title': document.title,
    'twitter:description': document.querySelector('meta[name="description"]')?.content || 'Discover the best AI tools at AIToolHub.'
  };
  
  // Add image tag if we have a featured image
  const featuredImage = document.querySelector('.featured-image') || document.querySelector('.tool-logo');
  if (featuredImage) {
    twitterTags['twitter:image'] = featuredImage.src;
  } else {
    twitterTags['twitter:image'] = '/img/aitoolhub-social.png'; // Default social sharing image
  }
  
  // Create and append Twitter tags
  Object.entries(twitterTags).forEach(([name, content]) => {
    if (!document.querySelector(`meta[name="${name}"]`)) {
      const metaTag = document.createElement('meta');
      metaTag.name = name;
      metaTag.content = content;
      document.head.appendChild(metaTag);
    }
  });
}

// Add structured data for rich snippets
function addStructuredData() {
  // Website schema
  const websiteSchema = {
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
  };
  
  // Add website schema to all pages
  addJsonLdSchema(websiteSchema);
  
  // Add specific schema based on page type
  if (window.location.pathname.includes('tool-detail')) {
    addToolDetailSchema();
  } else if (window.location.pathname.includes('compare')) {
    addComparisonPageSchema();
  } else if (window.location.pathname === '/' || window.location.pathname.includes('index')) {
    addDirectorySchema();
  }
}

// Add JSON-LD schema to the page
function addJsonLdSchema(schema) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(schema);
  document.head.appendChild(script);
}

// Add schema for tool detail pages
function addToolDetailSchema() {
  // Get tool data from the page
  const toolName = document.querySelector('h1')?.textContent;
  const toolDescription = document.querySelector('.tool-description')?.textContent;
  const toolRating = document.querySelector('.rating-number')?.textContent;
  const toolImage = document.querySelector('.tool-logo')?.src;
  const toolUrl = document.querySelector('.visit-website-btn')?.href;
  
  if (!toolName) return;
  
  // Create software application schema
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": toolName,
    "description": toolDescription || `${toolName} - AI tool for productivity and creativity`,
    "image": toolImage || '/img/placeholder-logo.png',
    "url": window.location.href,
    "applicationCategory": "AIApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
  
  // Add rating if available
  if (toolRating) {
    toolSchema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": toolRating,
      "ratingCount": "1",
      "bestRating": "5",
      "worstRating": "1"
    };
  }
  
  // Add official website if available
  if (toolUrl) {
    toolSchema.sameAs = toolUrl;
  }
  
  // Add schema to page
  addJsonLdSchema(toolSchema);
}

// Add schema for comparison pages
function addComparisonPageSchema() {
  // Get tools being compared
  const toolNames = Array.from(document.querySelectorAll('.comparison-tool-name')).map(el => el.textContent);
  
  if (toolNames.length < 2) return;
  
  // Create comparison schema
  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${toolNames.join(' vs ')} Comparison | AIToolHub`,
    "description": `Compare ${toolNames.join(' vs ')} side-by-side. See features, pricing, pros and cons to find the perfect AI tool for your needs.`,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".comparison-intro", ".comparison-table"]
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": toolNames.map((name, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": name
      }))
    }
  };
  
  // Add schema to page
  addJsonLdSchema(comparisonSchema);
}

// Add schema for directory homepage
function addDirectorySchema() {
  // Create directory schema
  const directorySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": []
  };
  
  // Get featured tools
  const featuredTools = document.querySelectorAll('.featured-tool, .tool-card');
  
  // Add each tool to the list
  featuredTools.forEach((tool, index) => {
    const toolName = tool.querySelector('h3')?.textContent;
    const toolUrl = tool.querySelector('a[href*="tool-detail"]')?.href;
    
    if (toolName && toolUrl) {
      directorySchema.itemListElement.push({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": toolName,
          "url": toolUrl
        }
      });
    }
  });
  
  // Only add schema if we have tools
  if (directorySchema.itemListElement.length > 0) {
    addJsonLdSchema(directorySchema);
  }
}

// Optimize image alt tags for SEO
function optimizeImageAltTags() {
  // Find images without alt text
  const images = document.querySelectorAll('img:not([alt]), img[alt=""]');
  
  images.forEach(img => {
    // Try to determine appropriate alt text
    let altText = '';
    
    // Check if image is in a tool card
    const toolCard = img.closest('.tool-card, .featured-tool');
    if (toolCard) {
      const toolName = toolCard.querySelector('h3')?.textContent;
      if (toolName) {
        altText = `${toolName} logo`;
      }
    }
    
    // Check if image is a screenshot
    if (img.classList.contains('screenshot') || img.parentElement.classList.contains('screenshots')) {
      const toolName = document.querySelector('h1')?.textContent;
      if (toolName) {
        altText = `${toolName} screenshot`;
      }
    }
    
    // Set a generic alt if we couldn't determine a specific one
    if (!altText) {
      if (img.src.includes('logo')) {
        altText = 'AI tool logo';
      } else if (img.src.includes('screenshot')) {
        altText = 'AI tool screenshot';
      } else {
        altText = 'AI tool image';
      }
    }
    
    // Set the alt text
    img.alt = altText;
  });
}

// Add breadcrumb navigation for SEO
function addBreadcrumbNavigation() {
  // Only add breadcrumbs to detail pages
  if (!window.location.pathname.includes('tool-detail') && !window.location.pathname.includes('compare')) {
    return;
  }
  
  // Create breadcrumb container
  const breadcrumbContainer = document.createElement('nav');
  breadcrumbContainer.className = 'breadcrumb';
  breadcrumbContainer.setAttribute('aria-label', 'Breadcrumb');
  
  // Create breadcrumb list
  const breadcrumbList = document.createElement('ol');
  breadcrumbList.className = 'breadcrumb-list';
  
  // Add home link
  const homeItem = document.createElement('li');
  homeItem.className = 'breadcrumb-item';
  homeItem.innerHTML = '<a href="/">Home</a>';
  breadcrumbList.appendChild(homeItem);
  
  // Add category if available
  const category = document.querySelector('.tool-category')?.textContent;
  if (category && window.location.pathname.includes('tool-detail')) {
    const categoryItem = document.createElement('li');
    categoryItem.className = 'breadcrumb-item';
    categoryItem.innerHTML = `<a href="/?category=${encodeURIComponent(category)}">${category}</a>`;
    breadcrumbList.appendChild(categoryItem);
  }
  
  // Add comparison breadcrumb
  if (window.location.pathname.includes('compare')) {
    const compareItem = document.createElement('li');
    compareItem.className = 'breadcrumb-item';
    compareItem.innerHTML = 'Compare Tools';
    breadcrumbList.appendChild(compareItem);
  }
  
  // Add current page
  const currentItem = document.createElement('li');
  currentItem.className = 'breadcrumb-item current';
  currentItem.setAttribute('aria-current', 'page');
  
  if (window.location.pathname.includes('tool-detail')) {
    const toolName = document.querySelector('h1')?.textContent;
    currentItem.textContent = toolName || 'Tool Details';
  } else if (window.location.pathname.includes('compare')) {
    const toolNames = Array.from(document.querySelectorAll('.comparison-tool-name')).map(el => el.textContent);
    currentItem.textContent = toolNames.join(' vs ') || 'Tool Comparison';
  }
  
  breadcrumbList.appendChild(currentItem);
  breadcrumbContainer.appendChild(breadcrumbList);
  
  // Add breadcrumb schema
  addBreadcrumbSchema(breadcrumbList);
  
  // Insert breadcrumbs at the top of the main content
  const mainContent = document.querySelector('main') || document.querySelector('.main-content');
  if (mainContent) {
    mainContent.insertBefore(breadcrumbContainer, mainContent.firstChild);
  }
}

// Add breadcrumb schema
function addBreadcrumbSchema(breadcrumbList) {
  // Create breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": []
  };
  
  // Add each breadcrumb item to schema
  const items = breadcrumbList.querySelectorAll('.breadcrumb-item');
  items.forEach((item, index) => {
    const link = item.querySelector('a');
    const name = link ? link.textContent : item.textContent;
    const url = link ? link.href : window.location.href;
    
    breadcrumbSchema.itemListElement.push({
      "@type": "ListItem",
      "position": index + 1,
      "name": name,
      "item": url
    });
  });
  
  // Add schema to page
  addJsonLdSchema(breadcrumbSchema);
}

// Initialize SEO optimizations
document.addEventListener('DOMContentLoaded', function() {
  // Optimize meta tags
  optimizeMetaTags();
  
  // Add structured data
  addStructuredData();
  
  // Optimize image alt tags
  optimizeImageAltTags();
  
  // Add breadcrumb navigation
  addBreadcrumbNavigation();
});
