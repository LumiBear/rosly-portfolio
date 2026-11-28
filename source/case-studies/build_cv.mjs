import fs from 'node:fs';
import { projects } from '/home/claude/repo/source/content.mjs';
const P = projects.find((p) => p.slug === 'canvas');
const S = (id) => P.sections.find((s) => s.id === id);
const B = (id, i) => S(id).blocks[i];
const DEPLOY = !!process.env.DEPLOY;
const IMG = (n) => DEPLOY ? `../../assets/img/canvas/${n}.webp` : `/home/claude/repo/site/assets/img/canvas/${n}.webp`;
const FONTS = DEPLOY ? '../../assets/fonts/' : '/home/claude/repo/site/assets/fonts/';
const fontFace = `@font-face{font-family:"PJS";src:url(${FONTS}plus-jakarta-sans-latin-wght-normal.woff2) format("woff2");font-weight:200 800;font-display:swap}@font-face{font-family:Unbounded;src:url(${FONTS}unbounded-latin-400-normal.woff2) format("woff2");font-weight:400;font-display:swap}@font-face{font-family:"Schibsted Grotesk";src:url(${FONTS}schibsted-grotesk-latin-wght-normal.woff2) format("woff2");font-weight:400 900;font-display:swap}`;
const css = fs.readFileSync('/tmp/cv/cv.css', 'utf8');
const client = fs.readFileSync('/tmp/cv/client_cv.js', 'utf8');
const L = (p) => DEPLOY ? `../../${p}` : `/${p}`;
const clean = (t) => t.replace(/<b>|<\/b>/g, '');
const prose = (t) => `<p class="prose rv">${t}</p>`;
const head = (n, label, title, em, lead) => `<div class="sh"><div class="k rv"><b>${n}</b>${label}</div><h2 class="rv">${title} <em>${em}</em></h2>${lead ? `<p class="rv">${lead}</p>` : ''}</div>`;
const dev = (inner, url = 'canvas.unt.edu / focus') => `<div class="dev"><div class="bar"><i></i><i></i><i></i><span>${url}</span></div><div class="scr">${inner}</div></div>`;

const STEPS = [
  { img: 'v2-1', n: '01 · Dashboard', t: 'A way in from where students already are.', p: 'Focus Mode lives inside Canvas, so there is no second app to open at the moment a student is looking for an exit.', notes: [['Focus in the sidebar', 'A permanent entry sits in the UNT Canvas navigation, one click from any page.'], ['A direct invitation', '“Ready for Deep Work?” turns the dashboard into a starting point instead of a list of dues.'], ['Progress in context', 'Course cards keep their own progress, so the student sees where help would matter most.']] },
  { img: 'v2-2', n: '02 · Focus home', t: 'What is due, cut into small pieces.', p: 'The home screen replaces a wall of assignments with today’s next few steps.', notes: [['Today’s micro-steps', 'A short checklist makes the day look doable and shows progress as it ticks off.'], ['Active assignments', 'Each assignment carries a progress bar and a clear way to start.'], ['A suggestion from real feedback', 'The AI reads professor comments from the last assignment and turns one into a specific next step.']] },
  { img: 'v2-3', n: '03 · Focus plan', t: 'Ask how it feels before suggesting anything.', p: 'Diagnosis comes first. The same assignment needs a different first step for a different kind of stuck.', notes: [['Pick the work', 'Class and assignment are chosen from what Canvas already knows, with the due date in view.'], ['Name the feeling', 'Stuck, not sure where to start, wanting it perfect, or overwhelmed. Each one routes to a different intervention.'], ['A tip that matches', 'A small note beside the form sets expectations, like the three-minute rule.']] },
  { img: 'v2-4', n: '04 · Roadmap and timer', t: 'One step at a time, with a clock you can trust.', p: 'The plan becomes a short roadmap with a timer, so starting never means facing the whole paper.', notes: [['A visible timer', 'A countdown ring keeps the session short and finite.'], ['AI-curated micro-steps', 'Ten to twelve steps, each with a time estimate, so progress is visible.'], ['Pause or finish early', 'Controls stay in the student’s hands, so the tool never feels like surveillance.']] },
  { img: 'v2-5', n: '05 · Insights', t: 'Help that follows the draft.', p: 'When a student moves into their writing, a small panel comes with them.', notes: [['Beside the document', 'Insights sit next to the draft in Google Docs, so the student does not switch tabs.'], ['Based on the draft', 'Suggestions point at the actual writing, such as where an argument needs more evidence.'], ['Honest, optional nudges', 'Notifications are optional and privacy-first, a result of testing.']] },
];

