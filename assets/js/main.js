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
  // Update button active state
  langButtons.forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  // Update all translatable elements
  translatable.forEach(el => {
    el.textContent = el.dataset[lang];
  });

  // Save language preference to localStorage
  localStorage.setItem('preferredLanguage', lang);
  
  // Update HTML lang attribute for accessibility
  document.documentElement.lang = lang;
}

// Get initial language from localStorage or default to Greek
function getInitialLanguage() {
  const savedLang = localStorage.getItem('preferredLanguage');
  return savedLang || 'el'; // Default to Greek if nothing saved
}

// Button clicks
langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setLanguage(btn.dataset.lang);
  });
});

// ✅ INITIAL LANGUAGE ON PAGE LOAD (Uses saved preference)
document.addEventListener('DOMContentLoaded', () => {
  const initialLang = getInitialLanguage();
  setLanguage(initialLang);
});

// ======================= GALLERY FUNCTIONALITY =======================

document.addEventListener('DOMContentLoaded', function() {
  // Only run gallery code if we're on a page with gallery items
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (galleryItems.length === 0) return; // Skip if no gallery items
  
  // Gallery modal elements
  const modal = document.querySelector('.modal');
  const modalImage = document.querySelector('.modal-image');
  const modalTitle = document.querySelector('.modal-title');
  const modalDescription = document.querySelector('.modal-description');
  const closeModal = document.querySelector('.close-modal');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  let currentIndex = 0;
  const images = Array.from(galleryItems);
  
  // Open modal when clicking on gallery item
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentIndex = index;
      updateModal();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });
  
  // Close modal
  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
  
  // Close modal when clicking outside the image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Navigation buttons
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateModal();
  });
  
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    updateModal();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    switch(e.key) {
      case 'Escape':
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        break;
      case 'ArrowLeft':
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateModal();
        break;
      case 'ArrowRight':
        currentIndex = (currentIndex + 1) % images.length;
        updateModal();
        break;
    }
  });
  
  // Update modal content
  function updateModal() {
    const currentItem = images[currentIndex];
    const img = currentItem.querySelector('img');
    const caption = currentItem.querySelector('.image-caption');
    
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    
    // Get current language from localStorage
    const currentLang = localStorage.getItem('preferredLanguage') || 'el';
    
    // Update caption text based on current language
    if (caption && caption.dataset) {
      modalTitle.textContent = caption.dataset[currentLang] || caption.textContent;
    } else {
      modalTitle.textContent = img.alt || 'Tennis club activity';
    }
    
    modalDescription.textContent = img.alt || 'Tennis club activity';
  }
  
  // Also update modal content when language changes
  // (We need to override the setLanguage function to handle gallery captions)
  const originalSetLanguage = window.setLanguage;
  
  window.setLanguage = function(lang) {
    // Call original function
    originalSetLanguage(lang);
    
    // Update modal if it's open
    if (modal && modal.classList.contains('active')) {
      updateModal();
    }
  };
});