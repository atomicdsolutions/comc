class HeroCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.autoAdvanceInterval = null;
        this.autoAdvanceDelay = 6000; // 6 seconds
        this.userHasInteracted = false;
        this.totalSlides = this.slides.length;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Start auto-advance
        this.startAutoAdvance();
        
        // Initialize first slide
        this.showSlide(0);
        
        // Add touch/swipe support for mobile
        this.setupTouchSupport();
    }
    
    setupEventListeners() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.userInteracted();
                this.prevSlide();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.userInteracted();
                this.nextSlide();
            });
        }
        
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.userInteracted();
                this.goToSlide(index);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.userInteracted();
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.userInteracted();
                this.nextSlide();
            }
        });
        
        // Pause on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                this.pauseAutoAdvance();
            });
            
            carouselContainer.addEventListener('mouseleave', () => {
                if (!this.userHasInteracted) {
                    this.startAutoAdvance();
                }
            });
        }
    }
    
    setupTouchSupport() {
        const carouselContainer = document.querySelector('.carousel-container');
        if (!carouselContainer) return;
        
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });
        
        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        });
        
        const handleSwipe = () => {
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            // Only process horizontal swipes (not vertical scrolling)
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                this.userInteracted();
                
                if (diffX > 0) {
                    // Swipe left - next slide
                    this.nextSlide();
                } else {
                    // Swipe right - previous slide
                    this.prevSlide();
                }
            }
        };
        
        this.handleSwipe = handleSwipe;
    }
    
    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }
        
        // Activate current dot
        if (this.dots[index]) {
            this.dots[index].classList.add('active');
        }
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.showSlide(index);
        }
    }
    
    startAutoAdvance() {
        this.pauseAutoAdvance(); // Clear any existing interval
        
        if (!this.userHasInteracted) {
            this.autoAdvanceInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoAdvanceDelay);
        }
    }
    
    pauseAutoAdvance() {
        if (this.autoAdvanceInterval) {
            clearInterval(this.autoAdvanceInterval);
            this.autoAdvanceInterval = null;
        }
    }
    
    userInteracted() {
        this.userHasInteracted = true;
        this.pauseAutoAdvance();
    }
    
    // Method to restart auto-advance (useful for programmatic control)
    restartAutoAdvance() {
        this.userHasInteracted = false;
        this.startAutoAdvance();
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const carousel = new HeroCarousel();
    
    // Make carousel globally accessible for debugging/control
    window.heroCarousel = carousel;
    
    // Progress indicators for carousel
    const createProgressIndicator = () => {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'carousel-progress';
        progressContainer.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            z-index: 5;
        `;
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.cssText = `
            height: 100%;
            background: var(--primary-orange);
            width: 0%;
            transition: width 0.1s linear;
        `;
        
        progressContainer.appendChild(progressBar);
        
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.appendChild(progressContainer);
        }
        
        return progressBar;
    };
    
    // Optional: Add progress indicator
    // const progressBar = createProgressIndicator();
    
    // Preload images for smooth transitions
    const preloadImages = () => {
        const images = document.querySelectorAll('.slide-background img');
        images.forEach(img => {
            const imageElement = new Image();
            imageElement.src = img.src;
        });
    };
    
    preloadImages();
    
    console.log('Hero carousel initialized successfully');
});