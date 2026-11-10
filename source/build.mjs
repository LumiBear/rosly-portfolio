// Static site generator for rosly's portfolio. Run: node build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { person, projects, inProgressExtra, about } from './content.mjs';

const OUT = process.env.OUT || new URL('../site', import.meta.url).pathname;
const meta = JSON.parse(fs.readFileSync(new URL('./imgmeta.json', import.meta.url)));
const VERSION = Date.now().toString(36);

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = (s = '') => String(s).replace(/<[^>]+>/g, '');

function img(id, { cls = '', sizes = '(min-width: 1100px) 60vw, 100vw', eager = false, alt = '' } = {}) {
  const m = meta[id];
  if (!m) throw new Error('Missing image ' + id);
  return `<img class="${cls}" src="/assets/img/${id}.webp" width="${m.w}" height="${m.h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" sizes="${sizes}">`;
}

function dlName(id) {
  const m = meta[id];
  const ext = path.extname(m.full);
  return `RoslyTavarez_${id.replace('/', '_')}${ext}`;
}

// A figure is a button that opens the shared viewer.
function figure(id, caption = '', { cls = '', reveal = 'wipe' } = {}) {
  const m = meta[id];
  return `<figure class="fig ${cls}" data-reveal="${reveal}">
  <button class="fig__btn" type="button" data-view data-title="${esc(strip(caption)) || 'Image'}" data-pages="/assets/img/${m.full}" data-download="${dlName(id)}" data-dl-href="/assets/img/${m.full}" aria-label="Open image full size: ${esc(strip(caption))}">
    <span class="fig__frame" style="aspect-ratio:${m.w}/${m.h}">${img(id, { alt: strip(caption) })}</span>
    <span class="fig__hint" aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span>
  </button>
  ${caption ? `<figcaption>${caption}</figcaption>` : ''}
</figure>`;
}

function filePages(pdf, pages) {
  const base = pdf.replace(/\.pdf$/, '');
  return Array.from({ length: pages }, (_, i) => `/assets/img/files/${base}-${i + 1}.webp`).join(',');
}

function fileCard({ pdf, pages, title, note }) {
  const base = pdf.replace(/\.pdf$/, '');
  return `<div class="filecard" data-reveal="rise">
  <button class="filecard__open" type="button" data-view data-title="${esc(title)}" data-pages="${filePages(pdf, pages)}" data-download="${pdf}" data-dl-href="/files/${pdf}">
    <span class="filecard__thumb"><img src="/assets/img/files/${base}-1.webp" alt="" loading="lazy"></span>
    <span class="filecard__text"><span class="filecard__title">${esc(title)}</span><span class="filecard__note">${esc(note)}</span></span>
    <span class="filecard__cta">View</span>
  </button>
  <a class="filecard__dl" href="/files/${pdf}" download="${pdf}" aria-label="Download ${esc(title)}">${icon('download')}</a>
</div>`;
}

function icon(name) {
  const p = {
    download: '<path d="M8 2v8m0 0L4.5 6.5M8 10l3.5-3.5M2.5 13.5h11" fill="none" stroke="currentColor" stroke-width="1.4"/>',
    arrow: '<path d="M2 8h11m0 0L9 4m4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/>',
    back: '<path d="M14 8H3m0 0 4-4M3 8l4 4" fill="none" stroke="currentColor" stroke-width="1.4"/>',
    out: '<path d="M5 3h8v8M13 3 3 13" fill="none" stroke="currentColor" stroke-width="1.4"/>',
    copy: '<rect x="5" y="5" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M3 11V3h8" fill="none" stroke="currentColor" stroke-width="1.3"/>',
  }[name];
  return `<svg class="i" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">${p}</svg>`;
}

