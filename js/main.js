document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    console.log('Hamburger found:', hamburger);
    console.log('Mobile menu found:', mobileMenu);
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Hamburger clicked');
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.classList.toggle('overflow-hidden');
        });
        
        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('overflow-hidden');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('overflow-hidden');
            }
        });
    } else {
        console.error('Mobile navigation elements not found');
    }
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter Form Handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Show success message
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            }
        });
    }
    
    // Scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.animate-on-scroll, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling with Tailwind
        if (scrollTop > 100) {
            navbar.classList.add('bg-white', 'shadow-lg');
            navbar.classList.remove('bg-transparent');
            // Update text color for scrolled state
            navbar.querySelectorAll('.nav-link, h2').forEach(el => {
                el.classList.remove('text-white');
                el.classList.add('text-gray-900');
            });
        } else {
            navbar.classList.add('bg-transparent');
            navbar.classList.remove('bg-white', 'shadow-lg');
            // Update text color for transparent state
            navbar.querySelectorAll('.nav-link, h2').forEach(el => {
                el.classList.remove('text-gray-900');
                el.classList.add('text-white');
            });
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--gentle-teal)' : 'var(--primary-orange)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 5px 20px var(--shadow-medium);
            z-index: 1500;
            display: flex;
            align-items: center;
            gap: 1rem;
            animation: slideInRight 0.3s ease-out;
        `;
        
        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            margin-left: 1rem;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Add notification animations to head
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Lazy Loading for Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Form Validation Helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Utility function to throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Add scroll event listeners with throttling
    window.addEventListener('scroll', throttle(function() {
        // Additional scroll-based functionality can be added here
    }, 100));
    
    // Partners Carousel
    initializePartnersCarousel();
    
    // Initialize any components that need setup
    initializeComponents();
    
    function initializePartnersCarousel() {
        const partnersTrack = document.querySelector('.partners-track');
        const partnerSlides = document.querySelectorAll('.partner-slide');
        const partnerDots = document.querySelectorAll('.partner-dot');
        const prevBtn = document.querySelector('.prev-partners');
        const nextBtn = document.querySelector('.next-partners');
        
        if (!partnersTrack || partnerSlides.length === 0) return;
        
        let currentSlide = 0;
        const totalSlides = partnerSlides.length;
        
        function showPartnerSlide(index) {
            const translateX = -index * (100 / totalSlides);
            partnersTrack.style.transform = `translateX(${translateX}%)`;
            
            // Update dots
            partnerDots.forEach(dot => dot.classList.remove('active'));
            if (partnerDots[index]) {
                partnerDots[index].classList.add('active');
            }
            
            currentSlide = index;
        }
        
        function nextPartnerSlide() {
            const nextIndex = (currentSlide + 1) % totalSlides;
            showPartnerSlide(nextIndex);
        }
        
        function prevPartnerSlide() {
            const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
            showPartnerSlide(prevIndex);
        }
        
        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', nextPartnerSlide);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevPartnerSlide);
        }
        
        // Dot navigation
        partnerDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showPartnerSlide(index);
            });
        });
        
        // Auto-advance every 4 seconds
        setInterval(nextPartnerSlide, 4000);
        
        // Initialize first slide
        showPartnerSlide(0);
    }
    
    function initializeComponents() {
        // Add fade-in animation to hero content
        const heroContent = document.querySelector('.slide-text');
        if (heroContent) {
            heroContent.classList.add('fade-in-up');
        }
        
        // Skip animations for program cards to prevent disappearing
        // Add staggered animation to other cards only
        const animateCards = document.querySelectorAll('.podcast-card, .testimonial-card');
        animateCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-on-scroll');
        });
    }
    
    // Console log for debugging
    console.log('GMCBOMC Foundation website initialized successfully');
});