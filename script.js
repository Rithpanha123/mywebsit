// ============================================================
// PAGE LOADER
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    document.getElementById('pageLoader').classList.add('hide');
  }, 1500);
});

// ============================================================
// PARTICLES
// ============================================================
(function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = Math.random() * 20 + 15 + 's';
    p.style.animationDelay = Math.random() * 20 + 's';
    container.appendChild(p);
  }
})();

// ============================================================
// MOBILE MENU
// ============================================================
document.getElementById('menu-icon').addEventListener('click', function() {
  document.getElementById('navlist').classList.toggle('active');
});

// ============================================================
// SMOOTH SCROLL & ACTIVE NAV
// ============================================================
document.querySelectorAll('.smooth-scroll').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      document.querySelectorAll('.smooth-scroll').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      document.getElementById('navlist').classList.remove('active');
    }
  });
});

// ============================================================
// PORTFOLIO FILTER
// ============================================================
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    document.querySelectorAll('.port-box').forEach(box => {
      if (filter === 'all' || box.dataset.category === filter) {
        box.style.display = 'block';
      } else {
        box.style.display = 'none';
      }
    });
  });
});

// ============================================================
// LOGO SCROLL
// ============================================================
const logos = [
  { abbr: "HTML", name: "HTML5", img: "image/html.png" },
  { abbr: "CSS",  name: "CSS3", img: "image/css.png" },
  { abbr: "JS",   name: "JavaScript", img: "image/js.png" },
  { abbr: "PHP",  name: "PHP", img: "image/php.png" },
  { abbr: "C#",   name: "C Sharp", img: "image/CSharp.png" },
  { abbr: "PS",   name: "Photoshop", img: "image/ps.png" },
  { abbr: "AI",   name: "Illustrator", img: "image/AI.png" },
  { abbr: "VS CODE", name: "Visual Studio Code", img: "image/Visual Studio Code Logo 3D.jpg" },
  { abbr: "GITHUB", name: "GitHub", img: "image/github .png" },
  { abbr: "MYSQL", name: "MySQL", img: "image/MySQL.jpg" },
];

function makeLogo({ abbr, name, img }) {
  return `<div class="logo-item">
    <div class="logo-circle">
      <img src="${img}" alt="${name}" style="width: 50px; height: 50px; object-fit: contain;" />
    </div>
    <span class="logo-label">${name}</span>
  </div>`;
}

const track = document.getElementById('track');
const doubled = [...logos, ...logos];
track.innerHTML = doubled.map(makeLogo).join('');

// ============================================================
// INTERSECTION OBSERVER FOR SKILLS ANIMATION
// ============================================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateAll();
      observer.disconnect();
    }
  });
}, { threshold: 0.2 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  observer.observe(skillsSection);
}

function animateAll() {
  // Skill bars
  document.querySelectorAll('.bar span').forEach(span => {
    const w = span.dataset.width;
    setTimeout(() => { span.style.width = w + '%'; }, 100);
  });

  // Count up % labels
  document.querySelectorAll('.countup').forEach(el => {
    const target = +el.dataset.target;
    let cur = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.textContent = Math.round(cur) + '%';
      if (cur >= target) clearInterval(timer);
    }, 20);
  });

  // Circles
  document.querySelectorAll('.circle-fill').forEach(circle => {
    const target = +circle.dataset.target;
    const circ = 2 * Math.PI * 45;
    const offset = circ - (target / 100) * circ;
    setTimeout(() => { circle.style.strokeDashoffset = offset; }, 100);
  });

  // Count up inside circles
  document.querySelectorAll('.counter-num').forEach(el => {
    const target = +el.dataset.target;
    let cur = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.textContent = Math.round(cur);
      if (cur >= target) clearInterval(timer);
    }, 20);
  });
}

// ============================================================
// CONTACT FORM
// ============================================================
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  const message = document.getElementById('userMessage').value.trim();
  const status = document.getElementById('formStatus');

  if (!name || !email || !message) {
    status.className = 'status-message error';
    status.textContent = 'Please fill in all fields.';
    return;
  }

  status.className = 'status-message success';
  status.textContent = 'Message sent successfully! ✨';
  this.reset();
});

// ============================================================
// HEADER - SCROLL EFFECTS & MENU TOGGLE
// ============================================================

// ─── 1. Header Scroll Effect ───
function handleHeaderScroll() {
  const header = document.getElementById('mainHeader');
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ─── 2. Mobile Menu Toggle ───
function setupMobileMenu() {
  const menuToggle = document.getElementById('menu-icon');
  const navWrapper = document.querySelector('.nav-wrapper');
  const navLinks = document.querySelectorAll('.navlist li a');

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);

  function toggleMenu() {
    menuToggle.classList.toggle('active');
    navWrapper.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navWrapper.classList.contains('active') ? 'hidden' : '';
  }

  menuToggle.addEventListener('click', toggleMenu);

  overlay.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navWrapper.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navWrapper.classList.contains('active')) {
      toggleMenu();
    }
  });
}

// ─── 3. Active Nav Link on Scroll ───
function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navlist li a');

  window.addEventListener('scroll', () => {
    let current = 'home';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ─── 4. Nav Link Hover Magnetic Effect ───
function setupMagneticNav() {
  const navLinks = document.querySelectorAll('.navlist li a');

  navLinks.forEach(link => {
    link.addEventListener('mousemove', (e) => {
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      link.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translate(0, 0)';
    });
  });
}

// ─── 5. Logo Click Animation ───
function setupLogoAnimation() {
  const logo = document.querySelector('.logo');
  
  logo.addEventListener('click', () => {
    logo.style.transform = 'scale(0.9)';
    setTimeout(() => {
      logo.style.transform = 'scale(1)';
    }, 200);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── Initialize Header Features ───
document.addEventListener('DOMContentLoaded', function() {
  handleHeaderScroll();
  setupMobileMenu();
  updateActiveNavOnScroll();
  setupMagneticNav();
  setupLogoAnimation();
});

 /* ─────────────────────────────────────────
     4. REVEAL ON SCROLL — Intersection Observer
  ───────────────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