const COLS = ['Forest', 'Todoist', 'Notion', 'Focus Mode'];
const ROWS = [['Plan and organize tasks', [0, 1, 1, 1]], ['Focus timer', [1, 0, 0, 1]], ['Lives inside Canvas', [0, 0, 0, 1]], ['Reads Canvas deadlines and grades', [0, 0, 0, 1]], ['Asks what is blocking you first', [0, 0, 0, 1]], ['Auto-breaks an assignment into timed steps', [0, 0, 0, 1]], ['Notices a revision loop as it happens', [0, 0, 0, 1]], ['Five-minute first action', [0, 0, 0, 1]]];
const gap = (r) => r[1][0] + r[1][1] + r[1][2] === 0;
const nGap = ROWS.filter(gap).length;
const fa = `<div class="fgrid"><div class="fc lab"><div class="fh"></div>${ROWS.map((r) => `<div class="fr">${r[0]}${gap(r) ? '<i>Gap</i>' : ''}</div>`).join('')}</div>${COLS.map((c, ci) => `<div class="fc ${ci === 3 ? 'me' : ''}"><div class="fh">${c}</div>${ROWS.map((r) => `<div class="fr ${gap(r) && ci === 3 ? 'close' : ''}">${r[1][ci] ? '<b class="dot"></b>' : ''}</div>`).join('')}</div>`).join('')}</div><div class="fleg"><span><b class="dot"></b> Offers it</span><span><i>Gap</i> None of the three offers it</span><span class="fn"><strong>${nGap} of ${ROWS.length}</strong> rows are gaps, and Focus Mode is built around all ${nGap}.</span></div>`;

const personas = B('interviews', 1).items;
const wins = ['The perfectionism blocker notices a revision loop and redirects her to drafting, with permission for a rough first draft.', 'A task breakdown of 10 to 12 micro-steps with time estimates, and progress he can see.', 'A simple five-minute first action that gets her moving, with no extra structure to optimize.'];
const grads = ['linear-gradient(135deg,#9be8c0,#2fd08a)', 'linear-gradient(135deg,#d4f46a,#9be8c0)', 'linear-gradient(135deg,#ffb36b,#d4f46a)'];
const pers = personas.map((p, i) => `<div class="pc rv" style="--d:${i * 0.08}s"><div class="pav" style="background:${grads[i]}">${p.name[0]}</div><div class="pn">${p.name}</div><div class="pr">${p.tag}</div><p>${p.body}</p><div class="pwin"><span>What Focus Mode gives them</span>${wins[i]}</div></div>`).join('');

const stats = B('research', 1).items;
const bars = B('research', 2).items;
const tstats = B('testing', 1).items;

