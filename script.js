
// 1. TYPED.JS — hero typing animation
// Typed.js is loaded via CDN in index.html before this script.
// It animates the #element span in the hero section.

document.addEventListener('DOMContentLoaded', () => {

    if (typeof Typed !== 'undefined' && document.getElementById('element')) {
        new Typed('#element', {
            strings: ['Web Developer.', 'UI/UX Designer.', 'MERN Stack Developer.'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            loop: true,
        });
    }


    // 2. HAMBURGER MENU — open / close nav
    // Toggles the .open class on .nav-links when the hamburger is clicked.
    // Also closes the menu when any nav link is clicked (mobile UX).

    const hamburger = document.querySelector('.hamburger');
    const navLinks  = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            // Animate hamburger lines into an X
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is tapped on mobile
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
            });
        });
    }


    // 3. SMOOTH SCROLL — nav link clicks
    // Scrolls smoothly to the target section when a nav link is clicked.
    // Each link needs a matching href="#sectionId" and the section needs that id.

    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


   
    // 4. ACTIVE NAV LINK — highlight on scroll
    // Adds .active class to the nav link whose section is currently in view.
    // Add id="home", id="skills", id="work", id="contact" to your <section> tags.

    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('nav a');

    function highlightNav() {
        let scrollY = window.scrollY;

        sections.forEach(section => {
            const top    = section.offsetTop - 100;
            const bottom = top + section.offsetHeight;
            const id     = section.getAttribute('id');

            if (scrollY >= top && scrollY < bottom) {
                navItems.forEach(a => a.classList.remove('active'));
                const match = document.querySelector(`nav a[href="#${id}"]`);
                if (match) match.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNav);


    // 5. NAV SHADOW ON SCROLL — depth effect
    // Adds a subtle box-shadow to the nav when the user scrolls down.

    const navEl = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navEl.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
        } else {
            navEl.style.boxShadow = 'none';
        }
    });


    // 6. SCROLL REVEAL — fade-in on scroll
    // Sections and cards fade + slide up when they enter the viewport.
    // Uses IntersectionObserver (no external library needed).

    const revealEls = document.querySelectorAll(
        '.exp-card, .sk-card, .ab-approach-card, .ct-card, .firstSection, .workSection, .skillsSection, .contactSection, .aboutSection'
    );

    // Set initial hidden state
    revealEls.forEach(el => {
        el.style.opacity    = '0';
        el.style.transform  = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // animate only once
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(el => observer.observe(el));


    // 7. SKILL CARD — stagger animation delay
    // Each skill card fades in slightly after the previous one.

    document.querySelectorAll('.sk-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
    });

    document.querySelectorAll('.exp-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.15}s`;
    });

    // 8. BACK-TO-TOP BUTTON
    // Creates and injects a back-to-top button that appears after scrolling down.

    const backToTop = document.createElement('button');
    backToTop.innerHTML   = '↑';
    backToTop.id          = 'backToTop';
    backToTop.title       = 'Back to top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 32px;
        right: 28px;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: blueviolet;
        color: white;
        border: none;
        font-size: 18px;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 14px rgba(138,43,226,0.5);
        z-index: 999;
        transition: opacity 0.3s, transform 0.3s;
        font-family: 'Poppins', sans-serif;
    `;
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // 9. COPY EMAIL ON CLICK — contact section
    // Clicking the email in the contact section copies it to clipboard
    // and briefly shows a "Copied!" tooltip.

    const emailItem = document.querySelector('.ct-item');

    if (emailItem) {
        emailItem.style.cursor = 'pointer';
        emailItem.title        = 'Click to copy email';

        emailItem.addEventListener('click', () => {
            const email = 'harsh952945@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                const original = emailItem.innerText.trim();

                // Show copied feedback
                const toast = document.createElement('div');
                toast.innerText = '✓ Email copied!';
                toast.style.cssText = `
                    position: fixed;
                    bottom: 90px;
                    right: 28px;
                    background: blueviolet;
                    color: white;
                    padding: 8px 18px;
                    border-radius: 8px;
                    font-size: 13px;
                    font-family: 'Poppins', sans-serif;
                    z-index: 9999;
                    opacity: 1;
                    transition: opacity 0.4s;
                `;
                document.body.appendChild(toast);

                setTimeout(() => {
                    toast.style.opacity = '0';
                    setTimeout(() => toast.remove(), 400);
                }, 2000);
            });
        });
    }


   
    // 10. HAMBURGER X ANIMATION — CSS injected
    // Animates hamburger lines into an X when .active is added.

    const style = document.createElement('style');
    style.textContent = `
        .hamburger.active span:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
        }
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        .hamburger.active span:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
        }
        .hamburger span {
            transition: transform 0.3s ease, opacity 0.3s ease;
            display: block;
        }
        nav a.active {
            color: blueviolet !important;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);

}); // end DOMContentLoaded