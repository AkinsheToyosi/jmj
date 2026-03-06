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
  initResultsGallery();
  initFaq();
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

// SYNTHETIC INDICES TICKER
function initSyntheticTicker() {
  // Check if ticker already exists
  if (document.querySelector('.synthetic-ticker')) return;
  
  // Create ticker container
  const ticker = document.createElement('div');
  ticker.className = 'synthetic-ticker';
  
  // Synthetic indices data
  const indices = [
    { symbol: 'V75', name: 'Volatility 75', basePrice: 2345.67, volatility: 0.8 },
    { symbol: 'V50', name: 'Volatility 50', basePrice: 1876.54, volatility: 0.6 },
    { symbol: 'B500', name: 'Boom 500', basePrice: 15678.89, volatility: 1.2 },
    { symbol: 'C1000', name: 'Crash 1000', basePrice: 8923.45, volatility: 1.5 },
    { symbol: 'ST200', name: 'Step 200', basePrice: 5678.90, volatility: 0.4 },
    { symbol: 'R100', name: 'Range Break 100', basePrice: 4321.23, volatility: 0.9 },
    { symbol: 'V25', name: 'Volatility 25', basePrice: 3456.78, volatility: 0.5 },
    { symbol: 'B1000', name: 'Boom 1000', basePrice: 23456.78, volatility: 1.8 }
  ];
  
  // Store current prices
  const prices = {};
  indices.forEach(idx => {
    prices[idx.symbol] = idx.basePrice;
  });
  
  // Generate initial ticker items (double for seamless loop)
  ticker.innerHTML = `
    <div class="ticker-wrapper">
      <div class="ticker-content" id="tickerContent">
        ${generateTickerItems(indices, prices)}
        ${generateTickerItems(indices, prices)} <!-- Duplicate for seamless loop -->
      </div>
    </div>
  `;
  
  // Add to page
  document.body.appendChild(ticker);
  
  // Update prices every 2 seconds
  setInterval(() => {
    // Update random indices
    indices.forEach(idx => {
      // Random price movement
      const change = (Math.random() * idx.volatility * 2) - idx.volatility;
      prices[idx.symbol] = prices[idx.symbol] + change;
      
      // Ensure price doesn't go negative
      if (prices[idx.symbol] < 10) prices[idx.symbol] = idx.basePrice;
    });
    
    // Update DOM
    updateTickerDisplay(indices, prices);
    
  }, 2000);
  
  // Pause animation on hover
  const tickerContent = document.getElementById('tickerContent');
  if (tickerContent) {
    tickerContent.addEventListener('mouseenter', () => {
      tickerContent.style.animationPlayState = 'paused';
    });
    
    tickerContent.addEventListener('mouseleave', () => {
      tickerContent.style.animationPlayState = 'running';
    });
  }
}

function generateTickerItems(indices, prices) {
  return indices.map(idx => {
    const price = prices[idx.symbol];
    const prevPrice = price - (Math.random() * 2); // Simulated previous price
    const change = price - prevPrice;
    const percentChange = (change / prevPrice) * 100;
    const isPositive = change >= 0;
    
    return `
      <div class="ticker-item">
        <span class="ticker-symbol">${idx.symbol}</span>
        <span class="ticker-price">${price.toFixed(2)}</span>
        <span class="ticker-change ${isPositive ? 'positive' : 'negative'}">
          <span class="ticker-arrow">${isPositive ? '▲' : '▼'}</span>
          <span class="ticker-percent">${Math.abs(percentChange).toFixed(1)}%</span>
        </span>
      </div>
    `;
  }).join('');
}

function updateTickerDisplay(indices, prices) {
  const tickerContent = document.getElementById('tickerContent');
  if (!tickerContent) return;
  
  // Update all items (both original and duplicate)
  const items = tickerContent.children;
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const idxIndex = i % indices.length; // Loop through indices
    const idx = indices[idxIndex];
    const price = prices[idx.symbol];
    
    // Calculate change (simulate with small random)
    const prevPrice = price - (Math.random() * 1);
    const change = price - prevPrice;
    const percentChange = (change / prevPrice) * 100;
    const isPositive = change >= 0;
    
    // Update price
    const priceSpan = item.querySelector('.ticker-price');
    if (priceSpan) priceSpan.textContent = price.toFixed(2);
    
    // Update change
    const changeSpan = item.querySelector('.ticker-change');
    if (changeSpan) {
      changeSpan.className = `ticker-change ${isPositive ? 'positive' : 'negative'}`;
      changeSpan.innerHTML = `
        <span class="ticker-arrow">${isPositive ? '▲' : '▼'}</span>
        <span class="ticker-percent">${Math.abs(percentChange).toFixed(1)}%</span>
      `;
    }
  }
}


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

