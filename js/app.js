/* Neat and Clean Laundry — page behaviour. Content lives in data.js. */

const $ = id => document.getElementById(id);
const $$ = selector => document.querySelectorAll(selector);

/* ============ STATE ============ */
const cart = {};
const customItems = []; // names typed in by the customer
const addons = new Set();
let activeTab = Object.keys(CATS)[0];

function summary() {
  const lines = Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([name, qty]) => `${qty} × ${name}`);
  const items = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  return { lines, items, add: [...addons] };
}

function changeQty(name, delta) {
  cart[name] = Math.max(0, (cart[name] || 0) + delta);
  if (cart[name] === 0 && customItems.includes(name)) {
    customItems.splice(customItems.indexOf(name), 1);
    delete cart[name];
    renderCustomItems();
  }
  refresh(name);
}

/* ============ ESTIMATOR / QUOTE LIST ============ */
function refresh(popName) {
  const { lines, items, add } = summary();

  $('qItems').textContent = items;
  $('qList').textContent = lines.length ? lines.join(', ') : 'Nothing added yet';
  $('qAdd').textContent = add.length ? add.join(', ') : 'None';
  $('heroTotal').textContent = items;
  $('bagCount').textContent = items;
  $('bagFill').style.height = Math.min(100, 4 + items * 5) + '%';

  $$('[data-q]').forEach(el => {
    el.textContent = cart[el.dataset.q] || 0;
    if (el.dataset.q === popName) {
      el.classList.remove('pop');
      void el.offsetWidth; // restart the animation
      el.classList.add('pop');
    }
  });
}

// Escape user-typed text before it goes into innerHTML / attributes
const escapeHTML = str => str.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function stepperHTML(rawName, compact) {
  const name = escapeHTML(rawName);
  const wrapperClass = compact ? '' : 'bg-white rounded-2xl p-4 shadow card';
  return `<div class="flex items-center justify-between ${wrapperClass}">
    <div><div class="font-bold">${name}</div></div>
    <div class="flex items-center gap-2">
      <button class="w-8 h-8 rounded-full bg-foam font-black hover:bg-coral hover:text-white transition" data-d="-1" data-n="${name}" aria-label="Remove ${name}">−</button>
      <b class="w-6 text-center" data-q="${name}">${cart[name] || 0}</b>
      <button class="w-8 h-8 rounded-full bg-mint font-black hover:scale-110 transition" data-d="1" data-n="${name}" aria-label="Add ${name}">+</button>
    </div></div>`;
}

function renderCustomItems() {
  $('customItems').innerHTML = customItems.map(name => stepperHTML(name, false)).join('');
}

function initCustomItems() {
  $('customForm').addEventListener('submit', e => {
    e.preventDefault();
    const input = $('customName');
    const name = input.value.trim().replace(/s+/g, ' ');
    if (!name) return;
    const existing = [...Object.keys(cart), ...Object.values(CATS).flatMap(c => c.items)]
      .find(n => n.toLowerCase() === name.toLowerCase());
    if (existing) {
      changeQty(existing, 1); // already listed or already added: just add one
    } else {
      customItems.push(name);
      renderCustomItems();
      changeQty(name, 1);
    }
    input.value = '';
  });
}

function renderTabs() {
  $('tabs').innerHTML = Object.keys(CATS).map(cat =>
    `<button role="tab" class="tab rounded-full border-2 border-teal/30 px-5 py-2 font-bold text-sm" aria-selected="${cat === activeTab}" data-tab="${cat}">${CATS[cat].icon} ${cat}</button>`
  ).join('');
  $('items').innerHTML = CATS[activeTab].items.map(name => stepperHTML(name, false)).join('');
  refresh();
}

function initEstimator() {
  $('heroSteppers').innerHTML = HERO_ITEMS.map(name => stepperHTML(name, true)).join('');

  $('addons').innerHTML = ADDONS.map(a =>
    `<button class="chip rounded-full border border-white/30 text-xs font-semibold px-3 py-1.5" aria-pressed="false" data-a="${a}">${a}</button>`
  ).join('');

  $('tabs').addEventListener('click', e => {
    const btn = e.target.closest('[data-tab]');
    if (!btn) return;
    activeTab = btn.dataset.tab;
    renderTabs();
  });

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-d]');
    if (btn) changeQty(btn.dataset.n, +btn.dataset.d);
  });

  $('addons').addEventListener('click', e => {
    const btn = e.target.closest('[data-a]');
    if (!btn) return;
    const on = !addons.has(btn.dataset.a);
    if (on) addons.add(btn.dataset.a);
    else addons.delete(btn.dataset.a);
    btn.setAttribute('aria-pressed', on);
    refresh();
  });

  renderTabs();
  initCustomItems();
}

