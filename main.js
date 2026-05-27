// ── PAGE TRANSITIONS ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Fade in on load
  document.body.classList.remove('page-enter');

  // Intercept all internal nav links
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http')) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.add('page-exit');
      setTimeout(() => { window.location.href = href; }, 250);
    });
  });

  // Mark active nav link
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  // ── SCROLL ANIMATIONS ──────────────────────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ── LANGUAGE SWITCHER ──────────────────────────────────
  const savedLang = localStorage.getItem('lang') || 'kz';
  applyLang(savedLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      localStorage.setItem('lang', lang);
      applyLang(lang);
    });
  });
});

// Apply language translations
function applyLang(lang) {
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  document.querySelectorAll('[data-ru]').forEach(el => {
    const val = el.getAttribute(`data-${lang}`);
    if (val !== null) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = val;
      else el.innerHTML = val;
    }
  });
}

// ── CONTACT FORM ───────────────────────────────────────────
function submitForm() {
  const name = document.getElementById('cf-name')?.value;
  const email = document.getElementById('cf-email')?.value;
  const msg = document.getElementById('cf-msg')?.value;
  if (!name || !email || !msg) {
    alert('Пожалуйста, заполните все поля.');
    return;
  }
  const btn = document.getElementById('cf-btn');
  btn.textContent = '✓ Отправлено!';
  btn.style.background = '#0F6E56';
  btn.disabled = true;
}
