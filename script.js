// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize all components
  initEntranceAnimation();
  // initParticles();
  // initCandlestickChart();
  // initParallax();
  initSyntheticTicker();
  initHeader();
  // initHowItWorksCircles();
  init3DGlobe();
  initTestimonialWall();
  initJmjAdvantage();
  initResultsGallery(); // Renamed to avoid conflicts
  initFaq();
  initAboutSection();
  initPillars();
  initStatsSection();
  initTypewriterHero();
  // initHowItWorks(); // Commented out if not ready
});

// HEADER & NAVIGATION FUNCTIONALITY
function initHeader() {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileGetStarted = document.querySelector('.mobile-get-started');
  
  // Header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Hamburger click animation and menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      menuOverlay.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }
  
  // Close menu when clicking overlay
  if (menuOverlay) {
    menuOverlay.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Close menu when clicking mobile links
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu when clicking mobile get started
  if (mobileGetStarted) {
    mobileGetStarted.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Entrance Animation
function initEntranceAnimation() {
  setTimeout(function() {
    const heroContent = document.getElementById('heroContent');
    if (heroContent) {
      heroContent.classList.add('show');
    }
  }, 300);
}

// Floating Particles
function initParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  particlesContainer.innerHTML = '';
  
  for (let i = 0; i < 40; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement('span');
  
  const left = Math.random() * 100;
  const delay = Math.random() * 10;
  const opacity = Math.random() * 0.5 + 0.3;
  const size = Math.random() * 4 + 2;
  
  particle.style.left = left + '%';
  particle.style.animationDelay = delay + 's';
  particle.style.opacity = opacity;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  
  container.appendChild(particle);
}

// PROFESSIONAL CANDLESTICK CHART
function initCandlestickChart() {
  const canvas = document.getElementById('chartCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  const config = {
    candleWidth: 10,
    candleSpacing: 6,
    wickWidth: 1,
    bullishColor: '#d4af37',
    bearishColor: '#4a4a4a',
    glowIntensity: 8,
    gridOpacity: 0.1
  };
  
  let candles = [];
  let lastPrice = 1.2000;
  let animationFrame;
  let lastTimestamp = 0;
  let frameCounter = 0;
  const updateFrequency = 4;
  
  function initializeCandles() {
    candles = [];
    let price = lastPrice;
    const totalCandleWidth = config.candleWidth + config.candleSpacing;
    const screenWidth = window.innerWidth;
    const candlesNeeded = Math.ceil(screenWidth / totalCandleWidth) + 20;
    
    for (let i = 0; i < candlesNeeded; i++) {
      const candle = generateCandle(price);
      candles.push(candle);
      price = candle.close;
    }
    
    lastPrice = price;
  }
  
  function generateCandle(prevClose) {
    const isBullish = Math.random() < 0.6;
    const bodySize = (Math.random() * 0.015 + 0.005) * prevClose;
    const upperWick = (Math.random() * 0.008 + 0.002) * prevClose;
    const lowerWick = (Math.random() * 0.008 + 0.002) * prevClose;
    
    let open, close, high, low;
    
    if (isBullish) {
      open = prevClose;
      close = prevClose + bodySize;
      high = close + upperWick;
      low = open - lowerWick;
    } else {
      open = prevClose;
      close = prevClose - bodySize;
      high = open + upperWick;
      low = close - lowerWick;
    }
    
    high = Math.max(high, open, close);
    low = Math.min(low, open, close);
    
    return {
      open,
      close,
      high,
      low,
      isBullish
    };
  }
  
  function addNewCandle() {
    const newCandle = generateCandle(lastPrice);
    candles.push(newCandle);
    candles.shift();
    lastPrice = newCandle.close;
  }
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeCandles();
  }
  
  function drawGrid() {
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.save();
    ctx.strokeStyle = '#d4af37';
    ctx.globalAlpha = config.gridOpacity;
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i <= 6; i++) {
      const y = (height * 0.15) + (i * (height * 0.7) / 6);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    for (let i = 0; i <= 8; i++) {
      const x = i * (width / 8);
      ctx.beginPath();
      ctx.moveTo(x, height * 0.15);
      ctx.lineTo(x, height * 0.85);
      ctx.stroke();
    }
    ctx.restore();
  }
  
  function drawCandle(candle, x, yScale) {
    const { open, close, high, low, isBullish } = candle;
    
    const openY = yScale(open);
    const closeY = yScale(close);
    const highY = yScale(high);
    const lowY = yScale(low);
    
    const candleTop = Math.min(openY, closeY);
    const candleBottom = Math.max(openY, closeY);
    const candleBodyHeight = candleBottom - candleTop;
    
    ctx.save();
    ctx.shadowColor = isBullish ? '#d4af37' : '#666666';
    ctx.shadowBlur = config.glowIntensity;
    
    ctx.beginPath();
    ctx.strokeStyle = isBullish ? '#d4af37' : '#888888';
    ctx.lineWidth = config.wickWidth;
    ctx.moveTo(x + config.candleWidth / 2, highY);
    ctx.lineTo(x + config.candleWidth / 2, lowY);
    ctx.stroke();
    
    ctx.fillStyle = isBullish ? config.bullishColor : config.bearishColor;
    ctx.fillRect(x, candleTop, config.candleWidth, Math.max(1, candleBodyHeight));
    
    ctx.restore();
  }
  
  function animate(timestamp) {
    if (!lastTimestamp) {
      lastTimestamp = timestamp;
      animationFrame = requestAnimationFrame(animate);
      return;
    }
    
    if (timestamp - lastTimestamp > 16) {
      frameCounter++;
      if (frameCounter >= updateFrequency) {
        addNewCandle();
        frameCounter = 0;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const height = canvas.height;
      const width = canvas.width;
      const chartTop = height * 0.15;
      const chartBottom = height * 0.85;
      const chartHeight = chartBottom - chartTop;
      
      const prices = candles.flatMap(c => [c.high, c.low]);
      const minPrice = Math.min(...prices) * 0.999;
      const maxPrice = Math.max(...prices) * 1.001;
      
      const yScale = (price) => chartTop + ((maxPrice - price) / (maxPrice - minPrice)) * chartHeight;
      
      drawGrid();
      
      const totalCandleWidth = config.candleWidth + config.candleSpacing;
      const startX = width - totalCandleWidth;
      
      for (let i = 0; i < candles.length; i++) {
        const candle = candles[i];
        const x = startX - (i * totalCandleWidth);
        if (x > -totalCandleWidth * 2 && x < width + totalCandleWidth) {
          drawCandle(candle, x, yScale);
        }
      }
      
      lastTimestamp = timestamp;
    }
    
    animationFrame = requestAnimationFrame(animate);
  }
  
  resizeCanvas();
  initializeCandles();
  
  window.addEventListener('resize', () => {
    setTimeout(resizeCanvas, 100);
  });
  
  animate();
}

// Mouse Parallax Effect
function initParallax() {
  const heroContent = document.getElementById('heroContent');
  if (!heroContent) return;
  
  let isAnimating = false;
  let currentX = 0;
  let currentY = 0;
  
  document.addEventListener('mousemove', function(e) {
    if (!heroContent.classList.contains('show')) return;
    
    const targetX = (window.innerWidth / 2 - e.clientX) / 40;
    const targetY = (window.innerHeight / 2 - e.clientY) / 40;
    
    if (!isAnimating) {
      isAnimating = true;
      
      function animate() {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;
        
        heroContent.style.transform = 'translate(' + currentX + 'px, ' + currentY + 'px)';
        
        if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
          requestAnimationFrame(animate);
        } else {
          isAnimating = false;
        }
      }
      
      requestAnimationFrame(animate);
    }
  });
  
  document.addEventListener('mouseleave', function() {
    if (!heroContent.classList.contains('show')) return;
    currentX = 0;
    currentY = 0;
    heroContent.style.transform = 'translate(0, 0)';
    isAnimating = false;
  });
}

// ===== LIVE DERIV TICKER - ALL VOLATILITY + STEP INDICES =====
function initSyntheticTicker() {
  // Check if ticker already exists
  if (document.querySelector('.synthetic-ticker')) return;
  
  // Create ticker container
  const ticker = document.createElement('div');
  ticker.className = 'synthetic-ticker';
  
  // Add to page
  document.body.appendChild(ticker);
  
  // Create ticker structure with ALL symbols (existing + new)
  ticker.innerHTML = `
    <div class="ticker-wrapper">
      <div class="ticker-content" id="tickerContent">
        <!-- EXISTING VOLATILITY INDICES -->
        <div class="ticker-item">
          <span class="ticker-symbol">V75</span>
          <span class="ticker-price" id="price-V75">---</span>
          <span class="ticker-change" id="change-V75">---</span>
        </div>
        <div class="ticker-item">
          <span class="ticker-symbol">V50</span>
          <span class="ticker-price" id="price-V50">---</span>
          <span class="ticker-change" id="change-V50">---</span>
        </div>
        <div class="ticker-item">
          <span class="ticker-symbol">V100</span>
          <span class="ticker-price" id="price-V100">---</span>
          <span class="ticker-change" id="change-V100">---</span>
        </div>
        
        <!-- NEW VOLATILITY INDICES (1s series) - Smallest to Largest -->
        <div class="ticker-item">
          <span class="ticker-symbol">V10s</span>
          <span class="ticker-price" id="price-V10s">---</span>
          <span class="ticker-change" id="change-V10s">---</span>
        </div>
        <div class="ticker-item">
          <span class="ticker-symbol">V15s</span>
          <span class="ticker-price" id="price-V15s">---</span>
          <span class="ticker-change" id="change-V15s">---</span>
        </div>
        <div class="ticker-item">
          <span class="ticker-symbol">V25s</span>
          <span class="ticker-price" id="price-V25s">---</span>
          <span class="ticker-change" id="change-V25s">---</span>
        </div>
        <div class="ticker-item">
          <span class="ticker-symbol">V30s</span>
          <span class="ticker-price" id="price-V30s">---</span>
          <span class="ticker-change" id="change-V30s">---</span>
        </div>
        <div class="ticker-item">
          <span class="ticker-symbol">V50s</span>
          <span class="ticker-price" id="price-V50s">---</span>
          <span class="ticker-change" id="change-V50s">---</span>
        </div>
        <div class="ticker-item">
          <span class="ticker-symbol">V75s</span>
          <span class="ticker-price" id="price-V75s">---</span>
          <span class="ticker-change" id="change-V75s">---</span>
        </div>
        <div class="ticker-item">
          <span class="ticker-symbol">V90s</span>
          <span class="ticker-price" id="price-V90s">---</span>
          <span class="ticker-change" id="change-V90s">---</span>
        </div>
        <div class="ticker-item">
          <span class="ticker-symbol">V100s</span>
          <span class="ticker-price" id="price-V100s">---</span>
          <span class="ticker-change" id="change-V100s">---</span>
        </div>
        <div class="ticker-item">
          <span class="ticker-symbol">V150s</span>
          <span class="ticker-price" id="price-V150s">---</span>
          <span class="ticker-change" id="change-V150s">---</span>
        </div>
        <div class="ticker-item">
          <span class="ticker-symbol">V250s</span>
          <span class="ticker-price" id="price-V250s">---</span>
          <span class="ticker-change" id="change-V250s">---</span>
        </div>
        
        <!-- BOOM & CRASH (existing) -->
        <div class="ticker-item">
          <span class="ticker-symbol">B500</span>
          <span class="ticker-price" id="price-B500">---</span>
          <span class="ticker-change" id="change-B500">---</span>
        </div>
        <div class="ticker-item">
          <span class="ticker-symbol">C1000</span>
          <span class="ticker-price" id="price-C1000">---</span>
          <span class="ticker-change" id="change-C1000">---</span>
        </div>
        
        <!-- STEP INDICES - Smallest to Largest -->
        <div class="ticker-item">
          <span class="ticker-symbol">ST100</span>
          <span class="ticker-price" id="price-ST100">---</span>
          <span class="ticker-change" id="change-ST100">---</span>
        </div>
        <div class="ticker-item">
          <span class="ticker-symbol">ST200</span>
          <span class="ticker-price" id="price-ST200">---</span>
          <span class="ticker-change" id="change-ST200">---</span>
        </div>
        <div class="ticker-item">
          <span class="ticker-symbol">ST400</span>
          <span class="ticker-price" id="price-ST400">---</span>
          <span class="ticker-change" id="change-ST400">---</span>
        </div>
        <div class="ticker-item">
          <span class="ticker-symbol">ST500</span>
          <span class="ticker-price" id="price-ST500">---</span>
          <span class="ticker-change" id="change-ST500">---</span>
        </div>
      </div>
    </div>
  `;
  
  // Connect to Deriv WebSocket
  connectDerivWebSocket();
}

// Store previous prices for change calculation
const priceHistory = {};

function connectDerivWebSocket() {
  // Deriv WebSocket endpoint (use your own app_id)
  const ws = new WebSocket('wss://ws.derivws.com/websockets/v3?app_id=1089'); // Replace with your app_id
  
  // Complete symbol mapping for ALL indices
  const symbolMap = {
    // Existing
    'V75': 'R_75',
    'V50': 'R_50',
    'V100': 'R_100',
    'B500': 'BOOM500',
    'C1000': 'CRASH1000',
    
    // New Volatility 1s indices
    'V10s': '1HZ10V',
    'V15s': '1HZ15V',
    'V25s': '1HZ25V',
    'V30s': '1HZ30V',
    'V50s': '1HZ50V',
    'V75s': '1HZ75V',
    'V90s': '1HZ90V',
    'V100s': '1HZ100V',
    'V150s': 'R_150',
    'V250s': 'R_250',
    
    // Step Indices
    'ST100': 'STP100',
    'ST200': 'STP200',
    'ST400': 'STP400',
    'ST500': 'STP500'
  };
  
  // All symbols we want to display
  const ourSymbols = [
    'V75', 'V50', 'V100',           // Existing volatility
    'V10s', 'V15s', 'V25s', 'V30s',  // New volatility 1s (smallest first)
    'V50s', 'V75s', 'V90s', 'V100s',  // More volatility 1s
    'V150s', 'V250s',                 // Higher volatility
    'B500', 'C1000',                   // Boom & Crash
    'ST100', 'ST200', 'ST400', 'ST500' // Step indices
  ];
  
  ws.onopen = () => {
    console.log('✅ Connected to Deriv WebSocket');
    
    // Subscribe to ticks for each symbol
    ourSymbols.forEach(sym => {
      const derivSym = symbolMap[sym];
      if (!derivSym) {
        console.warn(`No mapping for symbol: ${sym}`);
        return;
      }
      
      const subscribeMsg = {
        ticks: derivSym,
        subscribe: 1
      };
      
      ws.send(JSON.stringify(subscribeMsg));
      console.log(`Subscribed to ${derivSym} (${sym})`);
    });
  };
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    // Check if it's a tick update
    if (data.tick) {
      const tick = data.tick;
      const derivSymbol = tick.symbol;
      
      // Map back to our display symbol
      let ourSymbol = null;
      for (let [our, deriv] of Object.entries(symbolMap)) {
        if (deriv === derivSymbol) {
          ourSymbol = our;
          break;
        }
      }
      
      if (!ourSymbol) return;
      
      const price = tick.quote;
      const priceElement = document.getElementById(`price-${ourSymbol}`);
      const changeElement = document.getElementById(`change-${ourSymbol}`);
      
      if (priceElement) {
        // Update price
        priceElement.textContent = price.toFixed(2);
        
        // Calculate change from previous price
        if (priceHistory[ourSymbol]) {
          const previousPrice = priceHistory[ourSymbol];
          const change = price - previousPrice;
          const percentChange = (change / previousPrice) * 100;
          const isPositive = change >= 0;
          
          if (changeElement) {
            changeElement.className = `ticker-change ${isPositive ? 'positive' : 'negative'}`;
            changeElement.innerHTML = `
              <span class="ticker-arrow">${isPositive ? '▲' : '▼'}</span>
              <span class="ticker-percent">${Math.abs(percentChange).toFixed(2)}%</span>
            `;
          }
        }
        
        // Store current price for next change calculation
        priceHistory[ourSymbol] = price;
      }
    }
    
    // Handle errors
    if (data.error) {
      console.error('Deriv API error:', data.error.message);
    }
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  ws.onclose = () => {
    console.log('WebSocket disconnected, reconnecting in 5 seconds...');
    setTimeout(connectDerivWebSocket, 5000);
  };
  
  // Store connection for cleanup
  window.derivWs = ws;
}

// HORIZONTAL CIRCLES
function initHowItWorksCircles() {
  const circles = document.querySelectorAll('.step-circle');
  
  function checkReveal() {
    circles.forEach((circle, index) => {
      const rect = circle.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 150;
      
      if (isVisible && !circle.classList.contains('revealed')) {
        setTimeout(() => {
          circle.classList.add('revealed');
          
          if (index > 0) {
            const prevConnector = circle.previousElementSibling;
            if (prevConnector && prevConnector.classList.contains('circle-connector')) {
              const line = prevConnector.querySelector('.connector-line-h');
              if (line) {
                if (window.innerWidth > 1000) {
                  line.style.width = '60px';
                } else {
                  line.style.height = '40px';
                }
              }
            }
          }
        }, index * 200);
      }
    });
  }
  
  setTimeout(checkReveal, 500);
  window.addEventListener('scroll', checkReveal);
  
  circles.forEach(circle => {
    circle.addEventListener('mousemove', (e) => {
      const rect = circle.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      const inner = circle.querySelector('.circle-inner');
      if (inner) {
        inner.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
      }
    });
    
    circle.addEventListener('mouseleave', () => {
      const inner = circle.querySelector('.circle-inner');
      if (inner) {
        inner.style.transform = 'rotateX(0) rotateY(0) scale(1)';
      }
    });
  });
}

// 3D GLOBE
function init3DGlobe() {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  script.onload = setupGlobe;
  document.head.appendChild(script);
}

function setupGlobe() {
  const container = document.getElementById('globeContainer');
  if (!container) return;
  
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x060606);
  
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 15;
  
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);
  
  const pointLight = new THREE.PointLight(0xd4af37, 1, 30);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);
  
  const geometry = new THREE.SphereGeometry(4, 64, 64);
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
  
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    shininess: 5,
    emissive: new THREE.Color(0x111111)
  });
  
  const globe = new THREE.Mesh(geometry, material);
  scene.add(globe);
  
  const wireframeGeo = new THREE.SphereGeometry(4.05, 32, 32);
  const wireframeMat = new THREE.MeshBasicMaterial({
    color: 0xd4af37,
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });
  const wireframe = new THREE.Mesh(wireframeGeo, wireframeMat);
  scene.add(wireframe);
  
  function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.0005;
    wireframe.rotation.y += 0.0005;
    renderer.render(scene, camera);
  }
  
  animate();
  
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// TESTIMONIAL WALL
function initTestimonialWall() {
  const profitBadges = document.querySelectorAll('.profit-badge');
  
  setInterval(() => {
    profitBadges.forEach(badge => {
      if (Math.random() > 0.7) {
        const current = badge.textContent;
        const num = parseFloat(current.replace(/[^0-9.-]+/g, ''));
        const change = (Math.random() * 200) - 100;
        const newNum = (num + change).toFixed(0);
        badge.textContent = `+$${newNum}`;
      }
    });
  }, 5000);
}

