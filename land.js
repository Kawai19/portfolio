document.addEventListener('DOMContentLoaded', function() {
  // Случайные значки и цвета для трёх плавающих иконок
  const iconNames = [
    'developer_mode', 'computer', 'build', 'code', 'settings', 'storage', 'api', 'cloud',
    'router', 'security', 'web', 'dns', 'terminal', 'integration_instructions', 'auto_awesome',
    'data_usage', 'devices', 'memory', 'smart_toy', 'widgets', 'animation', 'backup',
    'bug_report', 'dashboard', 'dataset', 'deployed_code', 'engineering', 'folder_special'
  ];
  
  const colorPalette = [
    'rgb(162, 0, 255)', 'rgb(138, 43, 226)', 'rgb(153, 50, 204)', 'rgb(186, 85, 211)',
    'rgb(147, 112, 219)', 'rgb(123, 104, 238)', 'rgb(106, 90, 205)', 'rgb(72, 61, 139)',
    'rgb(75, 0, 130)', 'rgb(102, 51, 153)', 'rgb(139, 0, 255)', 'rgb(128, 0, 255)'
  ];
  
  function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  const floatingIcons = document.querySelectorAll('.floating-icon');
  let selectedIcons = [];
  while (selectedIcons.length < floatingIcons.length) {
    const candidate = getRandomItem(iconNames);
    if (!selectedIcons.includes(candidate)) selectedIcons.push(candidate);
  }
  
  floatingIcons.forEach((icon, index) => {
    const iconSpan = icon.querySelector('.material-icons');
    if (iconSpan) iconSpan.textContent = selectedIcons[index];
    icon.style.color = getRandomItem(colorPalette);
  });
  
  // Бургер-меню с проверками
  const burger = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');
  
  function toggleMenu() {
    if (!navLinks || !burger) return;
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
  }
  
  if (burger) {
    burger.addEventListener('click', toggleMenu);
  } else {
    console.warn('Кнопка бургера не найдена!');
  }
  
  if (navLinks) {
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (burger) burger.classList.remove('active');
      });
    });
  }
  
  // Плавный скролл
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        const offset = 70;
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      }
    });
  });
  
  // Intersection Observer для анимаций
  const animatedElements = document.querySelectorAll('.fade-up, .project-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -20px 0px" });
  animatedElements.forEach(el => observer.observe(el));
  
  // Параллакс для плавающих иконок
  document.addEventListener('mousemove', (e) => {
    if (!floatingIcons.length) return;
    const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
    floatingIcons.forEach(icon => {
      icon.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
    });
  });
  
  // Динамический подсчёт лет опыта
  const startYear = 2021;
  const currentYear = new Date().getFullYear();
  const expYears = currentYear - startYear;
  const heroDesc = document.querySelector('.hero-desc');
  if (heroDesc) {
    heroDesc.innerHTML = `Автоматизация, веб-технологии, IT-инфраструктура. <strong>Опыт в IT: ${expYears}+ лет</strong>.`;
  } else {
    const heroParagraphs = document.querySelectorAll('.hero-content p');
    if (heroParagraphs.length >= 2) {
      heroParagraphs[1].innerHTML = `<strong>Опыт в IT: ${expYears}+ лет</strong>`;
    }
  }
  
  // Анимация иконок проектов
  const projectIcons = document.querySelectorAll('.project-icon');
  projectIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transition = 'transform 0.2s';
      icon.style.transform = 'scale(1.03)';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'scale(1)';
    });
  });
  
  // Эффекты для кнопок hero
  const btns = document.querySelectorAll('.btn-icon');
  btns.forEach(btn => {
    btn.addEventListener('mouseover', () => {
      btn.style.background = '#e0e8ff';
      btn.style.borderColor = '#0066cc40';
    });
    btn.addEventListener('mouseout', () => {
      btn.style.background = '#f0f0f0';
      btn.style.borderColor = 'transparent';
    });
  });
  
  // Задержка появления карточек
  const extraCards = document.querySelectorAll('.project-card');
  extraCards.forEach((card, idx) => {
    card.style.transitionDelay = `${idx * 0.05}s`;
  });
  
  // Бейдж статуса (московское время)
  const statusDiv = document.createElement('div');
  statusDiv.className = 'status-badge';
  statusDiv.style.position = 'fixed';
  statusDiv.style.bottom = '20px';
  statusDiv.style.right = '20px';
  statusDiv.style.backgroundColor = '#111111dd';
  statusDiv.style.color = 'white';
  statusDiv.style.padding = '6px 14px';
  statusDiv.style.borderRadius = '40px';
  statusDiv.style.fontSize = '0.75rem';
  statusDiv.style.fontFamily = 'monospace';
  statusDiv.style.backdropFilter = 'blur(6px)';
  statusDiv.style.zIndex = '999';
  statusDiv.style.pointerEvents = 'none';
  document.body.appendChild(statusDiv);
  
  function updateTimeStatus() {
    const now = new Date();
    const mskTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Yekaterinburg" }));
    const hours = mskTime.getHours().toString().padStart(2, '0');
    const minutes = mskTime.getMinutes().toString().padStart(2, '0');
    statusDiv.innerHTML = `🟢 готов к работе · ${hours}:${minutes} YEKT`;
  }
  updateTimeStatus();
  setInterval(updateTimeStatus, 60000);
  
  // Эффект при скролле для хедера
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.pageYOffset > 100) {
      header.style.background = 'rgba(18, 18, 18, 0.98)';
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    } else {
      header.style.background = 'rgba(18, 18, 18, 0.95)';
      header.style.boxShadow = 'none';
    }
  });
  
  // Параллакс для hero-title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    window.addEventListener('scroll', () => {
      let offset = window.scrollY * 0.2;
      heroTitle.style.transform = `translateY(${offset * 0.08}px)`;
    });
  }
  
  console.log('✅ Портфолио загружено: бургер работает, анимация внутри шапки');
  
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', () => {
      const heroSection = document.querySelector('.hero');
      if (heroSection) {
        const offset = 70;
        const elementPosition = heroSection.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      }
    });
  }
});
