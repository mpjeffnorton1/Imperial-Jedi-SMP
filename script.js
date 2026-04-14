document.addEventListener('DOMContentLoaded', () => {
    // === Routing Logic ===
    const pages = document.querySelectorAll('.page');
    const navContainer = document.querySelector('.nav-container');
    let backdrop = document.querySelector('.nav-backdrop');
    const toggle = document.querySelector('.nav-toggle');

    function showPage(pageName) {
        pages.forEach(page => {
            page.classList.add('hidden');
        });
        const targetPage = document.getElementById(pageName);
        if (targetPage) {
            targetPage.classList.remove('hidden');
        }
    }
    window.showPage = showPage;

    function closeNav() {
        if (navContainer && backdrop && toggle) {
            navContainer.style.transition = 'transform 300ms ease';
            navContainer.classList.remove('open');
            backdrop.classList.remove('show');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';

            // Remove transition after animation finishes so it doesn't trigger on window resize
            setTimeout(() => {
                if (!navContainer.classList.contains('open')) {
                    navContainer.style.transition = '';
                }
            }, 300);
        }
    }

    // Global click listener for routing elements
    document.addEventListener('click', (e) => {
        // Find the closest ancestor (or the element itself) that has the data-page attribute
        const routeElement = e.target.closest('[data-page]');

        if (routeElement) {
            const pageName = routeElement.getAttribute('data-page');
            showPage(pageName);

            // If the user clicked a link inside the nav menu, close it
            if (navContainer && navContainer.contains(routeElement)) {
                closeNav();
            }
        }
    });

    // === Mobile Navigation Logic ===
    if (toggle && navContainer) {
        if (!backdrop) {
            const newBackdrop = document.createElement('div');
            newBackdrop.className = 'nav-backdrop';
            document.body.appendChild(newBackdrop);
            backdrop = newBackdrop;
            backdrop.addEventListener('click', closeNav);
        } else {
            backdrop.addEventListener('click', closeNav);
        }

        function openNav() {
            // Apply transition right before opening
            navContainer.style.transition = 'transform 300ms ease';
            void navContainer.offsetWidth; // Force browser reflow to register the transition
            navContainer.classList.add('open');

            if (backdrop) backdrop.classList.add('show');
            toggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            if (expanded) {
                closeNav();
            } else {
                openNav();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const expanded = toggle.getAttribute('aria-expanded') === 'true';
                if (expanded) closeNav();
            }
        });

        const originalIcon = toggle.innerHTML;
        function updateToggleIcon(open) {
            toggle.innerHTML = open ? '✕' : originalIcon;
        }

        updateToggleIcon(toggle.getAttribute('aria-expanded') === 'true');
    }

    // === Carousel Logic ===
    const carousel = document.querySelector('.carousel');
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        const dotsContainer = document.querySelector('.carousel-dots');
        let currentIndex = 0;
        let autoplayId = null;
        const AUTOPLAY_DELAY = 3000;

        slides.forEach((_, i) => {
            const btn = document.createElement('button');
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
            btn.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(btn);
        });

        function update() {
            const offset = -currentIndex * 100;
            track.style.transform = `translateX(${offset}%)`;
            const dots = Array.from(dotsContainer.children);
            dots.forEach((d, i) => d.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false'));
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
            // Only capture arrow keys if we are fairly sure the carousel is "active" or visible
            // This is optional but prevents accidental scrolling
            if (carousel && carousel.getBoundingClientRect().top < window.innerHeight && carousel.getBoundingClientRect().bottom > 0) {
                if (e.key === 'ArrowRight') next();
                if (e.key === 'ArrowLeft') prev();
            }
        });

        function startAutoplay() {
            autoplayId = setInterval(() => next(), AUTOPLAY_DELAY);
        }

        function stopAutoplay() {
            if (autoplayId) {
                clearInterval(autoplayId);
                autoplayId = null;
            }
        }

        function restartAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoplay);
            carousel.addEventListener('mouseleave', startAutoplay);
        }

        update();
        startAutoplay();
    }
});