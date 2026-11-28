import fs from 'node:fs';
import { projects } from '/home/claude/repo/source/content.mjs';
const P = projects.find((p) => p.slug === 'reverdi');
const S = (id) => P.sections.find((s) => s.id === id);
const B = (id, i) => S(id).blocks[i];
const DEPLOY = !!process.env.DEPLOY;
const IMG = (n) => DEPLOY ? `../../assets/img/reverdi/${n}.webp` : `/home/claude/repo/site/assets/img/reverdi/${n}.webp`;
const FONTS = DEPLOY ? '../../assets/fonts/' : '/home/claude/repo/site/assets/fonts/';
const fontFace = `@font-face{font-family:"PJS";src:url(${FONTS}plus-jakarta-sans-latin-wght-normal.woff2) format("woff2");font-weight:200 800;font-display:swap}@font-face{font-family:Unbounded;src:url(${FONTS}unbounded-latin-400-normal.woff2) format("woff2");font-weight:400;font-display:swap}@font-face{font-family:"Schibsted Grotesk";src:url(${FONTS}schibsted-grotesk-latin-wght-normal.woff2) format("woff2");font-weight:400 900;font-display:swap}`;
const css = fs.readFileSync('/tmp/fr/rv.css', 'utf8');
const client = fs.readFileSync('/tmp/fr/client_rv.js', 'utf8');
const L = (p) => DEPLOY ? `../../${p}` : `/${p}`;
const clean = (t) => t.replace(/<b>|<\/b>/g, '');
const prose = (t) => `<p class="prose rv">${t}</p>`;
const head = (n, label, title, em, lead) => `<div class="sh"><div class="k rv"><b>${n}</b>${label}</div><h2 class="rv">${title} <em>${em}</em></h2>${lead ? `<p class="rv">${lead}</p>` : ''}</div>`;
const dev = (inner, url = 'reverdi · pitch deck') => `<div class="dev"><div class="bar"><i></i><i></i><i></i><span>${url}</span></div><div class="scr">${inner}</div></div>`;

const rowsOf = (items) => `<div class="rows">${items.map((x, i) => { const m = x.match(/<b>(.*?)<\/b>\s*(.*)/); const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1); const T = OV[m[1]] || [m[1].replace(/[.,:]$/, ''), cap(m[2])]; return `<div class="rv"><i>0${i + 1}</i><h3>${T[0]}</h3><p>${T[1]}</p></div>`; }).join('')}</div>`;
const heard = (items) => `<div class="heard">${items.map((x, i) => { const m = x.match(/<b>(.*?)<\/b>\s*(.*)/); return `<div class="bc rv" style="--d:${i * 0.07}s"><b>${m[1].replace(/\.$/, '')}</b><p>${m[2]}</p></div>`; }).join('')}</div>`;
const colsOf = (items, n) => `<div class="cols3" style="grid-template-columns:repeat(${n},1fr)">${items.map((c, i) => `<div class="bc rv ${c.h === 'Chosen' || c.h === 'After' ? 'pick' : ''}" style="--d:${i * 0.07}s"><h4>${c.h}</h4><ul>${c.list.map((l) => `<li>${l}</li>`).join('')}</ul></div>`).join('')}</div>`;
const fig = (b, cls = '') => `<figure><div class="fig ${cls} rv"><img src="${IMG(b.img.split('/')[1])}" alt="${clean(b.caption)}"></div><figcaption>${b.caption}</figcaption></figure>`;

