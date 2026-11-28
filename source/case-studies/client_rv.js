(function () {
  var q = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var STATIC = location.search.indexOf('static') > -1; if (STATIC) document.documentElement.classList.add('static');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  q('.rv').forEach(function (el) { io.observe(el); });
  q('.wdwrap').forEach(function (el) { el.innerHTML = el.textContent.trim().split(/\s+/).map(function (w) { return '<span class="wd">' + w + '</span>'; }).join(' '); });
  var A = [190, 196, 172], B = [27, 36, 21];
  function mix(t) { return 'rgb(' + A.map(function (a, i) { return Math.round(a + (B[i] - a) * t); }).join(',') + ')'; }
  var steps = q('.st'), layers = q('.layer'), ctr = q('.ctr')[0];
  var setStep = function (i) { steps.forEach(function (s, k) { s.classList.toggle('on', k === i); }); layers.forEach(function (l, k) { l.classList.toggle('on', k === i); }); if (ctr) ctr.textContent = 'Screen ' + (i + 1) + ' of ' + layers.length; };
  setStep(0);
  var sio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) setStep(steps.indexOf(e.target)); }); }, { rootMargin: '-48% 0px -48% 0px' });
  steps.forEach(function (s) { sio.observe(s); });
  if (STATIC) steps.forEach(function (s) { s.classList.add('on'); });
  var chap = q('#chapters')[0], secs = q('[data-label]'), groups = [];
  secs.forEach(function (s) { var l = s.dataset.label, g = groups[groups.length - 1]; if (g && g.label === l) g.els.push(s); else groups.push({ label: l, els: [s] }); });
  groups.forEach(function (g) { var d = document.createElement('a'); d.href = '#'; d.className = 'cs'; d.title = g.label; d.innerHTML = '<em>' + g.label + '</em><i><u></u></i>'; g.cs = d; d.onclick = function (ev) { ev.preventDefault(); window.scrollTo({ top: g.els[0].getBoundingClientRect().top + scrollY, behavior: 'smooth' }); }; chap.appendChild(d); g.seg = d.querySelector('u'); });
  var words = q('.wdwrap'), marq = q('.marq'), hf = q('.hframe .dev')[0];
  function frame() {
    var vh = innerHeight, sy = scrollY, H = document.documentElement.scrollHeight, max = H - vh;
    var cur = groups[0]; groups.forEach(function (g) { if (g.els[0].getBoundingClientRect().top < vh * 0.5) cur = g; });
    groups.forEach(function (g, gi) { var a = g.els[0].getBoundingClientRect().top + sy, nx = groups[gi + 1], b = nx ? nx.els[0].getBoundingClientRect().top + sy : H; var p = Math.max(0, Math.min(1, (sy + vh * 0.5 - a) / Math.max(1, b - a))); if (sy >= max - 2) p = 1; g.seg.style.transform = 'scaleX(' + p + ')'; g.cs.classList.toggle('on', g === cur); });
    if (!reduce) {
      if (hf) { var t = Math.min(1, sy / (vh * 0.7)); hf.style.setProperty('--rx', (16 * (1 - t)) + 'deg'); hf.style.setProperty('--sc', (0.96 + 0.04 * t)); }
      marq.forEach(function (m) { var r = m.getBoundingClientRect(), row = m.firstElementChild, p = (vh - r.top) / (vh + r.height), span = row.scrollWidth - m.clientWidth; row.style.transform = 'translate3d(' + (-Math.max(0, Math.min(1, p)) * span) + 'px,0,0)'; });
    }
    words.forEach(function (el) { var r = el.getBoundingClientRect(), p = Math.min(1, Math.max(0, (vh * 0.86 - r.top) / (vh * 0.45 + r.height * 0.7))); if (STATIC) p = 1; var ws = q('.wd', el), n = ws.length; ws.forEach(function (w, i) { w.style.color = mix(Math.min(1, Math.max(0, p * (n + 8) - i) / 8)); }); });
  }
  var tick = false;
  addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(function () { frame(); tick = false; }); } }, { passive: true });
  addEventListener('resize', frame); frame();
})();