// ===== THE JMJ ADVANTAGE - 3D ANIMATIONS (FIXED) =====
function initJmjAdvantage() {
  // Initialize all four animations
  initAccountAnimation(); // NEW & IMPROVED
  initPoolAnimation();    // (same - you liked)
  initSignalsAnimation(); // (same - you liked)
  initMentorAnimation();  // (same - you liked)
  
  // Scroll reveal for rows
  const rows = document.querySelectorAll('.service-row');
  
  function checkVisibility() {
    rows.forEach((row, index) => {
      const rect = row.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100;
      
      if (isVisible && !row.classList.contains('visible')) {
        // Add delay based on index for staggered effect
        setTimeout(() => {
          row.classList.add('visible');
        }, index * 200);
      }
      
      // Remove visibility when scrolled away (optional)
      if (!isVisible && row.classList.contains('visible')) {
        row.classList.remove('visible');
      }
    });
  }
  
  window.addEventListener('scroll', checkVisibility);
  setTimeout(checkVisibility, 100);
}

// NEW ANIMATION 1: Account Management - Rotating Golden Gears
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
  
  function drawGear(centerX, centerY, radius, teeth, angle, isMain = false) {
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    
    // Draw gear teeth
    ctx.beginPath();
    for (let i = 0; i < teeth; i++) {
      const toothAngle = (i / teeth) * Math.PI * 2;
      const x1 = Math.cos(toothAngle) * radius;
      const y1 = Math.sin(toothAngle) * radius;
      const x2 = Math.cos(toothAngle) * (radius + (isMain ? 15 : 10));
      const y2 = Math.sin(toothAngle) * (radius + (isMain ? 15 : 10));
      
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    }
    
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = isMain ? 3 : 2;
    ctx.shadowBlur = isMain ? 25 : 15;
    ctx.shadowColor = '#d4af37';
    ctx.stroke();
    
    // Draw main gear circle
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = isMain ? 4 : 2;
    ctx.stroke();
    
    // Draw inner hub
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(212, 175, 55, 0.3)';
    ctx.shadowBlur = isMain ? 30 : 20;
    ctx.fill();
    
    // Draw center dot
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#d4af37';
    ctx.fill();
    
    ctx.restore();
  }
  
  function drawConnection(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
    ctx.lineWidth = 1;
    ctx.shadowBlur = 10;
    ctx.stroke();
  }
  
  function draw() {
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Main large gear (center)
    drawGear(centerX, centerY, 50, 12, rotation, true);
    
    // Smaller gears around
    const gearPositions = [
      { x: centerX - 100, y: centerY - 60, teeth: 8, speed: -0.8 },
      { x: centerX + 100, y: centerY + 50, teeth: 8, speed: 0.6 },
      { x: centerX - 80, y: centerY + 80, teeth: 6, speed: 0.9 },
      { x: centerX + 90, y: centerY - 70, teeth: 6, speed: -0.7 }
    ];
    
    // Draw connections
    gearPositions.forEach(pos => {
      drawConnection(centerX, centerY, pos.x, pos.y);
    });
    
    // Draw smaller gears
    gearPositions.forEach((pos, index) => {
      drawGear(pos.x, pos.y, 30, pos.teeth, rotation * pos.speed);
    });
    
    // Draw glowing particles (representing energy/management)
    for (let i = 0; i < 5; i++) {
      const angle = Date.now() * 0.001 + i;
      const distance = 70 + Math.sin(angle * 2) * 10;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#d4af37';
      ctx.shadowBlur = 20;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212, 175, 55, 0.2)';
      ctx.fill();
    }
    
    rotation += 0.02;
    requestAnimationFrame(draw);
  }
  
  resize();
  window.addEventListener('resize', resize);
  draw();
}

