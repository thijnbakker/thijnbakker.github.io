// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Add some particles or floating elements for extra visual interest
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(212, 165, 116, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    particle.style.zIndex = '-1';
    document.body.appendChild(particle);

    const duration = Math.random() * 10 + 10;
    particle.style.animation = `float ${duration}s linear`;

    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

// CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        to {
            transform: translateY(-${window.innerHeight + 100}px) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create particles periodically
setInterval(createParticle, 300);

// Make project cards clickable with direct href mapping
document.addEventListener('DOMContentLoaded', function() {
    // Map project titles to their URLs
    const projectUrls = {
        'Rootify - Cloud ML for Plant Root Analysis': 'projects/rootify.html',
        'Emotion Classification from Video Dialogue': 'projects/emotion-classification.html',
        'Automated Plant Root Analysis & Robotics': 'projects/plant-robotics.html',
        'AI Analytics Translator for SME Digital Transformation': 'projects/analytics-translator.html',
        'AI-Driven Road Safety Analysis and Predictive Accident Prevention': 'projects/road-safety.html',
        'Traffic Sign Detection for Autonomous Vehicles': 'projects/traffic-sign-detection.html',
        'Smart Player Recruitment for NAC Breda': 'projects/nac-breda.html',
        'AI for Sustainable Development Goals': 'projects/sdg-analysis.html',
        'EPL Match Prediction & Player Valuation': 'projects/epl-prediction.html',
        'Graph2Table: Visual Data to Structured Tables': 'projects/graph2table.html'
    };
    
    // Make entire project card clickable
    document.querySelectorAll('.project-card').forEach(card => {
        const title = card.querySelector('h3').textContent;
        const url = projectUrls[title];
        
        if (url) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                // Add transition effect
                document.body.classList.add('transitioning');
                setTimeout(() => {
                    window.location.href = url;
                }, 300);
            });
        }
    });

    // Initialize presentation sliders
    initializePresentationSliders();
});

// Remove transition class on page load/show
window.addEventListener('pageshow', function(event) {
    // Remove the transition class
    document.body.classList.remove('transitioning');
    
    // Force reflow to ensure the transition is removed
    document.body.offsetHeight;
    
    // If it's a back/forward navigation, ensure opacity is reset
    if (event.persisted) {
        document.body.style.opacity = '1';
        document.body.style.transform = 'scale(1)';
    }
});

// Paper viewer functionality
let currentPaperPageIndex = 1;
const totalPaperPages = 6;

function changePaperPage(direction) {
    const newPageIndex = currentPaperPageIndex + direction;
    
    if (newPageIndex >= 1 && newPageIndex <= totalPaperPages) {
        currentPaperPage(newPageIndex);
    }
}