// THE JMJ ADVANTAGE
function initJmjAdvantage() {
  initAccountAnimation();
  initPoolAnimation();
  initSignalsAnimation();
  initMentorAnimation();
  
  const rows = document.querySelectorAll('.service-row');
  
  function checkVisibility() {
    rows.forEach((row, index) => {
      const rect = row.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100;
      
      if (isVisible && !row.classList.contains('visible')) {
        setTimeout(() => {
          row.classList.add('visible');
        }, index * 200);
      }
    });
  }
  
  window.addEventListener('scroll', checkVisibility);
  setTimeout(checkVisibility, 100);
}

function initAccountAnimation() {
  const canvas = document.getElementById('animationAccount');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width, height;
  let rotation = 0;
  
  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;
  }
  
  function draw() {
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Draw rotating gears
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);
    
    // Main gear
    ctx.beginPath();
    ctx.arc(0, 0, 40, 0, Math.PI * 2);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#d4af37';
    ctx.stroke();
    
    // Gear teeth
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const x1 = Math.cos(angle) * 45;
      const y1 = Math.sin(angle) * 45;
      const x2 = Math.cos(angle) * 55;
      const y2 = Math.sin(angle) * 55;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    
    ctx.restore();
    
    rotation += 0.02;
    requestAnimationFrame(draw);
  }
  
  resize();
  window.addEventListener('resize', resize);
  draw();
}

