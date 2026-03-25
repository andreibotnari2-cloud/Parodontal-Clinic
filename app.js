/* ─── HAMBURGER ─── */
function initNav() {
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileNav');
  if (!ham || !mob) return;
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
  });
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    ham.classList.remove('open');
    mob.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

/* ─── SCROLL ANIMATIONS ─── */
function initScrollAnim() {
  const els = document.querySelectorAll('.anim');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

/* ─── COUNTER ANIMATION ─── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}

/* ─── BOOKING MODAL ─── */
function initModal() {
  const btn = document.getElementById('bookBtn');
  const modal = document.getElementById('bookModal');
  const close = document.getElementById('bookClose');
  const overlay = document.getElementById('bookOverlay');
  if (!btn || !modal) return;

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => modal.querySelector('.modal-box').classList.add('in')));
  }
  function closeModal() {
    modal.querySelector('.modal-box').classList.remove('in');
    setTimeout(() => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }, 300);
  }

  btn.addEventListener('click', openModal);
  close && close.addEventListener('click', closeModal);
  overlay && overlay.addEventListener('click', closeModal);

  // Also open from any .open-book link
  document.querySelectorAll('.open-book').forEach(el => el.addEventListener('click', e => {
    e.preventDefault();
    openModal();
  }));

  // Form submit
  const form = document.getElementById('bookForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Se trimite...';
      btn.disabled = true;
      // TODO: connect to Telegram bot
      setTimeout(() => {
        form.innerHTML = `
          <div class="form-success">
            <div class="form-success-icon">✅</div>
            <h3>Mulțumim!</h3>
            <p>Cererea ta a fost primită. Te vom contacta în cel mai scurt timp.</p>
          </div>
        `;
      }, 1200);
    });
  }
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollAnim();
  initCounters();
  initModal();
});
