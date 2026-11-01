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
(function(){
  var nav=document.querySelector('.nav-links');
  if(nav && !nav.querySelector('a[href="ai-finder.html"]')){
    var a=document.createElement('a');
    a.href='ai-finder.html';
    a.className='nav-item';
    a.innerHTML='<span>AI FINDER</span>';
    var chat=nav.querySelector('a[href="chatbot.html"]');
    nav.insertBefore(a, chat||null);
  }
  document.querySelectorAll('.footer-links').forEach(function(f){
    if(!f.querySelector('a[href="ai-finder.html"]')){
      f.insertAdjacentHTML('beforeend',' <a href="ai-finder.html">AI Finder</a>');
    }
  });
})();
(function(){
  var FEATURES=[
    ['AI Tool Finder','ai-finder.html'],
    ['AI Prompt Generator','ai-prompt.html'],
    ['AI Text Summarizer','ai-summarizer.html'],
    ['AI Chatbot','chatbot.html']
  ];
  var nav=document.querySelector('.nav-links'), mega=document.getElementById('megaMenu');
  if(!nav||!mega||document.querySelector('[data-menu="aifeatures"]')) return;
  var old=nav.querySelector('a[href="ai-finder.html"]'); if(old) old.remove();
  var others=document.querySelectorAll('.nav-item');
  var item=document.createElement('div');
  item.className='nav-item'; item.setAttribute('data-menu','aifeatures');
  item.innerHTML='<span>AI FEATURES</span><svg class="chevron" width="10" height="6" viewBox="0 0 10 6"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>';
  var chat=nav.querySelector('a[href="chatbot.html"]');
  nav.insertBefore(item, chat||null);
  var panel=document.createElement('div');
  panel.className='mega-panel'; panel.setAttribute('data-panel','aifeatures');
  panel.innerHTML='<div class="mega-head"><span class="mega-eyebrow">AI FEATURES</span><h2>Smart tools, powered by AI</h2><p>New features are added every month.</p></div><div class="mega-cols"><div class="mega-col"><h4>TRY NOW</h4>'+FEATURES.map(function(f){return '<a href="'+f[1]+'">'+f[0]+'</a>';}).join('')+'</div></div>';
  mega.appendChild(panel);
  item.addEventListener('mouseenter',function(){
    document.querySelectorAll('.mega-panel').forEach(function(p){p.classList.toggle('active',p===panel);});
    document.querySelectorAll('.nav-item').forEach(function(i){i.classList.toggle('active',i===item);});
    mega.classList.add('open');
  });
  others.forEach(function(o){
    o.addEventListener('mouseenter',function(){ panel.classList.remove('active'); item.classList.remove('active'); });
  });
  document.querySelectorAll('.footer-links').forEach(function(f){
    FEATURES.slice(0,2).forEach(function(x){
      if(!f.querySelector('a[href="'+x[1]+'"]')) f.insertAdjacentHTML('beforeend',' <a href="'+x[1]+'">'+x[0]+'</a>');
    });
  });
})();
(function(){
  var svg="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='#0B1121'/><polygon points='32,8 52.8,20 52.8,44 32,56 11.2,44 11.2,20' fill='none' stroke='#2DD4BF' stroke-width='4' stroke-linejoin='round'/><path d='M32 32L52.8 20M32 32L11.2 20M32 32V56' stroke='#2DD4BF' stroke-width='4' stroke-linecap='round'/><circle cx='32' cy='32' r='5.5' fill='#ffffff'/></svg>";
  var l=document.querySelector("link[rel='icon']")||document.createElement('link');
  l.rel='icon'; l.type='image/svg+xml';
  l.href='data:image/svg+xml,'+encodeURIComponent(svg);
  document.head.appendChild(l);
  if(!document.querySelector("meta[name='theme-color']")){
    var m=document.createElement('meta'); m.name='theme-color'; m.content='#0B1121'; document.head.appendChild(m);
  }
})();