function initPoolAnimation() {
  const canvas = document.getElementById('animationPool');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  
  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;
    
    particles = [];
    for (let i = 0; i < 10; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 10 + 5,
        speed: Math.random() * 1 + 0.5
      });
    }
  }
  
  function draw() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw pool
    ctx.beginPath();
    ctx.arc(width/2, height/2, 60, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(212, 175, 55, 0.1)';
    ctx.shadowBlur = 30;
    ctx.shadowColor = '#d4af37';
    ctx.fill();
    
    particles.forEach(p => {
      p.y -= p.speed;
      if (p.y < 0) p.y = height;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size/2, 0, Math.PI * 2);
      ctx.fillStyle = '#d4af37';
      ctx.shadowBlur = 15;
      ctx.fill();
      
      ctx.fillStyle = '#000';
      ctx.font = `${p.size/2}px Arial`;
      ctx.fillText('$', p.x-3, p.y+2);
    });
    
    requestAnimationFrame(draw);
  }
  
  resize();
  window.addEventListener('resize', resize);
  draw();
}

function initSignalsAnimation() {
  const canvas = document.getElementById('animationSignals');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width, height;
  let angle = 0;
  
  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;
  }
  
  function draw() {
    ctx.clearRect(0, 0, width, height);
    
    // Radar circles
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.arc(width/2, height/2, 30 * i, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
      ctx.stroke();
    }
    
    // Scanning line
    ctx.beginPath();
    ctx.moveTo(width/2, height/2);
    ctx.lineTo(width/2 + Math.cos(angle) * 90, height/2 + Math.sin(angle) * 90);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 15;
    ctx.stroke();
    
    angle += 0.02;
    requestAnimationFrame(draw);
  }
  
  resize();
  window.addEventListener('resize', resize);
  draw();
}