const STEPS = [
  { img: 'solution', n: '01 · In store', t: 'Test, talk, then blend.', p: 'The visit starts with the body and ends with a scent made for it.', items: B('experience', 0).items[0].list },
  { img: 'render', n: '02 · At home', t: 'A kit that keeps the idea going.', p: 'Testing continues at home, and the bottle is built to be refilled instead of replaced.', items: B('experience', 0).items[1].list },
  { img: 'data', n: '03 · Companion app', t: 'Where the formula and the data live.', p: 'Results stay on the customer’s side and only the formula is shared, a direct result of the privacy survey.', items: B('experience', 0).items[2].list },
];
const stats = B('research', 1).items;
const chain = [['Invasive plants', 'Responsibly harvested from damaged ecosystems'], ['Base notes', 'Modular botanical bases for each blend'], ['A personal scent', 'Matched to skin tests and lifestyle'], ['Restoration', 'Part of every sale funds ecosystem recovery']];

const body = `
<header class="pf-head"><a class="pf-mark" href="${L('')}">Rosly Tavarez</a><nav class="chapters" id="chapters" aria-label="Case study steps"></nav><nav class="pf-nav" aria-label="Primary"><a href="${L('#work')}" aria-current="page">Work</a><a href="${L('play/')}">Play</a><a href="${L('about/')}">About</a><a href="${L('files/RoslyTavarez_Resume.pdf')}">Résumé</a><a href="mailto:roslytav@gmail.com">Contact</a></nav></header>

<section class="hero" data-label="Overview"><div class="w">
  <div class="hmeta"><div><span>Project</span><b>ReVerdi, L’Oréal Brandstorm 2026</b></div><div><span>Role</span><b>${P.role}</b></div><div><span>Team</span><b>Team Cré</b></div><div><span>Timeline</span><b>${P.timeline}</b></div><div><span>Tools</span><b>${P.tools}</b></div></div>
  <h1 class="rv">Perfume that <em>gives back to nature.</em></h1>
  <p class="sub rv">${P.summary}</p>
  <div class="hframe rv">${dev(`<img src="${IMG('solution')}" alt="ReVerdi solution slide">`, 'reverdi · the solution')}</div>
</div></section>

<section class="state" data-label="Overview"><div class="w">
  <div class="k rv"><b>01</b>Overview</div>
  <h2 class="big wdwrap">${B('overview', 0).text}</h2>
  <div class="two"><div><p class="rv" style="font-size:20px;color:var(--ink);max-width:560px">${B('overview', 1).text}</p></div>
  <div class="facts rv">${B('overview', 2).items.map((f) => `<div><span>${f[0]}</span><b>${f[1]}</b></div>`).join('')}</div></div>
</div></section>

<section data-label="Ideation"><div class="w">
  ${head('02', 'Ideation', 'One whiteboard,', 'every idea.', B('ideation', 0).text)}
  <div class="two" style="align-items:center;margin-top:30px"><div>${fig(B('ideation', 1))}</div><div>${prose(B('ideation', 2).text)}</div></div>
</div></section>

<section data-label="Concept"><div class="w">
  ${head('03', 'Concept', 'What if fragrance', 'helped restore nature?', B('concept', 0).text)}
  <div class="dirs" style="grid-template-columns:repeat(4,1fr)">${chain.map((c, i) => `<div class="dir rv ${i === 3 ? 'pick' : ''}" style="--d:${i * 0.08}s"><span>0${i + 1}</span><div>${c[0]}<small style="display:block;margin-top:8px;font-weight:500;font-size:13.5px;opacity:.75;line-height:1.35">${c[1]}</small></div></div>`).join('')}</div>
  <div class="figpair">${fig(B('concept', 1))}${fig(B('concept', 2))}</div>
  <div style="margin-top:36px">${prose(B('concept', 3).text)}</div>
</div></section>

<section data-label="Research"><div class="w">
  ${head('04', 'Research', 'Would people actually', 'test their own skin?', B('research', 0).text)}
  <div class="bento">${stats.map((s, i) => `<div class="bc stat rv" style="--d:${i * 0.08}s;--v:${[0.96, 0.57, 0.75][i]};grid-column:span 4"><div class="n">${s[0]}</div><div><p>${s[1]}</p><div class="meter"><u></u></div></div></div>`).join('')}</div>
  <div class="two" style="align-items:center;margin-top:40px"><div class="figs" style="max-width:520px">${fig(B('research', 2))}</div><div class="panel rv"><div class="k">What changed in the product</div><p style="margin-top:14px;font-size:18px;color:var(--ink2)">${B('research', 3).text}</p></div></div>
</div></section>

<section data-label="Experience"><div class="w">
  ${head('05', 'Experience', 'In store,', 'then at home.')}
  <div class="scrolly">
    <div class="steps">${STEPS.map((s) => `<div class="st"><div class="n">${s.n}</div><h3>${s.t}</h3><p>${s.p}</p><ol>${s.items.map((n, i) => `<li><i>${i + 1}</i><div><b>${n}</b></div></li>`).join('')}</ol></div>`).join('')}</div>
    <div class="stage"><div class="glow"></div><div class="dev"><div class="bar"><i></i><i></i><i></i><span>reverdi</span></div><div class="scr">${STEPS.map((s) => `<div class="layer"><img src="${IMG(s.img)}" alt=""></div>`).join('')}</div></div><div class="ctr"></div></div>
  </div>
</div></section>

<section data-label="Pitch" style="margin-top:80px"><div class="w">
  ${head('06', 'Visual', 'Making the bottle', 'real enough to judge.', B('visual', 0).text)}
  <div class="figpair">${fig(B('visual', 1))}${fig(B('visual', 2))}</div>
</div></section>

<section data-label="Pitch"><div class="w">
  ${head('07', 'Pitch', 'Research into a story', 'judges could follow.', B('pitch', 0).text)}
  <a class="panel rv" href="${L('files/TeamCree_ReVerdi_Brandstorm2026.pdf')}" target="_blank" rel="noopener" style="display:block;margin-top:34px;text-decoration:none;color:var(--ink)"><div class="k">${B('pitch', 1).note}</div><h3 style="font-size:clamp(28px,3.4vw,48px);margin-top:12px">${B('pitch', 1).title}, open the PDF ↗</h3></a>
</div></section>

<section data-label="Reflection"><div class="w">
  ${head('08', 'Reflection', 'Coordinating is', 'a design skill.')}
  <div style="max-width:760px">${prose(B('reflection', 0).text)}</div>
</div></section>

<footer class="pf-foot"><div class="pf-card"><span class="pf-blobs" aria-hidden="true"><b></b><b></b><b></b></span><div class="pf-glass"><p>Big ideas, made useful.</p><a class="pf-mail" href="mailto:roslytav@gmail.com">roslytav@gmail.com</a></div></div><nav class="pf-fnav"><a href="${L('')}">Home</a><a href="${L('play/')}">Play</a><a href="${L('about/')}">About me</a><a href="${L('files/RoslyTavarez_Resume.pdf')}">Resume</a><a href="mailto:roslytav@gmail.com">Contact</a></nav><div class="pf-base"><span>© 2026 Rosly Tavarez</span><a href="#top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false">Back to top ↑</a></div></footer>`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ReVerdi · Rosly Tavarez</title><meta name="description" content="${P.summary}"><meta property="og:title" content="ReVerdi · Rosly Tavarez"><meta property="og:image" content="${DEPLOY ? '../../assets/img/reverdi/full/cover.jpg' : ''}"><meta name="theme-color" content="#f6f3e8"><link rel="icon" href="${DEPLOY ? '../../assets/favicon.svg' : '/home/claude/repo/site/assets/favicon.svg'}" type="image/svg+xml"><style>${fontFace}\n${css}</style></head><body>${body}<script>${client}</script></body></html>`;
fs.writeFileSync(DEPLOY ? '/tmp/fr/deploy_rv.html' : '/tmp/fr/reverdi.html', html);
console.log('ok', (html.length / 1024).toFixed(0) + 'KB', 'dashes', (html.match(/—/g) || []).length);