function blocks(list, proj) {
  return list.map((b) => {
    switch (b.t) {
      case 'lead': return `<p class="lead" data-reveal="lines">${b.text}</p>`;
      case 'p': return `<p data-reveal="rise">${b.text}</p>`;
      case 'note': return `<p class="note" data-reveal="rise">${b.text}</p>`;
      case 'figure': return figure(b.img, b.caption, { cls: b.narrow ? 'fig--narrow' : b.medium ? 'fig--medium' : '' });
      case 'figures': return `<div class="figrow figrow--${b.items.length}">${b.items.map((f) => figure(f.img, f.caption)).join('')}</div>`;
      case 'phones': return `<div class="phones phones--${b.items.length}">${b.items.map((f) => figure(f.img, f.caption, { cls: 'fig--phone' })).join('')}</div>`;
      case 'moodboard': return `<div class="mood" data-reveal="rise"><div class="mood__grid">${b.items.map((id) => figure(id, '', { cls: 'fig--mood', reveal: 'scatter' })).join('')}</div><p class="mood__cap">${b.caption}</p></div>`;
      case 'stats': return `<dl class="stats" data-reveal="stagger">${b.items.map(([n, l]) => `<div class="stat"><dt>${n}</dt><dd>${l}</dd></div>`).join('')}</dl>`;
      case 'facts': return `<dl class="facts" data-reveal="stagger">${b.items.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
      case 'list': return `<ul class="list" data-reveal="stagger">${b.items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
      case 'columns': return `<div class="cols" data-reveal="stagger">${b.items.map((c) => `<div class="col"><h4>${c.h}</h4><ul>${c.list.map((i) => `<li>${i}</li>`).join('')}</ul></div>`).join('')}</div>`;
      case 'personas': return `<div class="personas" data-reveal="stagger">${b.items.map((p) => `<article class="persona"><p class="persona__tag">${p.tag}</p><h4>${p.name}</h4><p>${p.body}</p></article>`).join('')}</div>`;
      case 'quote': return `<blockquote class="quote" data-reveal="lines"><p>“${b.text}”</p><footer>${b.by}</footer></blockquote>`;
      case 'palette': return `<ul class="palette" data-reveal="stagger">${b.items.map(([hex, name]) => `<li><span class="swatch" style="--c:${hex}"></span><span class="palette__name">${name}</span><code>${hex}</code></li>`).join('')}</ul>`;
      case 'file': return fileCard(b);
      case 'link': return `<p class="extlink" data-reveal="rise"><a href="${b.href}" target="_blank" rel="noopener">${b.label} ${icon('out')}</a><span>${b.note}</span></p>`;
      default: throw new Error('Unknown block ' + b.t);
    }
  }).join('\n');
}

/* ───────── shared chrome ───────── */
const RESUME_PAGES = '/assets/img/files/RoslyTavarez_Resume-1.webp';
const resumeAttrs = `data-view data-title="Résumé" data-pages="${RESUME_PAGES}" data-download="RoslyTavarez_Resume.pdf" data-dl-href="/files/RoslyTavarez_Resume.pdf"`;

function header(current) {
  const a = (href, label, key) => `<a href="${href}" ${current === key ? 'aria-current="page"' : ''}>${label}</a>`;
  return `<header class="site-head">
  <a class="mark" href="/" aria-label="Rosly Tavarez, home"><span class="mark__script">Rosly</span><span class="mark__name">Tavarez</span></a>
  <nav class="site-nav" aria-label="Primary">
    ${a('/#work', 'Work', 'work')}
    ${a('/about/', 'About', 'about')}
    <button type="button" ${resumeAttrs}>Résumé</button>
    <button type="button" data-contact>Contact</button>
  </nav>
</header>`;
}

function footer() {
  return `<footer class="site-foot">
  <div class="site-foot__top">
    <p class="site-foot__big" data-reveal="lines">${person.signoff}</p>
    <a class="site-foot__mail" href="mailto:${person.email}">${person.email}</a>
  </div>
  <nav class="site-foot__nav" aria-label="Footer">
    <a href="/">Home</a>
    <a href="/about/">About me</a>
    <button type="button" ${resumeAttrs}>Resume</button>
    <button type="button" data-contact>Contact</button>
  </nav>
  <div class="site-foot__base">
    <span>© 2026 Rosly Tavarez</span>
    <span>Designed with curiosity in Denton, Texas</span>
    <button type="button" class="totop" data-top>Back to top ↑</button>
  </div>
</footer>`;
}

function dialogs() {
  return `<dialog class="viewer" id="viewer" aria-labelledby="viewer-title">
  <div class="viewer__panel">
    <div class="viewer__bar">
      <p class="viewer__title" id="viewer-title"></p>
      <div class="viewer__actions">
        <a class="btn-ghost" data-viewer-dl href="#" download>${icon('download')}<span>Download</span></a>
        <button class="btn-ghost" type="button" data-viewer-fs aria-pressed="false"><svg class="i" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path class="fs-in" d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg><span>Fullscreen</span></button>
        <button class="btn-close" type="button" data-viewer-close aria-label="Close">×</button>
      </div>
    </div>
    <div class="viewer__body" tabindex="0"></div>
  </div>
</dialog>
<dialog class="contact" id="contact" aria-labelledby="contact-title">
  <div class="contact__panel">
    <button class="btn-close" type="button" data-contact-close aria-label="Close">×</button>
    <p class="contact__eyebrow">Contact</p>
    <h2 id="contact-title">Let’s work together.</h2>
    <p class="contact__lede">Have a thoughtful problem to solve? I’d love to hear about it. I’m open to UX and product design internships for summer 2027 and part-time roles during the school year.</p>
    <ul class="contact__list">
      <li><span class="contact__k">Email</span><a href="mailto:${person.email}">${person.email}</a><button type="button" class="copy" data-copy="${person.email}">${icon('copy')}<span>Copy</span></button></li>
      <li><span class="contact__k">LinkedIn</span><a href="${person.linkedin}" target="_blank" rel="noopener">linkedin.com/in/roslytavarez ${icon('out')}</a></li>
      <li><span class="contact__k">Résumé</span><button type="button" class="linklike" ${resumeAttrs}>View or download PDF</button></li>
      <li><span class="contact__k">Based in</span><span>${person.location}</span></li>
    </ul>
  </div>
</dialog>
<div class="curtain" aria-hidden="true"></div>`;
}

function shell({ title, desc, body, page, current, ogImage = '/assets/img/home/full/portrait.jpg' }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${ogImage}">
<meta name="theme-color" content="#F2F1EE">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/bodoni-moda-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/schibsted-grotesk-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=${VERSION}">
<script>(function(d){var h=d.documentElement;h.classList.add('js');try{if(!('onpagereveal' in window)&&sessionStorage.getItem('pt')){h.classList.add('is-entering')}}catch(e){}setTimeout(function(){h.classList.add('reveal-ready');h.classList.remove('is-entering')},3000)})(document);</script>
<script defer src="/assets/vendor/gsap.min.js"></script>
<script defer src="/assets/vendor/ScrollTrigger.min.js"></script>
<script defer src="/assets/vendor/SplitText.min.js"></script>
<script defer src="/assets/vendor/Flip.min.js"></script>
<script defer src="/assets/vendor/lenis.min.js"></script>
<script defer src="/assets/js/site.js?v=${VERSION}"></script>
</head>
<body class="page-${page}">
<a class="skip" href="#main">Skip to content</a>
${header(current)}
<main id="main">
${body}
</main>
${footer()}
${dialogs()}
</body>
</html>`;
}

/* ───────── home ───────── */
function home() {
  const rows = projects.map((p, i) => `<li class="work__item${p.inProgress ? ' is-wip' : ''}">
    <a class="work__link" href="/work/${p.slug}/" data-preview="/assets/img/${p.cover}.webp">
      <span class="work__year">${p.year}</span>
      <span class="work__title" style="view-transition-name: t-${p.slug}">${p.title}</span>
      <span class="work__desc">${p.kicker}</span>
      <span class="work__tags">${p.inProgress ? '<em>In progress</em> · ' : ''}${p.kind}</span>
      <span class="work__thumb">${img(p.cover, { sizes: '90vw', alt: '' })}</span>
      <span class="work__go">${icon('arrow')}</span>
    </a>
  </li>`).join('');
  const extra = `<li class="work__item is-soon">
    <div class="work__link">
      <span class="work__year">${inProgressExtra.year}</span>
      <span class="work__title">${inProgressExtra.title}</span>
      <span class="work__desc">${inProgressExtra.kicker}</span>
      <span class="work__tags"><em>${inProgressExtra.note}</em></span>
    </div>
  </li>`;

  const body = `
<section class="hero">
  <div class="hero__meta" data-hero="meta">
    <span>UX designer</span>
    <span>University of North Texas, BFA ’29</span>
    <span class="hero__clock">Denton, TX · <time data-clock>--:--</time></span>
  </div>
  <h1 class="hero__name" aria-label="Rosly Tavarez">
    <span class="hero__line"><span class="hero__word">Rosly</span></span>
    <span class="hero__line hero__line--2"><span class="hero__word">Tavarez</span></span>
  </h1>
  <figure class="polaroid" data-drag aria-label="Portrait of Rosly">
    ${img('home/portrait', { eager: true, sizes: '320px', alt: 'Rosly Tavarez' })}
    <figcaption>drag me ↺</figcaption>
  </figure>
  <div class="hero__foot">
    <p class="hero__tag" data-hero="tag">${person.tagline}</p>
    <div class="hero__now" data-hero="now">
      <p class="label">Currently</p>
      <ul>
        <li>Union Arts Associate at UNT</li>
        <li>Adobe Student Ambassador</li>
        <li>Open to summer 2027 internships</li>
      </ul>
    </div>
  </div>
</section>

<section class="work" id="work" aria-labelledby="work-h">
  <div class="work__head">
    <h2 id="work-h" data-reveal="lines">Selected work</h2>
    <p class="work__count">${String(projects.length).padStart(2, '0')} case studies</p>
  </div>
  <ol class="work__list">${rows}${extra}</ol>
  <div class="cursor-preview" aria-hidden="true"><img alt=""></div>
</section>

<section class="intro-strip">
  <p class="intro-strip__text" data-reveal="lines">I study UX design and advertising at UNT, and I’m drawn to problems where feelings get in the way: the blank page, the cluttered feed, the chore nobody admits to skipping.</p>
  <a class="arrowlink" href="/about/">More about me ${icon('arrow')}</a>
</section>`;
  return shell({ title: 'Rosly Tavarez · UX Designer', desc: person.tagline, body, page: 'home', current: 'work' });
}

/* ───────── case study ───────── */
function caseStudy(p) {
  const others = projects.filter((o) => o.slug !== p.slug);
  const steps = p.sections.map((s, i) => `<li><a href="#${s.id}" data-step-link="${s.id}"><span class="tl__n">${String(i + 1).padStart(2, '0')}</span><span class="tl__label">${s.step}</span></a></li>`).join('');
  const secs = p.sections.map((s, i) => `<section class="cs__sec" id="${s.id}" data-step="${s.id}">
    <p class="cs__step"><span>${String(i + 1).padStart(2, '0')}</span>${s.step}</p>
    <h2 data-reveal="lines">${s.title}</h2>
    ${blocks(s.blocks, p)}
  </section>`).join('');

  const more = others.map((o) => `<li>
    <a class="more__link" href="/work/${o.slug}/">
      <span class="more__img">${img(o.cover, { sizes: '(min-width: 900px) 25vw, 80vw', alt: '' })}</span>
      <span class="more__kicker">${o.year} · ${o.kind}</span>
      <span class="more__title" style="view-transition-name: t-${o.slug}">${o.title}</span>
      <span class="more__sum">${o.kicker}</span>
    </a>
  </li>`).join('');

  const body = `
<article class="cs" data-slug="${p.slug}">
  <header class="cs__head">
    <a class="backlink" href="/#work">${icon('back')} All work</a>
    <p class="cs__kicker" data-hero="meta">${p.kicker}</p>
    <h1 class="cs__title" style="view-transition-name: t-${p.slug}">${p.title}</h1>
    <p class="cs__summary" data-hero="tag">${p.summary}</p>
    <dl class="cs__meta" data-hero="now">
      <div><dt>Role</dt><dd>${p.role}</dd></div>
      <div><dt>Timeline</dt><dd>${p.timeline}</dd></div>
      <div><dt>Team</dt><dd>${p.team}</dd></div>
      <div><dt>Tools</dt><dd>${p.tools}</dd></div>
    </dl>
  </header>
  <div class="cs__cover">${figure(p.cover, '', { cls: 'fig--cover', reveal: 'cover' })}</div>

  <div class="cs__body">
    <aside class="tl" aria-label="Case study timeline">
      <p class="tl__title">Process</p>
      <div class="tl__track" aria-hidden="true"><span class="tl__fill"></span></div>
      <ol>${steps}</ol>
    </aside>
    <div class="cs__content">${secs}</div>
  </div>
</article>

<section class="more" aria-labelledby="more-h">
  <div class="more__head">
    <h2 id="more-h" data-reveal="lines">Read more of my case studies</h2>
    <div class="more__nav"><button type="button" data-more="-1" aria-label="Previous">${icon('back')}</button><button type="button" data-more="1" aria-label="Next">${icon('arrow')}</button></div>
  </div>
  <ul class="more__list">${more}</ul>
</section>`;
  return shell({ title: `${p.title} · Rosly Tavarez`, desc: p.summary, body, page: 'case', current: 'work', ogImage: `/assets/img/${meta[p.cover].full}` });
}

/* ───────── about ───────── */
function aboutPage() {
  const body = `
<section class="about">
  <div class="about__head">
    <p class="cs__kicker" data-hero="meta">About me</p>
    <h1 class="about__title">Hi, I’m Rosly.</h1>
  </div>
  <div class="about__grid">
    <figure class="about__photo polaroid polaroid--still">${img('home/portrait', { eager: true, sizes: '(min-width: 900px) 30vw, 80vw', alt: 'Rosly Tavarez' })}</figure>
    <div class="about__text">
      <p class="lead" data-reveal="lines">${about.intro}</p>
      ${about.more.map((t) => `<p data-reveal="rise">${t}</p>`).join('')}
      <div class="about__cta" data-reveal="rise">
        <button type="button" class="btn" ${resumeAttrs}>View résumé</button>
        <a class="btn btn--line" href="/files/RoslyTavarez_Resume.pdf" download="RoslyTavarez_Resume.pdf">${icon('download')} Download PDF</a>
        <button type="button" class="btn btn--line" data-contact>Get in touch</button>
      </div>
    </div>
  </div>

  <div class="about__sec">
    <h2 data-reveal="lines">Experience</h2>
    <ol class="xp">${about.experience.map((x) => `<li class="xp__item" data-reveal="rise">
      <p class="xp__when">${x.when}</p>
      <div><h3>${x.role}</h3><p class="xp__org">${x.org}</p><ul>${x.points.map((pt) => `<li>${pt}</li>`).join('')}</ul></div>
    </li>`).join('')}
    <li class="xp__item" data-reveal="rise"><p class="xp__when">Also</p><div><h3>${about.roles.join(' · ')}</h3></div></li>
    </ol>
  </div>

  <div class="about__sec about__cols">
    <div data-reveal="stagger"><h2>Education</h2><p><b>${about.education.school}</b><br>${about.education.degree}<br><span class="muted">${about.education.when}</span></p><h3 class="about__sub">Honors</h3><ul>${about.honors.map((h) => `<li>${h}</li>`).join('')}</ul></div>
    <div data-reveal="stagger"><h2>Toolbox</h2><ul class="chips">${about.toolbox.map((t) => `<li>${t}</li>`).join('')}</ul><h3 class="about__sub">Certifications</h3><ul>${about.certifications.map((c) => `<li>${c}</li>`).join('')}</ul></div>
    <div data-reveal="stagger"><h2>Languages</h2><ul><li>English</li><li>Spanish (bilingual)</li></ul><h3 class="about__sub">Off the clock</h3><p class="muted">More about me coming soon.</p></div>
  </div>
</section>`;
  return shell({ title: 'About · Rosly Tavarez', desc: about.intro, body, page: 'about', current: 'about' });
}

function notFound() {
  const body = `<section class="nf"><h1>Page not found.</h1><p>That link may have moved. Try the <a href="/">homepage</a>.</p></section>`;
  return shell({ title: 'Not found · Rosly Tavarez', desc: 'Page not found', body, page: 'nf' });
}

function relativize(rel, html) {
  const depth = rel.split('/').length - 1;
  const pre = depth ? '../'.repeat(depth) : './';
  return html
    .replace(/(href|src|data-pages|data-dl-href|data-preview|content)="\/(?!\/)([^"]*)"/g, (m, a, v) => {
      if (a === 'content' && !v.startsWith('assets/')) return m;
      return `${a}="${v.split(',').map((u, i) => (i ? u.replace(/^\//, pre) : pre + u)).join(',')}"`;
    });
}

function write(rel, html) {
  if (rel !== '404.html') html = relativize(rel, html);
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
}

write('index.html', home());
write('about/index.html', aboutPage());
write('404.html', notFound());
for (const p of projects) write(`work/${p.slug}/index.html`, caseStudy(p));
console.log('built', projects.length + 3, 'pages');