function initMentorAnimation() {
  const canvas = document.getElementById('animationMentor');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width, height;
  let step = 0;
  
  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;
  }
  
  function draw() {
    ctx.clearRect(0, 0, width, height);
    
    const startX = width/4;
    const startY = height - 50;
    
    for (let i = 0; i < 4; i++) {
      const x = startX + i * 50;
      const y = startY - i * 40 - Math.sin(step + i) * 5;
      
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#d4af37';
      
      // Step
      ctx.fillStyle = 'rgba(212, 175, 55, 0.3)';
      ctx.fillRect(x - 20, y - 8, 40, 16);
      
      // Figure at top
      if (i === 3) {
        ctx.beginPath();
        ctx.arc(x, y - 20, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#d4af37';
        ctx.fill();
      }
    }
    
    step += 0.03;
    requestAnimationFrame(draw);
  }
  
  resize();
  window.addEventListener('resize', resize);
  draw();
}

// ===== RESULTS GALLERY - FIXED VERSION =====
function initResultsGallery() {
  console.log('Starting results gallery...');
  
  const galleryTrack = document.getElementById('resultsTrack');
  const prevButton = document.getElementById('resultsPrev');
  const nextButton = document.getElementById('resultsNext');
  const dotsContainer = document.getElementById('resultsDots');
  
  if (!galleryTrack) {
    console.log('Track not found');
    return;
  }
  
  const galleryCards = document.querySelectorAll('.result-card');
  console.log('Found', galleryCards.length, 'cards');
  
  if (galleryCards.length === 0) return;
  
  const cardWidth = galleryCards[0].offsetWidth + 25;
  let currentIndex = 0;
  let autoScrollInterval;
  
  const visibleCount = window.innerWidth > 900 ? 3 : (window.innerWidth > 600 ? 2 : 1);
  const maxIndex = Math.max(0, galleryCards.length - visibleCount);
  
  function nextSlide() {
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    galleryTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateDots();
  }
  
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = maxIndex;
    }
    galleryTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateDots();
  }
  
  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const dotCount = Math.ceil(galleryCards.length / visibleCount);
    
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('span');
      dot.classList.add('result-dot');
      dot.dataset.index = i * visibleCount;
      
      dot.addEventListener('click', () => {
        currentIndex = i * visibleCount;
        galleryTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        updateDots();
        stopAutoScroll();
        setTimeout(startAutoScroll, 5000);
      });
      
      dotsContainer.appendChild(dot);
    }
    updateDots();
  }
  
  function updateDots() {
    const dots = document.querySelectorAll('.result-dot');
    const activeDotIndex = Math.floor(currentIndex / visibleCount);
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeDotIndex);
    });
  }
  
  function startAutoScroll() {
  stopAutoScroll();
  
  let startTime = null;
  const scrollDuration = 80000; // Time to complete one full scroll (8 seconds)
  const totalDistance = maxIndex * cardWidth;
  
  function continuousScroll(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = (elapsed % scrollDuration) / scrollDuration; // Loop continuously
    
    // Calculate position based on progress
    const scrollPosition = progress * totalDistance;
    
    // Find which card should be at the start
    const targetIndex = Math.floor(scrollPosition / cardWidth) % (maxIndex + 1);
    
    // Apply smooth transform
    galleryTrack.style.transform = `translateX(-${targetIndex * cardWidth}px)`;
    
    autoScrollInterval = requestAnimationFrame(continuousScroll);
  }
  
  autoScrollInterval = requestAnimationFrame(continuousScroll);
}

