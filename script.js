/* ========================================
   Eye of the Inti - Interactive Scripts
   ======================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initStarfield();
    initNavbar();
    initCountUp();
    initSmoothScroll();
    initScrollAnimations();
    initMobileMenu();
});

/* ========================================
   Starfield Background
   ======================================== */
function initStarfield() {
    const starfield = document.getElementById('starfield');
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random size (smaller stars are more common)
        const size = Math.random() < 0.8 ? Math.random() * 2 + 1 : Math.random() * 3 + 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.3;
        star.style.setProperty('--opacity', opacity);
        
        // Random animation duration
        const duration = Math.random() * 3 + 2;
        star.style.setProperty('--duration', `${duration}s`);
        
        // Random animation delay
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        // Some stars have a golden tint
        if (Math.random() < 0.1) {
            star.style.background = '#FFD700';
        }
        
        starfield.appendChild(star);
    }
    
    // Add shooting stars occasionally
    setInterval(createShootingStar, 5000);
}

function createShootingStar() {
    const starfield = document.getElementById('starfield');
    const shootingStar = document.createElement('div');
    
    shootingStar.style.cssText = `
        position: absolute;
        width: 100px;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.8), rgba(255, 255, 255, 1));
        top: ${Math.random() * 50}%;
        left: ${Math.random() * 50}%;
        transform: rotate(${Math.random() * 45 + 20}deg);
        animation: shootingStar 1s linear forwards;
        pointer-events: none;
    `;
    
    starfield.appendChild(shootingStar);
    
    setTimeout(() => shootingStar.remove(), 1000);
}

// Add shooting star animation to page
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes shootingStar {
        0% {
            opacity: 0;
            transform: translateX(0) translateY(0) rotate(35deg);
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateX(500px) translateY(300px) rotate(35deg);
        }
    }
`;
document.head.appendChild(styleSheet);

/* ========================================
   Navbar Scroll Effect
   ======================================== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for background
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ========================================
   Count Up Animation
   ======================================== */
function initCountUp() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/* ========================================
   Smooth Scroll
   ======================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   Scroll Animations
   ======================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(`
        .section-header,
        .satellite-card,
        .tool-card,
        .research-card,
        .image-card,
        .feed-stat,
        .about-feature
    `);
    
    // Add initial styles
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
}

/* ========================================
   Mobile Menu
   ======================================== */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            let mobileMenu = document.querySelector('.mobile-menu');
            
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                mobileMenu.innerHTML = `
                    <div class="mobile-menu-content">
                        <a href="#home">Home</a>
                        <a href="#satellites">Satellites</a>
                        <a href="#database">Database</a>
                        <a href="#analysis">Analysis</a>
                        <a href="#research">Research</a>
                        <a href="#about">About</a>
                        <div class="mobile-menu-actions">
                            <button class="btn-secondary">Sign In</button>
                            <button class="btn-primary">Access Data</button>
                        </div>
                    </div>
                `;
                
                // Add mobile menu styles
                const mobileStyles = document.createElement('style');
                mobileStyles.textContent = `
                    .mobile-menu {
                        position: fixed;
                        top: 80px;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(10, 10, 15, 0.98);
                        backdrop-filter: blur(20px);
                        z-index: 999;
                        display: flex;
                        align-items: flex-start;
                        justify-content: center;
                        padding-top: 60px;
                        opacity: 0;
                        visibility: hidden;
                        transition: all 0.3s ease;
                    }
                    
                    .mobile-menu.active {
                        opacity: 1;
                        visibility: visible;
                    }
                    
                    .mobile-menu-content {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 30px;
                    }
                    
                    .mobile-menu a {
                        color: var(--text-secondary);
                        text-decoration: none;
                        font-size: 1.5rem;
                        font-weight: 500;
                        transition: color 0.3s ease;
                    }
                    
                    .mobile-menu a:hover {
                        color: var(--gold);
                    }
                    
                    .mobile-menu-actions {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                        margin-top: 30px;
                        width: 100%;
                    }
                    
                    .mobile-menu-btn.active span:nth-child(1) {
                        transform: rotate(45deg) translate(5px, 5px);
                    }
                    
                    .mobile-menu-btn.active span:nth-child(2) {
                        opacity: 0;
                    }
                    
                    .mobile-menu-btn.active span:nth-child(3) {
                        transform: rotate(-45deg) translate(5px, -5px);
                    }
                `;
                document.head.appendChild(mobileStyles);
                document.body.appendChild(mobileMenu);
                
                // Close menu when clicking links
                mobileMenu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.classList.remove('active');
                        menuBtn.classList.remove('active');
                    });
                });
            }
            
            mobileMenu.classList.toggle('active');
        });
    }
}

/* ========================================
   Data Point Animations
   ======================================== */
// Animate data points on the map
function animateDataPoints() {
    const dataPoints = document.querySelectorAll('.data-point');
    
    dataPoints.forEach((point, index) => {
        setInterval(() => {
            point.style.animation = 'none';
            point.offsetHeight; // Trigger reflow
            point.style.animation = `dataPulse 2s ease-in-out infinite ${index * 0.3}s`;
        }, 10000);
    });
}

// Initialize after DOM load
setTimeout(animateDataPoints, 1000);

/* ========================================
   Satellite Status Updates
   ======================================== */
function updateSatelliteStatus() {
    const passTimeElement = document.querySelector('.pass-time');
    
    if (passTimeElement) {
        // Simulate next pass time update
        const updateTime = () => {
            const now = new Date();
            const nextPass = new Date(now.getTime() + Math.random() * 3600000); // Random time within next hour
            const hours = nextPass.getUTCHours().toString().padStart(2, '0');
            const minutes = nextPass.getUTCMinutes().toString().padStart(2, '0');
            passTimeElement.textContent = `Next pass: ${hours}:${minutes} UTC`;
        };
        
        updateTime();
        setInterval(updateTime, 60000); // Update every minute
    }
}

setTimeout(updateSatelliteStatus, 2000);

/* ========================================
   Parallax Effect for Stars
   ======================================== */
document.addEventListener('mousemove', (e) => {
    const starfield = document.getElementById('starfield');
    if (starfield) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        starfield.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

/* ========================================
   Search Form Interactions
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.querySelector('.search-form .btn-primary');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add loading state
            searchBtn.innerHTML = `
                <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="0">
                        <animate attributeName="stroke-dashoffset" from="0" to="60" dur="1s" repeatCount="indefinite"/>
                    </circle>
                </svg>
                Searching...
            `;
            
            // Simulate search
            setTimeout(() => {
                searchBtn.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                    </svg>
                    Search Images
                `;
                
                // Animate image cards
                const imageCards = document.querySelectorAll('.image-card');
                imageCards.forEach((card, index) => {
                    card.style.animation = 'none';
                    card.offsetHeight;
                    card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
                });
            }, 1500);
        });
    }
});

