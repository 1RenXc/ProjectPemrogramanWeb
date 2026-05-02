// Vanilla JavaScript for Portfolio Beautification - No Frameworks

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  initMatrixEffect();
  initNav();
  initSmoothScroll();
  initFadeInObserver();
  initGalleryModal();
  initBlogCards();
  initThemeToggle();
  initTypingEffect();
});

// Mobile Navigation Toggle
function initNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
    
    // Close nav on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }
}

// Matrix Rain Effect - Cocok dengan tema website
function initMatrixEffect() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Karakter untuk matrix effect
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  
  // Array untuk menyimpan posisi y dari setiap kolom
  const drops = new Array(columns).fill(0);
  
  // Warna-warna yang cocok dengan tema website
  const colors = ['#a0a0ff', '#c0c0ff', '#808080', '#a9a9a9', '#696969'];
  
  function draw() {
    // Background semi-transparent untuk trail effect
    ctx.fillStyle = 'rgba(0, 0, 24, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set ukuran font
    ctx.font = fontSize + 'px monospace';
    
    // Loop melalui setiap kolom
    for (let i = 0; i < drops.length; i++) {
      // Pilih karakter random
      const char = chars.charAt(Math.floor(Math.random() * chars.length));
      
      // Pilih warna dari array colors
      const color = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillStyle = color;
      
      // Gambar karakter
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      
      // Jika drops mencapai bottom atau random trigger, reset
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
        drops[i] = 0;
      }
      
      // Increment drop
      drops[i]++;
    }
  }
  
  // Animation loop
  const interval = setInterval(draw, 50);
  
  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}


// Smooth Scrolling for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Intersection Observer for Fade-in Animations
function initFadeInObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in, .blog-card, .info-item, .contact-item, .skill-item').forEach(el => {
    observer.observe(el);
  });
}

// Gallery Lightbox Modal
function initGalleryModal() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <button class="close" aria-label="Tutup galeri">&times;</button>
    <div class="modal-content"></div>
  `;
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('.close');
  const modalContent = modal.querySelector('.modal-content');

  // Function to close modal
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    // Pause any playing video
    const video = modalContent.querySelector('video');
    if (video) {
      video.pause();
    }
  }

  // Close modal
  closeBtn.addEventListener('click', closeModal);

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Open gallery items
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const media = item.querySelector('img, video');
      if (media) {
        const clone = media.cloneNode(true);
        clone.style.display = 'block';
        clone.style.margin = '0 auto';
        clone.style.maxWidth = '90vw';
        clone.style.maxHeight = '90vh';
        clone.style.width = 'auto';
        clone.style.height = 'auto';
        clone.style.objectFit = 'contain';
        modalContent.innerHTML = '';
        modalContent.appendChild(clone);
        const video = modalContent.querySelector('video');
        if (video) {
          video.controls = true;
          video.style.display = 'block';
          video.style.margin = '0 auto';
        }
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    });
  });
}

// Blog Card Hover Effects (expand preview)
function initBlogCards() {
  document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Theme toggle removed per user request

// Typing Effect for Hero Title - Enhanced
function initTypingEffect() {
  const titles = document.querySelectorAll('.profile-text h1');
  titles.forEach(title => {
    const text = title.textContent;
    title.innerHTML = '';
    title.classList.add('typing');
    
    let i = 0;
    function type() {
      if (i < text.length) {
        title.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 80);
      } else {
        title.classList.remove('typing');
        // Cursor akan hilang setelah selesai
      }
    }
    setTimeout(type, 500);
  });
}

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.querySelector('.modal');
    if (modal && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }
});

