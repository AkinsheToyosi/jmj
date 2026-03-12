// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize all components
  initEntranceAnimation();
  initParticles();
  initCandlestickChart();
  initParallax();
  initSyntheticTicker();
  initHeader();
  initHowItWorksCircles();
  // initPerformanceCounters();
  init3DGlobe();
  initTestimonialWall();
  initJmjAdvantage();
  initResultsHorizontal();
  initFaq();
  // initNotebook();
  initAboutSection();
  initPillars();
  initHowItWorks();
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

// PROFESSIONAL CANDLESTICK CHART - SLOWER, FULL WIDTH, SHARPER LINES
function initCandlestickChart() {
  const canvas = document.getElementById('chartCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Chart configuration - ADJUSTED FOR SHARPER LINES
  const config = {
    candleWidth: 10,        // Slightly wider for better visibility
    candleSpacing: 6,       // More spacing between candles
    wickWidth: 1,           // Thinner wicks for sharper look
    bullishColor: '#d4af37',
    bearishColor: '#4a4a4a',
    glowIntensity: 8,       // REDUCED glow for less blur
    volumeBars: false,      // Disabled for cleaner look
    gridOpacity: 0.1        // More subtle grid
  };
  
  // Data store
  let candles = [];
  let lastPrice = 1.2000;
  let animationFrame;
  let lastTimestamp = 0;
  
  // SLOWER animation - update every 4 frames instead of every frame
  let frameCounter = 0;
  const updateFrequency = 4; // Higher number = slower animation
  
  // Initialize with MORE historical data for full-width display
  function initializeCandles() {
    candles = [];
    let price = lastPrice;
    
    // Calculate how many candles we need to fill the screen width
    const totalCandleWidth = config.candleWidth + config.candleSpacing;
    const screenWidth = window.innerWidth;
    const candlesNeeded = Math.ceil(screenWidth / totalCandleWidth) + 20; // Add extra for buffer
    
    for (let i = 0; i < candlesNeeded; i++) {
      const candle = generateCandle(price);
      candles.push(candle);
      price = candle.close;
    }
    
    lastPrice = price;
  }
  
  // Generate realistic OHLC candle
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
    
    high += (Math.random() * 0.002) * prevClose;
    low -= (Math.random() * 0.002) * prevClose;
    
    const volume = isBullish ? 
      Math.random() * 100 + 150 : 
      Math.random() * 80 + 80;
    
    return {
      open,
      close,
      high,
      low,
      volume,
      isBullish
    };
  }
  
  // Add new candle SLOWLY and remove oldest
  function addNewCandle() {
    const newCandle = generateCandle(lastPrice);
    candles.push(newCandle);
    candles.shift();
    lastPrice = newCandle.close;
  }
  
  // Resize canvas and reinitialize candles for full width
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Reinitialize candles to fill new width
    initializeCandles();
  }
  
  // Draw grid - SHARPER LINES
  function drawGrid() {
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#d4af37';
    ctx.globalAlpha = config.gridOpacity;
    ctx.lineWidth = 0.5;
    ctx.shadowBlur = 0; // NO SHADOW on grid for sharpness
    
    // Horizontal grid lines (fewer for cleaner look)
    const priceLevels = 6;
    for (let i = 0; i <= priceLevels; i++) {
      const y = (height * 0.15) + (i * (height * 0.7) / priceLevels);
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    
    // Vertical grid lines (fewer for cleaner look)
    const timeLevels = 8;
    for (let i = 0; i <= timeLevels; i++) {
      const x = i * (width / timeLevels);
      ctx.moveTo(x, height * 0.15);
      ctx.lineTo(x, height * 0.85);
    }
    
    ctx.stroke();
    ctx.restore();
  }
  
  // Draw candlestick - SHARPER LINES
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
    
    // MINIMAL glow for sharper appearance
    ctx.shadowColor = isBullish ? '#d4af37' : '#666666';
    ctx.shadowBlur = config.glowIntensity;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // Draw wick - SHARP line
    ctx.beginPath();
    ctx.strokeStyle = isBullish ? '#d4af37' : '#888888';
    ctx.lineWidth = config.wickWidth;
    ctx.moveTo(x + config.candleWidth / 2, highY);
    ctx.lineTo(x + config.candleWidth / 2, lowY);
    ctx.stroke();
    
    // Draw body - SHARP edges
    ctx.fillStyle = isBullish ? config.bullishColor : config.bearishColor;
    ctx.fillRect(
      x, 
      candleTop, 
      config.candleWidth, 
      Math.max(1, candleBodyHeight)
    );
    
    ctx.restore();
  }
  
  // Draw price label - SHARP text
  function drawPriceLabel() {
    const lastCandle = candles[candles.length - 1];
    if (!lastCandle) return;
    
    ctx.save();
    ctx.font = '12px "Segoe UI", monospace';
    ctx.fillStyle = '#d4af37';
    ctx.shadowBlur = 0; // NO shadow on text for sharpness
    ctx.globalAlpha = 0.9;
    
    const priceText = lastCandle.close.toFixed(5);
    ctx.fillText(priceText, canvas.width - 100, 40);
    ctx.restore();
  }
  
  // Main animation loop - SLOWER movement
  function animate(timestamp) {
    if (!lastTimestamp) {
      lastTimestamp = timestamp;
      animationFrame = requestAnimationFrame(animate);
      return;
    }
    
    const elapsed = timestamp - lastTimestamp;
    
    // Target 60fps but update candles SLOWER
    if (elapsed > 16) { // ~60fps timing
      
      // SLOWER candle updates - only add new candle every few frames
      frameCounter++;
      if (frameCounter >= updateFrequency) {
        addNewCandle();
        frameCounter = 0;
      }
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set up chart area - EXPANDED to full width
      const height = canvas.height;
      const width = canvas.width;
      const chartTop = height * 0.15;      // Slightly more top margin
      const chartBottom = height * 0.85;    // Slightly more bottom margin
      const chartHeight = chartBottom - chartTop;
      
      // Find price range
      const prices = candles.flatMap(c => [c.high, c.low]);
      const minPrice = Math.min(...prices) * 0.999;
      const maxPrice = Math.max(...prices) * 1.001;
      
      // Price to Y coordinate
      const yScale = (price) => {
        return chartTop + ((maxPrice - price) / (maxPrice - minPrice)) * chartHeight;
      };
      
      // Draw grid first (background)
      drawGrid();
      
      // Calculate starting X - FILL FULL WIDTH from right edge
      const totalCandleWidth = config.candleWidth + config.candleSpacing;
      const startX = width - totalCandleWidth; // Start from right edge
      
      // Draw candles from right to left, covering FULL WIDTH
      for (let i = 0; i < candles.length; i++) {
        const candle = candles[i];
        const x = startX - (i * totalCandleWidth);
        
        // Draw all candles that might be visible (including slightly off-screen for smooth scrolling)
        if (x > -totalCandleWidth * 2 && x < width + totalCandleWidth) {
          drawCandle(candle, x, yScale);
        }
      }
      
      // Draw price label
      drawPriceLabel();
      
      lastTimestamp = timestamp;
    }
    
    animationFrame = requestAnimationFrame(animate);
  }
  
  // Initialize
  resizeCanvas();
  initializeCandles();
  
  // Handle resize with debounce for performance
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      resizeCanvas();
    }, 100);
  });
  
  // Start animation
  animate();
  
  // Clean up
  window.addEventListener('beforeunload', function() {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  });
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
  
  document.addEventListener('mouseenter', function() {
    currentX = 0;
    currentY = 0;
  });
}

