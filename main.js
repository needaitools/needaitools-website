// AIToolHub - Main JavaScript
// Handles interactive functionality for the AI tool directory website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
    
    // Tool comparison functionality
    const compareBtn = document.querySelector('.comparison-cta .btn');
    
    if (compareBtn) {
        compareBtn.addEventListener('click', function() {
            // This would normally navigate to the compare page
            // For the prototype, we'll just show an alert
            alert('This would take you to the comparison tool page where you can select tools to compare side by side.');
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // This would normally submit to a backend
                // For the prototype, we'll just show a success message
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Simulated tool data for search functionality
    const toolsData = [
        {
            id: 'ai-writer-pro',
            name: 'AI Writer Pro',
            description: 'Advanced AI writing assistant that helps you create high-quality content for blogs, social media, and more.',
            category: 'Text & Writing',
            tags: ['Content Creation', 'Blogging', 'Social Media'],
            rating: 4.9,
            pricing: 'Freemium',
            pricingAmount: '$19/mo'
        },
        {
            id: 'pixel-genius',
            name: 'PixelGenius',
            description: 'Create stunning images and artwork with this powerful AI image generation tool. Perfect for designers and creatives.',
            category: 'Image Generation',
            tags: ['Design', 'Art', 'Creative'],
            rating: 4.7,
            pricing: 'Paid',
            pricingAmount: '$29/mo'
        },
        {
            id: 'code-assist-ai',
            name: 'CodeAssist AI',
            description: 'AI-powered coding assistant that helps developers write better code faster with intelligent suggestions and debugging.',
            category: 'Code & Development',
            tags: ['Productivity', 'Programming', 'Software Development'],
            rating: 4.8,
            pricing: 'Free',
            pricingAmount: 'Open Source'
        },
        {
            id: 'video-magic-ai',
            name: 'VideoMagic AI',
            description: 'Transform your ideas into professional videos with this AI-powered video creation and editing platform.',
            category: 'Video Creation',
            tags: ['Editing', 'Content Creation', 'Marketing'],
            rating: 4.6,
            pricing: 'Freemium',
            pricingAmount: '$39/mo'
        },
        {
            id: 'data-insight-ai',
            name: 'DataInsight AI',
            description: 'Analyze and visualize your data with powerful AI-driven insights. Perfect for business intelligence and analytics.',
            category: 'Business & Productivity',
            tags: ['Data Analysis', 'Business Intelligence', 'Visualization'],
            rating: 4.5,
            pricing: 'Paid',
            pricingAmount: '$49/mo'
        },
        {
            id: 'melody-maker-ai',
            name: 'MelodyMaker AI',
            description: 'Create original music and audio with this AI-powered music generation tool. No musical experience required.',
            category: 'Audio & Voice',
            tags: ['Music', 'Creative', 'Entertainment'],
            rating: 4.4,
            pricing: 'Freemium',
            pricingAmount: '$24/mo'
        }
    ];
    
    // Search function
    function performSearch(query) {
        if (!query.trim()) {
            alert('Please enter a search term');
            return;
        }
        
        query = query.toLowerCase();
        
        // Filter tools based on search query
        const results = toolsData.filter(tool => {
            return (
                tool.name.toLowerCase().includes(query) ||
                tool.description.toLowerCase().includes(query) ||
                tool.category.toLowerCase().includes(query) ||
                tool.tags.some(tag => tag.toLowerCase().includes(query))
            );
        });
        
        // Display search results (in a real app, this would navigate to a results page)
        if (results.length > 0) {
            let resultMessage = `Found ${results.length} tools matching "${query}":\n\n`;
            results.forEach(tool => {
                resultMessage += `- ${tool.name} (${tool.category}): ${tool.description}\n`;
            });
            alert(resultMessage);
        } else {
            alert(`No tools found matching "${query}". Try a different search term.`);
        }
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Initialize tool cards with hover effects
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--shadow-xl)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });
    
    console.log('AIToolHub JavaScript initialized successfully');
});
