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
// ========== TELEGRAM BOT CONFIGURATION ==========
// 🔴 IMPORTANT: Replace with your own credentials
// How to get:
// 1. Message @BotFather on Telegram -> /newbot -> get BOT_TOKEN
// 2. Message @userinfobot on Telegram -> get your CHAT_ID
const BOT_TOKEN = '8474784463:AAGS_zqY5DkumkJl-ynJHqI0MmFkAr7mB4Q';  // Replace with your bot token
const CHAT_ID = '1475418295';      // Replace with your chat ID

// ========== CONTACT FORM HANDLER ==========
const contactForm = document.getElementById('contactForm');
const statusDiv = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const message = document.getElementById('userMessage').value.trim();
    
    // Validate inputs
    if (!name || !email || !message) {
      showStatus('❌ Please fill in all fields!', 'error');
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      showStatus('❌ Please enter a valid email address!', 'error');
      return;
    }
    
    // Show loading state
    const sendBtn = document.getElementById('sendBtn');
    const originalText = sendBtn.innerHTML;
    sendBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
    sendBtn.disabled = true;
    
    try {
      // Format message for Telegram (HTML format)
      const currentTime = new Date().toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      
      const telegramMessage = `
<b>📬 NEW CONTACT FORM SUBMISSION</b>
━━━━━━━━━━━━━━━━━━━━
<b>👤 Name:</b> ${escapeHTML(name)}
<b>📧 Email:</b> ${escapeHTML(email)}
<b>💬 Message:</b>
${escapeHTML(message)}
━━━━━━━━━━━━━━━━━━━━
<b>⏰ Time:</b> ${currentTime}
<b>🌐 IP:</b> ${await getClientIP()}
      `;
      
      // Send to Telegram API
      const apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: telegramMessage,
          parse_mode: 'HTML',
          disable_web_page_preview: true
        })
      });
      
      const result = await response.json();
      
      if (result.ok) {
        showStatus('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
      } else {
        console.error('Telegram API Error:', result);
        showStatus('❌ Failed to send message. Please try again later.', 'error');
      }
      
    } catch (error) {
      console.error('Error:', error);
      showStatus('❌ Network error. Please check your connection.', 'error');
    } finally {
      // Reset button
      sendBtn.innerHTML = originalText;
      sendBtn.disabled = false;
    }
  });
}

// Helper function to show status message
function showStatus(message, type) {
  if (statusDiv) {
    statusDiv.innerHTML = message;
    statusDiv.className = `status-message ${type}`;
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      if (statusDiv) {
        statusDiv.style.opacity = '0';
        setTimeout(() => {
          if (statusDiv) {
            statusDiv.innerHTML = '';
            statusDiv.style.opacity = '1';
            statusDiv.className = 'status-message';
          }
        }, 300);
      }
    }, 5000);
  }
}

// Helper function to escape HTML special characters
function escapeHTML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Optional: Get client IP (for better tracking)
async function getClientIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || 'Unknown';
  } catch {
    return 'Unable to detect';
  }
}

