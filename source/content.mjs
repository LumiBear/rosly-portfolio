// All site copy lives here. Edit text in this file, then run `node build.mjs`.

export const person = {
  name: 'Rosly Tavarez',
  role: 'UX designer',
  email: 'roslytav@gmail.com',
  linkedin: 'https://www.linkedin.com/in/roslytavarez',
  tagline:
    'I turn research, brand insight, and complex moments into intuitive digital experiences people genuinely enjoy using.',
  signoff: 'Big ideas, made useful.',
};

export const projects = [
  /* ───────────────────────── CANVAS ───────────────────────── */
  {
    slug: 'canvas',
    title: 'Canvas Focus Mode',
    kicker: 'Procrastination intervention for Canvas LMS',
    summary:
      'A psychology-backed extension for Canvas that meets students at the exact moment they start avoiding an assignment, and gets them moving with one small first step.',
    year: '2026',
    kind: 'Web · Browser extension',
    tags: ['Research', 'Behavioral design', 'Web UI'],
    role: 'Sole UX designer & researcher',
    timeline: 'Spring 2026',
    team: 'Solo project',
    tools: 'Figma, Miro',
    cover: 'canvas/cover',
    sections: [
      {
        id: 'overview', step: 'Overview', title: 'Students don’t procrastinate because they can’t plan.',
        blocks: [
          { t: 'lead', text: 'Most productivity tools treat procrastination as a scheduling problem. My research kept pointing somewhere else: students avoid work when a task makes them anxious, and that anxiety peaks a few days after an assignment is posted, when the page is still blank and the instructions still feel vague.' },
          { t: 'p', text: 'I set out to design something that shows up at that moment instead of after it. Canvas Focus Mode lives inside the learning platform students already open every day. It asks what is in the way, then responds with the right kind of help: a five-minute first action, a broken-down plan, or a gentle interruption when a perfectionist starts rewriting the same paragraph for the fourth time.' },
          { t: 'figure', img: 'canvas/hero-angle', caption: 'Canvas Focus Mode, shown on a laptop inside the Canvas interface.' },
          { t: 'facts', items: [['Problem', 'Avoidance driven by anxiety and perfectionism, not poor planning'], ['Approach', 'Diagnose the emotional barrier first, then prescribe a specific intervention'], ['Outcome', '5 of 6 test participants said they would use it; SUS score of 82']] },
        ],
      },
      {
        id: 'research', step: 'Research', title: 'Reading the literature before talking to anyone.',
        blocks: [
          { t: 'p', text: 'I started with secondary research so I could walk into interviews with sharper questions. Three frameworks shaped everything after: Temporal Motivation Theory, Affect Regulation Theory, and Implementation Intentions. Read together, they describe procrastination as a short-term mood repair. Students put a task off because doing so makes them feel better right now.' },
          { t: 'stats', items: [['80–95%', 'of college students procrastinate'], ['~50%', 'do it chronically'], ['60%', 'of productivity apps are abandoned within 30 days']] },
          { t: 'bars', items: [['Procrastinate', 88, '80–95%'], ['Do it chronically', 50, '~50%'], ['Apps abandoned in 30 days', 60, '60%']] },
          { t: 'p', text: 'That last number reframed the brief. Students do download tools that promise to help. They quit them because opening one more app adds friction at the exact moment they are already looking for an exit.' },
          { t: 'figure', img: 'canvas/science', caption: 'The evidence base I mapped each feature against: strategy, scientific basis, source, and expected effect.' },
        ],
      },
      {
        id: 'landscape', step: 'Competitive scan', title: 'Plenty of planners. Nothing for the moment you freeze.',
        blocks: [
          { t: 'p', text: 'I reviewed Forest, Todoist, and Notion, the tools students in my interviews mentioned most. All three are good at organizing work once a student has decided to do it. None of them notice when a student opens an assignment, reads it, and closes the tab.' },
          { t: 'p', text: 'I also mapped the stakeholders around a struggling student: professors, academic advisors, and the Canvas platform itself. Professors and advisors care about outcomes but usually step in after a student has already fallen behind. That left an early window nobody was designing for, and Canvas, with more than 30 million students already logging in, was the natural place to reach it.' },
        ],
      },
      {
        id: 'interviews', step: 'Interviews & personas', title: 'One problem, three very different students.',
        blocks: [
          { t: 'p', text: 'Interviews with college students broke my assumption that there was one cause to fix. Three patterns kept repeating, and each needed a different response. That became the main design principle: diagnose before you prescribe.' },
          { t: 'personas', items: [
            { name: 'Sarah', tag: 'The perfectionist', body: 'Rewrites the same paragraph endlessly and compares her drafts to published work. She needs a real-time nudge when she starts spiraling, and permission to let a first draft be rough.' },
            { name: 'Marcus', tag: 'The overwhelmed', body: 'Works 25 hours a week on top of five courses and often doesn’t know where to start. He needs the assignment cut into smaller pieces, with progress he can actually see.' },
            { name: 'Priya', tag: 'The optimizer', body: 'Will spend two hours color-coding a plan before writing a sentence. More structure makes her worse. She needs something simple that gets her moving.' },
          ] },
        ],
      },
      {
        id: 'journey', step: 'Journey map', title: 'Finding the dip.',
        blocks: [
          { t: 'p', text: 'I mapped a typical assignment from the day it is posted to the night it is due. The emotional line was remarkably consistent: confidence at the start, a slide into anxiety once the blank page sets in, a low point of avoidance, and a rushed scramble at the end.' },
          { t: 'figure', img: 'canvas/journey', caption: 'Journey map for a 20-page research paper. Each phase pairs what the student does with what they feel.' },
          { t: 'p', text: 'The most useful thing the map gave me was a target. Instead of trying to help across the whole timeline, I designed the intervention to catch students in that mid-journey dip, before avoidance hardens into a deadline panic.' },
          { t: 'figure', img: 'canvas/low-points', caption: 'Turning the map into intervention points: early scaffolding, an avoidance interrupt, and panic mitigation.' },
        ],
      },
      {
        id: 'ideation', step: 'Ideation', title: 'Five ways to make starting easier.',
        blocks: [
          { t: 'p', text: 'I translated the research into five design pillars, each tied to a specific behavior I wanted to change. Every feature in the product had to trace back to one of them.' },
          { t: 'figure', img: 'canvas/pillars', caption: 'Micro-tasking, backward planning, low-stakes starts, metacognition, and focus & recovery, combined into one integrated flow.' },
          { t: 'list', items: [
            '<b>Check-in.</b> “What’s blocking you?” comes before any suggestion. Diagnosis before prescription.',
            '<b>Five-minute first action.</b> “Brain-dump three things you already know” instead of “write a 10-page paper.”',
            '<b>Task breakdown.</b> 10 to 12 micro-steps with time estimates, so progress becomes visible.',
            '<b>Perfectionism blocker.</b> Notices revision loops as they happen and redirects the student back to drafting.',
            '<b>Canvas context.</b> Uses deadlines and grade history to make nudges specific instead of generic.',
          ] },
          { t: 'p', text: 'Early sketches focused on the check-in. The hardest part was asking “what’s blocking you?” without it reading like a therapy intake form or a guilt trip. I explored tone as carefully as layout.' },
        ],
      },
      {
        id: 'design', step: 'Design', title: 'From wireframes to a dashboard students would trust.',
        blocks: [
          { t: 'p', text: 'I wireframed the check-in, the task breakdown, and the perfectionism interruption in Figma before moving to high fidelity. The visual language borrows from Canvas so the feature feels native, with a calm, low-alarm palette and plain, friendly copy. It should feel like a nudge from a study partner, not another notification.' },
          { t: 'p', text: 'Screens in <b>orange</b> are my first iterations. They borrow Canvas’s own red so the feature felt native, and they are where I worked out the check-in, the task breakdown, and the focus timer.' },
          { t: 'carousel', label: 'First iterations · orange', items: [
            ['canvas/v1-1', 'Dashboard with a “Ready for Deep Work?” entry point into Focus Mode.'],
            ['canvas/v1-2', 'Focus Mode home: today’s micro-steps beside active assignments.'],
            ['canvas/v1-3', 'Creating a focus plan: pick a task, name how you feel, get a first step sized to that feeling.'],
            ['canvas/v1-4', 'Roadmap and timer, with AI-curated micro-steps.'],
            ['canvas/v1-5', 'Insights surfaced beside the student’s draft in Google Docs.'],
          ] },
          { t: 'p', text: 'The <b>final</b> screens, with the <b>green sidebar</b>, move the same flow into UNT’s Canvas theme. The layout stayed the same. Color, navigation, and spacing were tuned so Focus Mode looks like part of the school’s own Canvas.' },
          { t: 'carousel', label: 'Final design · green sidebar', items: [
            ['canvas/v2-1', 'Dashboard with the Focus entry point in the UNT sidebar.'],
            ['canvas/v2-2', 'Focus Mode home: micro-steps, active assignments, and a contextual AI suggestion.'],
            ['canvas/v2-3', 'Creating a focus plan, with the feeling check-in.'],
            ['canvas/v2-4', 'Roadmap and timer, with AI-curated micro-steps.'],
            ['canvas/v2-5', 'Insights beside the draft in Google Docs.'],
          ] },
        ],
      },
      {
        id: 'testing', step: 'Testing', title: 'Six students, one big copy change.',
        blocks: [
          { t: 'p', text: 'Before testing, I ran a heuristic evaluation focused on visibility of system status and user control. The biggest risk was that the tool would feel naggy or controlling. Then I put the clickable prototype in front of six college students.' },
          { t: 'stats', items: [['5 / 6', 'said they would use it'], ['82', 'System Usability Scale score'], ['2', 'favorite features: first actions & progress tracking']] },
          { t: 'bars', items: [['Would use it', 83, '5 of 6'], ['System Usability Scale', 82, '82 / 100']] },
          { t: 'quote', text: 'The 5-minute thing actually got me to open my essay instead of avoiding it for another day.', by: 'Usability test participant' },
          { t: 'p', text: 'The first version of the perfectionism blocker read like a warning, close to “stop revising.” Participants found it scolding. I rewrote it as “Your goal is to write something, not something perfect,” and softened the visual treatment from an alert to an inline card. I also added privacy-first data handling and made every notification optional.' },
          { t: 'quote', text: 'I didn’t realize how much time I was losing just staring at a blank doc until this called it out.', by: 'Usability test participant' },
        ],
      },
      {
        id: 'reflection', step: 'Reflection', title: 'Good UX can solve emotional problems.',
        blocks: [
          { t: 'p', text: 'This project changed how I scope problems. Procrastination isn’t fixed with a better calendar. It’s eased by lowering the emotional cost of starting, then building momentum with small, concrete wins the student can see.' },
          { t: 'p', text: 'Next, I would run a longer diary study to see whether students keep using Focus Mode after the novelty fades, and test whether instructors would want an opt-in view of anonymized class-wide sticking points.' },
        ],
      },
    ],
  },

  /* ───────────────────────── CLOSET ───────────────────────── */
  {
    slug: 'closet',
    title: 'Closet',
    kicker: 'Editorial resale for archival fashion',
    summary:
      'A mobile resale platform that treats every garment like an artifact, using editorial curation and visible authentication to rebuild trust in secondhand luxury.',
    year: '2026',
    kind: 'Mobile app',
    tags: ['Market research', 'Information architecture', 'Mobile UI'],
    role: 'UX/UI designer',
    timeline: 'Summer 2026',
    team: 'Solo concept project',
    tools: 'Figma, Google Stitch',
    cover: 'closet/cover',
    sections: [
      {
        id: 'overview', step: 'Overview', title: 'Secondhand luxury has a trust problem.',
        blocks: [
          { t: 'lead', text: 'Resale apps are crowded, badly photographed, and full of doubt. For buyers of high-end archival pieces, a cluttered feed makes a $700 pair of boots look like a $20 thrift find, and every listing raises the same question: is this real?' },
          { t: 'p', text: 'Closet answers with an editorial-first interface. Instead of an endless grid, pieces are presented in curated stories with gallery-style layouts, and authentication is shown up front as a visible certificate rather than buried in fine print.' },
          { t: 'facts', items: [['Problem', 'Visual clutter and authenticity anxiety erode the perceived value of luxury resale'], ['Approach', 'Curation over volume; trust components designed as first-class UI'], ['Deliverables', 'Market research, personas, mobile IA, design system, high-fidelity screens']] },
        ],
      },
      {
        id: 'market', step: 'Market research', title: 'A $60B market that still feels like a flea market.',
        blocks: [
          { t: 'p', text: 'Luxury resale has grown from a niche hobby into a global industry. I gathered 2024 to 2026 trend data to understand what buyers value and where current platforms lose them.' },
          { t: 'stats', items: [['45%', 'of Gen Z check resale value before buying'], ['30%', 'higher cart abandonment without clear authentication'], ['70%', 'of Gen Z favor brands with circular commitments']] },
          { t: 'p', text: 'Two findings mattered most. Buyers increasingly treat fashion as an asset, and rare pieces from the 1990s and 2000s are appreciating quickly. Yet the platforms they buy on are designed for volume, not provenance. Trust, not inventory, was the gap.' },
        ],
      },
      {
        id: 'personas', step: 'Personas', title: 'A collector and a minimalist.',
        blocks: [
          { t: 'personas', items: [
            { name: 'Sophie, 24', tag: 'The asset curator', body: 'An archival collector and frequent seller who sees fashion as a financial asset. Cluttered apps like Depop bury her best pieces. She wants to sell authenticated work quickly to fund her next “grail.”' },
            { name: 'Leo, 29', tag: 'The conscious minimalist', body: 'A casual luxury buyer who wants quality over quantity and a smaller footprint. He hesitates because he can’t verify condition or authenticity, and he wants timeless pieces without “sustainability guilt.”' },
          ] },
          { t: 'p', text: 'Sophie pushed the selling flow to be fast and credible. Leo pushed the buying flow to be calm and reassuring. Both pointed to the same core need: proof, presented beautifully.' },
        ],
      },
      {
        id: 'ia', step: 'Information architecture', title: 'Three zones: discover, trust, sell.',
        blocks: [
          { t: 'p', text: 'I organized the app around the three jobs users come to do, so the navigation itself tells the story of the product.' },
          { t: 'columns', items: [
            { h: 'Discovery', list: ['Editorial hero drops (themed collections)', 'AI semantic search by era, e.g. “Phoebe Philo era”', 'Curated daily picks'] },
            { h: 'Product & trust', list: ['360° high-resolution gallery', '“Verified Authentic” certificate', 'Eco-impact calculator (water and CO₂ saved)'] },
            { h: 'Selling (the Vault)', list: ['AI listing wizard with tag scanning', 'Market value estimator', 'Dashboard with wardrobe footprint and sales'] },
          ] },
        ],
      },
      {
        id: 'strategy', step: 'UX strategy', title: 'The editorial solution.',
        blocks: [
          { t: 'list', items: [
            '<b>Magazine-style discovery.</b> Curated stories replace infinite grids to reduce choice paralysis.',
            '<b>Visual proof.</b> A gold-and-charcoal “security seal” pattern marks every trust component, so authenticity reads at a glance.',
            '<b>Frictionless selling.</b> AI vision reads tags and fills in details, cutting listing time from about ten minutes to sixty seconds.',
          ] },
          { t: 'figures', items: [
            { img: 'closet/mock-boots', caption: 'Product detail and authenticated listing, shown in context.' },
            { img: 'closet/mock-hand', caption: 'Seller dashboard in hand: wardrobe footprint, active listings, and earnings.' },
          ] },
        ],
      },
      {
        id: 'system', step: 'Design system', title: 'Quiet luxury, in tokens.',
        blocks: [
          { t: 'p', text: 'The visual system, which I called Editorial Luxury Archive, pairs a warm paper surface with near-black type and a single antique-gold accent reserved for authentication. Playfair Display carries the editorial voice in headlines; a clean sans handles prices, specs, and UI.' },
          { t: 'palette', items: [['#FBF9F3', 'Surface'], ['#1B1C18', 'Ink'], ['#775A19', 'Seal gold'], ['#FED488', 'Seal light'], ['#0E1F13', 'Archive green']] },
        ],
      },
      {
        id: 'screens', step: 'High-fidelity screens', title: 'Four screens, one feeling of confidence.',
        blocks: [
          { t: 'phones', items: [
            { img: 'closet/home', caption: 'Home: a themed drop leads, daily picks follow.' },
            { img: 'closet/product', caption: 'Product page with the authenticity seal and eco-impact note.' },
            { img: 'closet/listing', caption: 'AI listing wizard pre-fills brand, category, and material.' },
            { img: 'closet/seller', caption: 'Seller profile with wardrobe footprint stats.' },
          ] },
        ],
      },
      {
        id: 'reflection', step: 'Reflection', title: 'What I’d test next.',
        blocks: [
          { t: 'p', text: 'Closet taught me to design trust as a visible system rather than a policy page. My next step would be testing the authentication seal with real buyers: does it raise confidence, or does it need third-party proof behind it to be believed? I would also prototype the listing wizard with real garments to measure how close it gets to the sixty-second goal.' },
        ],
      },
    ],
  },

  /* ───────────────────────── REVERDI / L'ORÉAL ───────────────────────── */
  {
    slug: 'reverdi',
    title: 'ReVerdi',
    kicker: 'L’Oréal Brandstorm 2026 · A regenerative fragrance for YSL Beauty',
    summary:
      'A personalized perfume kit that turns invasive plant species into custom scent, developed with Team Cré for L’Oréal Brandstorm 2026 and pitched live to L’Oréal judges.',
    year: '2026',
    kind: 'Service & product concept',
    tags: ['Survey research', 'Concept development', 'Pitch'],
    role: 'UX designer & coordinator',
    timeline: 'Jan – Mar 2026',
    team: 'Team Cré (L’Oréal Brandstorm)',
    tools: 'Google Forms, Blender, Canva',
    cover: 'reverdi/cover',
    file: { pdf: 'TeamCree_ReVerdi_Brandstorm2026.pdf', pages: 3, label: 'ReVerdi pitch deck (PDF)' },
    sections: [
      {
        id: 'overview', step: 'Overview', title: 'Craft the future of luxury fragrance.',
        blocks: [
          { t: 'lead', text: 'L’Oréal Brandstorm is an international innovation competition for students. The 2026 mission, set with L’Oréal Luxe, asked teams to invent new fragrance products and experiences powered by creativity, technology, and bespoke service.' },
          { t: 'p', text: 'As UX designer and coordinator for Team Cré, I organized our research, turned survey results into product requirements, and shaped the concept into a pitch we delivered live to L’Oréal industry judges, placing competitively against university teams nationwide.' },
          { t: 'facts', items: [['Brand', 'YSL Beauty (L’Oréal Luxe)'], ['Concept', 'ReVerdi, a stewardship-based personalized perfume kit'], ['Validation', '75 survey respondents']] },
        ],
      },
      {
        id: 'ideation', step: 'Ideation', title: 'One whiteboard, every idea.',
        blocks: [
          { t: 'p', text: 'We began by mapping everything a fragrance could be. Starting from the word “perfume,” the board branched into feelings, notes, ingredients, culture, and packaging, while side lists tracked our target audience, what they want, and materials for bottles and refills.' },
          { t: 'figure', img: 'reverdi/whiteboard', caption: 'Our opening mind map: scent families and moods branch out from “perfume,” with notes on target users, wants, and bottle materials.', medium: true },
          { t: 'p', text: 'Two threads kept surfacing: people want scent that feels personal, and they increasingly care where ingredients come from. The concept lived where those two threads crossed.' },
        ],
      },
      {
        id: 'concept', step: 'Concept', title: 'What if fragrance helped restore nature?',
        blocks: [
          { t: 'p', text: 'The fragrance industry depends on resource-intensive crops and heavy packaging, while invasive plant species damage ecosystems and cost millions to manage each year. ReVerdi connects those problems: responsibly harvested invasive botanicals become the base notes of a personalized scent, and part of every sale funds ecosystem restoration.' },
          { t: 'figure', img: 'reverdi/solution', caption: 'The solution: an in-store test, an at-home kit, and a companion app.' },
          { t: 'figure', img: 'reverdi/problem', caption: 'Problem and opportunity: why a regenerative concept fits L’Oréal’s goal of 100% eco-designed products by 2030.' },
          { t: 'p', text: 'We chose YSL Beauty for its fashion-driven innovation and bold identity, a brand that could credibly lead regenerative luxury fragrance.' },
        ],
      },
      {
        id: 'research', step: 'Survey research', title: 'Would people actually test their own skin?',
        blocks: [
          { t: 'p', text: 'Personalization was the riskiest assumption. Our concept asked customers to use pH strips, oil blots, and temperature strips, then share the results through an app. I designed a survey to test interest, willingness to use at-home tools, price tolerance, and privacy comfort.' },
          { t: 'stats', items: [['72 / 75', 'were very or somewhat interested in a fragrance matched to their body chemistry'], ['57%', 'would pay $50–$100; another 19% would pay $100–$150'], ['75%', 'would feel more comfortable if data were encrypted and never stored']] },
          { t: 'figure', img: 'reverdi/survey', caption: 'Responses coming in: privacy concerns, preferred personalization inputs, and comfort with encrypted data.', medium: true },
          { t: 'p', text: 'The privacy questions changed the product. Misuse of personal data and data privacy were the top concerns, and most people preferred personalization based on both physical skin tests and lifestyle questions. That pushed us toward a design where results stay on the customer’s side and only the formula is shared.' },
        ],
      },
      {
        id: 'experience', step: 'Experience design', title: 'In store, then at home.',
        blocks: [
          { t: 'columns', items: [
            { h: 'In-store experience', list: ['Skin pH, oil-level, and temperature testing', 'Lifestyle and scent-preference consultation', 'Guided fragrance blending'] },
            { h: 'At-home kit', list: ['Included testing materials', 'Modular invasive-botanical fragrance bases', 'Refillable glass bottle in recycled packaging'] },
            { h: 'Companion app', list: ['Subscribe to a custom formula', 'Log at-home test results', 'Track KPIs for the business'] },
          ] },
        ],
      },
      {
        id: 'visual', step: 'Visualization', title: 'Making the bottle real enough to judge.',
        blocks: [
          { t: 'p', text: 'Judges needed to picture a YSL product, not a sketch. We modeled and lit the refillable bottle in Blender so the pitch could show material, weight, and finish.' },
          { t: 'figure', img: 'reverdi/render', caption: 'Work in progress in Blender: the refillable gold-capped bottle under studio lighting.' },
          { t: 'figure', img: 'reverdi/data', caption: 'Data, KPIs, and consumer validation, with the “Le Parfum” app concept used to measure success.' },
        ],
      },
      {
        id: 'pitch', step: 'Pitch', title: 'Research into a story judges could follow.',
        blocks: [
          { t: 'p', text: 'My last job was turning months of notes and 75 survey responses into a narrative that fit the time limit: the problem, the opportunity for L’Oréal, how ReVerdi works, and the evidence that people want it. We delivered the pitch live to L’Oréal industry judges.' },
          { t: 'file', pdf: 'TeamCree_ReVerdi_Brandstorm2026.pdf', pages: 3, title: 'ReVerdi pitch deck', note: '3 slides · PDF · Team Cré' },
        ],
      },
      {
        id: 'reflection', step: 'Reflection', title: 'Coordinating is a design skill.',
        blocks: [
          { t: 'p', text: 'Brandstorm was my first time leading research inside a team under a hard deadline. Keeping everyone working from the same evidence mattered as much as any screen. If we took ReVerdi further, I would prototype the at-home kit with real testers to see whether the skin tests feel fun or clinical, and design the app’s privacy controls as carefully as the bottle.' },
        ],
      },
    ],
  },

  /* ───────────────────────── CHORETAP ───────────────────────── */
  {
    slug: 'choretap',
    title: 'ChoreTap',
    kicker: 'NFC shared chore system · in progress',
    summary:
      'Tap a sticker where the chore happens and everyone in the house sees it. A shared-household system that pairs NFC tags with a companion app so nobody has to be the nag.',
    year: '2026',
    kind: 'Mobile app + physical kit',
    tags: ['Concept', 'Prototype', 'In progress'],
    role: 'UX designer',
    timeline: 'Fall 2026 · ongoing',
    team: 'Solo project',
    tools: 'Figma, NFC tags, web prototype',
    cover: 'choretap/cover',
    inProgress: true,
    file: { pdf: 'RoslyTavarez_ChoreTap_Brief.pdf', pages: 5, label: 'ChoreTap project brief (PDF)' },
    sections: [
      {
        id: 'overview', step: 'Overview', title: 'Chores fail for social reasons.',
        blocks: [
          { t: 'lead', text: 'Roommates rarely fight about the schedule. They fight about invisible work, unclear status, and the one person who ends up acting as manager. Most chore apps add another step at the exact moment people are least willing to take it.' },
          { t: 'p', text: 'ChoreTap moves the check-off to where the work happens. A small NFC sticker on the trash bin, dishwasher, or cleaning caddy logs the chore with one tap, credits the person who did it, and updates the whole household instantly.' },
          { t: 'note', text: 'This case study is in progress. Research is underway, and sections will fill in as interviews and testing wrap up.' },
        ],
      },
      {
        id: 'problem', step: 'Problem framing', title: 'Four ways shared chores break down.',
        blocks: [
          { t: 'list', items: [
            '<b>Invisible work.</b> Nobody sees who took out the trash, so effort goes unrecognized and resentment builds quietly.',
            '<b>Unclear status.</b> “Did you already run the dishwasher?” turns into repeated texts.',
            '<b>Too much friction.</b> Opening an app, finding the task, and ticking a box is the first step people skip, so the log goes stale.',
            '<b>Nagging as a role.</b> One roommate becomes the manager, and the relationship pays for it.',
          ] },
          { t: 'quote', text: 'The tap should take one second and happen at the moment and place the chore is done.', by: 'Core design principle' },
        ],
      },
      {
        id: 'research', step: 'Research plan', title: 'Questions before screens.',
        blocks: [
          { t: 'p', text: 'I wrote research questions across three areas before designing anything: how roommates split chores today, how visibility affects motivation and shame, and whether people can find and tap the right spot on the first try.' },
          { t: 'columns', items: [
            { h: 'Methods', list: ['Interviews with 5–8 people who live with roommates', 'Short survey on chore habits and conflict', '1–2 week diary study', 'Audit of existing chore apps', 'Paper-and-sticker usability tests'] },
            { h: 'Stakeholders', list: ['Roommates and the household organizer', 'Guests using the no-app fallback', 'Landlords who care about adhesive on surfaces', 'NFC hardware and platform constraints'] },
            { h: 'Reading', list: ['The Second Shift, Arlie Hochschild', 'Fair Play, Eve Rodsky', 'The Design of Everyday Things, Don Norman', 'NN/g on diary studies and heuristics'] },
          ] },
        ],
      },
      {
        id: 'concept', step: 'Concept', title: 'Where the tags go.',
        blocks: [
          { t: 'list', items: [
            '<b>Trash bin lid.</b> Logs “trash out” and rotates the task to the next person.',
            '<b>Dishwasher door.</b> Tap for loaded, long-press for emptied.',
            '<b>Washer or hamper.</b> Starts a load and pings you when the cycle ends.',
            '<b>Bathroom caddy.</b> Logs a clean and advances the rotation.',
            '<b>Fridge door.</b> A guest tag that opens Wi-Fi, trash day, and house rules without an app.',
          ] },
          { t: 'p', text: 'MVP scope: set up a home for 2 to 5 roommates, a starter kit of 5 to 6 named stickers, tap-to-log with a shared feed, automatic rotation, gentle reminders, a web fallback for guests, and undo for accidental taps. Payments, penalties, and leaderboards are deliberately out. The fair-share view is framed neutrally, not as a scoreboard.' },
        ],
      },
      {
        id: 'inspiration', step: 'Visual exploration', title: 'Soft, friendly, and a little playful.',
        blocks: [
          { t: 'p', text: 'Chores are a sore subject, so the interface needed to lower the temperature. I collected references from other designers for warm color, rounded cards, and friendly type, then defined my own direction from what they had in common.' },
          { t: 'moodboard', items: ['choretap/ref-3', 'choretap/ref-1', 'choretap/ref-2', 'choretap/ref-4', 'choretap/ref-5'], caption: 'Reference board. All images are work by other designers, collected for inspiration only.' },
          { t: 'figure', img: 'choretap/icon', caption: 'App icon: a checked star with a tap signal, readable at sticker size.', narrow: true },
        ],
      },
      {
        id: 'prototype', step: 'Prototype', title: 'A working prototype on the web.',
        blocks: [
          { t: 'p', text: 'To test the flow on real phones, I built an installable web prototype. Each sticker opens a lightweight page, so a guest or new roommate can tap without installing anything.' },
          { t: 'phones', items: [
            { img: 'choretap/landing', caption: 'Welcome: “Chores, minus the group-chat drama.” No account to make. A first name is enough, so housemates know who tapped.' },
            { img: 'choretap/today', caption: 'Today: whose turn it is, washer and dryer timers, and a live feed of what everyone just did.' },
          ] },
          { t: 'embed', src: '/choretap-app/', title: 'ChoreTap prototype', note: 'Try it right here. Tap “Explore a demo house” to look around.' },
          { t: 'link', href: '/choretap-app/', label: 'Open the live prototype', note: 'Works best on a phone' },
        ],
      },
      {
        id: 'next', step: 'Next steps', title: 'What I’m testing now.',
        blocks: [
          { t: 'list', items: [
            'Interview 5 to 8 roommates about how chores are split today.',
            'Build a paper prototype with real stickers in a mock kitchen.',
            'Test tap-target placement and how people recover from accidental taps.',
            'Check whether tapping continues after the novelty fades, and whether visibility motivates or shames.',
          ] },
          { t: 'file', pdf: 'RoslyTavarez_ChoreTap_Brief.pdf', pages: 5, title: 'ChoreTap project brief', note: '5 pages · PDF' },
        ],
      },
    ],
  },
  {
    slug: 'freshroute',
    title: 'FreshRoute',
    kicker: 'Food rescue logistics · in progress',
    summary:
      'Grocery stores have safe surplus food and food banks need it, but the handoff runs on guesswork. FreshRoute tells a food bank exactly when a donation truck will arrive, what is on it, and how long the cold items have been out of the fridge.',
    year: '2026',
    kind: 'Team research project',
    tags: ['Research', 'Team', 'In progress'],
    role: 'UX researcher · team of four',
    timeline: 'Fall 2026 · ongoing',
    team: 'Maroon Moose (4 UX design students)',
    tools: 'Google Forms & Sheets, interview guides, whiteboard workshops, paper prototypes',
    cover: 'freshroute/cover',
    inProgress: true,
    sections: [
      {
        id: 'overview', step: 'Overview', title: 'Good food, bad timing.',
        blocks: [
          { t: 'lead', text: 'Grocery stores throw out food that is still safe to eat, and food banks spend their days chasing it. The gap between them is not willingness. It is coordination: who is coming, when, with what, and whether the yogurt has been sitting in a warm van for an hour.' },
          { t: 'p', text: 'This semester-long team project started with a broad question about food waste and narrowed, through research, to one moment: the handoff between a store, a driver, and the food bank waiting on the other end.' },
          { t: 'note', text: 'This case study is in progress. We have finished research, ideation, and the first round of wireframes. Usability testing comes next, and this page will grow with it.' },
        ],
      },
      {
        id: 'scope', step: 'Scoping', title: 'Six directions, one decision.',
        blocks: [
          { t: 'p', text: 'Food waste touches everyone from shoppers to warehouse staff, so we mapped six possible directions before committing to one: connecting businesses with food banks, food bank inventory, the wider donation ecosystem, helping people find food, discounted surplus for consumers, and preventing waste at home.' },
          { t: 'p', text: 'We chose to focus on the link between grocery stores and food banks. It is where the most safe food is lost, and the people on both sides told us the process depends on phone calls and memory.' },
        ],
      },
      {
        id: 'competitive', step: 'Competitive analysis', title: 'Lots of apps for shoppers. Almost nothing for the people moving the food.',
        blocks: [
          { t: 'p', text: 'The problem is not a shortage of food. In 2024, the U.S. produced far more surplus food than it gave away, while millions of people went without enough to eat.' },
          { t: 'stats', items: [['70M tons', 'of surplus food in the U.S. in 2024, about 29% of the food supply'], ['<2%', 'of that surplus was donated'], ['$26.9B', 'of surplus food from grocery retail alone'], ['48M', 'people faced food insecurity in 2024']] },
          { t: 'note', text: 'Sources: <a href="https://refed.org/uploads/2026-food-waste-report-design-final-1.pdf" target="_blank" rel="noopener">ReFED U.S. Food Waste Report 2026</a> and <a href="https://refed.org/uploads/by-sector-retail-1.pdf" target="_blank" rel="noopener">ReFED retail fact sheet</a> (2024 data); USDA figures via <a href="https://www.feedingamerica.org/about-us/press-room/Map-the-Meal-Gap-2026" target="_blank" rel="noopener">Feeding America, Map the Meal Gap 2026</a>.' },
          { t: 'p', text: 'So where are the tools that move that food? Each of us audited one product feature by feature against a shared list of capabilities. I took <b>Too Good To Go</b>, the surplus-food marketplace. My teammates covered HelloFresh, Plentiful, and Misfits Market.' },
          { t: 'list', items: [
            '<b>Built for the buyer.</b> Every product had polished browsing, filters, and allergen info for the person receiving food.',
            '<b>Thin on logistics.</b> Only Too Good To Go offered management tools for the businesses giving food, and none told the receiving side when food was on its way.',
            '<b>No one tracked condition.</b> Not one product showed how long perishable food had been out of refrigeration.',
          ] },
        ],
      },
      {
        id: 'interviews', step: 'Interview plan', title: 'Asking better questions.',
        blocks: [
          { t: 'p', text: 'We wrote a recruiting screener to find people who actually make operational decisions at food banks, then built two discussion guides: one for food bank managers and one for grocery store managers. I reached out to managers at Albertsons and WinCo and helped coordinate interview scheduling.' },
          { t: 'p', text: 'Our professor critiqued both guides question by question, and the revisions changed how I write interviews:' },
          { t: 'columns', items: [
            { h: 'Before', list: ['“What are your biggest anxieties when donating?”', 'One probe asking how food is checked, sorted, recorded, and stored', 'A long “imagine a year from now” scenario'] },
            { h: 'After', list: ['“What do you do when difficulties come up?”', 'Separate questions for checking, sorting, and recording', '“If you had a magic wand, what is the one thing you would change?”'] },
          ] },
          { t: 'quote', text: 'Scheduling interviews in advance, instead of approaching people on the spot, respects their time and leads to better conversations.', by: 'Key learning from my weekly status report' },
        ],
      },
      {
        id: 'findings', step: 'What we heard', title: '“Oh, the truck’s here.”',
        blocks: [
          { t: 'p', text: 'Our richest interview was with a local food pantry manager who orders from the regional food bank, drives store pickups himself, and unloads the trucks. A few details from that conversation shaped everything after it:' },
          { t: 'list', items: [
            '<b>Arrival is a guess.</b> The regional truck comes “usually around 10 or 11,” depending on traffic, and it interrupts whatever he is in the middle of.',
            '<b>Cold food gets turned away.</b> The van has no cooling, and he cannot accept perishables when nobody knows how long they have been out of the fridge.',
            '<b>Listings are vague.</b> Unclear descriptions once led to five pallets of popcorn and 19-pound tubs of sour cream.',
            '<b>Every store works differently.</b> One scans each can, another makes staff unbox items to scan them, another bags cans one by one.',
          ] },
          { t: 'personas', items: [
            { tag: 'Persona', name: 'Maya, food pantry coordinator', body: 'Runs a pantry that sees about 600 household visits a week with one other staff member and rotating volunteers. Donations arrive by email, drop boxes, and surprise calls from drivers, so she cannot plan cold storage or staff. Weighing, sorting, and logging eat the time she would rather spend growing the pantry.' },
            { tag: 'Anti-persona', name: 'Max, the solo shortcut', body: 'Picks up alone and skips the counts. Designing for Max reminded us that untracked handoffs are where food goes missing, so items are counted at both pickup and drop-off.' },
          ] },
        ],
      },
      {
        id: 'ideation', step: 'Ideation', title: 'From big idea to one concept.',
        blocks: [
          { t: 'p', text: 'We framed the opportunity as a Who / What / Wow: a food bank manager who can see deliveries in real time, alert the store before a driver arrives, and know food will show up in the same state it left.' },
          { t: 'figure', img: 'freshroute/big-idea', caption: 'Our “Big Idea: Safe Transport” board, written during a class work session.', medium: true },
          { t: 'p', text: 'Two need statements came out of the research. Food bank managers need a way to monitor deliveries so they can predict turnaround time and prepare. They also need simpler inventory, so they always know what is on hand, sorted by category and expiration date, before it spoils.' },
          { t: 'p', text: 'We sketched four concepts against those needs, then plotted them by user impact and feasibility.' },
          { t: 'figures', items: [
            { img: 'freshroute/impact', caption: 'First pass on the whiteboard: impact against feasibility.' },
            { img: 'freshroute/matrix', caption: 'The cleaned-up matrix. Notifications from FreshRoute scored highest on user impact while staying buildable.' },
          ] },
          { t: 'columns', items: [
            { h: 'Chosen', list: ['<b>Notifications from FreshRoute.</b> Live ETAs for the food bank and the store, so both sides prep before the truck pulls in.'] },
            { h: 'Kept for later', list: ['<b>Handy Footage.</b> Cargo video of the drive. Easy to build, but it only explains problems after they happen, while notifications prevent them.', '<b>Grocery Store Scanner.</b> Items logged at the store so they arrive already sorted. Feasible, with a smaller payoff.'] },
            { h: 'Cut', list: ['<b>Camera Detection.</b> Auto-sorting produce with a camera at the food bank. It scored low on both impact and feasibility.'] },
          ] },
          { t: 'figure', img: 'freshroute/storyboard', caption: 'Storyboard: a grocery store manager wonders where the truck is, gets a heads-up, and is ready when it arrives.' },
        ],
      },
      {
        id: 'studio', step: 'Design studio', title: 'Sketch, vote, repeat.',
        blocks: [
          { t: 'p', text: 'Each of us sketched screens for the driver and the food bank manager, then we covered the table in sticky-note critique and dot-voted on what to keep.' },
          { t: 'list', items: [
            '<b>Color creates urgency</b> was the top vote, so on time, slipping, and late each get their own color, glyph, and words.',
            '<b>Driver input should feed the system,</b> so each driver’s feedback updates the store’s pickup notes for the next person.',
            '<b>Multiple stops</b> per route came second.',
            '<b>Gamification was cut.</b> Streaks and leaderboards felt stressful and distracting for someone driving.',
          ] },
          { t: 'figure', img: 'freshroute/sketches', caption: 'Cleaned-up sketches of the driver dashboard, navigation, and the “what went wrong” screen.' },
        ],
      },
      {
        id: 'wireframes', step: 'Wireframes', title: 'Two workspaces, one promise.',
        blocks: [
          { t: 'p', text: 'The sketches became mid-fidelity wireframes with two separate flows. Drivers get an iPad app that finds pickups, routes them, and locks in an arrival time. Food bank managers get a desk view that shows only the outcome: who is coming, when, with what, and what happened on the way.' },
          { t: 'figure', img: 'freshroute/flows', caption: 'The driver flow (14 screens) and the food bank manager flow (6 screens), plus a text link for the store.' },
          { t: 'figures', items: [
            { img: 'freshroute/driver-dashboard', caption: 'Driver dashboard: every listing leads with weight, food type, and pickup window, the details that went missing in the popcorn story.' },
            { img: 'freshroute/driver-nav', caption: 'Driving view: directions in the middle, the ETA ring top right. Everything else stays out of the way while the van moves.' },
          ] },
          { t: 'figure', img: 'freshroute/manager-incoming', caption: 'Food bank view: every truck on its way, its ETA, what is on it, and how long the cold items have been out.' },
          { t: 'note', text: 'Wireframes are grayscale on purpose. This round tested structure and content, not visual style.' },
        ],
      },
      {
        id: 'next', step: 'Next steps', title: 'What we are testing now.',
        blocks: [
          { t: 'list', items: [
            '<b>Cognitive walkthrough.</b> Each of us takes one task with Maya. Mine is sorting a delivery by expiration date after it arrives, so the least food is wasted. For every step: is the action available, does she know it is the right one, and does she get feedback?',
            '<b>Usability testing</b> with a food bank manager, volunteers, and a grocery store manager.',
            '<b>Success measures:</b> less time waiting at the dock, deliveries prepped before the truck arrives, and less food spoiled during handoff.',
            '<b>Later:</b> item logging at the store, so donations arrive already sorted by category and expiration date.',
          ] },
          { t: 'quote', text: 'The best idea on our board was not the most impressive one. It was the one that answered the question everyone kept asking: when is the truck getting here?', by: 'What this project has taught me so far' },
        ],
      },
    ],
  },
];

