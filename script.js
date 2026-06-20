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

