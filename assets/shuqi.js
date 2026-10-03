// Shared behaviour for all pages: scroll-reveal and the homepage header state.
(function () {
    // Reveal elements as they enter the viewport.
    function initReveal() {
        const items = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
            items.forEach(el => el.classList.add('is-in'));
            return;
        }
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
        items.forEach(el => io.observe(el));
    }

    // Transparent header over the hero, solid once the hero is gone.
    function initHeader() {
        const header = document.querySelector('[data-overlay-until]');
        if (!header) return;
        const target = document.querySelector(header.dataset.overlayUntil);
        if (!target || !('IntersectionObserver' in window)) {
            header.classList.remove('is-overlay');
            return;
        }
        const io = new IntersectionObserver(([entry]) => {
            header.classList.toggle('is-overlay', entry.isIntersecting);
        }, { rootMargin: `-${header.offsetHeight || 64}px 0px 0px 0px` });
        io.observe(target);
    }

    window.ShuqiUI = { initReveal };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => { initReveal(); initHeader(); });
    } else {
        initReveal();
        initHeader();
    }
})();