export const inProgressExtra = {
  title: 'Reducing food waste',
  kicker: 'Grocery stores, kitchens & dining halls',
  note: 'Research phase. Case study coming soon.',
  year: '2026',
};

export const about = {
  intro:
    'I’m a UX designer studying for a BFA in UX Design at the University of North Texas, with an advertising minor. I specialize in accessible, visually driven experiences across web, mobile, and brand, and I’m happiest when research turns a messy, emotional problem into something that feels simple.',
  more: [
    'My background is in fine art, which is probably why I care as much about how something feels as how it works. I’ve designed for a campus gallery, a nonprofit marketing lab, and an international L’Oréal competition, and I keep coming back to the same question: what’s really stopping someone in this moment?',
    'I’m bilingual in English and Spanish, and I’m currently looking for UX and product design internships for summer 2027, plus part-time work during the school year.',
  ],
  experience: [
    { org: 'University of North Texas', role: 'Union Arts Associate', when: 'Jan 2026 – Present', points: ['Raised student event attendance 10% with targeted visual promotion for 5+ live campus events.', 'Improved the gallery experience for 100+ daily visitors by applying visual hierarchy to exhibition layouts.', 'Led hands-on design workshops that translate technical concepts into clear lessons.'] },
    { org: 'Kickstart Marketing Lab Foundation', role: 'UX Design Intern', when: 'Mar – Jun 2026', points: ['Led a full website redesign end to end while managing stakeholder communication.', 'Delivered design documentation and ran handoff meetings for the incoming team.', 'Restructured information architecture and visual design for a scalable final product.'] },
    { org: 'L’Oréal Brandstorm 2026', role: 'UX Designer & Coordinator', when: 'Jan – Mar 2026', points: ['Synthesized 75+ participant responses into product requirements and concept iterations.', 'Delivered a live concept pitch to L’Oréal industry judges.'] },
  ],
  roles: ['Adobe Student Ambassador'],
  education: { school: 'University of North Texas', degree: 'BFA, UX Design · Advertising minor', when: 'Expected May 2029' },
  honors: ['President’s List, 4.0 GPA (Spring 2026)', 'UNT Excellence Scholarship (2025)', 'Voertman-Ardoin Scholarship in Art (2026–27)'],
  toolbox: ['Figma', 'Framer', 'Miro / FigJam', 'Adobe Illustrator', 'Photoshop', 'InDesign', 'Blender', 'HTML / CSS'],
  certifications: ['IBM Enterprise Design Thinking Practitioner (2026)', 'UX Research at Scale: Surveys, Analytics, Online Testing (2026)', 'Figma: Designing with Variables and Conditionals (2026)', 'Adobe Illustrator (2024)'],
};

