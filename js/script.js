// Role rotation animation
const roles = ["Web Developer", "Web Designer", "Software Developer", "UI/UX Designer", "Trekker", "Photographer"];
let roleIndex = 0;

function updateText() {
    const roleElement = document.getElementById("changing-role");
    if (!roleElement) return;

    // Apply fade-out effect
    roleElement.classList.add("fade-out");

    setTimeout(() => {
        // Change text after fade-out
        roleElement.textContent = roles[roleIndex];

        // Remove fade-out and apply fade-in
        roleElement.classList.remove("fade-out");
        roleElement.classList.add("fade-in");

        // Remove fade-in class after animation completes
        setTimeout(() => {
            roleElement.classList.remove("fade-in");
        }, 500);

        // Update index
        roleIndex = (roleIndex + 1) % roles.length;
    }, 500);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for fixed header
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Add scroll event to highlight active section
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                activeLink.classList.add('active');
            }
        }
    });
}

// Intersection Observer for certification cards
function initCertificationAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe each certification card
    document.querySelectorAll('.certification-card').forEach(card => {
        observer.observe(card);
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize certification animations
        initCertificationAnimations();
        // Start role rotation
        updateText();
        setInterval(updateText, 3500);
        
        // Set up scroll event
        window.addEventListener('scroll', setActiveNavLink);
        
        // Set initial active nav link
        setActiveNavLink();
        
        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// Handle AOS initialization after the page is fully loaded
window.addEventListener('load', () => {
    // Re-initialize AOS in case some elements were loaded dynamically
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});

// Handle page load transitions
document.body.classList.add('page-loaded');
