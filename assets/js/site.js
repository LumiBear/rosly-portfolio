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
    const words = document.querySelectorAll('.hero__word');
    if (words.length) {
      tl.from(words, { yPercent: 105, duration: 1.4, stagger: 0.09 }, 0.1);
      tl.from('.strip', { y: -140, rotate: -24, opacity: 0, duration: 1.6 }, 0.25);
      tl.from('.board--hero .band', { scaleX: 0, transformOrigin: 'left center', duration: 1.3, ease: 'expo.inOut', stagger: 0.1 }, 0.1);
      tl.from('.deco--charms', { y: -30, opacity: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' }, 1.0);
      tl.from('.sticker--year', { scale: 0, rotate: -60, duration: 1, ease: 'back.out(2)' }, 1.1);
      tl.from('.board--hero .deco--clip', { y: -60, opacity: 0, duration: 0.9 }, 0.7);
    }
    const title = document.querySelector('.cs__title, .about__title');
    if (title && !reduced) {
      const split = SplitText.create(title, { type: 'words,chars', charsClass: 'ch' });
      gsap.set(title, { overflow: 'hidden', paddingBottom: '.08em' });
      tl.from(split.chars, { yPercent: 110, duration: 1.2, stagger: 0.025 }, crossDocVT ? 0.25 : 0.1);
    }
    const heroBits = document.querySelectorAll('[data-hero]');
    if (heroBits.length) tl.from(heroBits, { y: 24, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.35);
    const cover = document.querySelector('.fig--cover .fig__frame');
    if (cover) {
      tl.fromTo(cover, { clipPath: 'inset(18% 8% 0% 8%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' }, 0.3);
      tl.fromTo(cover.querySelector('img'), { scale: 1.25 }, { scale: 1, duration: 1.9, ease: 'expo.inOut' }, 0.3);
    }
    return tl;
  }

  /* ───────── scroll reveals ───────── */
  function reveals() {
    // Masked line rise for display type and lead paragraphs
    document.querySelectorAll('[data-reveal="lines"]').forEach((el) => {
      SplitText.create(el, {
        type: 'lines', mask: 'lines', linesClass: 'ln', autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 105, duration: 1.15, ease: EXPO, stagger: 0.09,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        },
      });
    });

    // Paragraphs: a soft wipe from the top edge plus a short rise
    gsap.utils.toArray('[data-reveal="rise"]').forEach((el) => {
      gsap.fromTo(el, { y: 26, opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }, {
        y: 0, opacity: 1, clipPath: 'inset(0% 0% -10% 0%)', duration: 1.1, ease: EXPO,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onComplete: () => gsap.set(el, { clearProps: 'clipPath' }),
      });
    });

    // Groups: children step in one after another
    gsap.utils.toArray('[data-reveal="stagger"]').forEach((el) => {
      gsap.fromTo(el.children, { y: 34, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: EXPO, stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    // Figures: vertical wipe with the image settling inside the mask
    gsap.utils.toArray('.fig[data-reveal="wipe"]').forEach((fig) => {
      const frame = fig.querySelector('.fig__frame');
      const im = frame.querySelector('img');
      const cap = fig.querySelector('figcaption');
      const btn = fig.querySelector('.fig__btn');
      const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top 86%', once: true } });
      tl.from(btn, { y: 60, rotate: gsap.utils.random(-6, 6), opacity: 0, duration: 1.1, ease: EXPO, clearProps: 'transform,opacity,rotate' }, 0);
      fig.querySelectorAll('.tape').forEach((t, k) => tl.from(t, { scaleX: 0, opacity: 0, duration: .5, ease: 'power3.out' }, 0.55 + k * 0.12));
      tl.fromTo(frame, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' })
        .fromTo(im, { scale: 1.18, yPercent: 6 }, { scale: 1, yPercent: 0, duration: 1.6, ease: EXPO, clearProps: 'transform' }, 0.1);
      if (cap) tl.from(cap, { opacity: 0, y: 10, duration: 0.8, ease: EXPO }, 0.7);
    });

    // Mood board: pieces drop onto the table
    gsap.utils.toArray('.fig[data-reveal="scatter"]').forEach((fig, i) => {
      const frame = fig.querySelector('.fig__frame');
      gsap.fromTo(frame, { y: 80, rotate: gsap.utils.random(-10, 10), opacity: 0 }, {
        y: 0, rotate: 0, opacity: 1, duration: 1.3, ease: EXPO, delay: (i % 5) * 0.08,
        scrollTrigger: { trigger: fig.closest('.mood'), start: 'top 80%', once: true },
      });
    });

    // Cover drifts a touch as you scroll past it
    const cover = document.querySelector('.fig--cover .fig__frame img');
    if (cover && !reduced) {
      gsap.to(cover, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: cover, start: 'top top', end: 'bottom top', scrub: true } });
    }

    // Footer sign-off
    const foot = document.querySelector('.site-foot__nav');
    if (foot) gsap.from(foot.children, { y: 30, opacity: 0, stagger: 0.06, duration: 1, ease: EXPO, scrollTrigger: { trigger: foot, start: 'top 95%', once: true } });
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
    if (reduced) return;
    gsap.utils.toArray('.folder').forEach((f, i) => {
      gsap.from(f, { y: 90, rotate: i % 2 ? 3 : -3, opacity: 0, duration: 1.2, ease: EXPO,
        scrollTrigger: { trigger: f, start: 'top 92%', once: true } });
      const paper = f.querySelector('.folder__paper');
      if (paper) gsap.from(paper, { yPercent: 40, duration: 1.4, ease: EXPO, delay: 0.25, scrollTrigger: { trigger: f, start: 'top 92%', once: true } });
    });
  }

  /* ───────── draggable keepsakes (photo strip, ID badge) ───────── */
  function polaroid() {
    document.querySelectorAll('[data-drag]').forEach((p) => {
      const badge = p.classList.contains('idbadge');
      let sx, sy, ox = 0, oy = 0, dragging = false, last = 0;
      p.addEventListener('pointerdown', (e) => {
        dragging = true; p.setPointerCapture(e.pointerId); p.classList.add('is-dragging');
        sx = e.clientX - ox; sy = e.clientY - oy; last = e.clientX;
        gsap.to(p, { scale: 1.03, duration: 0.3, ease: 'power3' });
      });
      p.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const vx = e.clientX - last; last = e.clientX;
        if (badge) {
          // a badge on a lanyard swings instead of travelling
          gsap.to(p, { rotate: gsap.utils.clamp(-25, 25, (e.clientX - sx) * 0.15), duration: 0.4, ease: 'power3', transformOrigin: '50% 0%' });
          return;
        }
        ox = e.clientX - sx; oy = e.clientY - sy;
        gsap.to(p, { x: ox, y: oy, rotate: gsap.utils.clamp(-20, 20, vx * 1.2), duration: 0.35, ease: 'power3' });
      });
      const up = () => {
        if (!dragging) return;
        dragging = false; p.classList.remove('is-dragging');
        gsap.to(p, { rotate: 0, scale: 1, duration: badge ? 2 : 1.2, ease: badge ? 'elastic.out(1, 0.25)' : 'elastic.out(1, 0.6)' });
      };
      p.addEventListener('pointerup', up); p.addEventListener('pointercancel', up);
      p.addEventListener('dblclick', () => { ox = oy = 0; gsap.to(p, { x: 0, y: 0, rotate: 0, duration: 1, ease: EXPO }); });
      if (badge && !reduced) gsap.fromTo(p, { rotate: -9 }, { rotate: 0, duration: 2.6, ease: 'elastic.out(1, 0.2)', delay: 0.3, transformOrigin: '50% 0%' });
    });
  }

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
      gsap.fromTo(curtain, { yPercent: 0, visibility: 'visible' }, { yPercent: -100, duration: 0.9, ease: 'expo.inOut', delay: 0.05, onComplete: () => gsap.set(curtain, { visibility: 'hidden' }) });
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
      gsap.fromTo(curtain, { yPercent: 100, visibility: 'visible' }, { yPercent: 0, duration: 0.6, ease: 'expo.inOut', onComplete: () => { location.href = url.href; } });
    });
    window.addEventListener('pageshow', (e) => { if (e.persisted) gsap.set(curtain, { yPercent: 100, visibility: 'hidden' }); });
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
