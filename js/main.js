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
