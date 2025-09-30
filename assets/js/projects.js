/* ==================================
   PROJECTS PAGE FUNCTIONALITY
   ================================== */

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
        const title = card.querySelector('h3');
        if (!title) return;
        
        const titleText = title.textContent;
        const url = projectUrls[titleText];
        
        if (url) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                // Don't navigate if clicking on a link inside the card
                if (e.target.tagName === 'A') {
                    return;
                }
                
                // Add transition effect
                document.body.classList.add('transitioning');
                setTimeout(() => {
                    window.location.href = url;
                }, 300);
            });
        }
    });
});