/* ============ STATIC CARD SECTIONS ============ */
function renderCards() {
  $('spec').innerHTML = SPEC.map(([icon, title, text]) => `<div class="card reveal bg-white rounded-3xl p-6 shadow group overflow-hidden relative">
    <div class="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-mint/40 group-hover:scale-[3] transition duration-500"></div>
    <div class="relative"><div class="text-4xl mb-3 group-hover:rotate-12 transition inline-block">${icon}</div>
    <h3 class="font-extrabold text-lg">${title}</h3><p class="text-ink/65 text-sm mt-1">${text}</p></div></div>`
  ).join('');

  $('b2b').innerHTML = B2B.map(([icon, title, text]) => `<div class="card reveal rounded-3xl bg-white/10 border border-white/15 p-6 hover:bg-white/15">
    <div class="text-4xl mb-3">${icon}</div><h3 class="font-extrabold text-lg text-mint">${title}</h3><p class="text-white/70 text-sm mt-1">${text}</p></div>`
  ).join('');

  $('promise').innerHTML = PROMISES.map(([icon, label]) =>
    `<div class="card bg-white rounded-2xl shadow p-4 text-center font-bold text-sm"><div class="text-3xl mb-1">${icon}</div>${label}</div>`
  ).join('');

  $('stats').innerHTML = STATS.map(([count, suffix, label]) => `<div class="rounded-2xl bg-ink text-white p-4">
    <div class="text-4xl font-black text-mint"><span data-count="${count}">0</span>${suffix}</div>
    <div class="text-xs mt-1 text-white/70">${label}</div></div>`
  ).join('');

  $('reviews').innerHTML = REVIEWS.map(r => `<div class="card bg-white rounded-3xl shadow p-6">
    <div class="text-coral text-lg">★★★★★</div><p class="text-ink/70 text-sm my-3">“${r.t}”</p><b class="text-sm">${r.n}</b></div>`
  ).join('');
}

/* ============ FAQ ACCORDION ============ */
function initFaq() {
  $('faqList').innerHTML = FAQ.map(([question, answer], i) => `<div class="reveal rounded-2xl border-2 border-teal/15 overflow-hidden ${i === 0 ? 'bg-foam' : ''}">
    <button class="w-full text-left font-bold px-5 py-4 flex justify-between gap-3" data-faq="${i}" aria-expanded="false">${question}<span class="text-teal text-xl">＋</span></button>
    <div class="faq-body px-5 text-ink/70" id="fb${i}"><p class="pb-4">${answer}</p></div></div>`
  ).join('');

  $('faqList').addEventListener('click', e => {
    const btn = e.target.closest('[data-faq]');
    if (!btn) return;
    const body = $('fb' + btn.dataset.faq);
    const wasOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !wasOpen);
    body.style.maxHeight = wasOpen ? 0 : body.scrollHeight + 'px';
    btn.lastChild.textContent = wasOpen ? '＋' : '－';
  });

  // The bulk-delivery answer is open by default
  $('faqList').querySelector('[data-faq="0"]').click();
}

/* ============ WORKFLOW TRACKER ============ */
function initTracker() {
  const lastStep = STEPS.length - 1;
  let current = 0;
  let timer = null;

  function setStep(i) {
    current = i;
    $$('.step-node').forEach((node, k) => {
      node.classList.toggle('on', k <= i);
      node.classList.toggle('cur', k === i);
    });
    $('bar').style.width = `calc((100% - 3rem) * ${i / lastStep})`;
    $('stepPanel').innerHTML = `<div class="text-sm font-bold text-mint">Step ${i + 1} of ${STEPS.length}</div>
      <h3 class="text-2xl sm:text-3xl font-black mt-1">${STEPS[i][0]} ${STEPS[i][1]}</h3>
      <p class="mt-2 text-white/90 max-w-xl">${STEPS[i][2]}</p>`;
  }

  function stopPlayback() {
    clearInterval(timer);
    timer = null;
    $('play').textContent = '▶ Play process';
  }

  $('nodes').innerHTML = STEPS.map(([icon, title], i) =>
    `<button class="step-node w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-4 border-teal/40 text-xl sm:text-2xl grid place-items-center" data-s="${i}" aria-label="${title}">${icon}</button>`
  ).join('');

  $('nodes').addEventListener('click', e => {
    const btn = e.target.closest('[data-s]');
    if (!btn) return;
    stopPlayback();
    setStep(+btn.dataset.s);
  });

  $('play').addEventListener('click', () => {
    if (timer) return stopPlayback();
    $('play').textContent = '❚❚ Pause';
    setStep(0);
    timer = setInterval(() => {
      if (current < lastStep) setStep(current + 1);
      else stopPlayback();
    }, 2200);
  });

  setStep(0);
}

