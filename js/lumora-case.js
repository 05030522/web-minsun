(() => {
  'use strict';

  const project = document.getElementById('lumora-project');
  if (!project) return;

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const viewer = project.querySelector('#lumora-live');
  const frame = project.querySelector('#lumora-live-frame');
  const stage = project.querySelector('#lumora-frame-stage');
  const shell = project.querySelector('#lumora-frame-shell');
  const panel = project.querySelector('#lumora-live-panel');
  const deviceTabs = [...project.querySelectorAll('[data-device]')].filter((item) => item.matches('button'));
  const pageButtons = [...project.querySelectorAll('button[data-page]')];
  const openPage = project.querySelector('#lumora-open-page');
  const pageLabel = project.querySelector('#lumora-page-label');
  const viewportSize = project.querySelector('#lumora-viewport-size');
  const deviceDescription = project.querySelector('#lumora-device-description');

  const devices = {
    desktop: { width: 1440, height: 900, description: 'PC · 넓은 이미지와 여유 있는 상품 간격으로 공간의 분위기를 먼저 보여줍니다.' },
    tablet: { width: 820, height: 1080, description: 'PAD · 화면 폭에 맞춰 메뉴와 상품 배열이 바뀌고, 터치로 편하게 탐색할 수 있습니다.' },
    mobile: { width: 390, height: 844, description: 'MOBILE · 한 손으로 탐색하기 쉽도록 메뉴와 구매 정보를 작은 화면에 맞게 재배치했습니다.' }
  };
  const pages = {
    home: { path: './projects/lumora/index.html', label: '브랜드 홈' },
    collection: { path: './projects/lumora/list.html', label: '상품 목록' },
    product: { path: './projects/lumora/product.html?pid=1', label: '상품 상세' }
  };
  let activeDevice = deviceTabs.find((tab) => tab.getAttribute('aria-selected') === 'true')?.dataset.device || 'desktop';
  let activePage = pageButtons.find((button) => button.getAttribute('aria-pressed') === 'true')?.dataset.page || 'home';
  let activeURL = new URL(pages[activePage].path, document.baseURI);

  function displayPage(page, url) {
    activePage = page;
    activeURL = new URL(url.href);
    activeURL.searchParams.delete('embed');
    pageButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.page === page));
    });
    if (pageLabel) pageLabel.textContent = pages[page].label;
    if (openPage) openPage.href = activeURL.href;
    if (frame) frame.title = `LUMORA ${pages[page].label} · 실제 사이트 미리보기`;
  }

  function resizeFrame() {
    if (!frame || !stage || !shell) return;
    const device = devices[activeDevice];
    const stageStyle = window.getComputedStyle(stage);
    const availableWidth = stage.clientWidth - parseFloat(stageStyle.paddingLeft || 0) - parseFloat(stageStyle.paddingRight || 0);
    if (availableWidth <= 0) return;
    const scale = Math.min(1, availableWidth / device.width);

    // Keep a real device viewport inside the iframe; scale only its presentation.
    frame.width = String(device.width);
    frame.height = String(device.height);
    frame.style.width = `${device.width}px`;
    frame.style.height = `${device.height}px`;
    frame.style.maxWidth = 'none';
    frame.style.transformOrigin = 'top left';
    frame.style.transform = `scale(${scale})`;
    shell.style.width = `${device.width * scale}px`;
    shell.style.height = `${device.height * scale}px`;
    shell.style.maxWidth = '100%';
  }

  function selectDevice(name, focusTab = false) {
    if (!devices[name]) return;
    activeDevice = name;
    if (viewer) viewer.dataset.device = name;
    deviceTabs.forEach((tab) => {
      const selected = tab.dataset.device === name;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected) {
        if (!tab.id) tab.id = `lumora-device-${name}`;
        if (panel) panel.setAttribute('aria-labelledby', tab.id);
        if (focusTab) tab.focus();
      }
    });
    if (viewportSize) viewportSize.textContent = `${devices[name].width} × ${devices[name].height}`;
    if (deviceDescription) deviceDescription.textContent = devices[name].description;
    resizeFrame();
  }

  function loadPage(page, url) {
    if (!pages[page] || !frame) return;
    const destination = url ? new URL(url.href) : new URL(pages[page].path, document.baseURI);
    displayPage(page, destination);
    destination.searchParams.set('embed', '1');
    frame.setAttribute('aria-busy', 'true');
    frame.src = destination.href;
  }

  deviceTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectDevice(tab.dataset.device));
    tab.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % deviceTabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + deviceTabs.length) % deviceTabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = deviceTabs.length - 1;
      else return;
      event.preventDefault();
      selectDevice(deviceTabs[next].dataset.device, true);
    });
  });

  pageButtons.forEach((button) => button.addEventListener('click', () => loadPage(button.dataset.page)));
  project.querySelector('#lumora-reload')?.addEventListener('click', () => loadPage(activePage, activeURL));

  project.querySelectorAll('[data-try-page]').forEach((button) => {
    button.addEventListener('click', (event) => {
      if (!pages[button.dataset.tryPage] || !viewer || !frame) return;
      event.preventDefault();
      if (button.dataset.tryDevice) selectDevice(button.dataset.tryDevice);
      loadPage(button.dataset.tryPage);
      viewer.scrollIntoView({ behavior: motion.matches ? 'instant' : 'smooth', block: 'start' });
      const selectedPageButton = pageButtons.find((item) => item.dataset.page === button.dataset.tryPage);
      selectedPageButton?.focus({ preventScroll: true });
    });
  });

  frame?.addEventListener('load', () => {
    frame.setAttribute('aria-busy', 'false');
    try {
      // Internal navigation can change the product or collection query without using the toolbar.
      const loadedURL = new URL(frame.contentWindow.location.href);
      const projectURL = new URL('./projects/lumora/', document.baseURI);
      if (loadedURL.origin !== projectURL.origin || !loadedURL.pathname.startsWith(projectURL.pathname)) return;
      const filename = loadedURL.pathname.slice(projectURL.pathname.length);
      const page = filename === 'list.html' ? 'collection' : filename === 'product.html' ? 'product' : filename === 'index.html' || filename === '' ? 'home' : null;
      if (page) displayPage(page, loadedURL);
    } catch {
      // Direct file previews may isolate iframe origins. Toolbar navigation still works.
    }
  });

  selectDevice(activeDevice);
  displayPage(activePage, activeURL);
  if (stage && 'ResizeObserver' in window) {
    new ResizeObserver(resizeFrame).observe(stage);
  } else {
    window.addEventListener('resize', resizeFrame, { passive: true });
  }

  const filterButtons = [...project.querySelectorAll('[data-collection-filter]')];
  const collectionItems = [...project.querySelectorAll('[data-collection-item]')];
  const collectionCount = project.querySelector('#lumora-collection-count');
  function filterCollection(category) {
    let count = 0;
    collectionItems.forEach((item) => {
      const matches = category === 'all' || item.dataset.category === category;
      item.hidden = !matches;
      if (matches) count += 1;
    });
    filterButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.collectionFilter === category)));
    if (collectionCount) collectionCount.textContent = `${count}개의 가구`;
  }
  filterButtons.forEach((button) => button.addEventListener('click', () => filterCollection(button.dataset.collectionFilter)));
  if (filterButtons.length) filterCollection(filterButtons.find((button) => button.getAttribute('aria-pressed') === 'true')?.dataset.collectionFilter || 'all');

  const galleryImage = project.querySelector('#lumora-gallery-image');
  const galleryButtons = [...project.querySelectorAll('[data-gallery-image]')];
  const galleryDialog = project.querySelector('#lumora-gallery-dialog');
  const galleryLarge = project.querySelector('#lumora-gallery-large');
  let galleryTrigger = null;

  galleryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!galleryImage || !button.dataset.galleryImage) return;
      galleryImage.src = button.dataset.galleryImage;
      galleryImage.alt = button.dataset.galleryAlt || button.querySelector('img')?.alt || 'LUMORA 가구의 소재와 형태';
      galleryButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    });
  });

  project.querySelectorAll('[data-gallery-zoom]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!galleryImage || !galleryDialog || !galleryLarge || galleryDialog.open) return;
      galleryLarge.src = galleryImage.src;
      galleryLarge.alt = galleryImage.alt;
      if (typeof galleryDialog.showModal !== 'function') {
        window.open(galleryImage.src, '_blank', 'noopener');
        return;
      }
      galleryTrigger = button;
      galleryDialog.showModal();
      document.body.classList.add('lumora-gallery-open');
    });
  });

  if (galleryDialog) {
    galleryDialog.querySelectorAll('[data-gallery-close]').forEach((button) => button.addEventListener('click', () => galleryDialog.close()));
    galleryDialog.addEventListener('click', (event) => {
      if (event.target !== galleryDialog) return;
      const rect = galleryDialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) galleryDialog.close();
    });
    galleryDialog.addEventListener('close', () => {
      document.body.classList.remove('lumora-gallery-open');
      galleryTrigger?.focus({ preventScroll: true });
      galleryTrigger = null;
    });
  }

  const reveals = [...project.querySelectorAll('[data-lumora-reveal]')];
  let revealObserver;
  function revealAll() {
    project.classList.remove('is-enhanced');
    reveals.forEach((item) => item.classList.add('is-visible'));
    revealObserver?.disconnect();
  }
  if (!motion.matches && 'IntersectionObserver' in window) {
    try {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
      reveals.forEach((item) => revealObserver.observe(item));
      project.classList.add('is-enhanced');
    } catch {
      revealAll();
    }
  } else {
    revealAll();
  }
  motion.addEventListener?.('change', (event) => { if (event.matches) revealAll(); });

  const chapterLinks = [...project.querySelectorAll('.lumora-project__index a[href^="#"]')];
  if (chapterLinks.length && 'IntersectionObserver' in window) {
    const chapters = chapterLinks.map((link) => ({ link, section: document.getElementById(link.hash.slice(1)) })).filter(({ section }) => section && project.contains(section));
    const visibleChapters = new Set();
    const chapterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleChapters.add(entry.target);
        else visibleChapters.delete(entry.target);
      });
      const active = chapters.find(({ section }) => visibleChapters.has(section));
      if (!active) return;
      chapters.forEach(({ link }) => {
        if (link === active.link) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    chapters.forEach(({ section }) => chapterObserver.observe(section));
  }
})();