function stopAutoScroll() {
  if (autoScrollInterval) {
    cancelAnimationFrame(autoScrollInterval);
    autoScrollInterval = null;
  }
}
  
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      prevSlide();
      stopAutoScroll();
      setTimeout(startAutoScroll, 5000);
    });
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      nextSlide();
      stopAutoScroll();
      setTimeout(startAutoScroll, 5000);
    });
  }
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  galleryTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoScroll();
  });
  
  galleryTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    setTimeout(startAutoScroll, 3000);
  });
  
  galleryTrack.addEventListener('mouseenter', stopAutoScroll);
  galleryTrack.addEventListener('mouseleave', startAutoScroll);
  
  createDots();
  startAutoScroll();
  
  window.addEventListener('resize', () => {
    const newCardWidth = galleryCards[0]?.offsetWidth + 25;
    const newVisibleCount = window.innerWidth > 900 ? 3 : (window.innerWidth > 600 ? 2 : 1);
    const newMaxIndex = Math.max(0, galleryCards.length - newVisibleCount);
    
    if (currentIndex > newMaxIndex) {
      currentIndex = newMaxIndex;
    }
    
    galleryTrack.style.transform = `translateX(-${currentIndex * newCardWidth}px)`;
    createDots();
  });
  
  console.log('Results gallery ready');
}

