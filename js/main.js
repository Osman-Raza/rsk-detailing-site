// CUSTOM CURSOR
const isTouchDevice = window.matchMedia('(hover: none)').matches;
if (!isTouchDevice) {
  const cur = document.getElementById('cur');
  const curRing = document.getElementById('curRing');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => {
    mx=e.clientX; my=e.clientY;
    cur.style.left=mx+'px'; cur.style.top=my+'px';
  });
  const animRing = () => {
    rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
    curRing.style.left=rx+'px'; curRing.style.top=ry+'px';
    requestAnimationFrame(animRing);
  };
  animRing();
  document.querySelectorAll('a,button,.svc-card,.testi,.why-card,.step,.pillar,.faq-item,.gallery-card,.booking-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
}

// STICKY NAV
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('stuck', scrollY > 60);
}, { passive:true });

// MOBILE MENU
function toggleMobile() {
  const nav = document.getElementById('mobileNav');
  const btn = document.getElementById('menuBtn');
  const isOpen = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen);
  btn.setAttribute('aria-label', isOpen ? 'Close mobile menu' : 'Open mobile menu');
  document.body.style.overflow = isOpen ? 'hidden' : '';
}
function closeMobile() {
  document.getElementById('mobileNav').classList.remove('open');
  document.getElementById('menuBtn').setAttribute('aria-expanded','false');
  document.getElementById('menuBtn').setAttribute('aria-label','Open mobile menu');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key==='Escape') closeMobile(); });

// SCROLL REVEAL
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
    }
  });
}, { threshold:.08, rootMargin:'0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// FAQ ACCORDION
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded','false');
      document.getElementById(b.getAttribute('aria-controls')).style.maxHeight = '0';
    });
    if (!expanded) {
      btn.setAttribute('aria-expanded','true');
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
});

// FORM
document.getElementById('quoteForm').addEventListener('submit', function(e) {
  if (this.getAttribute('action') === '#') {
    e.preventDefault();
    document.getElementById('formSuccess').classList.add('show');
  }
});

// HERO SCROLL-DRIVEN CAR SPIN
(function () {
  var canvas = document.getElementById('heroSpin');
  var wrap = document.getElementById('heroSpinWrap');
  if (!canvas || !wrap) return;

  var FRAME_COUNT = 151;
  var FRAME_W = 1280, FRAME_H = 714;   // source frame dimensions
  var PATH = 'assets/gt3rs-frames/';
  var ctx = canvas.getContext('2d');
  var images = [];
  var loaded = 0;
  var currentFrame = -1;
  var ready = false;
  var ticking = false;

  // Loader
  var loader = document.createElement('div');
  loader.className = 'spin-loader';
  loader.innerHTML = '<span></span>';
  wrap.appendChild(loader);

  function frameName(i) {
    return PATH + 'frame_' + String(i).padStart(4, '0') + '.jpg';
  }

  function sizeCanvas() {
    var rect = wrap.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // cover-fit draw: fill the card, crop overflow, preserve aspect
  function draw(i) {
    if (i === currentFrame || !images[i] || !images[i].complete) return;
    currentFrame = i;
    var rect = wrap.getBoundingClientRect();
    var cw = rect.width, ch = rect.height;
    var scale = Math.max(cw / FRAME_W, ch / FRAME_H);
    var dw = FRAME_W * scale, dh = FRAME_H * scale;
    var dx = (cw - dw) / 2, dy = (ch - dh) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(images[i], dx, dy, dw, dh);
  }

  // scroll progress: 0 when hero top hits viewport top, 1 as hero scrolls out
  function update() {
    ticking = false;
    if (!ready) return;
    var hero = wrap.closest('.hero') || wrap.closest('section') || wrap.parentElement;
    var r = hero.getBoundingClientRect();
    var vh = window.innerHeight;
    // progress across the span where the hero travels through the viewport
    var total = r.height + vh;
    var scrolled = vh - r.top;
    var p = scrolled / total;
    p = Math.max(0, Math.min(1, p));
    var frame = Math.min(FRAME_COUNT - 1, Math.floor(p * (FRAME_COUNT - 1)));
    draw(frame);
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  function start() {
    ready = true;
    sizeCanvas();
    canvas.classList.add('ready');
    loader.classList.add('hide');
    setTimeout(function () { if (loader.parentNode) loader.parentNode.removeChild(loader); }, 500);
    draw(0);
    update();
  }

  // preload all frames, then reveal
  for (var i = 0; i < FRAME_COUNT; i++) {
    var img = new Image();
    img.onload = img.onerror = function () {
      loaded++;
      if (loaded === FRAME_COUNT) start();
    };
    img.src = frameName(i + 2);   // files are 1-indexed
    images[i] = img;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    sizeCanvas();
    currentFrame = 0;   // force redraw at new size
    update();
  });
})();
