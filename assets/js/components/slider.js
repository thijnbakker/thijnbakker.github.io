/* ==================================
   PRESENTATION SLIDER COMPONENT
   ================================== */

class PresentationSlider {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.currentSlideIndex = 1;
        this.slides = this.container.querySelectorAll('.slide');
        this.indicators = this.container.querySelectorAll('.indicator');
        this.totalSlides = this.slides.length;
        
        this.init();
    }
    
    init() {
        // Initialize display
        this.showSlide(1);
        
        // Set up navigation buttons
        const prevBtn = this.container.querySelector('.prev-btn');
        const nextBtn = this.container.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.changeSlide(-1));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.changeSlide(1));
        }
        
        // Set up indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.currentSlide(index + 1));
        });
        
        // Set up keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.changeSlide(-1);
            } else if (e.key === 'ArrowRight') {
                this.changeSlide(1);
            }
        });
        
        // Update counter display
        const totalSlidesSpan = this.container.querySelector('.total-slides');
        if (totalSlidesSpan) {
            totalSlidesSpan.textContent = this.totalSlides;
        }
    }
    
    showSlide(n) {
        if (n > this.totalSlides) this.currentSlideIndex = 1;
        if (n < 1) this.currentSlideIndex = this.totalSlides;
        
        // Hide all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show current slide
        if (this.slides[this.currentSlideIndex - 1]) {
            this.slides[this.currentSlideIndex - 1].classList.add('active');
        }
        
        if (this.indicators[this.currentSlideIndex - 1]) {
            this.indicators[this.currentSlideIndex - 1].classList.add('active');
        }
        
        // Update counter
        const currentSlideSpan = this.container.querySelector('.current-slide');
        if (currentSlideSpan) {
            currentSlideSpan.textContent = this.currentSlideIndex;
        }
        
        // Update navigation buttons state
        const prevBtn = this.container.querySelector('.prev-btn');
        const nextBtn = this.container.querySelector('.next-btn');
        
        if (prevBtn) prevBtn.disabled = this.currentSlideIndex === 1;
        if (nextBtn) nextBtn.disabled = this.currentSlideIndex === this.totalSlides;
    }
    
    changeSlide(n) {
        this.showSlide(this.currentSlideIndex += n);
    }
    
    currentSlide(n) {
        this.showSlide(this.currentSlideIndex = n);
    }
}

// Initialize sliders when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Find all presentation sliders on the page
    document.querySelectorAll('.presentation-slider').forEach((slider, index) => {
        // Give each slider a unique ID if it doesn't have one
        if (!slider.id) {
            slider.id = `slider-${index}`;
        }
        new PresentationSlider(slider.id);
    });
});

// Export for use in other scripts if needed
window.PresentationSlider = PresentationSlider;

/* ==================================
   FINAL PRESENTATION SLIDER COMPONENT
   ================================== */

// Initialize the variable at the top level
let currentFinalSlideIndex = 1;

function showFinalSlide(n) {
    const finalSlider = document.querySelector('#final-presentation');
    if (!finalSlider) return;
    
    const slides = finalSlider.querySelectorAll('.slide');
    const indicators = finalSlider.querySelectorAll('.indicator');
    const totalSlides = slides.length;
    
    // Update the global variable first
    currentFinalSlideIndex = n;
    
    if (currentFinalSlideIndex > totalSlides) currentFinalSlideIndex = 1;
    if (currentFinalSlideIndex < 1) currentFinalSlideIndex = totalSlides;
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    if (slides[currentFinalSlideIndex - 1]) {
        slides[currentFinalSlideIndex - 1].classList.add('active');
    }
    if (indicators[currentFinalSlideIndex - 1]) {
        indicators[currentFinalSlideIndex - 1].classList.add('active');
    }
    
    // Update counter for final presentation
    const currentSlideElement = finalSlider.querySelector('.current-slide-final');
    const totalSlidesElement = finalSlider.querySelector('.total-slides-final');
    if (currentSlideElement) {
        currentSlideElement.textContent = currentFinalSlideIndex;
    }
    if (totalSlidesElement) {
        totalSlidesElement.textContent = totalSlides;
    }
    
    // Update navigation buttons for final presentation
    const prevBtn = finalSlider.querySelector('.prev-btn');
    const nextBtn = finalSlider.querySelector('.next-btn');
    if (prevBtn) prevBtn.disabled = currentFinalSlideIndex === 1;
    if (nextBtn) nextBtn.disabled = currentFinalSlideIndex === totalSlides;
}

function changeFinalSlide(n) {
    currentFinalSlideIndex += n;
    showFinalSlide(currentFinalSlideIndex);
}

function currentFinalSlide(n) {
    currentFinalSlideIndex = n;
    showFinalSlide(currentFinalSlideIndex);
}

// Initialize final presentation when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const finalSlider = document.querySelector('#final-presentation');
    if (finalSlider) {
        // Initialize the final presentation
        showFinalSlide(1);
    }
});