// FAQ ACCORDION
function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      item.classList.toggle('active');
    });
  });
}

// ABOUT SECTION
function initAboutSection() {
  const imageWrapper = document.getElementById('aboutImage');
  const textBox = document.getElementById('aboutText');
  
  if (!imageWrapper || !textBox) return;
  
  function checkVisibility() {
    const rect = document.getElementById('about').getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top < windowHeight - 100 && rect.bottom > 100) {
      imageWrapper.classList.add('visible');
      textBox.classList.add('visible');
      window.removeEventListener('scroll', checkVisibility);
    }
  }
  
  window.addEventListener('scroll', checkVisibility);
  setTimeout(checkVisibility, 300);
}

// PILLARS SECTION
function initPillars() {
  const pillars = document.querySelectorAll('.pillar-card');
  if (!pillars.length) return;
  
  function checkVisibility() {
    pillars.forEach((pillar, index) => {
      const rect = pillar.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight - 100 && rect.bottom > 100 && !pillar.classList.contains('visible')) {
        setTimeout(() => {
          pillar.classList.add('visible');
        }, index * 150);
      }
    });
  }
  
  window.addEventListener('scroll', checkVisibility);
  setTimeout(checkVisibility, 300);
}

// ===== GOLD STATS SECTION WITH PARTICLES =====
function initStatsSection() {
  console.log('Stats section initializing...');
  
  // Initialize particles
  initStatsParticles();
  
  // Initialize counters
  initStatsCounter();
}

