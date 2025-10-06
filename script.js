function showPage(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageName).classList.remove('hidden');
}

// Simple carousel for the Home page
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    if (!track) return; // no carousel on this page

    const slides = Array.from(track.children);
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    let currentIndex = 0;
    let autoplayId = null;
    const AUTOPLAY_DELAY = 4000;

    // create dots
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

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    });

    function startAutoplay() {
        autoplayId = setInterval(() => next(), AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
        if (autoplayId) { clearInterval(autoplayId); autoplayId = null; }
    }

    function restartAutoplay() { stopAutoplay(); startAutoplay(); }

    // pause on hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // initialize
    update();
    startAutoplay();
});

// Mobile nav toggle behavior
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const navContainer = document.querySelector('.nav-container');
    if (!toggle || !navContainer) return;

    // create backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);

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

    // Close nav when a link is clicked
    navContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') closeNav();
    });
    // Close on Escape
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
    const origOpen = toggle.getAttribute('aria-expanded') === 'true';
    updateToggleIcon(origOpen);
    const origOpenObserver = new MutationObserver(() => {
        updateToggleIcon(toggle.getAttribute('aria-expanded') === 'true');
    });
    origOpenObserver.observe(toggle, { attributes: true, attributeFilter: ['aria-expanded'] });
});

function showPage(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageName).classList.remove('hidden');
}

// Simple carousel for the Home page
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    if (!track) return; // no carousel on this page

    const slides = Array.from(track.children);
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    let currentIndex = 0;
    let autoplayId = null;
    const AUTOPLAY_DELAY = 4000;

    // create dots
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

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    });

    function startAutoplay() {
        autoplayId = setInterval(() => next(), AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
        if (autoplayId) { clearInterval(autoplayId); autoplayId = null; }
    }

    function restartAutoplay() { stopAutoplay(); startAutoplay(); }

    // pause on hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // initialize
    update();
    startAutoplay();
});

// Mobile nav toggle behavior
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const navContainer = document.querySelector('.nav-container');
    if (!toggle || !navContainer) return;

    // create backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);

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

    // Close nav when a link is clicked
    navContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') closeNav();
    });
    // Close on Escape
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
    const origOpen = toggle.getAttribute('aria-expanded') === 'true';
    updateToggleIcon(origOpen);
    const origOpenObserver = new MutationObserver(() => {
        updateToggleIcon(toggle.getAttribute('aria-expanded') === 'true');
    });
    origOpenObserver.observe(toggle, { attributes: true, attributeFilter: ['aria-expanded'] });
});