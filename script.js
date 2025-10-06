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