// ===== FLOATING PARTICLES =====
function initStatsParticles() {
  const particlesContainer = document.getElementById('statsParticles');
  if (!particlesContainer) return;
  
  // Clear any existing particles
  particlesContainer.innerHTML = '';
  
  // Create 30 particles
  for (let i = 0; i < 30; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'stats-particle';
  
  // Random properties
  const size = Math.random() * 8 + 2; // 2-10px
  const left = Math.random() * 100; // 0-100%
  const top = Math.random() * 100; // 0-100%
  const delay = Math.random() * 5; // 0-5s delay
  const duration = Math.random() * 6 + 4; // 4-10s duration
  
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  particle.style.left = left + '%';
  particle.style.top = top + '%';
  particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;
  particle.style.opacity = '0';
  
  container.appendChild(particle);
}

// ===== STATS COUNTER =====
function initStatsCounter() {
  console.log('Stats counter initializing...');
  
  const stat1 = document.getElementById('stat1');
  const stat2 = document.getElementById('stat2');
  const stat3 = document.getElementById('stat3');
  
  if (!stat1 || !stat2 || !stat3) {
    console.log('Stats elements not found');
    return;
  }
  
  // Get target values
  const target1 = parseFloat(stat1.dataset.target); // 100
  const target2 = parseFloat(stat2.dataset.target); // 300
  const target3 = parseFloat(stat3.dataset.target); // 10.5
  
  let animated = false;
  
  function animateNumber(element, target, isCurrency = false, isDecimal = false) {
    let current = 0;
    const increment = target / 60; // Divide into 60 steps over 2 seconds
    const stepTime = 2000 / 60; // ~33ms per step
    
    const timer = setInterval(() => {
      current += increment;
      
      if (current >= target) {
        current = target;
        
        if (isCurrency) {
          element.textContent = `$${Math.floor(current)}`;
        } else if (isDecimal) {
          element.textContent = current.toFixed(1);
        } else {
          element.textContent = Math.floor(current);
        }
        
        clearInterval(timer);
        return;
      }
      
      if (isCurrency) {
        element.textContent = `$${Math.floor(current)}`;
      } else if (isDecimal) {
        element.textContent = current.toFixed(1);
      } else {
        element.textContent = Math.floor(current);
      }
    }, stepTime);
  }
  
  // Check if element is in viewport
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top < window.innerHeight - 50 &&
      rect.bottom > 50
    );
  }
  
  // Check on scroll
  function checkStats() {
    if (!animated && isInViewport(document.querySelector('.stats-section'))) {
      animated = true;
      
      // Start animations
      animateNumber(stat1, target1, false, false); // 100
      animateNumber(stat2, target2, false, false);  // $300
      animateNumber(stat3, target3, false, true);  // 10.5
      
      window.removeEventListener('scroll', checkStats);
    }
  }
  
  // Listen for scroll
  window.addEventListener('scroll', checkStats);
  
  // Check immediately in case already visible
  setTimeout(checkStats, 500);
}

