// --- Utilities ---
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

// Parse YYYY-MM-DD -> {year, monthName}
function parseDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  const year = d.getFullYear().toString();
  const monthName = d.toLocaleString('en-US', { month: 'long' });
  return { year, monthName };
}

// Group events by year, newest first
function groupByYear(events) {
  const groups = {};
  events.forEach(ev => {
    const { year } = parseDate(ev.date);
    (groups[year] ||= []).push(ev);
  });
  // Sort years desc, and events desc by date
  const orderedYears = Object.keys(groups).sort((a,b) => b.localeCompare(a));
  orderedYears.forEach(y => groups[y].sort((a,b) => b.date.localeCompare(a.date)));
  return { groups, orderedYears };
}

// Render chips
function renderChips(years) {
  const wrap = $('#tl-filter');
  wrap.innerHTML = '';
  const btnAll = document.createElement('button');
  btnAll.className = 'chip active';
  btnAll.dataset.year = 'all';
  btnAll.textContent = 'All';
  wrap.appendChild(btnAll);

  years.forEach(y => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.dataset.year = y;
    btn.textContent = y;
    wrap.appendChild(btn);
  });
}

// Render timeline
function renderTimeline(groups, years) {
  const root = $('#timeline-root');
  root.innerHTML = '';

  years.forEach(y => {
    const sec = document.createElement('section');
    sec.className = 'year-group';
    sec.dataset.year = y;

    const h2 = document.createElement('h2');
    h2.className = 'year';
    h2.textContent = y;
    sec.appendChild(h2);

    groups[y].forEach(ev => {
      const { monthName } = parseDate(ev.date);
      const item = document.createElement('article');
      item.className = 'tl-item reveal';
      item.innerHTML = `
        <div class="dot"></div>
        <div class="card glass">
          <h3>${ev.title}</h3>
          <time>${monthName} ${new Date(ev.date).getFullYear()}</time>
          <p>${ev.summary}</p>
          <div class="tags">${(ev.tags||[]).map(t=>`<span>${t}</span>`).join('')}</div>
        </div>`;
      sec.appendChild(item);
    });

    root.appendChild(sec);
  });

  // Trigger first reveal check
  onScrollReveal();
}

// Chip filtering
function setupFilter() {
  const chips = $$('.chip');
  const groups = $$('.year-group');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const yr = chip.dataset.year;
      groups.forEach(g => g.style.display = (yr === 'all' || g.dataset.year === yr) ? '' : 'none');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// Scroll reveal
function onScrollReveal() {
  const els = $$('.reveal');
  const h = window.innerHeight || document.documentElement.clientHeight;
  els.forEach(el => {
    if (el.getBoundingClientRect().top < h - 80) el.classList.add('active');
  });
}
window.addEventListener('scroll', onScrollReveal);

// Load data (try JSON file, else fallback <script> tag)
async function loadData() {
  try {
    const res = await fetch('./data/timeline.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Fetch failed');
    return await res.json();
  } catch (e) {
    const raw = $('#timeline-fallback')?.textContent || '[]';
    return JSON.parse(raw);
  }
}

// Boot
(async function initTimeline(){
  const data = await loadData();
  // Validate & sanitize minimal fields
  const events = data
    .filter(e => e && e.title && e.date)
    .map(e => ({ ...e, tags: Array.isArray(e.tags) ? e.tags : [] }));

  // Sort newest first globally (before grouping)
  events.sort((a,b)=> b.date.localeCompare(a.date));

  const { groups, orderedYears } = groupByYear(events);
  renderChips(orderedYears);
  renderTimeline(groups, orderedYears);
  setupFilter();
})();