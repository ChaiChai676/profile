/* Fade in*/

document.addEventListener("DOMContentLoaded", () => {
    const fadeIn = document.querySelectorAll('.fade-in');

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('start');
                appearOnScroll.unobserve(entry.target);
            }
        });
    });

    fadeIn.forEach(section => {
        appearOnScroll.observe(section);
    });
});

