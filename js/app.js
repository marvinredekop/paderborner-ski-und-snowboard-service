const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });

}, {
    threshold: 0.2
});

window.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.fade-in')
        .forEach(el => observer.observe(el));

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // Auto-scroll past hero on subpages
    const pageHero = document.querySelector('.page-hero');
    if (pageHero) {
        const firstSection = pageHero.nextElementSibling;
        if (firstSection) {
            firstSection.scrollIntoView({ behavior: 'instant' });
        }
    }

    // Pre-fill contact form when coming from pricing page
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    const preis = params.get('preis');

    if (service && preis) {
        const textarea = document.querySelector('.contact-form textarea');
        if (textarea) {
            textarea.value =
                'Hallo,\n\n' +
                'ich interessiere mich für den Service „' + service + '" (' + preis + ').\n\n' +
                'Bitte teilen Sie mir einen möglichen Termin mit.\n\n' +
                'Vielen Dank und freundliche Grüße';
        }
    }

    // Ski Intro Animation (homepage only, first visit per session)
    const intro = document.getElementById('skiIntro');
    if (intro) {

        const alreadySeen = sessionStorage.getItem('skiIntroSeen');

        if (!alreadySeen) {

            intro.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // Create snowflakes
            const flakes = ['❄', '❅', '❆', '✦'];
            for (let i = 0; i < 35; i++) {
                const snow = document.createElement('span');
                snow.className = 'snowflake';
                snow.textContent = flakes[Math.floor(Math.random() * flakes.length)];
                snow.style.left = Math.random() * 100 + '%';
                snow.style.fontSize = (Math.random() * 1.2 + 0.5) + 'rem';
                snow.style.animationDuration = (Math.random() * 3 + 2) + 's';
                snow.style.animationDelay = (Math.random() * 1.5) + 's';
                intro.appendChild(snow);
            }

            // Fade out and remove after animation
            setTimeout(() => {
                intro.classList.add('fade-out');
                document.body.style.overflow = '';

                setTimeout(() => {
                    intro.remove();
                }, 600);
            }, 5200);

            sessionStorage.setItem('skiIntroSeen', 'true');

        } else {
            intro.remove();
        }
    }
});