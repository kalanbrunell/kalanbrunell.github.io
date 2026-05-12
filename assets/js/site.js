(() => {
  // Nav border/shadow once the page scrolls
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Reveal-on-scroll via IntersectionObserver
  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !targets.length) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    /* Fire when the element is ~120px below the viewport — early enough
       that tall cards have visible content as the user approaches, but
       late enough that the animation itself is still on-screen. */
    { threshold: 0, rootMargin: '0px 0px 120px 0px' }
  );
  targets.forEach((el) => io.observe(el));
})();
