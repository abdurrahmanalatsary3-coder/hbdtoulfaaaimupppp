/* =============================================
   ELEGANT BOTANICAL BIRTHDAY — script.js
   ============================================= */

'use strict';

/* ---- Utility ---- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max + 1));

/* =============================================
   1. SCROLL-TRIGGERED FADE-IN
   ============================================= */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        fadeObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);

$$('.fade-in-up').forEach((el) => fadeObserver.observe(el));

/* =============================================
   2. STICKY NAV ON SCROLL
   ============================================= */
const nav = $('#mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* =============================================
   3. FLOATING DECORATIONS
   ============================================= */
const floatingLayer = $('#floatingLayer');

// Petal SVGs (soft botanical shapes)
const petalSVGs = [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 24" width="14" height="17">
    <ellipse cx="10" cy="12" rx="6" ry="10" fill="{c}" opacity="0.7" transform="rotate({r} 10 12)"/>
  </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22" width="12" height="15">
    <path d="M9 2 Q16 10 9 20 Q2 10 9 2Z" fill="{c}" opacity="0.65"/>
  </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="10" height="10">
    <circle cx="8" cy="8" r="7" fill="{c}" opacity="0.5"/>
  </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 14" width="16" height="10">
    <ellipse cx="11" cy="7" rx="10" ry="5" fill="{c}" opacity="0.6" transform="rotate({r} 11 7)"/>
  </svg>`,
];

const petalColors = ['#a4bfa0', '#8aad8e', '#c8deb0', '#d4c5a9', '#b8d4c0', '#c4b89a'];
const butterflyPositions = [[10, 20], [25, 45], [70, 15], [80, 60], [50, 30], [15, 70]];

function spawnPetals() {
  const count = 18;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'float-petal';

    const color = petalColors[randInt(0, petalColors.length - 1)];
    const svg = petalSVGs[randInt(0, petalSVGs.length - 1)]
      .replace(/{c}/g, color)
      .replace(/{r}/g, randInt(-40, 40));

    el.innerHTML = svg;
    el.style.cssText = `
      left: ${rand(0, 100)}%;
      top: ${rand(-10, -2)}%;
      animation-duration: ${rand(10, 22)}s;
      animation-delay: ${rand(0, 16)}s;
    `;
    floatingLayer.appendChild(el);
  }
}

function spawnButterflies() {
  const butterflies = ['🦋'];
  butterflyPositions.forEach(([x, y]) => {
    const el = document.createElement('div');
    el.className = 'float-butterfly';
    el.textContent = butterflies[0];
    el.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      font-size: ${rand(0.7, 1.1)}rem;
      animation-duration: ${rand(6, 14)}s;
      animation-delay: ${rand(0, 8)}s;
      opacity: ${rand(0.3, 0.55)};
    `;
    floatingLayer.appendChild(el);
  });
}

function spawnStars() {
  const count = 25;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'float-star';
    el.textContent = '✦';
    el.style.cssText = `
      left: ${rand(2, 98)}%;
      top: ${rand(2, 95)}%;
      font-size: ${rand(0.4, 0.9)}rem;
      animation-duration: ${rand(2.5, 6)}s;
      animation-delay: ${rand(0, 5)}s;
    `;
    floatingLayer.appendChild(el);
  }
}

