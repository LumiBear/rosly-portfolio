import fs from 'node:fs';
import { projects } from '/home/claude/repo/source/content.mjs';
const P = projects.find((p) => p.slug === 'freshroute');
const S = (id) => P.sections.find((s) => s.id === id);
const B = (id, i) => S(id).blocks[i];
const DEPLOY = !!process.env.DEPLOY;
const IMG = (n) => DEPLOY ? `../../assets/img/freshroute/${n}.webp` : `/home/claude/repo/site/assets/img/freshroute/${n}.webp`;
const FONTS = DEPLOY ? '../../assets/fonts/' : '/home/claude/repo/site/assets/fonts/';
const fontFace = `@font-face{font-family:"PJS";src:url(${FONTS}plus-jakarta-sans-latin-wght-normal.woff2) format("woff2");font-weight:200 800;font-display:swap}@font-face{font-family:Unbounded;src:url(${FONTS}unbounded-latin-400-normal.woff2) format("woff2");font-weight:400;font-display:swap}@font-face{font-family:"Schibsted Grotesk";src:url(${FONTS}schibsted-grotesk-latin-wght-normal.woff2) format("woff2");font-weight:400 900;font-display:swap}`;
const css = fs.readFileSync('/tmp/fr/fr.css', 'utf8');
const client = fs.readFileSync('/tmp/fr/client_fr.js', 'utf8');
const L = (p) => DEPLOY ? `../../${p}` : `/${p}`;
const clean = (t) => t.replace(/<b>|<\/b>/g, '');
const prose = (t) => `<p class="prose rv">${t}</p>`;
const head = (n, label, title, em, lead) => `<div class="sh"><div class="k rv"><b>${n}</b>${label}</div><h2 class="rv">${title} <em>${em}</em></h2>${lead ? `<p class="rv">${lead}</p>` : ''}</div>`;
const dev = (inner, url = 'freshroute.app / driver') => `<div class="dev"><div class="bar"><i></i><i></i><i></i><span>${url}</span></div><div class="scr">${inner}</div></div>`;

const STEPS = [
  { img: 'driver-dashboard', n: '01 · Driver dashboard', t: 'Every listing leads with what the pantry needs to know.', p: 'Drivers get an iPad app that finds pickups, routes them, and locks in an arrival time.', notes: [['Weight first', 'Each listing opens with weight, so nobody is surprised by five pallets.'], ['Food type and pickup window', 'The details that went missing in the popcorn story now sit at the top of the card.'], ['Arrival time locked in', 'Accepting a pickup commits the driver to a time the food bank can see.']] },
  { img: 'driver-nav', n: '02 · Driving view', t: 'Quiet while the van moves.', p: 'Gamification was cut because streaks felt stressful for someone behind the wheel, so this view does the opposite.', notes: [['Directions in the middle', 'The route is the whole screen, with nothing competing for attention.'], ['ETA ring top right', 'A ring shows on time, slipping, or late, with its own color, glyph, and words.'], ['Everything else stays out of the way', 'Pickup details wait until the van stops.']] },
  { img: 'manager-incoming', n: '03 · Food bank view', t: 'One screen for who is coming and what they carry.', p: 'Managers get a desk view that shows only the outcome, so a truck pulling in stops being a surprise.', notes: [['Every truck on its way', 'Each delivery is listed with its own ETA.'], ['What is on it', 'Contents are visible before the dock door opens, so cold storage and staff can be ready.'], ['Time out of the fridge', 'Cold items show how long they have been out, which is what decides whether they can be accepted.']] },
];

const COLS = ['Too Good To Go', 'HelloFresh', 'Plentiful', 'Misfits Market', 'FreshRoute'];
const ROWS = [['Browsing, filters and allergen info for the receiver', [1, 1, 1, 1, 0]], ['Management tools for the business giving food', [1, 0, 0, 0, 1]], ['Tells the receiving side when food is on its way', [0, 0, 0, 0, 1]], ['Tracks time out of refrigeration', [0, 0, 0, 0, 1]]];
const gap = (r) => r[1].slice(0, 4).reduce((a, b) => a + b, 0) === 0;
const nGap = ROWS.filter(gap).length;
const fa = `<div class="fgrid"><div class="fc lab"><div class="fh"></div>${ROWS.map((r) => `<div class="fr">${r[0]}${gap(r) ? '<i>Gap</i>' : ''}</div>`).join('')}</div>${COLS.map((c, ci) => `<div class="fc ${ci === 4 ? 'me' : ''}"><div class="fh">${c}</div>${ROWS.map((r) => `<div class="fr ${gap(r) && ci === 4 ? 'close' : ''}">${r[1][ci] ? '<b class="dot"></b>' : ''}</div>`).join('')}</div>`).join('')}</div><div class="fleg"><span><b class="dot"></b> Offers it</span><span><i>Gap</i> None of the four offers it</span><span class="fn"><strong>${nGap} of ${ROWS.length}</strong> rows are gaps, and both are the core of FreshRoute.</span></div>`;