// ===== TYPEWRITER HERO SECTION =====
function initTypewriterHero() {
  console.log('Initializing typewriter hero...');
  
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');
  const line3 = document.getElementById('line3');
  const buttons = document.getElementById('heroButtons');
  
  if (!line1 || !line2 || !line3 || !buttons) return;
  
  // Typewriter sequence
  function startTypewriter() {
    // Line 1
    setTimeout(() => {
      line1.classList.add('typing');
      console.log('Typing line 1');
    }, 500);
    
    // Line 2 (starts after line 1 finishes)
    setTimeout(() => {
      line1.classList.remove('typing');
      line1.classList.add('completed');
      line2.classList.add('typing');
      console.log('Typing line 2');
    }, 1800); // 500 + 1000 (typing) + 300 pause
    
    // Line 3 (starts after line 2 finishes)
    setTimeout(() => {
      line2.classList.remove('typing');
      line2.classList.add('completed');
      line3.classList.add('typing');
      console.log('Typing line 3');
    }, 3100); // 1800 + 1000 + 300
    
    // All complete, show buttons
    setTimeout(() => {
      line3.classList.remove('typing');
      line3.classList.add('completed');
      buttons.classList.add('visible');
      console.log('Typewriter complete, showing buttons');
    }, 4400); // 3100 + 1000 + 300
  }
  
  // Start the sequence when page loads
  startTypewriter();
  
  // Optional: Add video play/pause based on visibility
  const video = document.getElementById('heroVideo');
  if (video) {
    // Ensure video plays
    video.play().catch(e => console.log('Video autoplay failed:', e));
    
    // Pause video when not in viewport (saves bandwidth)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(document.querySelector('.hero-video'));
  }
}



