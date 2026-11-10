/* Rosly Tavarez portfolio: interaction layer.
   One signature motion per surface: masked line rises for type, vertical wipes for media,
   a red progress thread for the case-study timeline, and zoom-from-origin for the viewer. */
(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGsap = typeof window.gsap !== 'undefined';
  const crossDocVT = 'onpagereveal' in window;

  if (!hasGsap) { root.classList.add('reveal-ready'); return; }
  const { gsap } = window;
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
  gsap.config({ nullTargetWarn: false });
  const EXPO = 'expo.out';

  /* ───────── smooth scroll ───────── */
  let lenis = null;
  if (!reduced && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const scrollTo = (target, offset = 0) => {
    if (lenis) lenis.scrollTo(target, { offset, duration: 1.4 });
    else {
      const y = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
    }
  };

  /* ───────── header: solid after hero, hides on scroll down ───────── */
  const head = document.querySelector('.site-head');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    head.classList.toggle('is-solid', y > 40);
    const hide = y > lastY && y > 400 && !document.querySelector('dialog[open]');
    head.classList.toggle('is-hidden', hide);
    document.body.classList.toggle('head-hidden', hide);
    lastY = y;
  };
  if (lenis) lenis.on('scroll', onScroll); else window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ───────── page intro ───────── */
  function intro() {
    const tl = gsap.timeline({ defaults: { ease: EXPO } });
    const bits = document.querySelectorAll('[data-hero]');
    if (bits.length) tl.from(bits, { y: 26, opacity: 0, filter: 'blur(12px)', duration: 1.2, stagger: 0.08, clearProps: 'filter' }, 0.1);
    const art = document.querySelector('[data-hero-art]');
    if (art) {
      tl.from(art.querySelectorAll('.gfolder__back, .gfolder__tab'), { y: 60, opacity: 0, duration: 1.3 }, 0.2)
        .from(art.querySelectorAll('.blobs b'), { scale: 0.2, opacity: 0, duration: 1.8, stagger: 0.1, ease: 'expo.out' }, 0.3)
        .from(art.querySelector('.gfolder__front'), { y: 80, opacity: 0, duration: 1.3 }, 0.45)
        .from(art.querySelectorAll('.sparkles i'), { scale: 0, duration: 0.9, stagger: 0.06, ease: 'back.out(3)' }, 1.0);
      const orb = art.querySelector('.hero__orb, .about__photo');
      if (orb) tl.from(orb, { y: -50, scale: 0.85, opacity: 0, filter: 'blur(16px)', duration: 1.4, clearProps: 'filter' }, 0.6);
    }
    const title = document.querySelector('.cs__title, .about__title');
    if (title && !reduced) {
      const split = SplitText.create(title, { type: 'words,chars' });
      tl.from(split.chars, { yPercent: 30, opacity: 0, filter: 'blur(8px)', duration: 1.1, stagger: 0.02, onComplete: () => split.revert() }, crossDocVT ? 0.25 : 0.1);
    }
    const cover = document.querySelector('.fig--cover .fig__btn');
    if (cover) tl.from(cover, { y: 60, opacity: 0, filter: 'blur(14px)', duration: 1.4, clearProps: 'filter' }, 0.5);
    return tl;
  }

  /* ───────── scroll reveals ───────── */
  function reveals() {
    // Everything comes into focus: a short rise out of a blur
    gsap.utils.toArray('[data-reveal="rise"]').forEach((el) => {
      gsap.fromTo(el, { y: 28, opacity: 0, filter: 'blur(10px)' }, {
        y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, ease: EXPO, clearProps: 'filter',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });
    gsap.utils.toArray('[data-reveal="stagger"]').forEach((el) => {
      gsap.fromTo(el.children, { y: 34, opacity: 0, filter: 'blur(8px)' }, {
        y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: EXPO, stagger: 0.08, clearProps: 'filter',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
    // Images de-frost as they arrive
    gsap.utils.toArray('[data-reveal="fig"]').forEach((fig) => {
      if (fig.classList.contains('fig--cover')) return;
      const im = fig.querySelector('img');
      const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top 88%', once: true } });
      tl.fromTo(fig, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: EXPO })
        .fromTo(im, { filter: 'blur(18px)', scale: 1.08 }, { filter: 'blur(0px)', scale: 1, duration: 1.4, ease: EXPO, clearProps: 'filter,transform' }, 0);
    });
    const foot = document.querySelector('.site-foot__nav');
    if (foot) gsap.from(foot.children, { y: 20, opacity: 0, stagger: 0.05, duration: 0.9, ease: EXPO, scrollTrigger: { trigger: foot, start: 'top 96%', once: true } });
  }

  /* ───────── case-study timeline ───────── */
  function timeline() {
    const tl = document.querySelector('.tl');
    if (!tl) return;
    const links = [...tl.querySelectorAll('[data-step-link]')];
    const fill = tl.querySelector('.tl__fill');
    const content = document.querySelector('.cs__content');
    const mobile = window.matchMedia('(max-width: 1000px)');

    gsap.to(fill, {
      scaleY: () => (mobile.matches ? 1 : 1), ease: 'none',
      scrollTrigger: {
        trigger: content, start: 'top 55%', end: 'bottom 60%', scrub: 0.4,
        onUpdate: (st) => gsap.set(fill, { scaleX: st.progress, scaleY: 1 }),
      },
    });

    const setActive = (id) => {
      let passed = true;
      links.forEach((a) => {
        const on = a.dataset.stepLink === id;
        if (on) passed = false;
        a.classList.toggle('is-active', on);
        a.classList.toggle('is-done', passed && !on);
        if (on) {
          a.setAttribute('aria-current', 'step');
          if (mobile.matches) {
            const ol = a.closest('ol');
            ol.scrollTo({ left: a.offsetLeft - 20, behavior: reduced ? 'auto' : 'smooth' });
          }
        } else a.removeAttribute('aria-current');
      });
    };
    document.querySelectorAll('.cs__sec').forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec, start: 'top 55%', end: 'bottom 55%',
        onToggle: (st) => st.isActive && setActive(sec.id),
      });
    });
    setActive(links[0]?.dataset.stepLink);

    links.forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(a.dataset.stepLink);
      const offset = -(parseInt(getComputedStyle(root).getPropertyValue('--head-h')) + (mobile.matches ? 90 : 24));
      scrollTo(target, offset);
      history.replaceState(null, '', '#' + a.dataset.stepLink);
    }));
  }

  /* ───────── home: folders slide onto the desk ───────── */
  function workPreview() {
    const posters = gsap.utils.toArray('.poster');
    if (!posters.length) return;
    if (!reduced) posters.forEach((p, i) => gsap.from(p, { y: 70, opacity: 0, filter: 'blur(12px)', duration: 1.2, ease: EXPO, delay: (i % 2) * 0.1, clearProps: 'filter',
      scrollTrigger: { trigger: p, start: 'top 92%', once: true } }));
    // Touch screens can't hover: the folder opens as it passes the middle of the screen
    if (!fine) posters.forEach((p) => ScrollTrigger.create({ trigger: p, start: 'top 55%', end: 'bottom 45%', toggleClass: 'is-peek' }));
    // Glass follows the pointer a little, like light moving across it
    if (fine && !reduced) posters.forEach((p) => {
      const front = p.querySelector('.gfolder__front');
      const blobs = p.querySelector('.gfolder .blobs');
      p.addEventListener('pointermove', (e) => {
        const r = p.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(blobs, { x: x * 30, y: y * 24, duration: 1, ease: 'power3' });
        gsap.to(front, { '--gx': `${(x + 0.5) * 100}%`, '--gy': `${(y + 0.5) * 100}%`, duration: 0.6 });
      });
      p.addEventListener('pointerleave', () => gsap.to(blobs, { x: 0, y: 0, duration: 1.2, ease: 'power3' }));
    });
  }

  function polaroid() {}

  /* ───────── clock ───────── */
  function clock() {
    const el = document.querySelector('[data-clock]');
    if (!el) return;
    const fmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Chicago' });
    const tick = () => { el.textContent = fmt.format(new Date()); };
    tick(); setInterval(tick, 15000);
  }

  /* ───────── dialogs ───────── */
  const viewer = document.getElementById('viewer');
  const vPanel = viewer.querySelector('.viewer__panel');
  const vBody = viewer.querySelector('.viewer__body');
  const vTitle = viewer.querySelector('.viewer__title');
  const vDl = viewer.querySelector('[data-viewer-dl]');
  const vFs = viewer.querySelector('[data-viewer-fs]');
  let origin = null;

  function lockScroll(on) { if (lenis) on ? lenis.stop() : lenis.start(); }

  function openViewer(btn) {
    const pages = btn.dataset.pages.split(',');
    vTitle.textContent = btn.dataset.title || '';
    vDl.href = btn.dataset.dlHref || pages[0];
    vDl.setAttribute('download', btn.dataset.download || '');
    vBody.innerHTML = '';
    vBody.classList.toggle('is-single', pages.length === 1 && !btn.dataset.dlHref?.endsWith('.pdf'));
    vBody.classList.toggle('is-doc', !!btn.dataset.dlHref?.endsWith('.pdf'));
    pages.forEach((src, i) => {
      const im = new Image();
      im.src = src; im.alt = `${btn.dataset.title || 'Page'}${pages.length > 1 ? `, page ${i + 1}` : ''}`;
      im.decoding = 'async';
      vBody.appendChild(im);
    });
    viewer.classList.remove('is-fs'); vFs.setAttribute('aria-pressed', 'false');
    vFs.querySelector('span').textContent = 'Fullscreen';
    origin = btn;
    viewer.showModal();
    lockScroll(true);
    requestAnimationFrame(() => viewer.classList.add('is-open'));
    vBody.scrollTop = 0;

    // zoom from the element that opened it
    const from = (btn.querySelector('.fig__frame, .filecard__thumb') || btn).getBoundingClientRect();
    const to = vPanel.getBoundingClientRect();
    if (reduced) { gsap.fromTo(vPanel, { opacity: 0 }, { opacity: 1, duration: 0.2 }); return; }
    gsap.fromTo(vPanel, {
      x: from.left + from.width / 2 - (to.left + to.width / 2),
      y: from.top + from.height / 2 - (to.top + to.height / 2),
      scaleX: Math.max(from.width / to.width, 0.08), scaleY: Math.max(from.height / to.height, 0.08),
      opacity: 0.4, borderRadius: 2,
    }, { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1, duration: 0.75, ease: 'expo.out', clearProps: 'transform,opacity' });
    gsap.from(vBody.children, { y: 30, opacity: 0, duration: 0.8, ease: EXPO, stagger: 0.06, delay: 0.2 });
  }

  function closeViewer() {
    if (!viewer.open) return;
    viewer.classList.remove('is-open');
    const done = () => { viewer.close(); viewer.classList.remove('is-fs'); lockScroll(false); origin?.focus({ preventScroll: true }); };
    if (reduced) return done();
    const src = origin && (origin.querySelector('.fig__frame, .filecard__thumb') || origin).getBoundingClientRect();
    const to = vPanel.getBoundingClientRect();
    const onScreen = src && src.bottom > 0 && src.top < window.innerHeight;
    gsap.to(vPanel, onScreen ? {
      x: src.left + src.width / 2 - (to.left + to.width / 2), y: src.top + src.height / 2 - (to.top + to.height / 2),
      scaleX: Math.max(src.width / to.width, 0.08), scaleY: Math.max(src.height / to.height, 0.08), opacity: 0,
      duration: 0.5, ease: 'expo.in', onComplete: () => { gsap.set(vPanel, { clearProps: 'all' }); done(); },
    } : { y: 40, opacity: 0, duration: 0.35, ease: 'power3.in', onComplete: () => { gsap.set(vPanel, { clearProps: 'all' }); done(); } });
  }

  function toggleFs() {
    const state = Flip.getState(vPanel);
    const on = !viewer.classList.contains('is-fs');
    viewer.classList.toggle('is-fs', on);
    vFs.setAttribute('aria-pressed', String(on));
    vFs.querySelector('span').textContent = on ? 'Exit fullscreen' : 'Fullscreen';
    if (reduced) return;
    Flip.from(state, { duration: 0.7, ease: 'expo.inOut', absolute: false, props: 'borderRadius' });
    gsap.fromTo(vBody.children, { scale: on ? 0.96 : 1.03 }, { scale: 1, duration: 0.8, ease: EXPO, clearProps: 'transform' });
  }

  viewer.addEventListener('cancel', (e) => { e.preventDefault(); closeViewer(); });
  viewer.addEventListener('click', (e) => { if (e.target === viewer) closeViewer(); });
  viewer.querySelector('[data-viewer-close]').addEventListener('click', closeViewer);
  vFs.addEventListener('click', toggleFs);
  viewer.addEventListener('keydown', (e) => { if (e.key.toLowerCase() === 'f' && !e.metaKey && !e.ctrlKey) toggleFs(); });
  vBody.addEventListener('dblclick', toggleFs);

  // contact
  const contact = document.getElementById('contact');
  const cPanel = contact.querySelector('.contact__panel');
  let cOrigin = null;
  function openContact(btn) {
    cOrigin = btn;
    contact.showModal(); lockScroll(true);
    requestAnimationFrame(() => contact.classList.add('is-open'));
    if (reduced) return;
    gsap.fromTo(cPanel, { y: 60, clipPath: 'inset(100% 0% 0% 0%)' }, { y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.out', clearProps: 'clipPath,transform' });
    gsap.from(cPanel.querySelectorAll('h2, .contact__lede, .contact__list li'), { y: 24, opacity: 0, duration: 0.9, ease: EXPO, stagger: 0.05, delay: 0.15 });
  }
  function closeContact(then) {
    if (!contact.open) return then?.();
    contact.classList.remove('is-open');
    const done = () => { contact.close(); lockScroll(false); gsap.set(cPanel, { clearProps: 'all' }); if (then) then(); else cOrigin?.focus({ preventScroll: true }); };
    if (reduced) return done();
    gsap.to(cPanel, { y: 40, opacity: 0, duration: 0.35, ease: 'power3.in', onComplete: done });
  }
  contact.addEventListener('cancel', (e) => { e.preventDefault(); closeContact(); });
  contact.addEventListener('click', (e) => { if (e.target === contact) closeContact(); });
  contact.querySelector('[data-contact-close]').addEventListener('click', () => closeContact());

  document.addEventListener('click', (e) => {
    const v = e.target.closest('[data-view]');
    if (v) {
      e.preventDefault();
      if (contact.open) closeContact(() => openViewer(v)); else openViewer(v);
      return;
    }
    const c = e.target.closest('[data-contact]');
    if (c) { e.preventDefault(); openContact(c); return; }
    const cp = e.target.closest('[data-copy]');
    if (cp) {
      navigator.clipboard?.writeText(cp.dataset.copy).then(() => {
        cp.classList.add('is-done'); cp.querySelector('span').textContent = 'Copied';
        setTimeout(() => { cp.classList.remove('is-done'); cp.querySelector('span').textContent = 'Copy'; }, 1800);
      });
      return;
    }
    if (e.target.closest('[data-top]')) { scrollTo(0); return; }
    const m = e.target.closest('[data-more]');
    if (m) {
      const list = document.querySelector('.more__list');
      list.scrollBy({ left: Number(m.dataset.more) * list.firstElementChild.offsetWidth * 1.05, behavior: reduced ? 'auto' : 'smooth' });
    }
  });

  /* ───────── page transition fallback (browsers without cross-document view transitions) ───────── */
  const curtain = document.querySelector('.curtain');
  if (!crossDocVT && !reduced) {
    if (root.classList.contains('is-entering')) {
      root.classList.remove('is-entering');
      gsap.fromTo(curtain, { opacity: 1, visibility: 'visible' }, { opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.05, onComplete: () => gsap.set(curtain, { visibility: 'hidden' }) });
      try { sessionStorage.removeItem('pt'); } catch (_) { /* ignore */ }
    }
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      if (a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname.includes('/files/') || url.pathname.includes('/choretap-app')) return;
      if (url.pathname === location.pathname && url.hash) return;
      e.preventDefault();
      try { sessionStorage.setItem('pt', '1'); } catch (_) { /* ignore */ }
      gsap.fromTo(curtain, { opacity: 0, visibility: 'visible' }, { opacity: 1, duration: 0.45, ease: 'expo.inOut', onComplete: () => { location.href = url.href; } });
    });
    window.addEventListener('pageshow', (e) => { if (e.persisted) gsap.set(curtain, { opacity: 0, visibility: 'hidden' }); });
  }

  // When arriving at /#work from another page, land on the section smoothly.
  if (location.hash === '#work') {
    const w = document.getElementById('work');
    if (w) setTimeout(() => scrollTo(w, -40), 350);
  }

  /* ───────── boot ───────── */
  const start = () => {
    if (!reduced) { intro(); reveals(); }
    root.classList.add('reveal-ready');
    timeline(); workPreview(); polaroid(); clock();
    ScrollTrigger.refresh();
  };
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 900))]).then(start);
  } else start();
})();
