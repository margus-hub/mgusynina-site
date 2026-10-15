/* ===== BURGER MENU ===== */
(function () {
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  if (!burger || !navLinks) return;
  
// Открывать/закрывать меню при клике на бургер
  burger.addEventListener('click', function () {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Закрывать меню при клике на ссылку
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Закрывать меню при клике вне его
  document.addEventListener('click', function (e) {
    if (!navLinks.classList.contains('open')) return;
    if (navLinks.contains(e.target)) return;
    if (burger.contains(e.target)) return;
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
})();

/* ===== BACK TO TOP ===== */
(function () {
  const btn = document.querySelector('.to-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 600) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ===== REVEAL ON SCROLL ===== */
(function () {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(function (el) { observer.observe(el); });
})();

/* ===== LIGHTBOX ===== */
(function () {
  const galleryImages = document.querySelectorAll('.gallery img');
  if (!galleryImages.length) return;

  // Создаём лайтбокс
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <span class="lb-close">×</span>
    <span class="lb-nav lb-prev">‹</span>
    <span class="lb-nav lb-next">›</span>
    <img src="" alt="">
    <span class="lb-counter"></span>
  `;
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('img');
  const lbCounter = lb.querySelector('.lb-counter');
  const lbClose = lb.querySelector('.lb-close');
  const lbPrev = lb.querySelector('.lb-prev');
  const lbNext = lb.querySelector('.lb-next');

  let currentIndex = 0;
  const images = Array.from(galleryImages);

  function open(index) {
    currentIndex = index;
    lbImg.src = images[currentIndex].src;
    lbCounter.textContent = (currentIndex + 1) + ' / ' + images.length;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function next() {
    currentIndex = (currentIndex + 1) % images.length;
    lbImg.src = images[currentIndex].src;
    lbCounter.textContent = (currentIndex + 1) + ' / ' + images.length;
  }

  function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lbImg.src = images[currentIndex].src;
    lbCounter.textContent = (currentIndex + 1) + ' / ' + images.length;
  }

  images.forEach(function (img, i) {
    img.addEventListener('click', function () { open(i); });
  });

  lbClose.addEventListener('click', close);
  lbNext.addEventListener('click', next);
  lbPrev.addEventListener('click', prev);

  lb.addEventListener('click', function (e) {
    if (e.target === lb) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
})();

/* ===== ACTIVE NAV LINK ===== */
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });
})();

/* ===== YEAR IN FOOTER ===== */
document.querySelectorAll('[data-year]').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});
