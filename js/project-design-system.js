/* Both project hosts use this single template; only projectDesignSystems data differs. */
(() => {
  'use strict';

  const template = document.createElement('template');
  template.innerHTML = `
    <div class="design-system__inner">
      <h3 class="design-system__title" data-design-reveal>DESIGN SYSTEM</h3>
      <div class="design-system__layout">
        <div class="design-system__colors" data-design-reveal>
          <h4 class="design-system__label">COLOR PALETTE</h4>
          <div class="design-system__main">
            <div class="design-system__main-label"><strong>MAIN</strong><span></span></div>
            <span class="design-system__hex"></span>
          </div>
          <ul class="design-system__palette" aria-label="보조 색상 팔레트"></ul>
          <div class="design-system__summary">
            <h5>COLOR CONCEPT SUMMARY</h5>
            <p></p>
          </div>
        </div>
        <div class="design-system__typography">
          <h4 class="design-system__label">FONTSTYLE</h4>
          <div class="design-system__fonts"></div>
        </div>
      </div>
      <div class="design-system__links">
        <div class="project-figma">
          <a class="project-figma__button" role="link" aria-disabled="true" tabindex="0">
            <span>FIGMA PREVIEW</span><span class="project-figma__arrow" aria-hidden="true">↗</span>
          </a>
          <p class="project-figma__status">준비 중 · 링크가 곧 추가됩니다.</p>
        </div>
      </div>
    </div>`;

  function textElement(tag, className, value) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = value;
    return element;
  }

  function configureFigma(host, key, brand) {
    const button = host.querySelector('.project-figma__button');
    const status = host.querySelector('.project-figma__status');
    status.id = `${key}-figma-status`;
    button.setAttribute('aria-describedby', status.id);
    button.setAttribute('aria-label', `${brand} FIGMA PREVIEW ↗`);
    // Empty, relative, hash-only and non-HTTP URLs remain non-navigable.
    let destination;
    try {
      const url = new URL(projectLinks[key]?.figma?.trim());
      if (url.protocol === 'https:' || url.protocol === 'http:') destination = url.href;
    } catch { /* Not published yet. */ }

    if (destination) {
      button.href = destination;
      button.target = '_blank';
      button.rel = 'noopener noreferrer';
      button.removeAttribute('aria-disabled');
      button.removeAttribute('role');
      button.removeAttribute('tabindex');
      status.textContent = '새 탭에서 디자인 시안을 확인하세요.';
    } else {
      // Keep the placeholder keyboard-focusable so its status can be discovered.
      button.addEventListener('click', (event) => event.preventDefault());
      button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') event.preventDefault();
      });
    }
  }

  document.querySelectorAll('[data-design-system]').forEach((host) => {
    const key = host.dataset.designSystem;
    const brand = projectDesignSystems[key];
    if (!brand) return;
    host.style.setProperty('--ds-title', brand.titleColor);
    host.style.setProperty('--ds-main', brand.main.hex);
    host.style.setProperty('--ds-on-main', brand.main.text);
    host.replaceChildren(template.content.cloneNode(true));
    const title = host.querySelector('.design-system__title');
    title.id = `${key}-design-system-title`;
    host.setAttribute('aria-labelledby', title.id);
    host.querySelector('.design-system__main-label span').textContent = brand.main.name;
    host.querySelector('.design-system__main > .design-system__hex').textContent = brand.main.hex;
    host.querySelector('.design-system__summary p').textContent = brand.summary;

    brand.palette.forEach(({ hex, name }) => {
      const chip = textElement('li', 'design-system__chip', '');
      const swatch = textElement('span', 'design-system__swatch', '');
      swatch.style.setProperty('--swatch', hex);
      swatch.setAttribute('aria-hidden', 'true');
      chip.append(swatch, textElement('span', 'design-system__hex', hex), textElement('span', 'design-system__color-name', name));
      host.querySelector('.design-system__palette').append(chip);
    });

    brand.fonts.forEach((font) => {
      const sample = textElement('div', 'design-system__font', '');
      sample.setAttribute('data-design-reveal', '');
      sample.style.setProperty('--sample-font', font.family);
      const letters = textElement('p', 'design-system__font-sample', 'Aa');
      letters.setAttribute('aria-hidden', 'true');
      const weights = textElement('p', 'design-system__font-weights', '');
      weights.append(textElement('span', '', 'Regular 400'), textElement('span', '', 'Bold 700'));
      sample.append(letters, textElement('h5', 'design-system__font-name', font.name),
        textElement('p', 'design-system__font-description', font.description),
        textElement('p', 'design-system__font-specimen', font.specimen), weights);
      host.querySelector('.design-system__fonts').append(sample);
    });
    configureFigma(host, key, brand.name);
  });

  if (!('IntersectionObserver' in window)) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const pending = new Set();
  const reveal = (element) => {
    element.classList.remove('design-system__pending');
    pending.delete(element);
    observer.unobserve(element);
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => { if (isIntersecting) reveal(target); });
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
  document.querySelectorAll('.project-design-system [data-design-reveal]').forEach((element) => {
    if (motion.matches || element.getBoundingClientRect().top < innerHeight) return;
    element.classList.add('design-system__pending');
    pending.add(element);
    observer.observe(element);
  });
  const respectMotionPreference = () => {
    if (motion.matches) [...pending].forEach(reveal);
  };
  if (motion.addEventListener) motion.addEventListener('change', respectMotionPreference);
  else motion.addListener(respectMotionPreference);
})();
