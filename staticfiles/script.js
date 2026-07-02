/* =============================================================
   PORTFOLIO SCRIPT
   Vanilla JavaScript only — no jQuery, no frameworks.
   ============================================================= */

document.addEventListener('DOMContentLoaded', function () {

    /* ---------------------------------------------------------
       1. PRELOADER
       Hide the loading screen once the page has fully loaded.
       --------------------------------------------------------- */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function () {
        if (preloader) preloader.classList.add('loaded');
    });

    /* ---------------------------------------------------------
       2. MOBILE MENU TOGGLE
       --------------------------------------------------------- */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close the mobile menu whenever a link is clicked
        document.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ---------------------------------------------------------
       3. STICKY NAVBAR BACKGROUND ON SCROLL
       --------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    function handleNavbarScroll() {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    /* ---------------------------------------------------------
       4. NAVBAR ACTIVE LINK HIGHLIGHTING
       Uses IntersectionObserver to detect which section is
       currently in the viewport and highlights the matching link.
       --------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(function (link) {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) {
        navObserver.observe(section);
    });

    /* ---------------------------------------------------------
       5. TYPING ANIMATION (Hero subtitle)
       Cycles through a list of roles/phrases with a typewriter effect.
       --------------------------------------------------------- */
    const typedTextEl = document.getElementById('typed-text');
    const typedStrings = [
        'Full Stack Developer',
        'Python & Django Enthusiast',
        'Backend-Focused Engineer',
        'Problem Solver'
    ];

    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        if (!typedTextEl) return;

        const currentString = typedStrings[stringIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typedTextEl.textContent = currentString.substring(0, charIndex);

        let typingSpeed = isDeleting ? 45 : 90;

        if (!isDeleting && charIndex === currentString.length) {
            typingSpeed = 1600; // pause at the end of the word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            stringIndex = (stringIndex + 1) % typedStrings.length;
            typingSpeed = 350;
        }

        setTimeout(typeLoop, typingSpeed);
    }
    typeLoop();

    /* ---------------------------------------------------------
       6. SCROLL REVEAL ANIMATIONS
       Adds .in-view to any element with the .reveal class once
       it enters the viewport.
       --------------------------------------------------------- */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) {
        revealObserver.observe(el);
    });

    /* ---------------------------------------------------------
       7. SKILL BAR ANIMATION
       Animates each skill bar's width to its data-percent value
       once the Skills section scrolls into view.
       --------------------------------------------------------- */
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const skillObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percent = bar.getAttribute('data-percent') || 0;
                bar.style.width = percent + '%';
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.4 });

    skillBars.forEach(function (bar) {
        skillObserver.observe(bar);
    });

    /* ---------------------------------------------------------
       8. BACK-TO-TOP BUTTON
       --------------------------------------------------------- */
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            backToTopBtn.classList.toggle('visible', window.scrollY > 500);
        });
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------------------------------------------------------
       9. FOOTER YEAR
       --------------------------------------------------------- */
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

});