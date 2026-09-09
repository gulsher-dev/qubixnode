const navPill = document.getElementById('navPill');
const megaMenu = document.getElementById('megaMenu');
const navItems = document.querySelectorAll('.nav-item');
const panels = document.querySelectorAll('.mega-panel');
const navWrapper = document.getElementById('navWrapper');

function openPanel(name) {
  panels.forEach(p => p.classList.toggle('active', p.dataset.panel === name));
  navItems.forEach(i => i.classList.toggle('active', i.dataset.menu === name));
  megaMenu.classList.add('open');
}

function closeMenu() {
  megaMenu.classList.remove('open');
  navItems.forEach(i => i.classList.remove('active'));
}

function collapseNav() {
  navPill.classList.remove('expanded');
  navWrapper.classList.remove('active');
  closeMenu();
}

navPill.addEventListener('mouseenter', () => {
  navPill.classList.add('expanded');
  navWrapper.classList.add('active');
});

navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const menu = item.dataset.menu;
    if (menu) openPanel(menu);
    else closeMenu(); // QUIZ has no dropdown
  });
});

megaMenu.addEventListener('mouseenter', () => {
  navPill.classList.add('expanded');
  navWrapper.classList.add('active');
});

navWrapper.addEventListener('mouseleave', () => {
  collapseNav();
});

navPill.addEventListener('click', () => {
  if (window.innerWidth <= 700 && !navPill.classList.contains('expanded')) {
    navPill.classList.add('expanded');
    navWrapper.classList.add('active');
  }
});


// ===== CLICK SOUND EFFECT (site-wide "ting") =====
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playClickSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) { /* audio not available, fail silently */ }
}

// Plays on any button, link, or element styled as clickable (cursor: pointer),
// walking up a few parent levels so clicks on icons/text inside a button still count
document.addEventListener('click', (e) => {
  let el = e.target;
  for (let i = 0; i < 4 && el; i++) {
    if (el.tagName === 'BUTTON' || el.tagName === 'A' || getComputedStyle(el).cursor === 'pointer') {
      playClickSound();
      break;
    }
    el = el.parentElement;
  }
});


// ===== TYPING SOUND EFFECT (site-wide key tick) =====
function playTypeSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(2400, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) { /* audio not available, fail silently */ }
}

// Plays a soft tick on any keystroke inside a text input, search box, or textarea
document.addEventListener('keydown', (e) => {
  const tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') {
    if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter') {
      playTypeSound();
    }
  }
});