function spawnHearts() {
  const positions = [[5, 35], [92, 25], [48, 80], [20, 60], [75, 50], [35, 90]];
  positions.forEach(([x, y]) => {
    const el = document.createElement('div');
    el.className = 'float-heart';
    el.textContent = '♡';
    el.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      font-size: ${rand(0.5, 0.9)}rem;
      animation-duration: ${rand(4, 8)}s;
      animation-delay: ${rand(0, 6)}s;
      color: ${Math.random() > 0.5 ? '#d4a0a0' : '#c8b8a2'};
    `;
    floatingLayer.appendChild(el);
  });
}

spawnPetals();
spawnButterflies();
spawnStars();
spawnHearts();

/* =============================================
   4. FINAL SECTION SPARKLE
   ============================================= */
function buildFinalSparkle() {
  const container = $('#finalSparkle');
  if (!container) return;
  const count = 14;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'sparkle-dot';
    dot.style.cssText = `
      left: ${rand(5, 95)}%;
      top: ${rand(5, 90)}%;
      width: ${rand(3, 7)}px;
      height: ${rand(3, 7)}px;
      background: ${Math.random() > 0.5 ? '#c8a96e' : '#a4bfa0'};
      animation-duration: ${rand(1.5, 4)}s;
      animation-delay: ${rand(0, 3)}s;
    `;
    container.appendChild(dot);
  }
}
buildFinalSparkle();

/* =============================================
   5. SURPRISE MODAL — ENVELOPE OPEN
   ============================================= */
const surpriseBtn   = $('#surpriseBtn');
const modalOverlay  = $('#modalOverlay');
const modalClose    = $('#modalClose');
const envelopeCont  = $('#envelopeContainer');
const envelope      = $('#envelope');
const surpriseLetter = $('#surpriseLetter');

function openModal() {
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  // reset envelope for next open
  setTimeout(() => {
    envelope.classList.remove('opened');
    surpriseLetter.classList.remove('show');
    surpriseLetter.style.display = 'none';
    envelopeCont.style.display = 'flex';
  }, 400);
}

surpriseBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Envelope click — open and show letter
envelopeCont.addEventListener('click', () => {
  envelope.classList.add('opened');
  launchConfetti();

  setTimeout(() => {
    envelopeCont.style.display = 'none';
    surpriseLetter.style.display = 'block';
    surpriseLetter.classList.add('show');
  }, 700);
});

/* =============================================
   6. CONFETTI / PETAL BURST
   ============================================= */
const canvas = $('#confettiCanvas');
const ctx    = canvas.getContext('2d');
let confettiParticles = [];
let confettiRunning   = false;
let confettiFrame     = null;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas, { passive: true });

const confettiColors = [
  '#a4bfa0', '#7a9e7e', '#c8deb0', '#c8a96e',
  '#d4c5a9', '#8aad8e', '#f0ede4', '#d4a0a0'
];

class ConfettiParticle {
  constructor() { this.reset(); }
  reset() {
    this.x  = rand(0, canvas.width);
    this.y  = rand(-40, -10);
    this.w  = rand(5, 11);
    this.h  = rand(3, 7);
    this.r  = rand(-Math.PI, Math.PI);
    this.vx = rand(-1.5, 1.5);
    this.vy = rand(2, 5);
    this.vr = rand(-0.08, 0.08);
    this.color = confettiColors[randInt(0, confettiColors.length - 1)];
    this.alpha = rand(0.6, 1);
    this.life  = 1;
  }
  update() {
    this.x  += this.vx;
    this.y  += this.vy;
    this.r  += this.vr;
    this.vy += 0.04; // gravity
    this.life -= 0.003;
    if (this.y > canvas.height + 30 || this.life <= 0) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha * Math.max(0, this.life);
    ctx.translate(this.x, this.y);
    ctx.rotate(this.r);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
  }
}

function launchConfetti() {
  if (confettiRunning) return;
  confettiRunning = true;
  canvas.classList.add('active');

  for (let i = 0; i < 90; i++) {
    confettiParticles.push(new ConfettiParticle());
  }

  let startTime = performance.now();

  function animate(now) {
    const elapsed = now - startTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles.forEach((p) => { p.update(); p.draw(); });

    if (elapsed < 4000) {
      confettiFrame = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.classList.remove('active');
      confettiParticles = [];
      confettiRunning   = false;
    }
  }
  confettiFrame = requestAnimationFrame(animate);
}

/* =============================================
   7. MUSIC BUTTON
   ============================================= */
const musicBtn  = $('#musicBtn');
const musicIcon = $('#musicIcon');
const bgMusic   = $('#bgMusic');

let musicPlaying = false;

musicBtn.addEventListener('click', () => {
  if (!musicPlaying) {
    // Attempt to play — catch DOMException for missing file gracefully
    bgMusic.play().then(() => {
      musicPlaying = true;
      musicBtn.classList.add('playing');
      musicIcon.textContent = '♫';
      musicBtn.querySelector('.music-label').textContent = 'Playing';
    }).catch(() => {
      // No audio file present — show gentle feedback
      musicBtn.title = 'Music file not found. Add music.mp3 to enable.';
      musicBtn.style.opacity = '0.6';
    });
  } else {
    bgMusic.pause();
    musicPlaying = false;
    musicBtn.classList.remove('playing');
    musicIcon.textContent = '♪';
    musicBtn.querySelector('.music-label').textContent = 'Music';
  }
});

/* =============================================
   8. SMOOTH ANCHOR SCROLLING
   ============================================= */
$$('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = $(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* =============================================
   9. SUBTLE PARALLAX ON HERO BOTANICALS
   ============================================= */
const botanicalEls = $$('.botanical');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  botanicalEls.forEach((el) => {
    el.style.transform = `translateY(${y * 0.12}px)`;
  });
}, { passive: true });