// Add this new function to your script.js
// Call it from your DOMContentLoaded event


// ===== LIVE DERIV TICKER - REAL PRICES =====
function initSyntheticTicker() {
  // Check if ticker already exists
  if (document.querySelector('.synthetic-ticker')) return;
  
  // Create ticker container
  const ticker = document.createElement('div');
  ticker.className = 'synthetic-ticker';
  
  // Add to page
  document.body.appendChild(ticker);
  
  // Create ticker structure
  ticker.innerHTML = `
    <div class="ticker-wrapper">
      <div class="ticker-content" id="tickerContent">
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
          <span class="ticker-symbol">B500</span>
          <span class="ticker-price" id="price-B500">---</span>
          <span class="ticker-change" id="change-B500">---</span>
        </div>
        <div class="ticker-item">
          <span class="ticker-symbol">C1000</span>
          <span class="ticker-price" id="price-C1000">---</span>
          <span class="ticker-change" id="change-C1000">---</span>
        </div>
        <div class="ticker-item">
          <span class="ticker-symbol">V100</span>
          <span class="ticker-price" id="price-V100">---</span>
          <span class="ticker-change" id="change-V100">---</span>
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
  // Deriv WebSocket endpoint
  const ws = new WebSocket('wss://ws.derivws.com/websockets/v3?app_id=1089'); // 1089 is test app_id
  
  // Symbol mapping - Deriv uses different symbols
  const symbolMap = {
    'V75': 'R_75',
    'V50': 'R_50',
    'V100': 'R_100',
    'B500': 'BOOM500',
    'C1000': 'CRASH1000'
  };
  
  // Map our display symbols to Deriv symbols
  const ourSymbols = ['V75', 'V50', 'V100', 'B500', 'C1000'];
  
  ws.onopen = () => {
    console.log('✅ Connected to Deriv WebSocket');
    
    // Subscribe to ticks for each symbol
    ourSymbols.forEach(sym => {
      const derivSym = symbolMap[sym];
      if (!derivSym) return;
      
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

// Update your DOMContentLoaded to include cleanup
document.addEventListener('DOMContentLoaded', function() {
  // ... existing code ...
  initSyntheticTicker();
});

// Clean up on page unload
window.addEventListener('beforeunload', function() {
  if (window.derivWs) {
    window.derivWs.close();
  }
});

// ===== HORIZONTAL CIRCLES ANIMATION =====
function initHowItWorksCircles() {
  const circles = document.querySelectorAll('.step-circle');
  
  // Scroll reveal
  function checkReveal() {
    circles.forEach((circle, index) => {
      const rect = circle.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 150;
      
      if (isVisible && !circle.classList.contains('revealed')) {
        // Add delay for each circle
        setTimeout(() => {
          circle.classList.add('revealed');
          
          // Animate connector line for previous
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
        }, index * 200); // Stagger effect
      }
    });
  }
  
  // Initial check
  setTimeout(checkReveal, 500);
  
  // Check on scroll
  window.addEventListener('scroll', checkReveal);
  
  // Parallax effect on hover
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
      inner.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
    });
    
    circle.addEventListener('mouseleave', () => {
      const inner = circle.querySelector('.circle-inner');
      inner.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    });
  });
}

// ===== PERFORMANCE COUNTER ANIMATION =====
function initPerformanceCounters() {
  const counters = document.querySelectorAll('.performance-number');
  const speed = 200; // Lower = faster
  
  // Set initial values to 0
  counters.forEach(counter => {
    counter.innerText = '0';
  });
  
  // Function to start counting when element is visible
  function startCounting(entry) {
    const counter = entry.target;
    const target = parseInt(counter.getAttribute('data-target'));
    let count = 0;
    
    // For decimal numbers (like 12.8)
    const isDecimal = target % 1 !== 0;
    
    const updateCounter = () => {
      if (isDecimal) {
        // Handle decimal numbers
        const increment = target / 50;
        count += increment;
        
        if (count < target) {
          counter.innerText = count.toFixed(1);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target.toFixed(1);
        }
      } else {
        // Handle whole numbers
        const increment = target / 50;
        count += increment;
        
        if (count < target) {
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target;
        }
      }
    };
    
    updateCounter();
  }
  
  // Set up intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting(entry);
        observer.unobserve(entry.target); // Only count once
      }
    });
  }, { threshold: 0.5 });
  
  // Observe each counter
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// ===== 3D GLOBE WITH THREE.JS =====
function init3DGlobe() {
  // Load Three.js library
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  script.onload = setupGlobe;
  document.head.appendChild(script);
}

function setupGlobe() {
  const container = document.getElementById('globeContainer');
  if (!container) return;
  
  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x060606);
  
  // Camera
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 15;
  
  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  // Lights
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);
  
  const pointLight = new THREE.PointLight(0xd4af37, 1, 30);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);
  
  // Create the globe
  const geometry = new THREE.SphereGeometry(4, 64, 64);
  
  // Load texture
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
  
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    shininess: 5,
    emissive: new THREE.Color(0x111111)
  });
  
  const globe = new THREE.Mesh(geometry, material);
  scene.add(globe);
  
  // Add wireframe overlay for tech look
  const wireframeGeo = new THREE.SphereGeometry(4.05, 32, 32);
  const wireframeMat = new THREE.MeshBasicMaterial({
    color: 0xd4af37,
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });
  const wireframe = new THREE.Mesh(wireframeGeo, wireframeMat);
  scene.add(wireframe);
  
  // Add glowing dots (cities/trading hubs)
  const dotsGeometry = new THREE.BufferGeometry();
  const dotsCount = 200;
  const positions = new Float32Array(dotsCount * 3);
  const colors = new Float32Array(dotsCount * 3);
  
  for (let i = 0; i < dotsCount; i++) {
    // Random points on sphere
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 4.1;
    
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    
    positions[i*3] = x;
    positions[i*3+1] = y;
    positions[i*3+2] = z;
    
    // Random gold colors
    colors[i*3] = 1; // R
    colors[i*3+1] = 0.8; // G
    colors[i*3+2] = 0.2; // B
  }
  
  dotsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  dotsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const dotsMaterial = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  
  const dots = new THREE.Points(dotsGeometry, dotsMaterial);
  scene.add(dots);
  
  // Add orbiting rings
  const ringGeometry = new THREE.TorusGeometry(5, 0.05, 16, 100);
  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.2 });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2;
  ring.rotation.z = 0.3;
  scene.add(ring);
  
  const ring2 = new THREE.TorusGeometry(5.5, 0.03, 16, 100);
  const ring2Material = new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.15 });
  const ring2Mesh = new THREE.Mesh(ring2, ring2Material);
  ring2Mesh.rotation.x = Math.PI / 3;
  ring2Mesh.rotation.z = 0.5;
  scene.add(ring2Mesh);
  
  // Animation
  function animate() {
    requestAnimationFrame(animate);
    
    // Rotate globe and rings
    globe.rotation.y += 0.0005;
    wireframe.rotation.y += 0.0005;
    dots.rotation.y += 0.0005;
    ring.rotation.y += 0.0003;
    ring2Mesh.rotation.y += 0.0004;
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Handle resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}


// ===== TESTIMONIAL WALL - OPTIONAL ENHANCEMENTS =====
function initTestimonialWall() {
  // Add random profit badges for variation
  const profitBadges = document.querySelectorAll('.profit-badge');
  
  setInterval(() => {
    profitBadges.forEach(badge => {
      // Randomly update profits to make it feel live
      if (Math.random() > 0.7) {
        const current = badge.textContent;
        const num = parseFloat(current.replace(/[^0-9.-]+/g, ''));
        const change = (Math.random() * 200) - 100;
        const newNum = (num + change).toFixed(0);
        badge.textContent = `+$${newNum}`;
      }
    });
  }, 5000);
  
  // Optional: Duplicate tracks for seamless scrolling
  const tracks = document.querySelectorAll('.testimonial-track');
  tracks.forEach(track => {
    const cards = track.innerHTML;
    // Uncomment below if you need more cards for seamless loop
    // track.innerHTML = cards + cards;
  });
}


// ===== RESULTS GALLERY - HORIZONTAL SCROLL =====
function initResultsHorizontal() {
  const track = document.getElementById('resultsTrack');
  const prevBtn = document.getElementById('resultsPrev');
  const nextBtn = document.getElementById('resultsNext');
  const dotsContainer = document.getElementById('resultsDots');
  
  if (!track) return;
  
  const cards = document.querySelectorAll('.result-card');
  const cardWidth = cards[0]?.offsetWidth + 25; // width + gap
  let currentIndex = 0;
  let autoScrollInterval;
  let startX, isDragging = false;
  
  // Calculate max index
  const visibleCount = window.innerWidth > 900 ? 3 : (window.innerWidth > 600 ? 2 : 1);
  const maxIndex = Math.max(0, cards.length - visibleCount);
  
  // Create dots
  function createDots() {
    dotsContainer.innerHTML = '';
    const dotCount = Math.ceil(cards.length / visibleCount);
    
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('span');
      dot.classList.add('result-dot');
      dot.dataset.index = i * visibleCount;
      
      dot.addEventListener('click', () => {
        goToSlide(i * visibleCount);
      });
      
      dotsContainer.appendChild(dot);
    }
    
    updateDots();
  }
  
  // Update active dot
  function updateDots() {
    const dots = document.querySelectorAll('.result-dot');
    const activeDotIndex = Math.floor(currentIndex / visibleCount);
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeDotIndex);
    });
  }
  
  // Go to slide
  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateDots();
  }
  
  // Next slide
  function nextSlide() {
    if (currentIndex < maxIndex) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(0); // Loop back to start
    }
  }
  
  // Prev slide
  function prevSlide() {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(maxIndex); // Loop to end
    }
  }
  
  // Auto scroll (slow)
  function startAutoScroll() {
    stopAutoScroll();
    autoScrollInterval = setInterval(nextSlide, 4000); // 4 seconds
  }
  
  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }
  }
  
  // Touch events for swipe
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAutoScroll();
  });
  
  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
  });
  
  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide(); // Swipe left
      } else {
        prevSlide(); // Swipe right
      }
    }
    
    isDragging = false;
    startAutoScroll();
  });
  
  // Mouse drag prevention
  track.addEventListener('mousedown', (e) => {
    e.preventDefault();
  });
  
  // Arrow buttons
  if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoScroll();
    setTimeout(startAutoScroll, 5000);
  });
  
  if (nextBtn) nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoScroll();
    setTimeout(startAutoScroll, 5000);
  });
  
  // Pause auto-scroll on hover
  track.addEventListener('mouseenter', stopAutoScroll);
  track.addEventListener('mouseleave', startAutoScroll);
  
  // Initialize
  createDots();
  startAutoScroll();
  
  // Handle resize
  window.addEventListener('resize', () => {
    // Recalculate card width and max index
    const newCardWidth = cards[0]?.offsetWidth + 25;
    const newVisibleCount = window.innerWidth > 900 ? 3 : (window.innerWidth > 600 ? 2 : 1);
    const newMaxIndex = Math.max(0, cards.length - newVisibleCount);
    
    // Adjust current index if needed
    if (currentIndex > newMaxIndex) {
      currentIndex = newMaxIndex;
    }
    
    goToSlide(currentIndex);
    createDots(); // Recreate dots for new visible count
  });
}

// ===== ABOUT SECTION - SCROLL TRIGGERED =====
function initAboutSection() {
  const imageWrapper = document.getElementById('aboutImage');
  const textBox = document.getElementById('aboutText');
  
  if (!imageWrapper || !textBox) return;
  
  // Check if section is already visible
  function checkVisibility() {
    const rect = document.getElementById('about').getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // If section is in viewport
    if (rect.top < windowHeight - 100 && rect.bottom > 100) {
      imageWrapper.classList.add('visible');
      textBox.classList.add('visible');
      window.removeEventListener('scroll', checkVisibility);
    }
  }
  
  // Check on scroll
  window.addEventListener('scroll', checkVisibility);
  
  // Check immediately
  setTimeout(checkVisibility, 300);
}

// ===== PILLARS SECTION - SCROLL TRIGGERED =====
function initPillars() {
  const pillars = document.querySelectorAll('.pillar-card');
  if (!pillars.length) return;
  
  function checkVisibility() {
    let anyVisible = false;
    
    pillars.forEach((pillar, index) => {
      const rect = pillar.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight - 100 && rect.bottom > 100) {
        // Stagger the animation
        setTimeout(() => {
          pillar.classList.add('visible');
        }, index * 150);
        anyVisible = true;
      }
    });
    
    // Remove listener once all are visible
    if (anyVisible && document.querySelectorAll('.pillar-card.visible').length === pillars.length) {
      window.removeEventListener('scroll', checkVisibility);
    }
  }
  
  window.addEventListener('scroll', checkVisibility);
  setTimeout(checkVisibility, 300);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  initAboutSection();
  initPillars();
});

