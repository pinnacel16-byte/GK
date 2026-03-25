/* ══════════════════════════════════════════════════════════
   GK HIMALAYA CELEBRATION — Main JavaScript
   ══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Navbar: scroll class + active link ─── */
  const navbar = document.getElementById('navbar');

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight active nav link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 90;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ─── Mobile Hamburger Menu ─── */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ─── Scroll Reveal Animation ─── */
  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal');

    if (!revealEls.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings in the same parent
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 100, 400);

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  }

  initReveal();

  /* ─── Smooth scroll for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── Contact form: basic validation + feedback ─── */
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', function (e) {
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();

      if (!name || !phone) {
        e.preventDefault();
        alert('Please fill in your name and phone number.');
        return;
      }

      // Allow the mailto to proceed — show feedback
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Opening email client...';
        setTimeout(() => { btn.textContent = 'Send Enquiry'; }, 3000);
      }
    });
  }

  /* ─── Navbar active link style injection ─── */
  const style = document.createElement('style');
  style.textContent = `.nav-links a.active { color: var(--gold-light) !important; }
.nav-links a.active::after { width: 100% !important; }`;
  document.head.appendChild(style);

})();
