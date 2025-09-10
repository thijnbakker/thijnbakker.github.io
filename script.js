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
        'AI-Driven Road Safety Analysis': 'projects/road-safety.html',
        'Traffic Sign Detection for Autonomous Vehicles': 'projects/traffic-sign-detection.html',
        'Smart Player Recruitment for NAC Breda': 'projects/nac-breda.html',
        'AI for Sustainable Development Goals': 'projects/sdg-analysis.html'
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

// Also handle regular load event
window.addEventListener('load', function() {
    document.body.classList.remove('transitioning');
});