// Add fadeInUp animation
const fadeInUpStyle = document.createElement('style');
fadeInUpStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInUpStyle);

/* ========================================
   View Toggle
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const viewToggleButtons = document.querySelectorAll('.view-toggle button');
    const imageGrid = document.querySelector('.image-grid');
    
    viewToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            viewToggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            if (button.textContent === 'List' && imageGrid) {
                imageGrid.style.gridTemplateColumns = '1fr';
                imageGrid.querySelectorAll('.image-card').forEach(card => {
                    card.style.display = 'grid';
                    card.style.gridTemplateColumns = '150px 1fr';
                });
            } else if (imageGrid) {
                imageGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                imageGrid.querySelectorAll('.image-card').forEach(card => {
                    card.style.display = 'block';
                    card.style.gridTemplateColumns = 'unset';
                });
            }
        });
    });
});

/* ========================================
   Tooltip System
   ======================================== */
function createTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.8rem;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        border: 1px solid rgba(255, 215, 0, 0.3);
    `;
    document.body.appendChild(tooltip);
    
    element.addEventListener('mouseenter', (e) => {
        const rect = element.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.opacity = '1';
    });
    
    element.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
    });
}

/* ========================================
   Performance Optimization
   ======================================== */
// Reduce animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    const orbits = document.querySelectorAll('.orbit, .orbit-ring');
    const satellites = document.querySelectorAll('.satellite, .sat-3d');
    
    if (document.hidden) {
        orbits.forEach(orbit => orbit.style.animationPlayState = 'paused');
        satellites.forEach(sat => sat.style.animationPlayState = 'paused');
    } else {
        orbits.forEach(orbit => orbit.style.animationPlayState = 'running');
        satellites.forEach(sat => sat.style.animationPlayState = 'running');
    }
});

console.log('🛰️ Eye of the Inti initialized successfully');
console.log('☀️ Powered by Intinauta Space Technologies');