// ANIMATION 2: Pool Funding - Flowing Liquid/Gold Coins (unchanged - you liked)
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
    
    // Create particles
    particles = [];
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 15 + 5,
        speed: Math.random() * 2 + 1,
        angle: Math.random() * Math.PI * 2
      });
    }
  }
  
  function draw() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw pool/base
    ctx.beginPath();
    ctx.arc(width/2, height/2, 80, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(212, 175, 55, 0.1)';
    ctx.shadowBlur = 40;
    ctx.shadowColor = '#d4af37';
    ctx.fill();
    
    // Draw flowing particles (coins)
    particles.forEach(p => {
      // Move particles in circular flow
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      
      // Wrap around
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
      
      // Draw coin
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size/2, 0, Math.PI * 2);
      
      // Gradient for gold effect
      const gradient = ctx.createRadialGradient(p.x-2, p.y-2, 0, p.x, p.y, p.size);
      gradient.addColorStop(0, '#ffd700');
      gradient.addColorStop(0.7, '#b8860b');
      
      ctx.fillStyle = gradient;
      ctx.shadowBlur = 20;
      ctx.fill();
      
      // Draw "$" symbol
      ctx.fillStyle = '#000';
      ctx.font = `${p.size/2}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowBlur = 0;
      ctx.fillText('$', p.x, p.y);
    });
    
    requestAnimationFrame(draw);
  }
  
  resize();
  window.addEventListener('resize', resize);
  draw();
}

// ANIMATION 3: Live Signals - Pulsing Radar/Scanner (unchanged - you liked)
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
    
    // Draw radar circles
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath();
      ctx.arc(width/2, height/2, 40 * i, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    // Draw scanning line
    ctx.beginPath();
    ctx.moveTo(width/2, height/2);
    const scanX = width/2 + Math.cos(angle) * 160;
    const scanY = height/2 + Math.sin(angle) * 160;
    ctx.lineTo(scanX, scanY);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 20;
    ctx.stroke();
    
    // Draw random signal dots
    for (let i = 0; i < 8; i++) {
      const dotAngle = (i / 8) * Math.PI * 2;
      const distance = 60 + Math.sin(Date.now() * 0.002 + i) * 20;
      const dotX = width/2 + Math.cos(dotAngle) * distance;
      const dotY = height/2 + Math.sin(dotAngle) * distance;
      
      ctx.beginPath();
      ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#d4af37';
      ctx.shadowBlur = 15;
      ctx.fill();
      
      // Pulse effect
      ctx.beginPath();
      ctx.arc(dotX, dotY, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212, 175, 55, 0.2)';
      ctx.fill();
    }
    
    angle += 0.02;
    requestAnimationFrame(draw);
  }
  
  resize();
  window.addEventListener('resize', resize);
  draw();
}

// ANIMATION 4: Mentorship - Rising Staircase/Golden Path (unchanged - you liked)
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
    
    // Draw glowing path
    const pathWidth = 60;
    const startX = width/4;
    const startY = height - 50;
    
    for (let i = 0; i < 5; i++) {
      const x = startX + i * 60;
      const y = startY - i * 40 - Math.sin(step + i) * 10;
      
      // Draw step
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#d4af37';
      
      // Step platform
      ctx.fillStyle = 'rgba(212, 175, 55, 0.3)';
      ctx.fillRect(x - 30, y - 10, 60, 20);
      
      // Step glow
      ctx.fillStyle = 'rgba(212, 175, 55, 0.2)';
      ctx.fillRect(x - 35, y - 15, 70, 30);
      
      // Draw "figure" on path
      if (i === 4) {
        ctx.beginPath();
        ctx.arc(x, y - 25, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#d4af37';
        ctx.shadowBlur = 20;
        ctx.fill();
        
        // Glow around figure
        ctx.beginPath();
        ctx.arc(x, y - 25, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212, 175, 55, 0.2)';
        ctx.fill();
      }
    }
    
    // Connecting line (path)
    ctx.beginPath();
    ctx.moveTo(startX - 20, startY + 10);
    for (let i = 0; i < 5; i++) {
      const x = startX + i * 60;
      const y = startY - i * 40 - Math.sin(step + i) * 10 - 10;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 15;
    ctx.stroke();
    
    step += 0.05;
    requestAnimationFrame(draw);
  }
  
  resize();
  window.addEventListener('resize', resize);
  draw();
}

// ===== RESULTS GALLERY - CAROUSEL & LIGHTBOX =====
function initResultsGallery() {
  const track = document.getElementById('carouselTrack');
  const pages = document.querySelectorAll('.carousel-page');
  const prevBtn = document.getElementById('prevArrow');
  const nextBtn = document.getElementById('nextArrow');
  const dots = document.querySelectorAll('.dot');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const screenshotItems = document.querySelectorAll('.screenshot-item');
  
  let currentPage = 0;
  let currentImageIndex = 0;
  let startX, isDragging = false;
  
  // Update carousel position
  function updateCarousel() {
    track.style.transform = `translateX(-${currentPage * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentPage);
    });
  }
  
  // Next page
  function nextPage() {
    if (currentPage < pages.length - 1) {
      currentPage++;
      updateCarousel();
    }
  }
  
  // Previous page
  function prevPage() {
    if (currentPage > 0) {
      currentPage--;
      updateCarousel();
    }
  }
  
  // Event listeners for arrows
  if (prevBtn) prevBtn.addEventListener('click', prevPage);
  if (nextBtn) nextBtn.addEventListener('click', nextPage);
  
  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentPage = index;
      updateCarousel();
    });
  });
  
  // Touch/Swipe support
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
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
        nextPage(); // Swipe left
      } else {
        prevPage(); // Swipe right
      }
    }
    
    isDragging = false;
  });
  
  // Lightbox functionality
  screenshotItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.screenshot-img');
      currentImageIndex = index;
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close lightbox
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Navigate lightbox
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex - 1 + screenshotItems.length) % screenshotItems.length;
      const newImg = screenshotItems[currentImageIndex].querySelector('.screenshot-img');
      lightboxImg.src = newImg.src;
    });
  }
  
  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex + 1) % screenshotItems.length;
      const newImg = screenshotItems[currentImageIndex].querySelector('.screenshot-img');
      lightboxImg.src = newImg.src;
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    } else if (e.key === 'ArrowLeft') {
      lightboxPrev.click();
    } else if (e.key === 'ArrowRight') {
      lightboxNext.click();
    }
  });
  
  // Initialize first page
  updateCarousel();
}

// ===== FAQ ACCORDION =====
function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close other items (optional - remove if you want multiple open)
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
}