const OV = { 'Color creates urgency': ['Color creates urgency', 'Top vote. On time, slipping, and late each get their own color, glyph, and words.'], 'Driver input should feed the system,': ['Driver input feeds the system', 'Each driver’s feedback updates the store’s pickup notes for the next person.'], 'Multiple stops': ['Multiple stops', 'Several stops per route came second in the vote.'] };
const rowsOf = (items) => `<div class="rows">${items.map((x, i) => { const m = x.match(/<b>(.*?)<\/b>\s*(.*)/); const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1); const T = OV[m[1]] || [m[1].replace(/[.,:]$/, ''), cap(m[2])]; return `<div class="rv"><i>0${i + 1}</i><h3>${T[0]}</h3><p>${T[1]}</p></div>`; }).join('')}</div>`;
const heard = (items) => `<div class="heard">${items.map((x, i) => { const m = x.match(/<b>(.*?)<\/b>\s*(.*)/); return `<div class="bc rv" style="--d:${i * 0.07}s"><b>${m[1].replace(/\.$/, '')}</b><p>${m[2]}</p></div>`; }).join('')}</div>`;
const colsOf = (items, n) => `<div class="cols3" style="grid-template-columns:repeat(${n},1fr)">${items.map((c, i) => `<div class="bc rv ${c.h === 'Chosen' || c.h === 'After' ? 'pick' : ''}" style="--d:${i * 0.07}s"><h4>${c.h}</h4><ul>${c.list.map((l) => `<li>${l}</li>`).join('')}</ul></div>`).join('')}</div>`;
const fig = (b, cls = '') => `<figure><div class="fig ${cls} rv"><img src="${IMG(b.img.split('/')[1])}" alt="${clean(b.caption)}"></div><figcaption>${b.caption}</figcaption></figure>`;

const stats = B('competitive', 1).items;
const pItems = B('findings', 2).items;
const pName = (n) => n.split(', ');
const pwin = ['A live ETA, a list of what is on the truck, and how long the cold items have been out, so she can plan staff and cold storage before the truck arrives.', 'Items are counted at pickup and again at drop-off, so a handoff with nobody watching still leaves a record.'];
const pg = ['linear-gradient(135deg,#ffb36b,#ff7a1a)', 'linear-gradient(135deg,#ffd23f,#ffb36b)'];
const pers = pItems.map((p, i) => { const [a, b] = pName(p.name); return `<div class="pc rv" style="--d:${i * 0.08}s"><div class="pav" style="background:${pg[i]}">${a[0]}</div><div class="pn">${a}</div><div class="pr">${p.tag}, ${b}</div><p>${p.body}</p><div class="pwin"><span>What FreshRoute gives ${a}</span>${pwin[i]}</div></div>`; }).join('');