function currentPaperPage(pageIndex) {
    // Hide all pages
    const pages = document.querySelectorAll('.paper-page');
    const indicators = document.querySelectorAll('.paper-indicators .indicator');
    
    pages.forEach(page => page.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.querySelector(`[data-page="${pageIndex}"]`);
    if (targetPage) {
        targetPage.classList.add('active');
        indicators[pageIndex - 1].classList.add('active');
        
        currentPaperPageIndex = pageIndex;
        document.querySelector('.paper-navigation .current-page').textContent = pageIndex;
    }
}

// Also handle regular load event
window.addEventListener('load', function() {
    document.body.classList.remove('transitioning');
});

// Presentation slider functionality - FIXED VERSION
let currentSlideIndex = 1;
let currentFinalSlideIndex = 1;

function initializePresentationSliders() {
    // Initialize first presentation slider (proposal)
    const proposalSlider = document.querySelector('.presentation-slider:not(#final-presentation)');
    if (proposalSlider) {
        const totalSlides = proposalSlider.querySelectorAll('.slide').length;
        const totalSlidesElement = proposalSlider.querySelector('.total-slides');
        if (totalSlidesElement) {
            totalSlidesElement.textContent = totalSlides;
        }
        showSlide(1);
    }
    
    // Initialize second presentation slider (final)
    const finalSlider = document.querySelector('#final-presentation');
    if (finalSlider) {
        const totalSlides = finalSlider.querySelectorAll('.slide').length;
        const totalSlidesElement = finalSlider.querySelector('.total-slides-final');
        if (totalSlidesElement) {
            totalSlidesElement.textContent = totalSlides;
        }
        showFinalSlide(1);
    }
    
    // Initialize single presentation slider (for other pages)
    if (document.querySelector('.presentation-slider') && !proposalSlider && !finalSlider) {
        showSlide(1);
    }
    
    // Initialize paper viewer
    const paperViewer = document.querySelector('.paper-navigation .total-pages');
    if (paperViewer) {
        paperViewer.textContent = totalPaperPages;
    }
}

function showSlide(n) {
    const slides = document.querySelectorAll('.presentation-slider:not(#final-presentation) .slide');
    const indicators = document.querySelectorAll('.presentation-slider:not(#final-presentation) .indicator');
    const totalSlides = slides.length;
    
    if (n > totalSlides) currentSlideIndex = 1;
    if (n < 1) currentSlideIndex = totalSlides;
    
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show current slide
    if (slides[currentSlideIndex - 1]) {
        slides[currentSlideIndex - 1].classList.add('active');
    }
    if (indicators[currentSlideIndex - 1]) {
        indicators[currentSlideIndex - 1].classList.add('active');
    }
    
    // Update counter
    const currentSlideSpan = document.querySelector('.presentation-slider:not(#final-presentation) .current-slide');
    const totalSlidesSpan = document.querySelector('.presentation-slider:not(#final-presentation) .total-slides');
    if (currentSlideSpan) currentSlideSpan.textContent = currentSlideIndex;
    if (totalSlidesSpan) totalSlidesSpan.textContent = totalSlides;
    
    // Update navigation buttons
    const prevBtn = document.querySelector('.presentation-slider:not(#final-presentation) .prev-btn');
    const nextBtn = document.querySelector('.presentation-slider:not(#final-presentation) .next-btn');
    if (prevBtn) prevBtn.disabled = currentSlideIndex === 1;
    if (nextBtn) nextBtn.disabled = currentSlideIndex === totalSlides;
}

function changeSlide(n) {
    showSlide(currentSlideIndex += n);
}

function currentSlide(n) {
    showSlide(currentSlideIndex = n);
}

// Final presentation slider functionality
function showFinalSlide(n) {
    const finalSlider = document.querySelector('#final-presentation');
    if (!finalSlider) return;
    
    const slides = finalSlider.querySelectorAll('.slide');
    const indicators = finalSlider.querySelectorAll('.indicator');
    const totalSlides = slides.length;
    
    if (n > totalSlides) currentFinalSlideIndex = 1;
    if (n < 1) currentFinalSlideIndex = totalSlides;
    
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

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        // Check which slider is visible and navigate accordingly
        const finalSlider = document.querySelector('#final-presentation');
        const proposalSlider = document.querySelector('.presentation-slider:not(#final-presentation)');
        
        if (finalSlider && finalSlider.getBoundingClientRect().top < window.innerHeight) {
            changeFinalSlide(-1);
        } else if (proposalSlider && proposalSlider.getBoundingClientRect().top < window.innerHeight) {
            changeSlide(-1);
        }
    } else if (e.key === 'ArrowRight') {
        // Check which slider is visible and navigate accordingly
        const finalSlider = document.querySelector('#final-presentation');
        const proposalSlider = document.querySelector('.presentation-slider:not(#final-presentation)');
        
        if (finalSlider && finalSlider.getBoundingClientRect().top < window.innerHeight) {
            changeFinalSlide(1);
        } else if (proposalSlider && proposalSlider.getBoundingClientRect().top < window.innerHeight) {
            changeSlide(1);
        }
    }
});

// Policy paper viewer functionality
let currentPolicyPageIndex = 1;
const totalPolicyPages = 6;

function changePolicyPage(direction) {
    const newPageIndex = currentPolicyPageIndex + direction;
    
    if (newPageIndex >= 1 && newPageIndex <= totalPolicyPages) {
        currentPolicyPage(newPageIndex);
    }
}

function currentPolicyPage(pageIndex) {
    // Hide all policy pages
    const pages = document.querySelectorAll('.policy-page');
    const indicators = document.querySelectorAll('.policy-indicators .indicator');
    
    pages.forEach(page => page.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.querySelector(`.policy-page[data-page="${pageIndex}"]`);
    if (targetPage) {
        targetPage.classList.add('active');
        if (indicators[pageIndex - 1]) {
            indicators[pageIndex - 1].classList.add('active');
        }
        
        currentPolicyPageIndex = pageIndex;
        const currentPageElement = document.querySelector('.policy-navigation .current-policy-page');
        if (currentPageElement) {
            currentPageElement.textContent = pageIndex;
        }
    }
}
