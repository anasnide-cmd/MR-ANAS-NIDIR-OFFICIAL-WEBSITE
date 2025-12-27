/* ================================
   1) HELPER: Throttle
================================ */
function throttle(fn, wait = 100) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
}

/* ================================
   2) SCROLL REVEAL (IntersectionObserver)
================================ */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Reveal only once
    }
  });
}, {
  root: null,
  threshold: 0.15,
});

revealEls.forEach(el => revealObserver.observe(el));

/* ================================
   3) NAV: Mobile drawer (slide left)
================================ */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const body = document.body;

function openMenu() {
  navLinks.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  body.style.overflow = 'hidden'; // lock scroll
}
function closeMenu() {
  navLinks.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  body.style.overflow = '';
}
function toggleMenu() {
  if (!navLinks) return;
  navLinks.classList.contains('active') ? closeMenu() : openMenu();
}

if (hamburger && navLinks) {
  hamburger.addEventListener('click', toggleMenu);

  // Close with ❌
  const closeBtn = document.getElementById('close-menu');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
    closeBtn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') closeMenu(); });
  }

  // Auto-close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // ESC to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Click outside to close
  document.addEventListener('click', (e) => {
    const inside = navLinks.contains(e.target) || hamburger.contains(e.target);
    if (!inside && navLinks.classList.contains('active')) closeMenu();
  });

  // Reset on resize
  window.addEventListener('resize', throttle(() => {
    if (window.innerWidth > 768) closeMenu();
  }, 150));
}

/* ================================
   4) NAVBAR SHADOW ON SCROLL
================================ */
const navbar = document.querySelector('.navbar');
function navShadow() {
  if (!navbar) return;
  const scrolled = window.scrollY > 4;
  navbar.style.boxShadow = scrolled ? '0 5px 20px rgba(0,0,0,0.35)' : 'none';
}
window.addEventListener('scroll', throttle(navShadow, 120));
window.addEventListener('load', navShadow);

/* ================================
   5) SMOOTH SCROLL (anchor links)
================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', evt => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;

    evt.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY - 70; // offset navbar
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});

/* =========================================
   6) Project Logos — ultra-smooth marquee
   - HTML hanya 1 set .set, JS klon -> A+B
   - Kira lebar SET A sebenar (geometry)
   - Time-based + modulo baseWidth (no drift)
   - Left/Right start pos tepat (tiada gap)
========================================= */
(function () {
  async function decodeImages(root) {
    const imgs = Array.from(root.querySelectorAll('img'));
    await Promise.all(
      imgs.map(img => (img.decode ? img.decode().catch(() => { }) : Promise.resolve()))
    );
  }

  function initMarquee(trackId, speedPxPerSec = 40, { direction = 'left' } = {}) {
    const track = document.getElementById(trackId);
    if (!track) return;

    const baseSet = track.querySelector('.set');
    if (!baseSet) return;

    // Buang klon lama jika ada (recalc)
    track.querySelectorAll('.set.__clone').forEach(n => n.remove());

    // Klon SET A sekali → A + B
    const clone = baseSet.cloneNode(true);
    clone.classList.add('__clone');
    track.appendChild(clone);

    let baseWidth = 0;     // lebar tepat 1 set
    let startTime = 0;
    let runningSpeed = Math.abs(speedPxPerSec);
    const isLeft = direction === 'left';

    const measure = () => {
      const rect = baseSet.getBoundingClientRect();
      baseWidth = Math.round(rect.width);
      if (baseWidth < 10) baseWidth = baseSet.scrollWidth;
    };

    async function recalc() {
      await decodeImages(track);
      measure();

      // Jika 1 set terlalu pendek untuk viewport, pad dalam SET
      const vw = Math.max(window.innerWidth, 320);
      let guard = 0;
      while (baseSet.getBoundingClientRect().width < vw * 1.1 && guard < 8) {
        baseSet.innerHTML += baseSet.innerHTML; // gandakan item dalam set
        measure();
        guard++;
      }

      // Pastikan ada klon baharu lepas pad & measure semula
      track.querySelectorAll('.set.__clone').forEach(n => n.remove());
      const cloneAgain = baseSet.cloneNode(true);
      cloneAgain.classList.add('__clone');
      track.appendChild(cloneAgain);
      measure();

      startTime = performance.now();

      // Start pos: left = 0, right = baseWidth (terus rapat)
      const x0 = isLeft ? 0 : baseWidth;
      track.style.transform = `translate3d(${-x0}px,0,0)`;
    }

    // Recalc pada momen penting
    window.addEventListener('DOMContentLoaded', recalc, { once: true });
    window.addEventListener('load', recalc);
    window.addEventListener('resize', recalc);
    setTimeout(recalc, 800);
    setTimeout(recalc, 1500);

    // Loop: guna masa mutlak (no drift) + modulo baseWidth
    function loop(ts) {
      if (!baseWidth) { requestAnimationFrame(loop); return; }
      const t = (ts - startTime) / 1000;
      let dist = (t * runningSpeed) % baseWidth;
      dist = Math.round(dist); // elak subpixel wrap

      const x = isLeft ? dist : (baseWidth - dist);
      track.style.transform = `translate3d(${-x}px,0,0)`;
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    // Pause on hover (optional)
    track.addEventListener('mouseenter', () => { runningSpeed = 0; });
    track.addEventListener('mouseleave', () => { runningSpeed = Math.abs(speedPxPerSec); });
  }

  // Row A: kiri (sederhana)
  initMarquee('logos-track-1', 40, { direction: 'left' });
  // Row B: kanan (perlahan)
  initMarquee('logos-track-2', 22, { direction: 'right' });
})();








console.log('MR ANAS NIDIR site ready.');