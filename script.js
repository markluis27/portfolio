/**
 * ==============================================================================
 * MARK LUIS O. FULINARA - DEVELOPER PORTFOLIO JAVASCRIPT
 * Features:
 *  - Immediate page availability (no boot delay or scroll locks)
 *  - Dark / Light Mode with localStorage persistence & system preference default
 *  - Scroll progress bar & active navigation tracking
 *  - Mobile drawer navigation with Escape key & link click dismiss
 *  - Immediate GSAP hero entrance & ScrollTrigger section animations
 *  - 3D Card Tilt & Magnetic button hover effects
 *  - One-click Email copying with success toast notification
 *  - Image placeholder resilience & hero portrait spotlight/pixel interactions
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. THEME MANAGEMENT (DARK / LIGHT MODE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Determine initial theme: localStorage -> system preference -> fallback to dark
  function getPreferredTheme() {
    try {
      const savedTheme = localStorage.getItem('ml_portfolio_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch (e) {
      console.warn('localStorage not accessible, using system preference', e);
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('ml_portfolio_theme', theme);
    } catch (e) {
      // Ignore private browsing storage restrictions
    }
    if (window.matrixRain) {
      window.matrixRain.setTheme(theme);
    }
  }

  /* ==========================================================================
     2. BINARY & SYNTAX MATRIX RAIN CANVAS (Falling Words & Code Tokens)
     ========================================================================== */
  class BinaryMatrixRain {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.isDark = htmlRoot.getAttribute('data-theme') !== 'light';
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Falling words, programming syntax, and binary tokens
      this.characters = [
        '0', '1', '0', '1', '1', '0',
        'const', '=>', '{ }', '</>', 'async', 'await',
        'SELECT', 'npm run dev', 'git push', 'true', 'null',
        'POST', 'fn', 'API', 'DB', '0x1F', 'JSON', 'req'
      ];

      this.columns = [];
      this.fontSize = 15;
      this.columnSpacing = 22;
      this.lastTime = 0;
      this.fps = 45; // Smooth cinematic cap
      this.interval = 1000 / this.fps;
      this.isPaused = false;

      // Mouse reactivity coordinates
      this.mouse = { x: -9999, y: -9999, radius: 120 };

      this.init();
      this.bindEvents();
    }

    init() {
      this.resize();

      if (this.prefersReducedMotion) {
        this.renderStaticPattern();
        return;
      }

      this.animate(0);
    }

    resize() {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;

      const isMobile = this.width < 768;
      this.fontSize = isMobile ? 16 : 14;
      this.columnSpacing = isMobile ? 26 : 22;

      const columnCount = Math.floor(this.width / this.columnSpacing);
      this.columns = [];

      for (let i = 0; i < columnCount; i++) {
        this.columns.push({
          x: i * this.columnSpacing,
          y: Math.random() * -this.height,
          speed: Math.random() * 0.75 + 0.55,
          length: Math.floor(Math.random() * 14 + 7),
          driftX: 0
        });
      }
    }

    setTheme(theme) {
      this.isDark = theme !== 'light';
      this.ctx.fillStyle = this.isDark ? '#070F1E' : '#FAF9F6';
      this.ctx.fillRect(0, 0, this.width, this.height);

      if (this.prefersReducedMotion) {
        this.renderStaticPattern();
      }
    }

    bindEvents() {
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          this.resize();
        }, 150);
      });

      // Pause when tab is inactive
      document.addEventListener('visibilitychange', () => {
        this.isPaused = document.visibilityState === 'hidden';
      });

      // Mouse reactivity on fine pointers (desktop)
      if (window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', (e) => {
          this.mouse.x = e.clientX;
          this.mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
          this.mouse.x = -9999;
          this.mouse.y = -9999;
        });
      }

      // Reduced motion changes
      window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
        this.prefersReducedMotion = e.matches;
        if (this.prefersReducedMotion) {
          this.renderStaticPattern();
        } else {
          this.animate(0);
        }
      });
    }

    renderStaticPattern() {
      this.ctx.fillStyle = this.isDark ? '#070F1E' : '#FAF9F6';
      this.ctx.fillRect(0, 0, this.width, this.height);

      this.ctx.font = `${this.fontSize}px 'JetBrains Mono', monospace`;
      this.ctx.fillStyle = this.isDark ? 'rgba(20, 184, 166, 0.08)' : 'rgba(100, 116, 139, 0.08)';

      for (let x = 12; x < this.width; x += 36) {
        for (let y = 24; y < this.height; y += 36) {
          const char = Math.random() > 0.5 ? '1' : '0';
          this.ctx.fillText(char, x, y);
        }
      }
    }

    animate(timestamp) {
      if (this.prefersReducedMotion) return;

      requestAnimationFrame(this.animate.bind(this));

      if (this.isPaused) return;

      const elapsed = timestamp - this.lastTime;
      if (elapsed < this.interval) return;

      this.lastTime = timestamp - (elapsed % this.interval);

      // Soft semi-transparent wash over previous frame to create fading trails
      this.ctx.fillStyle = this.isDark 
        ? 'rgba(7, 15, 30, 0.14)' 
        : 'rgba(250, 249, 246, 0.22)';
      this.ctx.fillRect(0, 0, this.width, this.height);

      this.ctx.font = `${this.fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < this.columns.length; i++) {
        const col = this.columns[i];
        const char = this.characters[Math.floor(Math.random() * this.characters.length)];

        // Compute mouse repulsion / glow
        const dx = col.x - this.mouse.x;
        const dy = col.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isNearMouse = dist < this.mouse.radius;

        if (isNearMouse) {
          col.driftX = (dx / dist) * 10;
        } else {
          col.driftX *= 0.92;
        }

        const renderX = col.x + col.driftX;
        const renderY = col.y;

        if (this.isDark) {
          if (isNearMouse) {
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = '#14B8A6';
          } else {
            const isCyan = i % 3 === 0;
            this.ctx.fillStyle = isCyan ? 'rgba(61, 220, 255, 0.40)' : 'rgba(20, 184, 166, 0.40)';
            this.ctx.shadowBlur = 3;
            this.ctx.shadowColor = isCyan ? '#3DDCFF' : '#14B8A6';
          }
        } else {
          // Light Mode: clean readable contrast
          if (isNearMouse) {
            this.ctx.fillStyle = '#0D9488';
            this.ctx.shadowBlur = 4;
            this.ctx.shadowColor = '#0D9488';
          } else {
            const isTeal = i % 3 === 0;
            this.ctx.fillStyle = isTeal ? 'rgba(13, 148, 136, 0.26)' : 'rgba(100, 116, 139, 0.22)';
            this.ctx.shadowBlur = 0;
          }
        }

        this.ctx.fillText(char, renderX, renderY);

        col.y += this.fontSize * col.speed;

        if (col.y > this.height + 40 && Math.random() > 0.96) {
          col.y = -20;
          col.speed = Math.random() * 0.75 + 0.55;
        }
      }

      this.ctx.shadowBlur = 0;
    }
  }

  // Instantiate Matrix Rain Canvas
  window.matrixRain = new BinaryMatrixRain('binary-canvas');

  // Initial theme application
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const active = htmlRoot.getAttribute('data-theme');
      const nextTheme = active === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
    });
  }

  // Listen for OS system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      try {
        if (!localStorage.getItem('ml_portfolio_theme')) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      } catch (err) {}
    });
  }

  /* ==========================================================================
     3. SCROLL PROGRESS BAR & ACTIVE SECTION NAVIGATION
     ========================================================================== */
  const scrollProgressBar = document.getElementById('scroll-progress');
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    // Update progress bar
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // Sticky navbar blur & shadow
    if (navbarWrapper) {
      if (scrollTop > 40) {
        navbarWrapper.classList.add('scrolled');
      } else {
        navbarWrapper.classList.remove('scrolled');
      }
    }

    // Active link highlighting
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  /* ==========================================================================
     3. MOBILE MENU DRAWER (Close on Link, Outside Click & Escape Key)
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileNav) {
    function closeMobileMenu() {
      mobileNav.classList.remove('open');
      mobileMenuBtn.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    }

    function toggleMobileMenu() {
      const isOpen = mobileNav.classList.toggle('open');
      mobileMenuBtn.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      mobileNav.setAttribute('aria-hidden', !isOpen);
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close when clicking outside drawer
    document.addEventListener('click', (e) => {
      if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close when pressing Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  /* ==========================================================================
     4. GSAP SCROLLTRIGGER & HERO ENTRANCE (IMMEDIATE - NO BOOT DELAY)
     ========================================================================== */
  function triggerHeroAnimations() {
    if (typeof gsap !== 'undefined') {
      gsap.from('.hero-text-content > *', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out'
      });
      gsap.from('.hero-portrait-window', {
        x: 25,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out'
      });
    }
  }

  // Trigger hero animation immediately
  triggerHeroAnimations();

  function initScrollAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Section Headers
      gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 25,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      });

      // Featured Project Cards
      gsap.utils.toArray('.featured-project-card, .other-project-card').forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out'
        });
      });

      // Experience Cards
      gsap.utils.toArray('.experience-card').forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out'
        });
      });

      // Skills Category Cards
      gsap.from('.skill-category-card', {
        scrollTrigger: {
          trigger: '.skills-body',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 25,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out'
      });

      // Timeline Items
      gsap.from('.timeline-item', {
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        x: -20,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power2.out'
      });

    } else {
      // IntersectionObserver fallback
      const fadeElements = document.querySelectorAll('.featured-project-card, .other-project-card, .experience-card, .skill-category-card, .timeline-item, .narrative-card');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
      });
    }
  }

  initScrollAnimations();

  /* ==========================================================================
     5. 3D CARD TILT & MAGNETIC HOVER (DESKTOP)
     ========================================================================== */
  if (window.matchMedia('(pointer: fine)').matches) {
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });

    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  /* ==========================================================================
     6. CONTACT UTILITIES: COPY EMAIL & TOAST CONFIRMATION
     ========================================================================== */
  const copyEmailActionBtn = document.getElementById('copy-email-action-btn');
  const copyEmailIconBtn = document.getElementById('copy-email-btn');
  const copyToast = document.getElementById('copy-toast');
  let toastTimer = null;

  function handleCopyEmail() {
    const emailToCopy = 'fulinaramarkluis@gmail.com';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailToCopy)
        .then(() => {
          if (copyToast) {
            copyToast.classList.add('visible');
            if (toastTimer) clearTimeout(toastTimer);
            toastTimer = setTimeout(() => {
              copyToast.classList.remove('visible');
            }, 2500);
          }
        })
        .catch(err => {
          console.warn('Clipboard write failed, manual copy available', err);
        });
    } else {
      // Fallback for older browsers
      try {
        const tempInput = document.createElement('textarea');
        tempInput.value = emailToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        if (copyToast) {
          copyToast.classList.add('visible');
          if (toastTimer) clearTimeout(toastTimer);
          toastTimer = setTimeout(() => {
            copyToast.classList.remove('visible');
          }, 2500);
        }
      } catch (e) {
        console.warn('Fallback copy failed', e);
      }
    }
  }

  if (copyEmailActionBtn) {
    copyEmailActionBtn.addEventListener('click', handleCopyEmail);
  }
  if (copyEmailIconBtn) {
    copyEmailIconBtn.addEventListener('click', handleCopyEmail);
  }

  // Copy about JSON utility if present
  const copyAboutBtn = document.getElementById('copy-about-json');
  if (copyAboutBtn) {
    copyAboutBtn.addEventListener('click', () => {
      const jsonCode = document.querySelector('.json-code');
      if (jsonCode && navigator.clipboard) {
        navigator.clipboard.writeText(jsonCode.innerText).then(() => {
          const originalHTML = copyAboutBtn.innerHTML;
          copyAboutBtn.innerHTML = `<span>✓ Copied!</span>`;
          setTimeout(() => {
            copyAboutBtn.innerHTML = originalHTML;
          }, 2000);
        }).catch(err => console.error('Failed to copy', err));
      }
    });
  }

  /* ==========================================================================
     13. BACK TO TOP BUTTON
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     14. IMAGE PLACEHOLDERS RESILIENCE HANDLER
     ========================================================================== */
  const placeholderImages = document.querySelectorAll('.placeholder-img');
  placeholderImages.forEach(img => {
    // If the image file exists and loaded successfully
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('loaded');
      img.parentElement.classList.add('has-file');
    }

    img.addEventListener('load', () => {
      img.style.display = 'block';
      img.classList.add('loaded');
      img.parentElement.classList.add('has-file');
    });

    img.addEventListener('error', () => {
      // Keep placeholder label and dimensions clearly visible
      img.style.display = 'none';
      img.parentElement.classList.add('no-file');
    });
  });

  /* ==========================================================================
     15. HERO PORTRAIT SPOTLIGHT BRUSH TRAIL + 3-SECOND FADING MARKS
     Features:
       1) BRUSH / HOVER TRAIL (Marks disappear after 3 seconds):
          - Circle radius reduced to 42px (bawas pa) for a nimble, refined lens
          - Moving cursor or dragging finger paints marks that reveal images/pxel.jpg
          - Each mark smoothly fades out over exactly 3 seconds (3000ms)
          - Interpolates between mouse points for buttery-smooth strokes
          - Glowing neon ring follows the pointer position with smooth lerp
          - Caption: "// brush to reveal, click to pixelate"
       2) CLICK = FULL PIXEL FOR 5 SECONDS:
          - Radial wave expands from click point to cover the whole frame (~850px)
          - 150ms impact pixelation flash on click
          - 5-second countdown bar that empties across the frame
          - Dynamic countdown ticker: "// pixel mode, reverting in 5s... 4s... 3s..."
          - Re-clicking during the 5s cleanly restarts the timer without stacking
          - After 5s, smoothly returns to normal photo (images/fulinara.png)
       3) TOUCH, KEYBOARD & ACCESSIBILITY:
          - Touch drag paints the 3-second pixel trail; tap triggers 5s full mode
          - Keyboard accessible (Enter & Space) with high-contrast focus ring
          - Preloaded images, alt text for both versions, non-blocking pointer events
     ========================================================================== */
  const portraitFrame = document.getElementById('portrait-frame');
  const heroPortraitWindow = document.querySelector('.hero-portrait-window');
  const imgFulinara = document.getElementById('img-fulinara');
  const imgPxel = document.getElementById('img-pxel');
  const trailCanvas = document.getElementById('portrait-trail-canvas');
  const spotlightRing = document.getElementById('portrait-spotlight-ring');
  const pixelCanvas = document.getElementById('portrait-pixel-canvas');
  const captionText = document.getElementById('portrait-caption-text');
  const countdownBar = document.getElementById('portrait-countdown-bar');
  const modeTag = document.getElementById('portrait-mode-tag');

  // Preload images to eliminate switch flicker
  const preloadFulinara = new Image();
  preloadFulinara.src = 'images/fulinara.png';
  const preloadPxel = new Image();
  preloadPxel.src = 'images/pxel.jpg';
  preloadPxel.onerror = () => {
    preloadPxel.src = 'images/pixel.jpg';
  };

  if (imgPxel) {
    imgPxel.addEventListener('error', function onPxelErr() {
      if (!this.src.includes('pixel.jpg')) {
        this.src = 'images/pixel.jpg';
      }
    });
  }

  // Brush trail & spotlight configuration
  const BRUSH_RADIUS = 42; // Reduced circle radius ("bawas pa")
  const TRAIL_LIFETIME = 3000; // Marks fade and disappear after 3 seconds ("mag didisappear ng mga 3sec")

  const trailStrokes = [];
  let lastStrokeX = null;
  let lastStrokeY = null;

  // Cursor following lerp
  let currentCursorX = 0;
  let currentCursorY = 0;
  let targetCursorX = 0;
  let targetCursorY = 0;
  let isPointerInside = false;

  // Full pixel state
  let isFullPixel = false;
  let fullPixelAnimRadius = 0;
  let fullPixelTargetRadius = 0;
  let fullPixelOriginX = 0;
  let fullPixelOriginY = 0;
  let fullPixelTimeout = null;
  let countdownInterval = null;
  const FULL_PIXEL_DURATION = 5000;
  let countdownRemaining = FULL_PIXEL_DURATION;

  let frameWidth = 380;
  let frameHeight = 475;

  // Offscreen canvas for alpha masking
  const offMaskCanvas = document.createElement('canvas');
  const offMaskCtx = offMaskCanvas.getContext('2d');

  function updateFrameDimensions() {
    if (portraitFrame) {
      const rect = portraitFrame.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        frameWidth = Math.floor(rect.width);
        frameHeight = Math.floor(rect.height);
        if (trailCanvas) {
          trailCanvas.width = frameWidth;
          trailCanvas.height = frameHeight;
        }
        offMaskCanvas.width = frameWidth;
        offMaskCanvas.height = frameHeight;
      }
    }
  }

  // Interpolate points along the movement path so rapid strokes don't have gaps
  function stampTrailPoint(x, y) {
    const now = performance.now();
    if (lastStrokeX === null) {
      trailStrokes.push({ x, y, time: now, r: BRUSH_RADIUS });
      lastStrokeX = x;
      lastStrokeY = y;
      return;
    }

    const dx = x - lastStrokeX;
    const dy = y - lastStrokeY;
    const dist = Math.hypot(dx, dy);

    // Drop interpolated stamps every 6px along the stroke
    const step = 6;
    if (dist >= step) {
      const stepsCount = Math.floor(dist / step);
      for (let i = 1; i <= stepsCount; i++) {
        const px = lastStrokeX + dx * (i / stepsCount);
        const py = lastStrokeY + dy * (i / stepsCount);
        trailStrokes.push({ x: px, y: py, time: now, r: BRUSH_RADIUS });
      }
      lastStrokeX = x;
      lastStrokeY = y;
    }
  }

  // Main 60FPS Trail Render & Lerp Loop
  function renderTrailLoop() {
    const now = performance.now();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Smooth cursor trailing
    if (prefersReduced) {
      currentCursorX = targetCursorX;
      currentCursorY = targetCursorY;
    } else {
      currentCursorX += (targetCursorX - currentCursorX) * 0.2;
      currentCursorY += (targetCursorY - currentCursorY) * 0.2;
    }

    // Update CSS variables for the neon ring and spotlight
    if (portraitFrame) {
      portraitFrame.style.setProperty('--x', `${currentCursorX.toFixed(1)}px`);
      portraitFrame.style.setProperty('--y', `${currentCursorY.toFixed(1)}px`);
      portraitFrame.style.setProperty('--r', `${BRUSH_RADIUS}px`);

      if (isPointerInside && !isFullPixel) {
        portraitFrame.classList.add('is-spotlight-active');
      } else {
        portraitFrame.classList.remove('is-spotlight-active');
      }
    }

    // Animate full-pixel expansion radius
    if (isFullPixel) {
      fullPixelAnimRadius += (fullPixelTargetRadius - fullPixelAnimRadius) * 0.12;
    } else {
      fullPixelAnimRadius += (0 - fullPixelAnimRadius) * 0.15;
    }

    // Filter out trail marks older than 3 seconds (3000ms)
    for (let i = trailStrokes.length - 1; i >= 0; i--) {
      if (now - trailStrokes[i].time > TRAIL_LIFETIME) {
        trailStrokes.splice(i, 1);
      }
    }

    // Render trail canvas if available
    if (trailCanvas) {
      const ctx = trailCanvas.getContext('2d');
      ctx.clearRect(0, 0, frameWidth, frameHeight);

      const hasTrail = trailStrokes.length > 0;
      const hasFullReveal = fullPixelAnimRadius > 2;

      if (hasTrail || hasFullReveal) {
        // Step 1: Render alpha mask on offscreen canvas
        offMaskCtx.clearRect(0, 0, frameWidth, frameHeight);

        // Draw each 3-second fading mark
        for (let i = 0; i < trailStrokes.length; i++) {
          const pt = trailStrokes[i];
          const age = now - pt.time;
          const progress = age / TRAIL_LIFETIME;
          const alpha = Math.max(0, 1 - progress);
          // Ease curve for a soft, natural dissolve
          const easeAlpha = Math.pow(alpha, 1.25);

          const grad = offMaskCtx.createRadialGradient(pt.x, pt.y, pt.r * 0.35, pt.x, pt.y, pt.r);
          grad.addColorStop(0, `rgba(0, 0, 0, ${easeAlpha.toFixed(3)})`);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          offMaskCtx.fillStyle = grad;
          offMaskCtx.beginPath();
          offMaskCtx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
          offMaskCtx.fill();
        }

        // Draw expanding full pixel wave if clicked
        if (hasFullReveal) {
          const fullGrad = offMaskCtx.createRadialGradient(
            fullPixelOriginX,
            fullPixelOriginY,
            Math.max(0, fullPixelAnimRadius - 30),
            fullPixelOriginX,
            fullPixelOriginY,
            fullPixelAnimRadius
          );
          fullGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
          fullGrad.addColorStop(1, 'rgba(0, 0, 0, 0.9)');

          offMaskCtx.fillStyle = fullGrad;
          offMaskCtx.beginPath();
          offMaskCtx.arc(fullPixelOriginX, fullPixelOriginY, fullPixelAnimRadius, 0, Math.PI * 2);
          offMaskCtx.fill();
        }

        // Step 2: Draw the pixel art photo masked by the fading marks
        const source = (imgPxel && imgPxel.complete && imgPxel.naturalWidth > 0)
          ? imgPxel
          : ((imgFulinara && imgFulinara.complete && imgFulinara.naturalWidth > 0) ? imgFulinara : null);

        if (source) {
          ctx.drawImage(source, 0, 0, frameWidth, frameHeight);
          ctx.globalCompositeOperation = 'destination-in';
          ctx.drawImage(offMaskCanvas, 0, 0);
          ctx.globalCompositeOperation = 'source-over';
        }
      }
    }

    requestAnimationFrame(renderTrailLoop);
  }

  // Quick 150ms impact pixelation flash
  function triggerPixelFlash() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !pixelCanvas) return;

    pixelCanvas.style.display = 'block';
    pixelCanvas.width = frameWidth;
    pixelCanvas.height = frameHeight;
    const ctx = pixelCanvas.getContext('2d');

    const source = (imgPxel && imgPxel.complete && imgPxel.naturalWidth > 0)
      ? imgPxel
      : ((imgFulinara && imgFulinara.complete && imgFulinara.naturalWidth > 0) ? imgFulinara : null);

    const flashStart = performance.now();
    const flashDuration = 150;

    function flashStep(now) {
      const p = Math.min((now - flashStart) / flashDuration, 1);
      ctx.clearRect(0, 0, frameWidth, frameHeight);

      if (source) {
        const blockSize = Math.max(4, Math.floor(28 * (1 - p)));
        const sw = Math.max(1, Math.floor(frameWidth / blockSize));
        const sh = Math.max(1, Math.floor(frameHeight / blockSize));

        const off = document.createElement('canvas');
        off.width = sw;
        off.height = sh;
        const octx = off.getContext('2d');
        octx.imageSmoothingEnabled = false;
        octx.drawImage(source, 0, 0, sw, sh);

        ctx.imageSmoothingEnabled = false;
        ctx.globalAlpha = 1 - p * 0.35;
        ctx.drawImage(off, 0, 0, sw, sh, 0, 0, frameWidth, frameHeight);
      }

      if (p < 1) {
        requestAnimationFrame(flashStep);
      } else {
        pixelCanvas.style.display = 'none';
      }
    }
    requestAnimationFrame(flashStep);
  }

  // 5-Second Timer with Dynamic Countdown Bar
  function startOrReset5sTimer() {
    if (fullPixelTimeout) clearTimeout(fullPixelTimeout);
    if (countdownInterval) clearInterval(countdownInterval);

    countdownRemaining = FULL_PIXEL_DURATION;
    if (countdownBar) countdownBar.style.width = '100%';

    const tickMs = 50;
    countdownInterval = setInterval(() => {
      countdownRemaining -= tickMs;
      if (countdownRemaining < 0) countdownRemaining = 0;

      const percent = (countdownRemaining / FULL_PIXEL_DURATION) * 100;
      if (countdownBar) {
        countdownBar.style.width = `${percent}%`;
      }

      const secs = Math.ceil(countdownRemaining / 1000);
      if (captionText) {
        captionText.textContent = `// pixel mode, reverting in ${secs}s`;
      }
    }, tickMs);

    fullPixelTimeout = setTimeout(() => {
      revertFromFullPixel();
    }, FULL_PIXEL_DURATION);
  }

  function revertFromFullPixel() {
    if (countdownInterval) clearInterval(countdownInterval);
    if (countdownBar) countdownBar.style.width = '0%';

    isFullPixel = false;
    fullPixelTargetRadius = 0;

    if (heroPortraitWindow) heroPortraitWindow.classList.remove('pixel-mode-active');
    if (portraitFrame) {
      portraitFrame.classList.remove('pixel-mode-active');
      portraitFrame.setAttribute(
        'aria-label',
        'Mark Luis Fulinara portrait: brush over photo to reveal pixel art trail, click for full pixel mode'
      );
    }
    if (modeTag) modeTag.textContent = '800×1000 • PNG';
    if (captionText) captionText.textContent = '// brush to reveal, click to pixelate';
  }

  function activateFullPixelMode(originX, originY) {
    updateFrameDimensions();

    fullPixelOriginX = originX;
    fullPixelOriginY = originY;
    fullPixelAnimRadius = BRUSH_RADIUS;
    fullPixelTargetRadius = Math.hypot(frameWidth, frameHeight) * 1.5;

    isFullPixel = true;

    if (heroPortraitWindow) heroPortraitWindow.classList.add('pixel-mode-active');
    if (portraitFrame) {
      portraitFrame.classList.add('pixel-mode-active');
      portraitFrame.setAttribute('aria-label', 'Pixel art version of Mark Luis: click to reset 5s timer');
    }
    if (modeTag) modeTag.textContent = '800×1000 • FULL PIXEL';

    triggerPixelFlash();
    startOrReset5sTimer();
  }

  if (portraitFrame) {
    updateFrameDimensions();
    window.addEventListener('resize', updateFrameDimensions);

    // Pointer Enter
    portraitFrame.addEventListener('pointerenter', (e) => {
      isPointerInside = true;
      const rect = portraitFrame.getBoundingClientRect();
      targetCursorX = e.clientX - rect.left;
      targetCursorY = e.clientY - rect.top;
      currentCursorX = targetCursorX;
      currentCursorY = targetCursorY;
      lastStrokeX = null;
      lastStrokeY = null;
      stampTrailPoint(targetCursorX, targetCursorY);
    });

    // Pointer Move / Drag: paint marks that fade over 3s
    portraitFrame.addEventListener('pointermove', (e) => {
      isPointerInside = true;
      const rect = portraitFrame.getBoundingClientRect();
      targetCursorX = e.clientX - rect.left;
      targetCursorY = e.clientY - rect.top;
      stampTrailPoint(targetCursorX, targetCursorY);
    });

    // Pointer Leave
    portraitFrame.addEventListener('pointerleave', () => {
      isPointerInside = false;
      lastStrokeX = null;
      lastStrokeY = null;
    });

    // Click / Pointer Tap: full pixel mode
    portraitFrame.addEventListener('click', (e) => {
      const rect = portraitFrame.getBoundingClientRect();
      const clickX = e.clientX !== undefined && e.clientX > 0 ? e.clientX - rect.left : frameWidth / 2;
      const clickY = e.clientY !== undefined && e.clientY > 0 ? e.clientY - rect.top : frameHeight / 2;

      if (isFullPixel) {
        // Re-clicking during 5s restarts the 5s timer cleanly without stacking
        triggerPixelFlash();
        startOrReset5sTimer();
      } else {
        activateFullPixelMode(clickX, clickY);
      }
    });

    // Keyboard support: Enter / Space triggers full pixel mode centered
    portraitFrame.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        updateFrameDimensions();
        const centerX = frameWidth / 2;
        const centerY = frameHeight / 2;

        if (isFullPixel) {
          triggerPixelFlash();
          startOrReset5sTimer();
        } else {
          activateFullPixelMode(centerX, centerY);
        }
      }
    });

    // Start RAF rendering loop
    requestAnimationFrame(renderTrailLoop);
  }

});

