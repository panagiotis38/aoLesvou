// ======================= main.js =======================

// HEADER SCROLL BEHAVIOR
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// MOBILE NAV TOGGLE
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.nav-mobile');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
}

// LANGUAGE SWITCHING (NO PAGE RELOAD)
const langButtons = document.querySelectorAll('[data-lang]');
const translatable = document.querySelectorAll('[data-en]');

function setLanguage(lang) {
  langButtons.forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  translatable.forEach(el => {
    el.textContent = el.dataset[lang];
  });
}

// Button clicks
langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setLanguage(btn.dataset.lang);
  });
});

// ✅ INITIAL LANGUAGE ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {
  setLanguage('el');
});