export const play = {
  intro:
    'Case studies are where I solve problems for people. This is where I play: posters, brand work, and small projects I build for the fun of it.',
  design: {
    title: 'Graphic design',
    text: 'Brand identity, posters, social and product graphics. These are projects I designed on my own, outside my UX case studies.',
    projects: [
      {
        title: 'Guppy Nailz',
        kind: 'Social · Print',
        text: 'Launch brand for a small nail business, built around the owners’ love for their cat Guppy and a cute scrapbook theme. Includes a three-slide Instagram carousel (restock, how to order, how to pick up) and a poster with tear-off QR tabs.',
        imgs: [
          ['play/guppy-ig-1', 'Instagram carousel 1 of 3: restock announcement'],
          ['play/guppy-ig-2', 'Instagram carousel 2 of 3: how to order'],
          ['play/guppy-ig-3', 'Instagram carousel 3 of 3: how to pick up, and payment methods'],
          ['play/guppy-poster', 'Poster: custom press-on nails based in Denton, TX, with tear-off QR tabs'],
        ],
      },
      {
        title: 'White Tiger',
        kind: 'Infographic · Poster',
        text: 'An infographic on the idolization of the exotic white tiger, made to draw a parallel in life while raising awareness. A two-page spread with a halftone portrait, plus the blackletter title treatment.',
        imgs: [
          ['play/tiger-spread', 'The White Tiger: two-page infographic spread'],
          ['play/tiger-title', 'The White Tiger: title treatment'],
        ],
      },
      {
        title: 'DaintyDeskCo',
        kind: 'Product marketing',
        text: 'Etsy listing images, feature graphics and a shop banner for a small shop that sells K-pop Notion planners.',
        imgs: [['play/daintydeskco', 'Kpop Life Planner listing images and shop banner']],
      },
      {
        title: 'Bloom & Root',
        kind: 'Logo · Brand identity',
        text: 'A solo logo project for an emerging plant-based café in Austin, Texas. The brief asked for something fresh and approachable, not clinical or preachy, so I paired a forest-green and warm-sand palette with Etna and Quicksand.',
        imgs: [['play/bloom-root', 'Bloom & Root logo, color palette, typography and brand vibe']],
      },
      {
        title: 'Heavy?',
        kind: 'Poster · Awareness',
        text: 'An awareness poster that points people to the 988 Suicide & Crisis Lifeline.',
        imgs: [['play/heavy-poster', 'Awareness poster with the 988 Suicide & Crisis Lifeline']],
      },
      {
        title: 'Froth',
        kind: 'Website design',
        text: 'A website redesign pitch for a local coffee shop, aimed at college students. Home, menu and Work with us pages.',
        imgs: [['play/froth-web', 'Froth home, community and menu pages']],
      },
    ],
  },
  quests: [
    {
      title: 'Trivia word game',
      status: 'In progress',
      body: 'A timed trivia word game inspired by Krillion’s Daily Dive. I’m designing it as a competitive party game and testing what makes a round feel fast and fair.',
    },
  ],
};
