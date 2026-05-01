document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');
  const scrollTop = document.getElementById('scrollTop');
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieHide = document.getElementById('cookieHide');

  // Header scroll behavior & subtle hero parallax
  const hero = document.getElementById('hero');
  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    
    // Header
    if (scrollY > 100) {
      header.classList.add('scrolled');
      scrollTop.classList.add('visible');
    } else {
      header.classList.remove('scrolled');
      scrollTop.classList.remove('visible');
    }

    // Subtle Hero Parallax (moves background slightly as you scroll)
    if (hero && scrollY < window.innerHeight) {
      hero.style.backgroundPosition = `center ${scrollY * 0.3}px`;
    }
  });

  // Mobile menu toggle
  mobileToggle.addEventListener('click', function () {
    this.classList.toggle('active');
    mainNav.classList.toggle('active');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.main-nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileToggle.classList.remove('active');
      mainNav.classList.remove('active');
    });
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      var target = document.querySelector(targetId);
      if (target) {
        var headerHeight = header.offsetHeight;
        var targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // Scroll to top
  scrollTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Cookie banner
  if (cookieAccept) {
    cookieAccept.addEventListener('click', function () {
      cookieBanner.classList.add('hidden');
    });
  }
  if (cookieHide) {
    cookieHide.addEventListener('click', function () {
      cookieBanner.classList.add('hidden');
    });
  }

  // Video play button
  var videoPlayBtn = document.getElementById('videoPlayBtn');
  var spotlightVideo = document.getElementById('spotlightVideo');
  if (videoPlayBtn && spotlightVideo) {
    videoPlayBtn.addEventListener('click', function () {
      spotlightVideo.play();
      spotlightVideo.setAttribute('controls', 'controls');
      videoPlayBtn.classList.add('hidden');
    });
    spotlightVideo.addEventListener('pause', function () {
      videoPlayBtn.classList.remove('hidden');
    });
    spotlightVideo.addEventListener('ended', function () {
      spotlightVideo.removeAttribute('controls');
      videoPlayBtn.classList.remove('hidden');
    });
  }

  // Contact form
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you for your message. We will be in touch shortly.');
      contactForm.reset();
    });
  }

  // Scroll-triggered fade-in animations
  var observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach(function (section) {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  document.querySelectorAll('.fade-in-target').forEach(function (el) {
    observer.observe(el);
  });

  var teamSection = document.querySelector('.team-section');
  if (teamSection) {
    var lastPath = teamSection.querySelector('.team-path:last-child');
    if (lastPath) {
      lastPath.addEventListener('animationend', function handler(e) {
        if (e.animationName === 'teamPathIn') {
          lastPath.removeEventListener('animationend', handler);
          setTimeout(function() {
            teamSection.classList.add('team-looping');
          }, 2000);
        }
      });
    }
  }

  function alignDomes() {
    var approachBg = document.querySelector('.approach-bg-img');
    if (approachBg) {
      approachBg.style.height = '';
      approachBg.style.top = '';
      approachBg.style.bottom = '';
    }

    var newsBg = document.querySelector('.news-bg-img');
    var newsSection = document.querySelector('.news-section');
    var newsImg = document.querySelector('.news-img-frame');
    if (newsSection && newsImg && newsBg && window.innerWidth > 768) {
      var nsRect = newsSection.getBoundingClientRect();
      var niRect = newsImg.getBoundingClientRect();
      var nBottomPx = niRect.bottom - nsRect.top;
      newsBg.style.height = nBottomPx + 'px';
      newsBg.style.top = '0';
      newsBg.style.bottom = '';
    } else if (newsBg) {
      newsBg.style.height = '';
      newsBg.style.top = '';
      newsBg.style.bottom = '';
    }
  }

  alignDomes();
  window.addEventListener('resize', alignDomes);
});
