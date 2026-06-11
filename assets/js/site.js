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

  // Scrollspy — highlight the nav link for the section currently in view.
  // Only runs on pages with in-page (#section) nav links, i.e. the homepage.
  const spyLinks = Array.from(
    document.querySelectorAll('.nav__links a[href^="#"]')
  );
  if (spyLinks.length && 'IntersectionObserver' in window) {
    const linkFor = new Map();
    const sections = [];
    spyLinks.forEach((link) => {
      const id = link.getAttribute('href').slice(1);
      const section = id && document.getElementById(id);
      if (section) {
        linkFor.set(section, link);
        sections.push(section);
      }
    });
    if (sections.length) {
      const setActive = (link) => {
        spyLinks.forEach((l) => {
          const on = l === link;
          l.classList.toggle('is-active', on);
          if (on) { l.setAttribute('aria-current', 'true'); }
          else { l.removeAttribute('aria-current'); }
        });
      };
      const spy = new IntersectionObserver(
        (entries) => {
          // Pick the entry nearest the top of the viewport that's intersecting.
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible.length) { setActive(linkFor.get(visible[0].target)); }
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
      );
      sections.forEach((s) => spy.observe(s));
    }
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
