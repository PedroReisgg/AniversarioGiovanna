/* Feliz aniversário, Giovanna ♥ — feito por Pedro */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover:hover)').matches;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  /* ---------- Girassol (SVG gerado) ---------- */
  function sunflowerSVG(size) {
    let petals = '';
    for (let i = 0; i < 22; i++) {
      const a = (360 / 22) * i;
      petals += `<ellipse cx="0" cy="-58" rx="13" ry="38" transform="rotate(${a})" fill="${i % 2 ? '#ffc928' : '#ffb703'}"/>`;
    }
    for (let i = 0; i < 22; i++) {
      const a = (360 / 22) * i + 8;
      petals += `<ellipse cx="0" cy="-48" rx="10" ry="30" transform="rotate(${a})" fill="#ffd95a"/>`;
    }
    let seeds = '';
    for (let i = 0; i < 70; i++) {
      const r = 3.2 * Math.sqrt(i), t = i * 2.39996;
      seeds += `<circle cx="${(r * Math.cos(t) * 2.4).toFixed(1)}" cy="${(r * Math.sin(t) * 2.4).toFixed(1)}" r="2.2" fill="#3b2306"/>`;
    }
    return `<svg width="${size}" height="${size}" viewBox="-100 -100 200 200">${petals}<circle r="34" fill="#6b3f0c"/><circle r="30" fill="#7c4a12"/>${seeds}</svg>`;
  }
  const sunLayer = $('#sunflowers');
  const sunSpots = [
    [-8, 6, 150], [78, 2, 120], [62, 30, 90], [-12, 46, 110], [80, 58, 160],
    [20, 74, 80], [-6, 88, 130], [70, 90, 100], [40, 18, 60]
  ];
  sunSpots.forEach(([x, y, s]) => {
    sunLayer.insertAdjacentHTML('beforeend', sunflowerSVG(s));
    const el = sunLayer.lastElementChild;
    el.style.left = x + '%'; el.style.top = y + '%';
    el.style.opacity = 0.35 + Math.random() * 0.35;
  });

  /* ---------- Split de palavras ---------- */
  $$('.split > span, .split > em').forEach(line => {
    line.innerHTML = line.textContent.trim().split(/\s+/).map(w => `<span class="w"><i>${w}</i></span>`).join(' ');
  });
  const introWord = $('.intro-word');
  introWord.innerHTML = [...introWord.textContent].map(c => `<span class="ch">${c}</span>`).join('');
  const statement = $('.big-statement');
  statement.innerHTML = statement.innerHTML.replace(/<em>(.*?)<\/em>/, '§$1§').split(/\s+/)
    .map(w => w.includes('§') ? `<span class="w"><em>${w.replace(/§/g, '')}</em></span>` : `<span class="w">${w}</span>`).join(' ');

  /* ---------- Coraçõezinhos ao tocar ---------- */
  function heartBurst(x, y, n = 1, spread = 60) {
    for (let i = 0; i < n; i++) {
      const h = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      h.setAttribute('class', 'tap-heart');
      h.innerHTML = '<use href="#heart"/>';
      document.body.appendChild(h);
      const s = 0.6 + Math.random() * 0.9;
      gsap.set(h, { x: x - 11, y: y - 11, scale: 0 });
      gsap.to(h, {
        x: x - 11 + (Math.random() - 0.5) * spread * 2,
        y: y - 11 - (40 + Math.random() * spread * 1.6),
        rotation: (Math.random() - 0.5) * 60, scale: s, opacity: 0,
        duration: 1 + Math.random() * 0.6, ease: 'power2.out', onComplete: () => h.remove()
      });
    }
  }
  document.addEventListener('pointerdown', e => {
    if (e.target.closest('#story, #intro, button')) return;
    heartBurst(e.clientX, e.clientY, 3, 30);
  });

  /* ---------- 0. Intro preta ---------- */
  const intro = $('#intro');
  let opened = false;
  gsap.set('.gift-inner > *:not(.gift-blob)', { opacity: 0, y: 30 });
  gsap.set('.gift-hearts .fh', { scale: 0 });

  const introTl = gsap.timeline({ delay: 0.4 });
  introTl
    .to('.intro-word .ch', { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', startAt: { y: 40, filter: 'blur(8px)' }, filter: 'blur(0px)' })
    .to('.intro-heart', { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(3)', startAt: { scale: 0 } }, '-=0.3')
    .to('.intro-heart', { scale: 1.25, duration: 0.18, yoyo: true, repeat: 3, ease: 'power1.inOut' })
    .to('.intro-hint', { opacity: 1, duration: 0.6 }, '-=0.4')
    .add(() => openIntro(), '+=0.9');
  intro.addEventListener('click', () => { if (introTl.progress() > 0.35) openIntro(); });

  function openIntro() {
    if (opened) return; opened = true;
    introTl.kill();
    const tl = gsap.timeline({ onComplete: () => intro.remove() });
    tl.to('.intro-hint', { opacity: 0, duration: 0.2 })
      .to('.intro-name', { scale: 1.12, opacity: 0, filter: 'blur(6px)', duration: 0.7, ease: 'power2.in' }, 0)
      .to('.door-l', { xPercent: -100, duration: 1.4, ease: 'expo.inOut' }, 0.45)
      .to('.door-r', { xPercent: 100, duration: 1.4, ease: 'expo.inOut' }, 0.45)
      .add(giftIn, 0.95);
    document.querySelector('meta[name=theme-color]').content = '#ffffff';
  }

  function giftIn() {
    const tl = gsap.timeline();
    tl.from('.gift-blob', { scale: 0.4, opacity: 0, duration: 1.4, ease: 'expo.out' })
      .to('.cake-badge', { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(2.5)', startAt: { scale: 0.3 }, scale: 1 }, 0.1)
      .to('.gift-date', { opacity: 1, y: 0, duration: 0.6 }, 0.35)
      .to('.gift-title', { opacity: 1, y: 0, duration: 0.01 }, 0.4)
      .from('.gift-title .line', { yPercent: 60, opacity: 0, rotateX: -40, duration: 1, stagger: 0.14, ease: 'power3.out' }, 0.4)
      .to('.gift-text, .gift-quote', { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }, 0.9)
      .to('#openGift', { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(2)', onComplete: () => $('#openGift').classList.add('pulse') }, 1.3)
      .to('.gift-inner .micro', { opacity: 1, y: 0, duration: 0.6 }, 1.5)
      .to('.gift-hearts .fh', { scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(3)' }, 0.6);
    $$('.gift-hearts .fh').forEach((h, i) => gsap.to(h, { y: -14 - i * 3, rotation: i % 2 ? 8 : -8, duration: 2 + i * 0.3, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.2 }));
  }

  /* ---------- 1. Abrir presente ---------- */
  $('#openGift').addEventListener('click', e => {
    const b = e.currentTarget, r = b.getBoundingClientRect();
    b.classList.remove('pulse');
    heartBurst(r.left + r.width / 2, r.top + r.height / 2, 26, 140);
    const main = $('#main');
    main.style.visibility = 'visible';
    document.body.classList.remove('locked');
    window.scrollTo(0, 0);
    const cy = ((r.top + r.height / 2) / innerHeight * 100).toFixed(1);
    gsap.timeline()
      .to(b, { scale: 0.9, duration: 0.12, yoyo: true, repeat: 1 })
      .to('.gift-inner', { scale: 0.92, opacity: 0, duration: 0.6, ease: 'power2.in' }, 0.15)
      .fromTo('#gift', { clipPath: `circle(150% at 50% ${cy}%)` }, { clipPath: `circle(0% at 50% ${cy}%)`, duration: 1.2, ease: 'expo.inOut', onComplete: () => $('#gift').remove() }, 0.35)
      .add(() => { initScroll(); aberturaIn(); }, 0.6);
  });

  function aberturaIn() {
    const tl = gsap.timeline();
    tl.from('.arch', { scale: 0.6, opacity: 0, borderRadius: '50%', duration: 1.4, ease: 'expo.out' })
      .from('.arch-img', { scale: 1.5, duration: 2, ease: 'expo.out' }, 0)
      .from('#abertura .float-heart', { scale: 0, rotation: -30, duration: 0.9, stagger: 0.15, ease: 'back.out(3)' }, 0.5)
      .from('#abertura .eyebrow', { opacity: 0, letterSpacing: '0.8em', duration: 1.2, ease: 'power3.out' }, 0.2)
      .from('#abertura .display .w > i', { yPercent: 110, duration: 1, stagger: 0.12, ease: 'power4.out' }, 0.6)
      .from('#abertura .lead, #abertura .btn, #abertura .micro', { opacity: 0, y: 30, duration: 0.8, stagger: 0.12, clearProps: 'transform,translate,rotate,scale' }, 1);
    $$('#abertura .float-heart').forEach((h, i) => gsap.to(h, { y: i ? 10 : -12, rotation: i ? -10 : 10, duration: 2.4 + i, yoyo: true, repeat: -1, ease: 'sine.inOut' }));
  }

  /* ---------- Scroll: tudo que depende de rolagem ---------- */
  function initScroll() {
    // títulos palavra a palavra
    $$('.split').forEach(h => {
      if (h.closest('#abertura')) return;
      gsap.from($$('.w > i', h), { yPercent: 110, rotate: 4, duration: 1.1, stagger: 0.09, ease: 'power4.out', scrollTrigger: { trigger: h, start: 'top 85%' } });
    });
    // textos
    ScrollTrigger.batch('[data-reveal]:not(#abertura [data-reveal])', {
      start: 'top 88%',
      onEnter: els => gsap.from(els, { opacity: 0, y: 40, duration: 0.9, stagger: 0.12, ease: 'power3.out', overwrite: true })
    });
    // fotos: cortina + zoom
    $$('.reveal-img').forEach(f => {
      const img = $('img', f);
      const tl = gsap.timeline({ scrollTrigger: { trigger: f, start: 'top 88%' } });
      tl.from(f, { clipPath: 'inset(18% 12% 18% 12% round 28px)', opacity: 0, duration: 1.2, ease: 'expo.out' });
      if (img) tl.from(img, { scale: 1.35, duration: 1.6, ease: 'expo.out' }, 0);
    });
    // timeline e textos internos
    $$('.tl-item').forEach(it => {
      gsap.from($$('.tl-date, .tl-title, .body-text', it), { opacity: 0, x: -20, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: it, start: 'top 82%' } });
      gsap.from($('.tl-dot', it), { scale: 0, duration: 0.6, ease: 'back.out(4)', scrollTrigger: { trigger: it, start: 'top 80%' } });
    });
    gsap.to('.tl-fill', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 70%', scrub: true } });
    // chat aparecendo
    gsap.from('.chat .msg', { opacity: 0, y: 14, scale: 0.9, duration: 0.5, stagger: 0.35, ease: 'back.out(2)', scrollTrigger: { trigger: '.chat', start: 'top 80%' } });
    // parallax
    $$('[data-speed]').forEach(el => {
      const s = parseFloat(el.dataset.speed);
      gsap.to(el, { y: () => -120 * s, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    /* ---- Pedido: amarelo + girassóis girando ---- */
    const meta = document.querySelector('meta[name=theme-color]');
    ScrollTrigger.create({
      trigger: '#pedido', start: 'top 55%', end: 'bottom 45%',
      onToggle: self => {
        document.body.classList.toggle('sunny', self.isActive);
        gsap.to(sunLayer, { opacity: self.isActive ? 1 : 0, duration: 0.9, ease: 'power2.out' });
        meta.content = self.isActive ? '#fffbea' : '#fff5f8';
      }
    });
    $$('svg', sunLayer).forEach((s, i) => {
      gsap.to(s, {
        rotation: (i % 2 ? -1 : 1) * (360 + i * 70), yPercent: -40 - i * 8, ease: 'none',
        scrollTrigger: { trigger: '#pedido', start: 'top bottom', end: 'bottom top', scrub: 0.6 }
      });
    });
    gsap.from('.yes span', { y: 60, opacity: 0, scale: 0.6, rotate: -8, duration: 1, stagger: 0.18, ease: 'back.out(2.2)', scrollTrigger: { trigger: '.yes', start: 'top 80%' } });

    /* ---- Infinito ---- */
    const bg = $('.inf-bg'), len = bg.getTotalLength();
    gsap.set(bg, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(bg, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.infinity-card', start: 'top 80%', end: 'center 50%', scrub: 1 } });
    gsap.from('.inf-path', { opacity: 0, scrollTrigger: { trigger: '.infinity-card', start: 'center 60%', toggleActions: 'play none none reverse' } });
    gsap.to('.inf-path', { strokeDashoffset: -260, repeat: -1, duration: 8, ease: 'none' });
    gsap.to('.inf-heart', { scale: 1.3, duration: 0.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.from('.cbox', { scale: 0.6, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'back.out(2.5)', scrollTrigger: { trigger: '.counter', start: 'top 80%' } });

    /* ---- Ela toda linda: galeria horizontal ---- */
    const track = $('.linda-track');
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    const hTween = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: '#linda', start: 'top top', end: () => '+=' + dist() * 1.1, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 }
    });
    $$('.lcard').forEach(card => {
      gsap.fromTo($('img', card), { scale: 1.25, xPercent: -6 }, { scale: 1.05, xPercent: 6, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: hTween, start: 'left right', end: 'right left', scrub: true } });
      gsap.from($('figcaption', card), { opacity: 0, y: 30, duration: 0.8, scrollTrigger: { trigger: card, containerAnimation: hTween, start: 'left 70%' } });
    });
    gsap.from('.linda-head .w > i, .linda-head .eyebrow', { yPercent: 110, opacity: 0, duration: 1, stagger: 0.1, ease: 'power4.out', scrollTrigger: { trigger: '#linda', start: 'top 70%' } });
    gsap.to('.big-statement .w', { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '.statement', start: 'top 75%', end: 'bottom 60%', scrub: true } });

    /* ---- Mural ---- */
    $$('.pola').forEach(p => {
      gsap.from(p, { y: -70, rotation: '+=14', opacity: 0, duration: 1.6, ease: 'elastic.out(1, 0.45)', scrollTrigger: { trigger: p, start: 'top 90%' } });
    });
    gsap.from('.string', { scaleX: 0, opacity: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.string', start: 'top 85%' } });

    /* ---- Carta: fundo rosa mais forte ---- */
    ScrollTrigger.create({ trigger: '#carta', start: 'top 60%', onToggle: s => document.body.classList.toggle('letter-bg', s.isActive) });
    gsap.from('.letter p', { opacity: 0, y: 20, duration: 0.9, stagger: 0.25, ease: 'power2.out', scrollTrigger: { trigger: '.letter', start: 'top 70%' } });

    ScrollTrigger.refresh();
    let rt;
    $$('img').forEach(img => img.complete || img.addEventListener('load', () => { clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 250); }, { once: true }));
  }

  // botão "Começar a nossa história"
  $$('[data-go]').forEach(b => b.addEventListener('click', () => {
    const t = $(b.dataset.go);
    window.scrollTo({ top: t.getBoundingClientRect().top + scrollY, behavior: 'smooth' });
  }));
  $('#replay').addEventListener('click', () => { window.scrollTo(0, 0); location.reload(); });

  /* ---------- Contador ---------- */
  const START = new Date('2026-09-06T10:00:00-03:00');
  const pad = n => String(n).padStart(2, '0');
  const addMonths = (d, m) => { const x = new Date(d); x.setMonth(x.getMonth() + m); return x; };
  const els = { a: $('#c-anos'), m: $('#c-meses'), d: $('#c-dias'), h: $('#c-horas'), mi: $('#c-min'), s: $('#c-seg') };
  function tick() {
    const now = new Date();
    if (now < START) return;
    let months = (now.getFullYear() - START.getFullYear()) * 12 + (now.getMonth() - START.getMonth());
    let anchor = addMonths(START, months);
    if (anchor > now) { months--; anchor = addMonths(START, months); }
    let rem = Math.floor((now - anchor) / 1000);
    const d = Math.floor(rem / 86400); rem %= 86400;
    els.a.textContent = Math.floor(months / 12);
    els.m.textContent = months % 12;
    els.d.textContent = d;
    els.h.textContent = pad(Math.floor(rem / 3600));
    els.mi.textContent = pad(Math.floor(rem % 3600 / 60));
    els.s.textContent = pad(rem % 60);
  }
  tick(); setInterval(tick, 1000);

  /* ---------- Bico: boing ---------- */
  $$('.bico').forEach(f => f.addEventListener('click', e => {
    gsap.fromTo(f, { scale: 1 }, { scale: 1.07, duration: 0.18, yoyo: true, repeat: 1, ease: 'back.out(3)' });
    heartBurst(e.clientX, e.clientY, 6, 50);
  }));

  /* ---------- Motivos ---------- */
  const motivos = [
    'Porque você é você. E isso já basta.',
    'O jeito que você faz bico quando quer alguma coisa.',
    'As suas caretas em todas as nossas fotos.',
    'O seu jeito de me olhar.',
    'Porque você ama girassóis e é tão linda quanto eles.',
    'Porque com você até escovar os dentes é algo divertido.',
    'Porque você sempre tá comigo.',
    'Porque a gente cresceu junto e você continua me surpreendendo.',
    'Porque você disse sim.',
    'Porque eu agradeço a Deus por você todos os dias.',
    'Porque você fica linda até sem tentar.',
    'A sua risada, que é a minha música pros meus ouvidos.',
    'Porque você deixa qualquer dia comum especial.',
    'O carinho que você tem com a sua família.',
    'Porque do seu lado eu sou a melhor versão de mim.',
    'Porque você é a minha pessoa favorita no mundo inteiro.',
    'Porque eu ainda fico nervoso quando você me olha.',
    'Porque o nosso “nada” juntos é sempre o meu programa favorito.'
  ];
  let mi = 0;
  $('#moreBtn').addEventListener('click', e => {
    mi = (mi + 1 + Math.floor(Math.random() * (motivos.length - 2))) % motivos.length;
    const t = $('#moreText');
    const r = e.currentTarget.getBoundingClientRect();
    heartBurst(r.left + r.width / 2, r.top + r.height / 2, 10, 80);
    gsap.fromTo(e.currentTarget, { scale: 0.8 }, { scale: 1, duration: 0.6, ease: 'elastic.out(1.2,0.4)' });
    gsap.to(t, { opacity: 0, y: -10, duration: 0.2, onComplete: () => { t.textContent = `“${motivos[mi]}”`; gsap.fromTo(t, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }); } });
  });

  /* ---------- Stories ---------- */
  const groups = [
    { name: 'Beijos', cover: 'beijo2', items: [
      ['beijo1', 'Noite especial', 'O beijo mais bonito de todos.'],
      ['beijo2', 'Noite especial', 'Eu e você, arrumadinhos.'],
      ['danca', 'Noite especial', 'Você nesse vestido. Que mulher linda.'],
      ['beijo-pb', 'Em preto e branco', 'Nós no parque, e voce nem gosta tanto de parque kkkk.'],
      ['pedido4', 'Campo de girassóis · 06/09', 'O primeiro beijo como namorados.']] },
    { name: 'Rotina', cover: 'dentes2', items: [
      ['dentes2', 'Banheiro · 06/09', 'Até escovar os dentes com você é bom.'],
      ['dentes1', 'Banheiro · 06/09', 'Dupla de escovação.'],
      ['pizza1', 'Elevador', 'Noite de pizza UHUUUUUUU.'],
      ['pizza2', 'Pizza chegou', 'Dividindo a pizza.'],
      ['cafe', 'Um cafézinho', 'Qualquer lugar fica bom com você.']] },
    { name: '1 mês', cover: 'mes1-bolo', items: [
      ['mes1-bolo', '06/10/2026', 'O nosso bolo de 1 mês de namoro.'],
      ['bolo-topo', '06/10/2026', 'Feito com amor e muito chocolate.'],
      ['bolo-sorriso', '06/10/2026', 'Os dois mais felizes do mundo.'],
      ['bolo-abraco', '06/10/2026', 'Abraço que eu queria que durasse pra sempre.'],
      ['mes1', '06/10/2026', 'Primeiro mês de muitos.']] },
    { name: 'Sorrisos', cover: 'sorriso1', items: [
      ['sorriso1', 'Nós', 'Esse sorriso é perfeito.'],
      ['girassol-sorriso', '06/09/2026', 'O sorriso de quem acabou de dizer sim.'],
      ['pb-risada', 'Nós', 'Rindo de tudo, como sempre.'],
      ['sorriso2', 'Nós', 'A gente é muito bobo junto.'],
      ['suco', 'Nós', 'Brinde com suquinho.'],
      ['junho', 'Nós', 'A minha pessoa favorita.']] },
    { name: 'Rolês', cover: 'zoo', items: [
      ['zoo', 'Zoológico', 'Rolê no zoo vendo as girafas.'],
      ['maio1', 'Um rolê qualquer', 'Qualquer rolê com você é o melhor.'],
      ['abril2', 'Abril de 2026', 'Começando a nossa história.'],
      ['festa', 'Com os amigos', 'Você sempre do meu lado.'],
      ['agosto', 'Agosto de 2026', 'Você e a sua língua de fora.'],
      ['quarto', 'Nós', 'Grudados, como sempre.']] }
  ];
  const hl = $('#highlights');
  groups.forEach((g, i) => {
    hl.insertAdjacentHTML('beforeend', `<button class="hl" data-g="${i}"><span class="hl-ring"><img src="img/${g.cover}.webp" alt="" loading="lazy"></span>${g.name}</button>`);
  });
  const st = $('#story'), stImg = $('.st-img', st), bars = $('.st-bars', st);
  const blur = document.createElement('img'); blur.className = 'st-blur';
  blur.style.cssText = 'position:absolute;inset:-40px;width:calc(100% + 80px);height:calc(100% + 80px);object-fit:cover;filter:blur(30px) brightness(.6);';
  st.prepend(blur);
  let G = 0, I = 0, prog;
  function openStory(g) {
    G = g; I = 0; st.hidden = false; document.body.style.overflow = 'hidden';
    gsap.fromTo(st, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' });
    show();
  }
  function closeStory() {
    prog && prog.kill();
    gsap.to(st, { opacity: 0, scale: 0.94, duration: 0.3, onComplete: () => { st.hidden = true; document.body.style.overflow = ''; } });
  }
  function show() {
    const g = groups[G], [img, meta, text] = g.items[I];
    bars.innerHTML = g.items.map((_, k) => `<i><b style="width:${k < I ? 100 : 0}%"></b></i>`).join('');
    $('.st-name', st).textContent = `Nós dois · ${g.name}`;
    stImg.src = blur.src = `img/${img}.webp`;
    $('.st-meta', st).textContent = meta;
    $('.st-text', st).textContent = text;
    gsap.fromTo(stImg, { scale: 1.06, opacity: 0.4 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' });
    gsap.fromTo('.st-card', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 });
    prog && prog.kill();
    prog = gsap.to($$('b', bars)[I], { width: '100%', duration: 5, ease: 'none', onComplete: next });
  }
  function next() {
    if (I < groups[G].items.length - 1) I++;
    else if (G < groups.length - 1) { G++; I = 0; }
    else return closeStory();
    show();
  }
  function prev() { if (I > 0) I--; else if (G > 0) { G--; I = groups[G].items.length - 1; } show(); }
  hl.addEventListener('click', e => { const b = e.target.closest('.hl'); if (b) openStory(+b.dataset.g); });
  $('.st-next', st).addEventListener('click', next);
  $('.st-prev', st).addEventListener('click', prev);
  $('.st-close', st).addEventListener('click', closeStory);
  document.addEventListener('keydown', e => {
    if (st.hidden) return;
    if (e.key === 'Escape') closeStory();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
  // segurar para pausar
  let holdT, held = false;
  st.addEventListener('pointerdown', () => { held = false; holdT = setTimeout(() => { held = true; prog && prog.pause(); }, 220); });
  st.addEventListener('pointerup', () => { clearTimeout(holdT); prog && prog.paused() && prog.resume(); });
  st.addEventListener('click', e => { if (held) { e.stopPropagation(); held = false; } }, true);

  /* ---------- Player: a nossa música ---------- */
  (() => {
    const pl = $('#player'), au = $('#plAudio'), seek = $('#plSeek'), vol = $('#plVol');
    if (!pl || !au) return;
    const fmt = s => { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
    const setP = (r, v) => r.style.setProperty('--p', v + '%');
    let dragging = false, gain = null, failed = false;
    const render = () => {
      const d = au.duration || 0, t = au.currentTime || 0;
      if (!dragging) { seek.value = d ? (t / d) * 1000 : 0; setP(seek, d ? (t / d) * 100 : 0); }
      $('#plCur').textContent = fmt(dragging && d ? (seek.value / 1000) * d : t);
      $('#plLeft').textContent = '-' + fmt(d - (dragging ? (seek.value / 1000) * d : t));
    };
    const fail = () => {
      if (failed) return; failed = true; pl.classList.remove('playing');
      const m = document.createElement('p'); m.className = 'pl-msg'; m.textContent = 'A música ainda está chegando… ♥';
      $('.pl-inner', pl).appendChild(m);
    };
    au.addEventListener('error', fail);
    au.addEventListener('loadedmetadata', render);
    au.addEventListener('timeupdate', render);
    au.addEventListener('play', () => { pl.classList.add('playing'); $('#plPlay').setAttribute('aria-label', 'Pausar'); });
    au.addEventListener('pause', () => { pl.classList.remove('playing'); $('#plPlay').setAttribute('aria-label', 'Tocar'); });
    au.addEventListener('ended', () => { au.currentTime = 0; render(); });
    $('#plPlay').addEventListener('click', () => {
      if (failed) return;
      if (au.paused) {
        au.play().then(() => heartBurst(innerWidth / 2, $('#plPlay').getBoundingClientRect().top, 6, 90)).catch(() => {});
      } else au.pause();
    });
    $('#plBack').addEventListener('click', () => { au.currentTime = Math.max(0, au.currentTime - 10); render(); });
    $('#plFwd').addEventListener('click', () => { au.currentTime = Math.min((au.duration || 0) - 0.1, au.currentTime + 10); render(); });
    seek.addEventListener('input', () => { dragging = true; setP(seek, seek.value / 10); render(); });
    seek.addEventListener('change', () => { if (au.duration) au.currentTime = (seek.value / 1000) * au.duration; dragging = false; render(); });
    // No iPhone o volume do <audio> é só leitura; nesse caso o slider controla um GainNode.
    const applyVol = () => {
      const v = vol.value / 100; setP(vol, vol.value);
      au.volume = v;
      if (Math.abs(au.volume - v) > 0.01 && !gain && location.protocol !== 'file:') {
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          gain = ctx.createGain(); ctx.createMediaElementSource(au).connect(gain).connect(ctx.destination);
          au.addEventListener('play', () => ctx.resume());
        } catch (e) {}
      }
      if (gain) gain.gain.value = v;
    };
    vol.addEventListener('input', applyVol);
    setP(vol, vol.value);
    render();
  })();

  /* ---------- Botões magnéticos (computador) ---------- */
  if (canHover && !reduce) {
    $$('.btn').forEach(b => {
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect();
        gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.18, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4, ease: 'power3.out' });
      });
      b.addEventListener('pointerenter', () => gsap.to(b, { scale: 1.04, duration: 0.4, ease: 'back.out(3)' }));
      b.addEventListener('pointerleave', () => gsap.to(b, { x: 0, y: 0, scale: 1, duration: 0.8, ease: 'elastic.out(1,0.4)' }));
    });
  }

  if (reduce) gsap.globalTimeline.timeScale(4);
})();
