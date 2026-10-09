/* GEULGIL-only enhancement: content remains visible without JavaScript. */
(() => {
  'use strict';

  function init() {
    const project = document.getElementById('geulgil-project');
    if (!project) return;

    // Use only the supplied logo variants, at their original aspect ratios.
    // Missing assets leave no broken image or substitute logo in the layout.
    project.querySelectorAll('[data-geulgil-logo]').forEach((slot) => {
      const logo = new Image();
      logo.alt = '';
      logo.decoding = 'async';
      logo.addEventListener('load', () => {
        logo.width = logo.naturalWidth;
        logo.height = logo.naturalHeight;
        slot.append(logo);
      }, { once: true });
      logo.src = slot.dataset.geulgilLogo;
    });

    if (!('IntersectionObserver' in window)) return;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const elements = [...project.querySelectorAll('[data-geulgil-reveal]')];
    const pending = new Set();
    const reveal = (element) => {
      element.classList.add('geulgil-is-visible');
      pending.delete(element);
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) reveal(target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

    // Preserve visibility for initial viewports, restored scroll positions and deep links.
    elements.forEach((element) => {
      if (reduced.matches || element.getBoundingClientRect().top < innerHeight) {
        reveal(element);
      } else {
        pending.add(element);
        observer.observe(element);
      }
    });
    if (!reduced.matches) project.classList.add('geulgil-motion-ready');

    project.addEventListener('focusin', (event) => {
      pending.forEach((element) => {
        if (element.contains(event.target)) reveal(element);
      });
    });

    const respectMotionPreference = () => {
      if (!reduced.matches) return;
      project.classList.remove('geulgil-motion-ready');
      elements.forEach(reveal);
      observer.disconnect();
    };
    if (reduced.addEventListener) reduced.addEventListener('change', respectMotionPreference);
    else reduced.addListener(respectMotionPreference);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
