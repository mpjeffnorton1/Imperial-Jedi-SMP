function showPage(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageName).classList.remove('hidden');
}
// Minimal, consolidated script for the site
// Provides: showPage, carousel (if present), and mobile nav toggle

function showPage(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.add('hidden'));
    const target = document.getElementById(pageName);
    if (target) target.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    /* ----------------------- Carousel ----------------------- */
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        const dotsContainer = document.querySelector('.carousel-dots');

        let currentIndex = 0;
        let autoplayId = null;
        const AUTOPLAY_DELAY = 4000;

        // build dots only if container exists
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            slides.forEach((_, i) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.setAttribute('role', 'tab');
                btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
                btn.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(btn);
            });
        }

        function update() {
            const offset = -currentIndex * 100;
            track.style.transform = `translateX(${offset}%)`;
            if (dotsContainer) {
                const dots = Array.from(dotsContainer.children);
                dots.forEach((d, i) => d.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false'));
            }
        }

        function goToSlide(index) {
            currentIndex = (index + slides.length) % slides.length;
            update();
            restartAutoplay();
        }

        function next() { goToSlide(currentIndex + 1); }
        function prev() { goToSlide(currentIndex - 1); }

        if (nextBtn) nextBtn.addEventListener('click', next);
        if (prevBtn) prevBtn.addEventListener('click', prev);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        });

        function startAutoplay() {
            stopAutoplay();
            autoplayId = setInterval(() => next(), AUTOPLAY_DELAY);
        }

        function stopAutoplay() {
            if (autoplayId) { clearInterval(autoplayId); autoplayId = null; }
        }

        function restartAutoplay() { stopAutoplay(); startAutoplay(); }

        const carousel = document.querySelector('.carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoplay);
            carousel.addEventListener('mouseleave', startAutoplay);
        }

        update();
        startAutoplay();
    }

    /* -------------------- Mobile nav toggle ------------------- */
    const toggle = document.querySelector('.nav-toggle');
    const navContainer = document.querySelector('.nav-container');
    if (toggle && navContainer) {
        // ensure aria-expanded present
        if (!toggle.hasAttribute('aria-expanded')) toggle.setAttribute('aria-expanded', 'false');

        // create backdrop if it doesn't exist already
        let backdrop = document.querySelector('.nav-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'nav-backdrop';
            document.body.appendChild(backdrop);
        }

        function openNav() {
            navContainer.classList.add('open');
            backdrop.classList.add('show');
            toggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        function closeNav() {
            navContainer.classList.remove('open');
            backdrop.classList.remove('show');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            if (expanded) closeNav(); else openNav();
        });

        backdrop.addEventListener('click', closeNav);

        // Close nav when a link inside nav is clicked
        navContainer.addEventListener('click', (e) => {
            const target = e.target;
            if (target && target.tagName === 'A') closeNav();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const expanded = toggle.getAttribute('aria-expanded') === 'true';
                if (expanded) closeNav();
            }
        });

        // Swap toggle icon when opening/closing
        const originalIcon = toggle.innerHTML;
        function updateToggleIcon(open) {
            toggle.innerHTML = open ? '✕' : originalIcon;
        }
        updateToggleIcon(toggle.getAttribute('aria-expanded') === 'true');
        const observer = new MutationObserver(() => {
            updateToggleIcon(toggle.getAttribute('aria-expanded') === 'true');
        });
        observer.observe(toggle, { attributes: true, attributeFilter: ['aria-expanded'] });
    }
});