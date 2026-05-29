// ========== WORD ROTATOR ANIMATION (3D Flip Effect) ==========
const words = document.querySelectorAll('.word');
let currentWordIndex = 0;

function animateWordLetters(wordElement) {
  const text = wordElement.innerText;
  wordElement.innerHTML = '';
  
  for (let i = 0; i < text.length; i++) {
    const letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerText = text[i] === ' ' ? '\u00A0' : text[i];
    wordElement.appendChild(letter);
  }
  
  const letters = document.querySelectorAll('.word .letter');
  letters.forEach((letter, idx) => {
    setTimeout(() => {
      letter.classList.add('in');
    }, idx * 30);
  });
}

function removeWordLetters() {
  const letters = document.querySelectorAll('.word .letter');
  letters.forEach((letter, idx) => {
    setTimeout(() => {
      letter.classList.remove('in');
      letter.classList.add('out');
    }, idx * 20);
  });
}

function switchWord() {
  removeWordLetters();
  
  setTimeout(() => {
    words.forEach(word => word.style.opacity = '0');
    words[currentWordIndex].style.opacity = '0';
    
    currentWordIndex = (currentWordIndex + 1) % words.length;
    
    words.forEach(word => word.style.opacity = '0');
    words[currentWordIndex].style.opacity = '1';
    
    animateWordLetters(words[currentWordIndex]);
  }, 300);
}

// Initialize first word
if (words.length > 0) {
  words.forEach((word, idx) => {
    if (idx !== 0) word.style.opacity = '0';
    else word.style.opacity = '1';
  });
  animateWordLetters(words[0]);
  setInterval(switchWord, 2800);
}

// ========== MOBILE MENU TOGGLE ==========
const menuIcon = document.getElementById('menu-icon');
const navlist = document.querySelector('.navlist');

if (menuIcon) {
  menuIcon.addEventListener('click', () => {
    navlist.classList.toggle('active');
  });
}

// ========== SMOOTH SCROLL & ACTIVE LINK ==========
document.querySelectorAll('.smooth-scroll').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      if (navlist) navlist.classList.remove('active');
    }
    
    document.querySelectorAll('.navlist a').forEach(a => a.classList.remove('active'));
    this.classList.add('active');
  });
});

// ========== PARTICLES BACKGROUND ==========
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  
  for (let i = 0; i < 80; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = Math.random() * 8 + 5 + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(particle);
  }
}
createParticles();

// ========== ANIMATED COUNTERS & SKILL BARS ==========
const counters = document.querySelectorAll('.countup');
const bigCounters = document.querySelectorAll('.counter-num');
const skillBars = document.querySelectorAll('.bar span');

function animateNumbers(elements, isPercent = true) {
  elements.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    if (!target) return;
    
    let current = 0;
    const increment = target / 50;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        el.innerText = Math.floor(current) + (isPercent ? '%' : '');
        requestAnimationFrame(updateCounter);
      } else {
        el.innerText = target + (isPercent ? '%' : '');
      }
    };
    updateCounter();
  });
}

function animateBars() {
  skillBars.forEach(bar => {
    const widthVal = bar.getAttribute('data-width');
    if (widthVal) {
      bar.style.width = widthVal + '%';
    }
  });
}

// Intersection Observer for Skills Section
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('Skill-main')) {
        animateNumbers(counters, true);
        animateNumbers(bigCounters, false);
        animateBars();
        observer.unobserve(entry.target);
      }
    }
  });
}, { threshold: 0.3 });

const skillSection = document.querySelector('.Skill-main');
if (skillSection) observer.observe(skillSection);

// ========== CREATE CIRCLE DOTS ==========
function buildCircleDots(containerId, count = 30) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  for (let i = 1; i <= count; i++) {
    const dot = document.createElement('span');
    dot.classList.add('points');
    dot.style.setProperty('--i', i);
    container.appendChild(dot);
  }
}

buildCircleDots('circle1', 30);
buildCircleDots('circle2', 30);
buildCircleDots('circle3', 30);
buildCircleDots('circle4', 30);

// ========== SCROLL SPY FOR ACTIVE MENU ==========
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 150;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('.navlist a').forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href');
    if (href === `#${current}`) {
      a.classList.add('active');
    }
  });
});

// ========== PORTFOLIO FILTER ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.port-box');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filterValue = btn.getAttribute('data-filter');
    
    portfolioItems.forEach(item => {
      if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
        item.style.display = 'block';
        item.style.animation = 'fadeIn 0.5s ease';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
`;
document.head.appendChild(style);

// ========== CONTACT FORM SUBMIT ==========
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent.');
    contactForm.reset();
  });
}

console.log('Portfolio website loaded with 3D word animation!');



//===============================================================================================