/* ============ BOOKING FORM (front-end only, sends via WhatsApp) ============ */
function initBookingForm() {
  $('fGo').addEventListener('click', () => {
    const name = $('fName').value.trim();
    const phone = $('fPhone').value.trim();
    const address = $('fAddr').value.trim();
    const msg = $('fMsg');
    const { lines, add } = summary();

    if (!name || !phone || !address) {
      msg.className = 'text-sm font-semibold text-coral';
      msg.textContent = 'Please fill in name, phone and address.';
      return;
    }

    const text = [
      'Hello Neat and Clean Laundry, I would like to book a pickup.',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Address: ${address}`,
      `Pickup: ${$('fDate').value || 'date to be confirmed'} (${$('fSlot').value})`,
      lines.length ? `Items: ${lines.join(', ')}` : 'Items: (to be discussed)',
      add.length ? `Treatments: ${add.join(', ')}` : ''
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    msg.className = 'text-sm font-semibold text-teal';
    msg.textContent = 'Opening WhatsApp with your request…';
  });
}

/* ============ BEFORE / AFTER SLIDER ============ */
const imgHTML = url => `<img src="${url}" alt="" loading="lazy" draggable="false" class="w-full h-full object-cover">`;

function initBeforeAfter() {
  let index = 0;

  function render() {
    const photo = PHOTOS.ba[index];
    $('baBefore').innerHTML = photo.before
      ? imgHTML(photo.before)
      : `<div class="relative w-full h-full" style="background:${photo.b}"></div>`;
    $('baAfter').innerHTML = photo.after
      ? imgHTML(photo.after)
      : `<div class="relative w-full h-full" style="background:${photo.a}"><i class="absolute inset-0" style="background:linear-gradient(120deg,#fff0,#fff8,#fff0)"></i></div>`;
    $('baTabs').innerHTML = PHOTOS.ba.map((b, i) =>
      `<button class="tab rounded-full border-2 border-teal/30 px-5 py-2 font-bold text-sm" aria-selected="${i === index}" data-ba="${i}">${b.label}</button>`
    ).join('');
  }

  $('baTabs').addEventListener('click', e => {
    const btn = e.target.closest('[data-ba]');
    if (!btn) return;
    index = +btn.dataset.ba;
    render();
  });

  $('baR').addEventListener('input', e => $('ba').style.setProperty('--p', e.target.value + '%'));
  render();
}

function renderGallery() {
  $('gallery').innerHTML = PHOTOS.gallery.map(g => `<figure class="card reveal in relative aspect-[4/3] rounded-3xl overflow-hidden shadow">
    ${g.src ? imgHTML(g.src) : `<div class="w-full h-full grid place-items-center text-7xl bg-gradient-to-br from-teal to-sky">${g.icon}</div>`}
    <figcaption class="absolute bottom-0 inset-x-0 bg-ink/75 text-white text-sm font-semibold px-4 py-2">${g.cap}</figcaption></figure>`
  ).join('');
}

/* ============ SCROLL EFFECTS ============ */
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in');
    observer.unobserve(entry.target);
  }), { threshold: .12 });

  $$('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 90 + 'ms';
    observer.observe(el);
  });
}

function initCounters() {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    observer.unobserve(entry.target);

    const el = entry.target;
    const end = +el.dataset.count;
    let n = 0;
    const timer = setInterval(() => {
      el.textContent = ++n;
      if (n >= end) clearInterval(timer);
    }, Math.max(30, 1200 / end));
  }), { threshold: .5 });

  $$('[data-count]').forEach(el => observer.observe(el));
}

function renderBubbles() {
  $('bubbles').innerHTML = Array.from({ length: 14 }, () => {
    const size = 8 + Math.random() * 26;
    return `<span class="bubble" style="left:${Math.random() * 100}%;width:${size}px;height:${size}px;animation-delay:${Math.random() * 6}s;animation-duration:${5 + Math.random() * 6}s"></span>`;
  }).join('');
}

/* ============ SEASONAL BANNER + LANGUAGE TOGGLE ============ */
function currentSeason() {
  const month = new Date().getMonth();
  if (month >= 8 && month <= 10) return SEASONS.festive;
  if (month >= 11 || month <= 1) return SEASONS.winter;
  if (month >= 2 && month <= 4) return SEASONS.wedding;
  return SEASONS.monsoon;
}

function initLanguage() {
  const season = currentSeason();
  let lang = 'en';
  try { lang = localStorage.getItem('lang') || 'en'; } catch (e) { /* storage unavailable */ }

  function setLang(l) {
    lang = l;
    document.documentElement.lang = l;
    $$('[data-i]').forEach(el => {
      if (el._en === undefined) el._en = el.innerHTML; // remember the English markup
      el.innerHTML = l === 'ne' ? NE[el.dataset.i] : el._en;
    });
    $('season').textContent = season[l === 'ne' ? 1 : 0];
    $('lang').textContent = l === 'ne' ? 'English' : 'नेपाली';
    try { localStorage.setItem('lang', l); } catch (e) { /* storage unavailable */ }
  }

  $('lang').addEventListener('click', () => setLang(lang === 'ne' ? 'en' : 'ne'));
  setLang(lang);
}

/* ============ MOBILE MENU ============ */
function initMobileMenu() {
  const btn = $('menuBtn');
  const menu = $('mobileMenu');

  function setOpen(open) {
    menu.classList.toggle('hidden', !open);
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? '✕' : '☰';
  }

  btn.addEventListener('click', () => setOpen(menu.classList.contains('hidden')));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
}

/* ============ INIT ============ */
initMobileMenu();
initEstimator();
renderCards();
initFaq();
initTracker();
initBookingForm();
initBeforeAfter();
renderGallery();
initScrollReveal();
initCounters();
renderBubbles();
initLanguage();