const body = `
<header class="pf-head"><a class="pf-mark" href="${L('')}">Rosly Tavarez</a><nav class="chapters" id="chapters" aria-label="Case study steps"></nav><nav class="pf-nav" aria-label="Primary"><a href="${L('#work')}" aria-current="page">Work</a><a href="${L('play/')}">Play</a><a href="${L('about/')}">About</a><a href="${L('files/RoslyTavarez_Resume.pdf')}">Résumé</a><a href="mailto:roslytav@gmail.com">Contact</a></nav></header>

<section class="hero" data-label="Overview"><div class="w">
  <div class="hmeta"><div><span>Project</span><b>Canvas Focus Mode, a procrastination intervention</b></div><div><span>Role</span><b>Sole UX designer and researcher</b></div><div><span>Timeline</span><b>${P.timeline}</b></div><div><span>Tools</span><b>${P.tools}</b></div><div><span>Type</span><b>${P.kind}</b></div></div>
  <h1 class="rv">Focus Mode <em>for the moment you freeze.</em></h1>
  <p class="sub rv">${P.summary}</p>
  <div class="hframe rv">${dev(`<img src="${IMG('v2-1')}" alt="Canvas Focus Mode dashboard">`)}</div>
</div></section>

<section class="state" data-label="Overview"><div class="w">
  <div class="k rv"><b>01</b>Overview</div>
  <h2 class="big wdwrap">${S('overview').title}</h2>
  <div class="two"><div>${prose(B('overview', 0).text).replace('class="prose rv"', 'class="rv" style="font-size:20px;color:var(--ink);max-width:560px"')}<p class="rv" style="margin-top:18px">${B('overview', 1).text}</p></div>
  <div class="facts rv">${B('overview', 3).items.map((f) => `<div><span>${f[0]}</span><b>${f[1]}</b></div>`).join('')}</div></div>
</div></section>

<section data-label="Research"><div class="w">
  ${head('02', 'Research', 'Reading the literature', 'before talking to anyone.', clean(B('research', 0).text))}
  <div class="bento">${stats.map((s, i) => `<div class="bc stat rv" style="--d:${i * 0.08}s;--v:${[0.88, 0.5, 0.6][i]}"><div class="n">${s[0]}</div><div><p>${s[1]}</p><div class="meter"><u></u></div></div></div>`).join('')}</div>
  <div style="margin-top:40px">${prose(B('research', 3).text)}</div>
  <div class="fig dk rv"><img src="${IMG('science')}" alt="Evidence base"></div><figcaption>${B('research', 4).caption}</figcaption>
</div></section>

<section data-label="Landscape"><div class="w">
  ${head('03', 'Competitive scan', 'Plenty of planners.', 'Nothing for the moment you freeze.')}
  <div class="two"><div>${prose(B('landscape', 0).text)}</div><div>${prose(B('landscape', 1).text)}</div></div>
  <div class="panel rv" style="margin-top:50px"><div class="k">Feature analysis · Forest, Todoist and Notion, the tools students named most</div><h3 style="font-size:clamp(26px,2.8vw,40px);margin-top:12px;max-width:760px">Where today’s tools stop, and where Focus Mode picks up.</h3>${fa}</div>
</div></section>

<section data-label="People"><div class="w">
  ${head('04', 'Interviews and personas', 'One problem,', 'three very different students.', B('interviews', 0).text)}
  <div class="pers">${pers}</div>
  <div class="emp rv"><div class="k">Empathy map · Sarah, the perfectionist · synthesized from the interview patterns</div>
    <div class="egrid">
      <div class="eq q1"><b>Says</b><ul><li>The draft is not ready to share yet.</li><li>She will really start once the intro sounds right.</li><li>Other people’s writing is simply better.</li></ul></div>
      <div class="eq q2"><b>Thinks</b><ul><li>A rough draft shows I am not good enough.</li><li>Published work is the bar to meet.</li><li>If I cannot do it well, starting can wait.</li></ul></div>
      <div class="ecore"><div class="ec"><span>Sarah</span><small>The perfectionist</small></div></div>
      <div class="eq q3"><b>Does</b><ul><li>Rewrites the same paragraph again and again.</li><li>Compares her drafts to published work.</li><li>Keeps revising instead of moving on.</li></ul></div>
      <div class="eq q4"><b>Feels</b><ul><li>Anxious in front of a blank or half-finished page.</li><li>Stuck in a loop she can see but cannot leave.</li><li>Relieved when a rough draft is allowed.</li></ul></div>
    </div>
    <div class="egp"><div class="pain"><b>Pains</b>Endless revision loops. Comparing her work to published writing. No permission to be rough.</div><div class="gain"><b>Gains</b>A real-time nudge when she starts spiraling. “Your goal is to write something, not something perfect.” A first step small enough to take today.</div></div>
  </div>
</div></section>

<section data-label="Journey"><div class="w">
  ${head('05', 'Journey map', 'Finding', 'the dip.', B('journey', 0).text)}
  <div class="fig rv"><img src="${IMG('journey')}" alt="Journey map"></div><figcaption>${B('journey', 1).caption}</figcaption>
  <div style="margin-top:36px">${prose(B('journey', 2).text)}</div>
  <div class="fig dk rv"><img src="${IMG('low-points')}" alt="Intervention points"></div><figcaption>${B('journey', 3).caption}</figcaption>
</div></section>

<section data-label="Ideation"><div class="w">
  ${head('06', 'Ideation', 'Five ways to make', 'starting easier.', B('ideation', 0).text)}
  <div class="fig dk rv"><img src="${IMG('pillars')}" alt="Five design pillars"></div><figcaption>${B('ideation', 1).caption}</figcaption>
  <div class="rows">${B('ideation', 2).items.map((x, i) => { const m = x.match(/<b>(.*?)<\/b>\s*(.*)/); return `<div class="rv"><i>0${i + 1}</i><h3>${m[1].replace(/\.$/, '')}</h3><p>${m[2]}</p></div>`; }).join('')}</div>
  <div style="margin-top:40px">${prose(B('ideation', 3).text)}</div>
</div></section>

<section data-label="Design"><div class="w">
  ${head('07', 'Design', 'From wireframes to a dashboard', 'students would trust.', clean(B('design', 0).text))}
  <div class="scrolly">
    <div class="steps">${STEPS.map((s) => `<div class="st"><div class="n">${s.n}</div><h3>${s.t}</h3><p>${s.p}</p><ol>${s.notes.map((n, i) => `<li><i>${i + 1}</i><div><b>${n[0]}</b><span>${n[1]}</span></div></li>`).join('')}</ol></div>`).join('')}</div>
    <div class="stage"><div class="glow"></div><div class="dev"><div class="bar"><i></i><i></i><i></i><span>canvas.unt.edu / focus</span></div><div class="scr">${STEPS.map((s) => `<div class="layer"><img src="${IMG(s.img)}" alt=""></div>`).join('')}</div></div><div class="ctr"></div></div>
  </div>
  <div class="k" style="margin-top:110px"><b>↳</b>First iterations, in Canvas orange</div>
  <div class="prose rv" style="margin-top:14px">${clean(B('design', 1).text)}</div>
  <div class="marq"><div class="row">${['v1-1', 'v1-2', 'v1-3', 'v1-4', 'v1-5', 'v1-1', 'v1-2'].map((n) => dev(`<img src="${IMG(n)}" alt="">`, 'canvas.unt.edu / focus')).join('')}</div></div>
  <div class="prose rv itnote">${clean(B('design', 3).text)}</div>
</div></section>

<section data-label="Testing"><div class="w">
  ${head('08', 'Testing', 'Six students,', 'one big copy change.', B('testing', 0).text)}
  <div class="bento">${tstats.map((s, i) => `<div class="bc stat rv" style="--d:${i * 0.08}s;--v:${[0.83, 0.82, 1][i]}"><div class="n">${s[0]}</div><div><p>${s[1]}</p>${i < 2 ? '<div class="meter"><u></u></div>' : ''}</div></div>`).join('')}</div>
  <div class="qs"><div class="panel rv"><div class="quote">“${B('testing', 3).text}”<b>${B('testing', 3).by}</b></div></div>
  <div style="margin:30px 0">${prose(B('testing', 4).text)}</div>
  <div class="panel rv"><div class="quote">“${B('testing', 5).text}”<b>${B('testing', 5).by}</b></div></div></div>
</div></section>

<section data-label="Reflection"><div class="w">
  ${head('09', 'Reflection', 'Good UX can solve', 'emotional problems.')}
  <div class="two"><div>${prose(B('reflection', 0).text)}</div><div>${prose(B('reflection', 1).text)}</div></div>
</div></section>

<footer class="pf-foot"><div class="pf-card"><span class="pf-blobs" aria-hidden="true"><b></b><b></b><b></b></span><div class="pf-glass"><p>Big ideas, made useful.</p><a class="pf-mail" href="mailto:roslytav@gmail.com">roslytav@gmail.com</a></div></div><nav class="pf-fnav"><a href="${L('')}">Home</a><a href="${L('play/')}">Play</a><a href="${L('about/')}">About me</a><a href="${L('files/RoslyTavarez_Resume.pdf')}">Resume</a><a href="mailto:roslytav@gmail.com">Contact</a></nav><div class="pf-base"><span>© 2026 Rosly Tavarez</span><a href="#top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false">Back to top ↑</a></div></footer>`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Canvas Focus Mode · Rosly Tavarez</title><meta name="description" content="${P.summary}"><meta property="og:title" content="Canvas Focus Mode · Rosly Tavarez"><meta property="og:image" content="${DEPLOY ? '../../assets/img/canvas/full/cover.jpg' : ''}"><meta name="theme-color" content="#06100c"><link rel="icon" href="${DEPLOY ? '../../assets/favicon.svg' : '/home/claude/repo/site/assets/favicon.svg'}" type="image/svg+xml"><style>${fontFace}\n${css}</style></head><body>${body}<script>${client}</script></body></html>`;
fs.writeFileSync(DEPLOY ? '/tmp/cv/deploy.html' : '/tmp/cv/canvas.html', html);
console.log('ok', (html.length / 1024).toFixed(0) + 'KB', 'dashes', (html.match(/—/g) || []).length);
