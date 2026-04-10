document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--text)';
    }
  });
});

const animatedEls = document.querySelectorAll(
  '.exp-card, .project-card, .skill-group, .cert-card, .section-head, .hero-stats .stat'
);

animatedEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(36px)';
  el.style.transition = `opacity 0.55s cubic-bezier(0.4,0,0.2,1) ${i * 0.04}s, transform 0.55s cubic-bezier(0.4,0,0.2,1) ${i * 0.04}s`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    } else {
      const rect = entry.target.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(36px)';
      } else {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(-24px)';
      }
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

animatedEls.forEach(el => observer.observe(el));

window.addEventListener('DOMContentLoaded', () => {
  const heroEls = document.querySelectorAll('.hero-eyebrow, .hero h1, .hero-desc, .hero-actions');
  heroEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s ease ${0.1 + i * 0.12}s, transform 0.6s ease ${0.1 + i * 0.12}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  });
});
