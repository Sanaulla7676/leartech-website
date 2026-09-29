/* ==========================================================================
   LEARTECH AUTOMATION VENTURES - 2026 OFFICIAL APPLICATION SCRIPT
   Features: SPA Routing, Counter Finder, Live POS Simulator, ROI Calculator,
   Quote Drawer, Product Quick View, Search & Filter, Scroll Reveal, Audio Effects.
   ========================================================================== */

(function () {
  'use strict';

  // --- DATA DEFINITIONS ---
  const PRODUCTS = [
    {
      id: 'bm100',
      name: 'Leartech LT-BM100 Billing Machine',
      cat: 'Billing Machines',
      price: 8500,
      image: 'billing_machine',
      tag: 'Bestseller',
      desc: 'Compact standalone billing machine with alphanumeric keyboard, 16x2 LCD display, and fast thermal printer for retail counters.',
      specs: { print: 'Thermal line', paper: '58mm', display: '16x2 LCD', connectivity: 'USB / Serial' }
    },
    {
      id: 'tp80',
      name: 'Leartech TP-80 Thermal Printer',
      cat: 'Thermal Printers',
      price: 6800,
      image: 'thermal_printer',
      tag: 'Popular',
      desc: 'High-speed 80mm thermal receipt printer with auto-cutter for busy supermarket and retail billing desks.',
      specs: { print: 'Thermal Direct', paper: '80mm', speed: '260mm/sec', interface: 'USB + LAN' }
    },
    {
      id: 'pos15',
      name: 'Leartech POS-T15 Touch Screen POS',
      cat: 'Touch Screen POS',
      price: 32000,
      image: 'touch_pos',
      tag: 'Flagship',
      desc: 'Modern 15.6" capacitive touchscreen POS terminal with high-performance processor and sleek aluminum casing.',
      specs: { screen: '15.6" Full HD', touch: 'Capacitive Multi-touch', ram: '4GB / 8GB', os: 'Windows / Android' }
    },
    {
      id: 'soft',
      name: 'Leartech Billing Pro Software',
      cat: 'Billing Software',
      price: 7500,
      image: 'software_laptop',
      tag: 'GST Ready',
      desc: 'Comprehensive billing and inventory software featuring sales management, customer tracking, barcode generation, and GST reports.',
      specs: { mode: 'Cloud + Offline', users: 'Multi-user', gst: 'Full Compliance', reports: '50+ Business Insights' }
    },
    {
      id: 'epson',
      name: 'Epson TM-T82III Thermal Printer',
      cat: 'Thermal Printers',
      price: 11500,
      image: 'thermal_printer',
      tag: 'Enterprise',
      desc: 'Industrial-grade thermal receipt printer engineered for non-stop reliability in heavy-duty counter environments.',
      specs: { brand: 'Epson', paper: '80mm', cutter: 'Auto-cutter 1.5M cuts', warranty: '1 Year' }
    },
    {
      id: 'rongta',
      name: 'Rongta RP80 Thermal Printer',
      cat: 'Thermal Printers',
      price: 6200,
      image: 'thermal_printer',
      tag: 'Budget Pick',
      desc: 'Cost-effective 80mm thermal printing solution offering clean receipt output and low operational power consumption.',
      specs: { brand: 'Rongta', paper: '80mm', speed: '200mm/sec', interface: 'USB' }
    },
    {
      id: 'honeywell',
      name: 'Honeywell Voyager Barcode Scanner',
      cat: 'Touch Screen POS',
      price: 4800,
      image: 'barcode_scanner',
      tag: 'Scanner',
      desc: 'High-precision 1D/2D handheld barcode scanner for rapid checkout in retail and pharmacy counters.',
      specs: { scan: '1D / 2D QR Code', type: 'Handheld Laser', interface: 'USB Plug & Play' }
    },
    {
      id: 'access',
      name: 'POS Cash Drawer & Accessories Kit',
      cat: 'Touch Screen POS',
      price: 3500,
      image: 'cash_drawer',
      tag: 'Essential',
      desc: 'Heavy-duty steel cash drawer with RJ11 auto-trigger connection and bill organizer for complete checkout counters.',
      specs: { slots: '4 Note / 8 Coin', trigger: 'RJ11 Printer Auto-open', material: 'Reinforced Steel' }
    }
  ];

  const SOLUTIONS_DATA = {
    retail: {
      meta: 'RETAIL • COUNTER SETUP',
      title: 'Faster checkout without a cluttered counter.',
      copy: 'Pair a touchscreen POS or billing machine with thermal printing and barcode scanning for a straightforward retail workflow.',
      image: 'retail',
      items: ['Billing Machine / Touch POS', 'Thermal Printer', 'Barcode Scanner', 'Billing Software']
    },
    restaurant: {
      meta: 'RESTAURANT • FAST SERVICE',
      title: 'Keep the queue moving when the counter gets busy.',
      copy: 'Build around quick menu billing, touchscreen interaction, kitchen receipt printing, and rapid checkout.',
      image: 'restaurant',
      items: ['Touchscreen POS', 'Kitchen Order Printer', 'Billing Software', 'Customer Pay Station']
    },
    pharmacy: {
      meta: 'PHARMACY • SPECIALIST RETAIL',
      title: 'Make specialist medicine billing feel simple.',
      copy: 'Use a structured counter setup for batch lookup, expiry tracking, GST invoices, and instant thermal billing.',
      image: 'pharmacy',
      items: ['Leartech Billing Software', 'Thermal Receipt Printer', 'Barcode Scanner', 'Touch POS Terminal']
    },
    fashion: {
      meta: 'FASHION • PRODUCT VARIANTS',
      title: 'A cleaner counter for a more visual store.',
      copy: 'Combine modern POS hardware with software workflows that organize size, color variants, pricing, and tags.',
      image: 'fashion',
      items: ['Touchscreen POS', 'Variant Software', 'Barcode Tag Scanner', 'Thermal Printer']
    },
    electronics: {
      meta: 'ELECTRONICS • PRODUCT RETAIL',
      title: 'Keep high-value inventory visible and tracked.',
      copy: 'Practical counter solution for handling serial numbers, warranty tracking, customer invoices, and accessories.',
      image: 'electronics_mobile',
      items: ['Billing Software', 'Touchscreen POS', 'Barcode Scanner', 'Thermal Printer']
    },
    hardware: {
      meta: 'HARDWARE • INVENTORY-HEAVY',
      title: 'Built for heavy-duty counters and bulk items.',
      copy: 'Structure your checkout around fast barcode billing, weight-scale integration, and durable hardware.',
      image: 'hardware_electrical',
      items: ['Barcode Scanner', 'Billing Software', 'Thermal Printer', 'Steel Cash Drawer']
    }
  };

  // State
  let cart = JSON.parse(localStorage.getItem('leartech_cart') || '[]');
  let activeCategory = 'All';
  let searchQuery = '';
  let currentSort = 'Featured';

  // DOM Elements
  const DOM = {};

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    cacheDOM();
    initRouter();
    initScrollProgress();
    initScrollReveals();
    initCounterFinder();
    initPOSSimulator();
    initROICalculator();
    initProductsGrid();
    initQuoteDrawer();
    initModals();
    initFAQ();
    initContactForm();
    initMetricsCounter();
    initFloatButtons();
    updateCartUI();
  });

  function cacheDOM() {
    DOM.pages = document.querySelectorAll('.page');
    DOM.navLinks = document.querySelectorAll('header nav a, .footer a[data-page]');
    DOM.header = document.querySelector('header');
    DOM.scrollProgress = document.getElementById('scrollProgress');
    DOM.menuToggle = document.getElementById('menuToggle');
    DOM.mobileNav = document.getElementById('mobileNav');
    
    // Finder
    DOM.iqTabs = document.querySelectorAll('.iq-tab');
    DOM.iqMeta = document.getElementById('iqMeta');
    DOM.iqTitle = document.getElementById('iqTitle');
    DOM.iqCopy = document.getElementById('iqCopy');
    DOM.iqList = document.getElementById('iqList');
    DOM.iqImage = document.getElementById('iqImage');

    // Simulator
    DOM.simItems = document.querySelectorAll('.sim-item-btn');
    DOM.simReceiptBody = document.getElementById('simReceiptBody');
    DOM.simTotal = document.getElementById('simTotal');
    DOM.simPrintBtn = document.getElementById('simPrintBtn');
    DOM.simClearBtn = document.getElementById('simClearBtn');
    DOM.simPaper = document.getElementById('simPaper');

    // ROI
    DOM.roiBillsInput = document.getElementById('roiBillsInput');
    DOM.roiBillsVal = document.getElementById('roiBillsVal');
    DOM.roiHoursVal = document.getElementById('roiHoursVal');
    DOM.roiRevenueVal = document.getElementById('roiRevenueVal');

    // Products
    DOM.productsGrid = document.getElementById('productsGrid');
    DOM.homeProductsGrid = document.getElementById('homeProducts');
    DOM.catTabs = document.querySelectorAll('.tab[data-cat]');
    DOM.searchInput = document.getElementById('searchInput');
    DOM.sortSelect = document.getElementById('sortSelect');
    DOM.productCount = document.getElementById('productCount');

    // Drawer
    DOM.cartBadge = document.getElementById('cartBadge');
    DOM.drawerOverlay = document.getElementById('drawerOverlay');
    DOM.drawer = document.getElementById('drawer');
    DOM.drawerItems = document.getElementById('drawerItems');
    DOM.drawerTotal = document.getElementById('drawerTotal');
    DOM.drawerOpenBtns = document.querySelectorAll('.open-quote-drawer');
    DOM.drawerCloseBtn = document.getElementById('drawerCloseBtn');
    DOM.sendWhatsappBtn = document.getElementById('sendWhatsappBtn');

    // Quick View Modal
    DOM.modalOverlay = document.getElementById('modalOverlay');
    DOM.modalContent = document.getElementById('modalContent');
    DOM.modalCloseBtn = document.getElementById('modalCloseBtn');
  }

  // --- SPA ROUTER ---
  function initRouter() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute();

    // Link click listeners
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-page]');
      if (link) {
        e.preventDefault();
        const pageId = link.dataset.page;
        const param = link.dataset.param;
        if (param) {
          window.location.hash = `#${pageId}/${param}`;
        } else {
          window.location.hash = `#${pageId}`;
        }
      }
    });

    if (DOM.menuToggle && DOM.mobileNav) {
      DOM.menuToggle.addEventListener('click', () => {
        DOM.mobileNav.classList.toggle('mobile-open');
      });
    }
  }

  function handleRoute() {
    const rawHash = window.location.hash.replace('#', '') || 'home';
    const parts = rawHash.split('/');
    const pageId = parts[0];
    const param = parts[1];

    let targetPage = document.getElementById(`page-${pageId}`);
    if (!targetPage) targetPage = document.getElementById('page-home');

    DOM.pages.forEach(p => {
      p.classList.remove('active');
    });
    targetPage.classList.add('active');

    // Update nav links active state
    DOM.navLinks.forEach(a => {
      a.classList.toggle('active', a.dataset.page === pageId);
    });

    // Close mobile nav if open
    if (DOM.mobileNav) DOM.mobileNav.classList.remove('mobile-open');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Handle product detail page
    if (pageId === 'product' && param) {
      renderProductDetailPage(param);
    }
  }

  // --- SCROLL PROGRESS & HEADER ---
  function initScrollProgress() {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      if (DOM.scrollProgress) {
        DOM.scrollProgress.style.setProperty('--progress', `${scrolled}%`);
      }

      if (DOM.header) {
        if (winScroll > 40) {
          DOM.header.classList.add('scrolled');
        } else {
          DOM.header.classList.remove('scrolled');
        }
      }

      const floatTop = document.getElementById('floatTop');
      if (floatTop) {
        if (winScroll > 400) floatTop.classList.add('visible');
        else floatTop.classList.remove('visible');
      }
    });
  }

  // --- SCROLL REVEALS ---
  function initScrollReveals() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .reveal-scale, .stagger').forEach(el => {
      observer.observe(el);
    });
  }

  // --- INTERACTIVE COUNTER FINDER ---
  function initCounterFinder() {
    if (!DOM.iqTabs.length) return;

    DOM.iqTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const key = tab.dataset.solution;
        if (!SOLUTIONS_DATA[key]) return;

        DOM.iqTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const data = SOLUTIONS_DATA[key];
        DOM.iqMeta.textContent = data.meta;
        DOM.iqTitle.textContent = data.title;
        DOM.iqCopy.textContent = data.copy;
        DOM.iqList.innerHTML = data.items.map(item => `<div>${item}</div>`).join('');
        DOM.iqImage.src = `./assets/images/${data.image}.jpg`;

        // Animate result container
        const resultCard = document.querySelector('.iq-result');
        if (resultCard) {
          resultCard.animate([
            { opacity: 0.4, transform: 'translateY(8px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], { duration: 350, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
        }
      });
    });
  }

  // --- LIVE POS SIMULATOR ---
  let simCart = [];
  function initPOSSimulator() {
    if (!DOM.simItems.length) return;

    DOM.simItems.forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const price = parseInt(btn.dataset.price, 10);
        
        simCart.push({ name, price });
        updateSimUI();
        playBeepSound();
      });
    });

    if (DOM.simClearBtn) {
      DOM.simClearBtn.addEventListener('click', () => {
        simCart = [];
        updateSimUI();
      });
    }

    if (DOM.simPrintBtn) {
      DOM.simPrintBtn.addEventListener('click', () => {
        if (simCart.length === 0) return;

        playThermalPrintSound();

        if (DOM.simPaper) {
          DOM.simPaper.style.transform = 'translateY(0) scaleY(1)';
          DOM.simPaper.style.opacity = '1';
          
          DOM.simPaper.animate([
            { transform: 'translateY(-50px) scaleY(0)', opacity: 0 },
            { transform: 'translateY(0) scaleY(1)', opacity: 1 }
          ], { duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
        }
      });
    }
  }

  function updateSimUI() {
    if (!DOM.simReceiptBody) return;
    if (simCart.length === 0) {
      DOM.simReceiptBody.innerHTML = '<div style="text-align:center; color:#888; padding:20px 0;">Tap items on the left POS to start billing...</div>';
      DOM.simTotal.textContent = '₹0.00';
      return;
    }

    let total = 0;
    let html = '';
    simCart.forEach(item => {
      total += item.price;
      html += `<div class="row-item"><span>${item.name}</span><span>₹${item.price}</span></div>`;
    });

    DOM.simReceiptBody.innerHTML = html;
    DOM.simTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
  }

  function playBeepSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      // Audio fallback silent
    }
  }

  function playThermalPrintSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      whiteNoise.connect(gain);
      gain.connect(ctx.destination);
      whiteNoise.start();
    } catch (e) {}
  }

  // --- ROI / SAVINGS CALCULATOR ---
  function initROICalculator() {
    if (!DOM.roiBillsInput) return;

    DOM.roiBillsInput.addEventListener('input', (e) => {
      const bills = parseInt(e.target.value, 10);
      DOM.roiBillsVal.textContent = bills;

      // Calculation: Leartech POS saves ~1.5 mins per bill
      const hoursSavedPerMonth = Math.round((bills * 1.5 * 30) / 60);
      const revenueBoost = Math.round(bills * 18 * 30); // ₹18 extra margin/efficiency per transaction

      DOM.roiHoursVal.textContent = `${hoursSavedPerMonth} Hours`;
      DOM.roiRevenueVal.textContent = `₹${revenueBoost.toLocaleString('en-IN')}`;
    });
  }

  // --- PRODUCTS GRID & CATALOG ---
  function initProductsGrid() {
    renderProducts();

    // Category filter tabs
    if (DOM.catTabs.length) {
      DOM.catTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          DOM.catTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          activeCategory = tab.dataset.cat;
          renderProducts();
        });
      });
    }

    // Search Input
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderProducts();
      });
    }

    // Sort select
    if (DOM.sortSelect) {
      DOM.sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
      });
    }
  }

  function getFilteredProducts() {
    return PRODUCTS.filter(p => {
      const matchesCat = (activeCategory === 'All' || p.cat === activeCategory);
      const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery) || p.desc.toLowerCase().includes(searchQuery);
      return matchesCat && matchesSearch;
    }).sort((a, b) => {
      if (currentSort === 'Price: Low to High') return a.price - b.price;
      if (currentSort === 'Price: High to Low') return b.price - a.price;
      return 0; // Featured
    });
  }

  function renderProducts() {
    const list = getFilteredProducts();

    if (DOM.productCount) DOM.productCount.textContent = `(${list.length})`;

    if (DOM.productsGrid) {
      if (list.length === 0) {
        DOM.productsGrid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:40px; color:#777;">No products matched your filters.</div>';
      } else {
        DOM.productsGrid.innerHTML = list.map(createProductCardHTML).join('');
      }
    }

    // Also render 4 featured products on home page if element exists
    if (DOM.homeProductsGrid) {
      DOM.homeProductsGrid.innerHTML = PRODUCTS.slice(0, 4).map(createProductCardHTML).join('');
    }
  }

  function createProductCardHTML(p) {
    return `
      <article class="prod-card">
        <span class="tag">${p.tag}</span>
        <div class="real-visual">
          <img src="./assets/images/${p.image}.jpg" alt="${p.name}" loading="lazy" />
        </div>
        <div class="body">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="price">₹${p.price.toLocaleString('en-IN')}</div>
          <div class="product-actions">
            <button class="btn primary add-to-cart-btn" data-id="${p.id}">+ Add to Quote</button>
            <button class="btn outline quick-view-btn" data-id="${p.id}">Quick View</button>
          </div>
        </div>
      </article>
    `;
  }

  // --- PRODUCT DETAIL PAGE RENDER ---
  function renderProductDetailPage(id) {
    const p = PRODUCTS.find(item => item.id === id) || PRODUCTS[0];
    const detailContainer = document.getElementById('productDetailContainer');
    if (!detailContainer) return;

    detailContainer.innerHTML = `
      <div class="breadcrumb"><a href="#products" data-page="products">Products</a> › ${p.cat} › ${p.name}</div>
      <div class="detail" style="margin-top:20px;">
        <div class="gallery">
          <div class="gallery-main photo-main" style="height:380px;">
            <img class="detail-photo" src="./assets/images/${p.image}.jpg" alt="${p.name}" />
          </div>
        </div>
        <div class="detail-copy">
          <span class="tag">${p.tag}</span>
          <h1 style="margin-top:10px; font-size:36px;">${p.name}</h1>
          <div class="rating" style="color:#ffb000; margin:8px 0; font-weight:bold;">★★★★★ <span>4.9 (150+ reviews)</span></div>
          <p style="color:var(--muted); font-size:15px; line-height:1.6;">${p.desc}</p>
          <div class="bigprice" style="font-size:36px; font-weight:900; color:var(--navy); margin:16px 0;">₹${p.price.toLocaleString('en-IN')}</div>
          <div class="cta-row">
            <button class="btn primary add-to-cart-btn" data-id="${p.id}" style="padding:14px 28px;">Add to Quote Drawer</button>
            <a class="btn green" href="https://wa.me/918904997113?text=Hi%20Leartech,%20I%20want%20to%20enquire%20about%20${encodeURIComponent(p.name)}" target="_blank" style="padding:14px 24px;">Enquire on WhatsApp →</a>
          </div>
          <div class="specs" style="margin-top:24px; display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            ${Object.entries(p.specs).map(([k, v]) => `
              <div class="spec" style="background:#fff; border:1px solid var(--line); border-radius:12px; padding:12px;">
                <b style="text-transform:capitalize; font-size:11px; color:#66758a;">${k}</b>
                <span style="display:block; font-weight:800; color:var(--navy); font-size:13px;">${v}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // --- QUOTE DRAWER & CART ---
  function initQuoteDrawer() {
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.add-to-cart-btn');
      if (addBtn) {
        const id = addBtn.dataset.id;
        addToCart(id);
      }

      if (e.target.closest('.open-quote-drawer')) {
        openDrawer();
      }
    });

    if (DOM.drawerCloseBtn) DOM.drawerCloseBtn.addEventListener('click', closeDrawer);
    if (DOM.drawerOverlay) DOM.drawerOverlay.addEventListener('click', closeDrawer);

    if (DOM.sendWhatsappBtn) {
      DOM.sendWhatsappBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        
        let msg = "Hi Leartech Automation Ventures! I would like to request a formal quote for the following items:\n\n";
        let grandTotal = 0;
        cart.forEach((item, idx) => {
          const itemTotal = item.price * item.qty;
          grandTotal += itemTotal;
          msg += `${idx + 1}. ${item.name} x ${item.qty} = ₹${itemTotal.toLocaleString('en-IN')}\n`;
        });
        msg += `\nEstimated Total: ₹${grandTotal.toLocaleString('en-IN')}\n\nPlease share availability and delivery details for Bengaluru.`;

        const waUrl = `https://wa.me/918904997113?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank');
      });
    }
  }

  function addToCart(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    saveCart();
    updateCartUI();
    openDrawer();
  }

  function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    if (DOM.cartBadge) {
      DOM.cartBadge.textContent = totalCount;
      DOM.cartBadge.style.display = totalCount > 0 ? 'grid' : 'none';
    }

    if (DOM.drawerItems) {
      if (cart.length === 0) {
        DOM.drawerItems.innerHTML = '<div style="text-align:center; padding:40px 0; color:#888;">Your quote drawer is empty.</div>';
        if (DOM.drawerTotal) DOM.drawerTotal.textContent = '₹0';
      } else {
        let total = 0;
        let html = '';
        cart.forEach(item => {
          total += item.price * item.qty;
          html += `
            <div class="drawer-item">
              <img src="./assets/images/${item.image}.jpg" alt="${item.name}" />
              <div class="drawer-item-info">
                <strong>${item.name}</strong>
                <span>₹${item.price.toLocaleString('en-IN')}</span>
              </div>
              <div class="drawer-qty">
                <button onclick="window.LeartechApp.changeQty('${item.id}', -1)">-</button>
                <span>${item.qty}</span>
                <button onclick="window.LeartechApp.changeQty('${item.id}', 1)">+</button>
              </div>
            </div>
          `;
        });
        DOM.drawerItems.innerHTML = html;
        if (DOM.drawerTotal) DOM.drawerTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
      }
    }
  }

  function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    saveCart();
    updateCartUI();
  }

  function saveCart() {
    localStorage.setItem('leartech_cart', JSON.stringify(cart));
  }

  function openDrawer() {
    if (DOM.drawer) DOM.drawer.classList.add('open');
    if (DOM.drawerOverlay) DOM.drawerOverlay.classList.add('open');
  }

  function closeDrawer() {
    if (DOM.drawer) DOM.drawer.classList.remove('open');
    if (DOM.drawerOverlay) DOM.drawerOverlay.classList.remove('open');
  }

  // --- MODALS (QUICK VIEW) ---
  function initModals() {
    document.addEventListener('click', (e) => {
      const qvBtn = e.target.closest('.quick-view-btn');
      if (qvBtn) {
        const id = qvBtn.dataset.id;
        openQuickView(id);
      }
    });

    if (DOM.modalCloseBtn) DOM.modalCloseBtn.addEventListener('click', closeModal);
    if (DOM.modalOverlay) DOM.modalOverlay.addEventListener('click', (e) => {
      if (e.target === DOM.modalOverlay) closeModal();
    });
  }

  function openQuickView(id) {
    const p = PRODUCTS.find(item => item.id === id);
    if (!p || !DOM.modalContent) return;

    DOM.modalContent.innerHTML = `
      <div style="display:grid; grid-template-columns:1fr 1.1fr; gap:24px; align-items:center;">
        <div style="border-radius:18px; overflow:hidden; background:#f0f4f9;">
          <img src="./assets/images/${p.image}.jpg" alt="${p.name}" style="width:100%; height:280px; object-fit:cover;" />
        </div>
        <div>
          <span class="tag" style="position:static;">${p.tag}</span>
          <h2 style="font-size:24px; margin:8px 0;">${p.name}</h2>
          <p style="color:var(--muted); font-size:13px; line-height:1.5;">${p.desc}</p>
          <div style="font-size:28px; font-weight:900; color:var(--navy); margin:14px 0;">₹${p.price.toLocaleString('en-IN')}</div>
          <div style="display:flex; gap:10px;">
            <button class="btn primary add-to-cart-btn" data-id="${p.id}">+ Add to Quote</button>
            <a class="btn outline" href="#product/${p.id}" data-page="product" data-param="${p.id}" onclick="window.LeartechApp.closeModal()">View Full Details</a>
          </div>
        </div>
      </div>
    `;

    if (DOM.modalOverlay) DOM.modalOverlay.classList.add('open');
  }

  function closeModal() {
    if (DOM.modalOverlay) DOM.modalOverlay.classList.remove('open');
  }

  // --- FAQ ACCORDION ---
  function initFAQ() {
    const faqContainer = document.getElementById('faqContainer');
    if (!faqContainer) return;

    const FAQS = [
      { q: "How do I install the billing software?", a: "Our technical team provides on-site or remote installation and full staff training for your counter workflow." },
      { q: "Do thermal printers require ink cartridges?", a: "No, thermal printers use heat-sensitive paper roll technology, eliminating the need for expensive ink or ribbon replacements." },
      { q: "Can I connect a barcode scanner and cash drawer to the Touch POS?", a: "Yes! Leartech POS terminals feature multiple USB, RS232, and RJ11 ports for seamless accessory integration." },
      { q: "Is GST billing supported in Leartech software?", a: "Absolutely. Our software produces GST-compliant invoices, HSN code breakdowns, and one-click GSTR reports." },
      { q: "Where is Leartech located for customer support?", a: "Our service hub is located at Chandra Layout, Bengaluru, providing fast local support across Karnataka and India." }
    ];

    faqContainer.innerHTML = FAQS.map(item => `
      <details class="faq-item">
        <summary>${item.q}</summary>
        <p>${item.a}</p>
      </details>
    `).join('');
  }

  // --- CONTACT FORM ---
  function initContactForm() {
    const leadForm = document.getElementById('leadForm');
    const notice = document.getElementById('notice');
    if (!leadForm) return;

    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value;
      const phone = document.getElementById('formPhone').value;
      const biz = document.getElementById('formBiz').value;
      const need = document.getElementById('formNeed').value;

      const msg = `Hi Leartech! My name is ${name} (${phone}).\nBusiness Type: ${biz}\nRequirement: ${need}`;
      const url = `https://wa.me/918904997113?text=${encodeURIComponent(msg)}`;

      if (notice) {
        notice.style.display = 'block';
        notice.textContent = "Opening WhatsApp to send your enquiry...";
      }

      setTimeout(() => {
        window.open(url, '_blank');
      }, 600);
    });
  }

  // --- NUMBER COUNTER ANIMATION ---
  function initMetricsCounter() {
    const metrics = document.querySelectorAll('.metric strong[data-target]');
    if (!metrics.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          let count = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              el.textContent = `${target}+`;
              clearInterval(timer);
            } else {
              el.textContent = `${count}+`;
            }
          }, 30);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    metrics.forEach(m => observer.observe(m));
  }

  // --- FLOAT BUTTONS ---
  function initFloatButtons() {
    const floatTop = document.getElementById('floatTop');
    if (floatTop) {
      floatTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // Global exposure for inline events
  window.LeartechApp = {
    changeQty,
    closeModal
  };

})();
