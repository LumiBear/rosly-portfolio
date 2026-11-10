// All site copy lives here. Edit text in this file, then run `node build.mjs`.

export const person = {
  name: 'Rosly Tavarez',
  role: 'UX designer',
  email: 'roslytav@gmail.com',
  linkedin: 'https://www.linkedin.com/in/roslytavarez',
  location: 'Denton, Texas',
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
          { t: 'facts', items: [['Problem', 'Avoidance driven by anxiety and perfectionism, not poor planning'], ['Approach', 'Diagnose the emotional barrier first, then prescribe a specific intervention'], ['Outcome', '5 of 6 test participants said they would use it; SUS score of 82']] },
        ],
      },
      {
        id: 'research', step: 'Research', title: 'Reading the literature before talking to anyone.',
        blocks: [
          { t: 'p', text: 'I started with secondary research so I could walk into interviews with sharper questions. Three frameworks shaped everything after: Temporal Motivation Theory, Affect Regulation Theory, and Implementation Intentions. Read together, they describe procrastination as a short-term mood repair. Students put a task off because doing so makes them feel better right now.' },
          { t: 'stats', items: [['80–95%', 'of college students procrastinate'], ['~50%', 'do it chronically'], ['60%', 'of productivity apps are abandoned within 30 days']] },
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
          { t: 'figure', img: 'canvas/dashboard', caption: 'Focus Mode dashboard: today’s micro-steps sit beside active assignments, with one clear way to start.' },
          { t: 'figures', items: [
            { img: 'canvas/focus-plan', caption: 'Creating a focus plan: the student picks a task, names how they feel, and gets a first step sized to that feeling.' },
            { img: 'canvas/walkthrough', caption: 'Design walkthrough: Canvas integration, the “how are you feeling?” check-in, and actionable micro-steps.' },
          ] },
          { t: 'figure', img: 'canvas/screens', caption: 'The full flow, from the morning dashboard through a timed focus session and the writing view.' },
        ],
      },
      {
        id: 'testing', step: 'Testing', title: 'Six students, one big copy change.',
        blocks: [
          { t: 'p', text: 'Before testing, I ran a heuristic evaluation focused on visibility of system status and user control. The biggest risk was that the tool would feel naggy or controlling. Then I put the clickable prototype in front of six college students.' },
          { t: 'stats', items: [['5 / 6', 'said they would use it'], ['82', 'System Usability Scale score'], ['2', 'favorite features: first actions & progress tracking']] },
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

  /* ───────────────────────── FROTH ───────────────────────── */
  {
    slug: 'froth',
    title: 'Froth',
    kicker: 'Website redesign for a campus café',
    summary:
      'A three-day redesign of Froth Coffee & Dessert Bar’s website, built from an in-person site visit and a staff interview, that swaps walls of text for a warm, visual, community-first experience.',
    year: '2026',
    kind: 'Web design',
    tags: ['Field research', 'Visual design', 'Web UI'],
    role: 'UX/UI designer',
    timeline: '3 days · March 2026',
    team: 'Solo, academic project',
    tools: 'Figma, Photoshop',
    cover: 'froth/cover',
    file: { pdf: 'RoslyTavarez_Froth_Redesign.pdf', pages: 3, label: 'Froth redesign, full presentation (PDF)' },
    sections: [
      {
        id: 'overview', step: 'Overview', title: 'Three days, three pages, one café.',
        blocks: [
          { t: 'lead', text: 'The brief: redesign a local business’s landing page plus two subpages in three days. I chose Froth Coffee & Dessert Bar, a popular café near the University of North Texas, because its space felt modern and lively while its website felt like neither.' },
          { t: 'facts', items: [['Timeline', '3 days'], ['Role', 'UX/UI designer'], ['Deliverables', 'Landing page, menu page, Work With Us page']] },
        ],
      },
      {
        id: 'visit', step: 'Site visit', title: 'I started by sitting in the café.',
        blocks: [
          { t: 'p', text: 'Before opening Figma, I spent time at Froth watching who came in and how they used the space. Most visitors were UNT students on their own or on study dates. Even the groups were studying. The room was quiet apart from pop music in the background.' },
          { t: 'p', text: 'The interior was modern and geometric, with a white base, orange accents, and touches of gold. The orange stood out immediately as the brand’s signature. I turned these notes into an attribute map that guided every visual decision afterward.' },
          { t: 'figure', img: 'froth/logo', caption: 'Froth’s existing logo. Orange is the brand’s strongest asset.', narrow: true },
        ],
      },
      {
        id: 'interview', step: 'Stakeholder interview', title: 'Cozy, warm, studious.',
        blocks: [
          { t: 'p', text: 'I interviewed a Froth employee with a short set of questions: who comes in, who the ideal customer is, how strong their social presence is, what keeps people coming back, what makes the coffee special, and how the place makes them feel. I closed by asking them to describe Froth in three words.' },
          { t: 'quote', text: 'Cozy, warm, studious.', by: 'Froth employee, describing the café in three words' },
          { t: 'p', text: 'Those three words captured the café’s double life as a comfortable hangout and a productive study spot. The interview also surfaced how much Froth invests in fundraisers and local events, a differentiator the old website barely mentioned.' },
        ],
      },
      {
        id: 'audit', step: 'Site audit', title: 'A designer’s worst fear: a wall of text.',
        blocks: [
          { t: 'figure', img: 'froth/old-site', caption: 'The original homepage: roughly six paragraphs of copy and a single photo of the café.' },
          { t: 'list', items: [
            'About six dense paragraphs on the homepage alone',
            'One café photo across the entire site',
            'Only three pages: home, fundraising, and contact',
            'No menu and no visual showcase of the drinks or desserts',
          ] },
          { t: 'p', text: 'With room for one landing page and two subpages, I prioritized the menu, since food and drink are the heart of a café, and a Work With Us page to give Froth’s community programs the visibility they deserved.' },
        ],
      },
      {
        id: 'direction', step: 'Mood & direction', title: 'A mood board, and an anti-mood board.',
        blocks: [
          { t: 'p', text: 'I built two boards: one for where the site should go and one for what to avoid. The target was modern, fresh, and a little trendy, made for college students, without tipping into corporate or dated. That meant dynamic layouts, soft glass details, rounded corners, and much less text.' },
          { t: 'figure', img: 'froth/moodboard', caption: 'Direction board: palette, product photography, and early layout studies side by side.' },
          { t: 'figures', items: [
            { img: 'froth/drink-1', caption: 'Product photography became the main storytelling tool.' },
            { img: 'froth/drink-2', caption: 'Every drink shot keeps the branded cup in frame.' },
            { img: 'froth/drink-3', caption: 'Color-rich drinks add range beyond coffee browns.' },
          ] },
        ],
      },
      {
        id: 'palette', step: 'Palette & type', title: 'Keeping the orange, adding depth.',
        blocks: [
          { t: 'p', text: 'White and orange were iconic, but on their own they couldn’t carry a content-rich site. I kept the signature orange and built around it with warm earth tones, a rich accent for hierarchy, neutrals for breathing room, and the gold already present in the café.' },
          { t: 'figure', img: 'froth/palette', caption: 'Expanded palette: deep ink, signature orange, caramel, cream, and a cool neutral.' },
          { t: 'figures', items: [
            { img: 'froth/type-study', caption: 'Type study: a classic serif with an italic accent for the brand name.' },
            { img: 'froth/icons', caption: 'Custom line icons drawn in the brand orange for the Work With Us pathways.' },
          ] },
        ],
      },
      {
        id: 'final', step: 'Final design', title: 'More than just a café.',
        blocks: [
          { t: 'figure', img: 'froth/home', caption: 'Landing page: hero product photography, the line “more than just a café,” and quick cards for location, hours, and quality.' },
          { t: 'p', text: 'The landing page leads with photography and a short brand statement, “Every sip tells a story,” then answers practical questions fast: where it is, when it’s open, and what makes it good.' },
          { t: 'figures', items: [
            { img: 'froth/menu', caption: 'Menu: a signatures carousel with a “Fan Fav” badge, clear categories, and an order-on-the-app call to action.' },
            { img: 'froth/work-with-us', caption: 'Work With Us: three pathways (freelance, join the team, partner & sponsor) and a fundraisers section.' },
          ] },
          { t: 'p', text: 'Work With Us turns community into a feature. “Grow with Froth” introduces three clear pathways, and a dedicated fundraisers section with small, concrete incentives like “1 cappuccino = $4 earned” makes the café’s local impact easy to see.' },
          { t: 'file', pdf: 'RoslyTavarez_Froth_Redesign.pdf', pages: 3, title: 'Full redesign presentation', note: '3 pages · PDF' },
        ],
      },
      {
        id: 'reflection', step: 'Reflection', title: 'Context matters.',
        blocks: [
          { t: 'p', text: 'Sitting in the café revealed a quiet, studious atmosphere I would never have guessed from the website, and it pushed the design toward a calmer, more focused direction. With only three days, I chose in-person observation and an interview over a broad competitive analysis, and that trade-off paid off.' },
          { t: 'p', text: 'With more time, I would test the pages with UNT students, build an interactive prototype to show the micro-interactions, add About and Events pages, and turn the components into a small design system.' },
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
      'A personalized perfume kit that turns invasive plant species into custom scent, developed with Team Cree for L’Oréal Brandstorm 2026 and pitched live to L’Oréal judges.',
    year: '2026',
    kind: 'Service & product concept',
    tags: ['Survey research', 'Concept development', 'Pitch'],
    role: 'UX designer & coordinator',
    timeline: 'Jan – Mar 2026',
    team: 'Team Cree (L’Oréal Brandstorm)',
    tools: 'Google Forms, Blender, Canva',
    cover: 'reverdi/cover',
    file: { pdf: 'TeamCree_ReVerdi_Brandstorm2026.pdf', pages: 3, label: 'ReVerdi pitch deck (PDF)' },
    sections: [
      {
        id: 'overview', step: 'Overview', title: 'Craft the future of luxury fragrance.',
        blocks: [
          { t: 'lead', text: 'L’Oréal Brandstorm is an international innovation competition for students. The 2026 mission, set with L’Oréal Luxe, asked teams to invent new fragrance products and experiences powered by creativity, technology, and bespoke service.' },
          { t: 'p', text: 'As UX designer and coordinator for Team Cree, I organized our research, turned survey results into product requirements, and shaped the concept into a pitch we delivered live to L’Oréal industry judges, placing competitively against university teams nationwide.' },
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
          { t: 'file', pdf: 'TeamCree_ReVerdi_Brandstorm2026.pdf', pages: 3, title: 'ReVerdi pitch deck', note: '3 slides · PDF · Team Cree' },
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
            { img: 'choretap/landing', caption: 'Welcome: “Chores, minus the group-chat drama.” A live feed preview shows the idea in one glance.' },
            { img: 'choretap/signup', caption: 'Sign-up keeps it short and tells people upfront that housemates will see their first name.' },
          ] },
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
  roles: ['Adobe Student Ambassador', 'Student Assistant, UNT Dining Services'],
  education: { school: 'University of North Texas', degree: 'BFA, UX Design · Advertising minor', when: 'Expected May 2029' },
  honors: ['President’s List, 4.0 GPA (Spring 2026)', 'UNT Excellence Scholarship (2025)', 'Voertman-Ardoin Scholarship in Art (2026–27)'],
  toolbox: ['Figma', 'Framer', 'Miro / FigJam', 'Adobe Illustrator', 'Photoshop', 'InDesign', 'Blender', 'HTML / CSS'],
  certifications: ['IBM Enterprise Design Thinking Practitioner (2026)', 'UX Research at Scale: Surveys, Analytics, Online Testing (2026)', 'Figma: Designing with Variables and Conditionals (2026)', 'Adobe Illustrator (2024)'],
};