const body = `
<header class="pf-head"><a class="pf-mark" href="${L('')}">Rosly Tavarez</a><nav class="chapters" id="chapters" aria-label="Case study steps"></nav><nav class="pf-nav" aria-label="Primary"><a href="${L('#work')}" aria-current="page">Work</a><a href="${L('play/')}">Play</a><a href="${L('about/')}">About</a><a href="${L('files/RoslyTavarez_Resume.pdf')}">Résumé</a><a href="mailto:roslytav@gmail.com">Contact</a></nav></header>

<section class="hero" data-label="Overview"><div class="w">
  <div class="hmeta"><div><span>Project</span><b>FreshRoute, surplus food handoff<span class="pill">In progress</span></b></div><div><span>Role</span><b>${P.role}</b></div><div><span>Team</span><b>Maroon Moose</b></div><div><span>Timeline</span><b>${P.timeline}</b></div><div><span>Tools</span><b>${P.tools}</b></div></div>
  <h1 class="rv">Good food, <em>bad timing.</em></h1>
  <p class="sub rv">${P.summary}</p>
  <div class="hframe rv">${dev(`<img src="${IMG('manager-incoming')}" alt="FreshRoute food bank view">`, 'freshroute.app / incoming')}</div>
</div></section>

<section class="state" data-label="Overview"><div class="w">
  <div class="k rv"><b>01</b>Overview</div>
  <h2 class="big wdwrap">${B('overview', 0).text}</h2>
  <div class="two"><div><p class="rv" style="font-size:20px;color:var(--ink);max-width:560px">${B('overview', 1).text}</p></div>
  <div class="panel rv"><div class="k">Where this stands</div><p style="margin-top:12px;color:var(--ink2)">${B('overview', 2).text.replace('This case study is in progress. ', '')}</p></div></div>
</div></section>

<section data-label="Overview"><div class="w">
  ${head('02', 'Scoping', 'Six directions,', 'one decision.', B('scope', 0).text)}
  <div class="dirs">${['Connecting businesses with food banks', 'Food bank inventory', 'The wider donation ecosystem', 'Helping people find food', 'Discounted surplus for consumers', 'Preventing waste at home'].map((d, i) => `<div class="dir rv ${i === 0 ? 'pick' : ''}" style="--d:${i * 0.06}s"><span>0${i + 1}${i === 0 ? ' · CHOSEN' : ''}</span>${d}</div>`).join('')}</div>
  <div style="margin-top:40px">${prose(B('scope', 1).text)}</div>
</div></section>

<section data-label="Research"><div class="w">
  ${head('03', 'Competitive audit', 'Lots of apps for shoppers.', 'Almost nothing for the people moving the food.', B('competitive', 0).text)}
  <div class="bento">${stats.map((s, i) => `<div class="bc stat rv" style="--d:${i * 0.08}s;--v:${[0.29, 0.02, 0.6, 0.15][i]}"><div class="n">${s[0]}</div><div><p>${s[1]}</p>${i < 2 ? '<div class="meter"><u></u></div>' : ''}</div></div>`).join('')}</div>
  <p class="src rv">${B('competitive', 2).text}</p>
  <div style="margin-top:40px">${prose(B('competitive', 3).text)}</div>
  <div class="panel rv" style="margin-top:50px"><div class="k">Feature analysis · four products, one shared capability list</div><h3 style="font-size:clamp(26px,2.8vw,40px);margin-top:12px;max-width:760px">Where today’s apps stop, and where FreshRoute starts.</h3>${fa}<p class="src">I audited Too Good To Go. Teammates audited the other three. Marks summarize the team’s audit findings, not a full feature census.</p></div>
  ${rowsOf(B('competitive', 4).items)}
</div></section>

<section data-label="Research"><div class="w">
  ${head('04', 'Interviews', 'Asking', 'better questions.', B('interviews', 0).text)}
  <div style="margin-top:26px">${prose(B('interviews', 1).text)}</div>
  ${colsOf(B('interviews', 2).items, 2)}
  <div class="panel rv" style="margin-top:30px"><div class="quote">“${B('interviews', 3).text}”<b>${B('interviews', 3).by}</b></div></div>
</div></section>

<section data-label="People"><div class="w">
  ${head('05', 'Findings and personas', '“Oh, the truck’s here.”', 'One pantry manager, four details.', B('findings', 0).text)}
  ${heard(B('findings', 1).items)}
  <div class="pers two2" style="margin-top:50px">${pers}</div>
  <div class="emp rv"><div class="k">Empathy map · Maya, pantry coordinator · synthesized from the interview and persona, not a separate study</div>
    <div class="egrid">
      <div class="eq q1"><b>Says</b><ul><li>The truck comes sometime around 10 or 11.</li><li>Unclear listings cost us pallets we could not use.</li><li>I cannot take cold food if nobody knows how long it sat out.</li></ul></div>
      <div class="eq q2"><b>Thinks</b><ul><li>If I plan for the wrong hour, the morning slips.</li><li>Staff and cold storage are fixed, donations are not.</li><li>Everything perishable is a risk I cannot check.</li></ul></div>
      <div class="ecore"><div class="ec"><span>Maya</span><small>Pantry coordinator</small></div></div>
      <div class="eq q3"><b>Does</b><ul><li>Takes donations by email, drop box, and surprise calls.</li><li>Weighs, sorts, and logs by hand.</li><li>Drops what she is doing when a truck pulls in.</li></ul></div>
      <div class="eq q4"><b>Feels</b><ul><li>Interrupted by arrivals she could not predict.</li><li>Wary of perishables she cannot vouch for.</li><li>Stretched across about 600 household visits a week.</li></ul></div>
    </div>
    <div class="egp"><div class="pain"><b>Pains</b>Arrival is a guess. Listings are vague. Nobody knows how long cold food has been out.</div><div class="gain"><b>Gains</b>A live ETA. A clear list of what is on the truck. Time out of the fridge, shown before she decides to accept.</div></div>
  </div>
</div></section>

<section data-label="Ideation"><div class="w">
  ${head('06', 'Ideation', 'From big idea', 'to one concept.', B('ideation', 0).text)}
  ${fig(B('ideation', 1))}
  <div style="margin-top:36px">${prose(B('ideation', 2).text)}</div>
  <div style="margin-top:24px">${prose(B('ideation', 3).text)}</div>
  <div class="figpair">${B('ideation', 4).items.map((b) => fig(b)).join('')}</div>
  ${colsOf(B('ideation', 5).items, 3)}
  ${fig(B('ideation', 6))}
</div></section>

<section data-label="Ideation"><div class="w">
  ${head('07', 'Studio', 'Sketch,', 'vote, repeat.', B('studio', 0).text)}
  ${rowsOf(B('studio', 1).items)}
  ${fig(B('studio', 2))}
</div></section>

<section data-label="Wireframes"><div class="w">
  ${head('08', 'Wireframes', 'Two workspaces,', 'one promise.', B('wireframes', 0).text)}
  ${fig(B('wireframes', 1))}
  <div class="scrolly">
    <div class="steps">${STEPS.map((s) => `<div class="st"><div class="n">${s.n}</div><h3>${s.t}</h3><p>${s.p}</p><ol>${s.notes.map((n, i) => `<li><i>${i + 1}</i><div><b>${n[0]}</b><span>${n[1]}</span></div></li>`).join('')}</ol></div>`).join('')}</div>
    <div class="stage"><div class="glow"></div><div class="dev"><div class="bar"><i></i><i></i><i></i><span>freshroute.app</span></div><div class="scr">${STEPS.map((s) => `<div class="layer"><img src="${IMG(s.img)}" alt=""></div>`).join('')}</div></div><div class="ctr"></div></div>
  </div>
  <p class="src" style="margin-top:80px">${B('wireframes', 4).text}</p>
</div></section>

<section data-label="Next"><div class="w">
  ${head('09', 'Next', 'What we are', 'testing now.')}
  ${rowsOf(B('next', 0).items)}
  <div class="panel rv" style="margin-top:50px"><div class="quote">“${B('next', 1).text}”<b>${B('next', 1).by}</b></div></div>
</div></section>

<footer class="pf-foot"><div class="pf-card"><span class="pf-blobs" aria-hidden="true"><b></b><b></b><b></b></span><div class="pf-glass"><p>Big ideas, made useful.</p><a class="pf-mail" href="mailto:roslytav@gmail.com">roslytav@gmail.com</a></div></div><nav class="pf-fnav"><a href="${L('')}">Home</a><a href="${L('play/')}">Play</a><a href="${L('about/')}">About me</a><a href="${L('files/RoslyTavarez_Resume.pdf')}">Resume</a><a href="mailto:roslytav@gmail.com">Contact</a></nav><div class="pf-base"><span>© 2026 Rosly Tavarez</span><a href="#top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false">Back to top ↑</a></div></footer>`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>FreshRoute · Rosly Tavarez</title><meta name="description" content="${P.summary}"><meta property="og:title" content="FreshRoute · Rosly Tavarez"><meta property="og:image" content="${DEPLOY ? '../../assets/img/freshroute/full/cover.jpg' : ''}"><meta name="theme-color" content="#0a0b0e"><link rel="icon" href="${DEPLOY ? '../../assets/favicon.svg' : '/home/claude/repo/site/assets/favicon.svg'}" type="image/svg+xml"><style>${fontFace}\n${css}</style></head><body>${body}<script>${client}</script></body></html>`;
fs.writeFileSync(DEPLOY ? '/tmp/fr/deploy.html' : '/tmp/fr/freshroute.html', html);
console.log('ok', (html.length / 1024).toFixed(0) + 'KB', 'dashes', (html.match(/—/g) || []).length);
