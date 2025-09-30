/* ==================================
   PAPER VIEWER COMPONENT
   ================================== */

class PaperViewer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.currentPageIndex = 1;
        this.pages = this.container.querySelectorAll('.paper-page');
        this.indicators = this.container.querySelectorAll('.paper-indicators .indicator');
        this.totalPages = this.pages.length;
        
        this.init();
    }
    
    init() {
        // Initialize display
        this.showPage(1);
        
        // Set up navigation buttons
        const prevBtn = this.container.querySelector('.prev-btn');
        const nextBtn = this.container.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.changePage(-1));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.changePage(1));
        }
        
        // Set up indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.currentPage(index + 1));
        });
        
        // Update total pages display
        const totalPagesSpan = this.container.querySelector('.total-pages');
        if (totalPagesSpan) {
            totalPagesSpan.textContent = this.totalPages;
        }
    }
    
    showPage(pageIndex) {
        // Validate page index
        if (pageIndex < 1) pageIndex = 1;
        if (pageIndex > this.totalPages) pageIndex = this.totalPages;
        
        // Hide all pages
        this.pages.forEach(page => page.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show selected page
        const targetPage = this.container.querySelector(`[data-page="${pageIndex}"]`);
        if (targetPage) {
            targetPage.classList.add('active');
            if (this.indicators[pageIndex - 1]) {
                this.indicators[pageIndex - 1].classList.add('active');
            }
            
            this.currentPageIndex = pageIndex;
            
            // Update counter
            const currentPageSpan = this.container.querySelector('.current-page');
            if (currentPageSpan) {
                currentPageSpan.textContent = pageIndex;
            }
        }
    }
    
    changePage(direction) {
        const newPageIndex = this.currentPageIndex + direction;
        
        if (newPageIndex >= 1 && newPageIndex <= this.totalPages) {
            this.showPage(newPageIndex);
        }
    }
    
    currentPage(pageIndex) {
        this.showPage(pageIndex);
    }
}

// Initialize paper viewers when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Find all paper viewers on the page
    document.querySelectorAll('.paper-viewer').forEach((viewer, index) => {
        // Give each viewer a unique ID if it doesn't have one
        if (!viewer.id) {
            viewer.id = `paper-viewer-${index}`;
        }
        new PaperViewer(viewer.id);
    });
});

// Make functions globally available for onclick handlers
window.changePaperPage = function(direction) {
    // Find the closest paper viewer
    const viewer = document.querySelector('.paper-viewer');
    if (viewer && viewer.paperViewerInstance) {
        viewer.paperViewerInstance.changePage(direction);
    }
};

window.currentPaperPage = function(pageIndex) {
    // Find the closest paper viewer
    const viewer = document.querySelector('.paper-viewer');
    if (viewer && viewer.paperViewerInstance) {
        viewer.paperViewerInstance.currentPage(pageIndex);
    }
};

// Export for use in other scripts if needed
window.PaperViewer = PaperViewer;


/* ==================================
   POLICY VIEWER COMPONENT
   ================================== */

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