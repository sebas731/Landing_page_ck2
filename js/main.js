// ── HERO SLIDER ──
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
let current = 0, timer;

function goTo(n) {
  slides[current]?.classList.remove('active');
  dots[current]?.classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current]?.classList.add('active');
  dots[current]?.classList.add('active');
}
function autoPlay() { timer = setInterval(() => goTo(current + 1), 4500); }

document.querySelector('.slide-btn.next')?.addEventListener('click', () => { clearInterval(timer); goTo(current + 1); autoPlay(); });
document.querySelector('.slide-btn.prev')?.addEventListener('click', () => { clearInterval(timer); goTo(current - 1); autoPlay(); });
dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(timer); goTo(i); autoPlay(); }));
if (slides.length) autoPlay();

// ── STICKY HEADER SHADOW ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── ACCORDION (FAQ, specs) ──
document.querySelectorAll('.acc-btn, .faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');
    // close siblings
    btn.closest('.accordion, .faq-list')?.querySelectorAll('.acc-btn.open, .faq-btn.open').forEach(b => {
      b.classList.remove('open');
      b.nextElementSibling?.classList.remove('open');
    });
    if (!isOpen) { btn.classList.add('open'); body?.classList.add('open'); }
  });
});

// ── PLACEHOLDER IMAGES (cuando no hay archivos reales) ──
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function () {
    const w = this.width || 400;
    const h = this.height || 400;
    this.src = `https://placehold.co/${w}x${h}/E8E8E8/AAAAAA?text=Imagen`;
    this.onerror = null;
  });
});

// ── BACKGROUND IMAGE PLACEHOLDER (para divs con background-image vacío) ──
document.querySelectorAll('[style*="background-image"]').forEach(el => {
  const style = el.getAttribute('style') || '';
  const match = style.match(/url\(['"]?([^'"]+)['"]?\)/);
  if (match) {
    const testImg = new Image();
    testImg.src = match[1];
    testImg.onerror = () => {
      el.style.backgroundImage = `url('https://placehold.co/800x600/2C2C2C/AAAAAA?text=Imagen')`;
    };
  }
});

// ─────────────────────────────────────
// CARRITO
// ─────────────────────────────────────
const WA_NUMBER = '51955372605'; // ← cambia por el número real

let cart = JSON.parse(localStorage.getItem('ck2-cart') || '[]');

function openCart()  { document.getElementById('cart-sidebar').classList.add('open');    document.getElementById('cart-overlay').classList.add('open'); }
function closeCart() { document.getElementById('cart-sidebar').classList.remove('open'); document.getElementById('cart-overlay').classList.remove('open'); }

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.cart-btn')?.addEventListener('click', openCart);
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);
  document.getElementById('cart-close')?.addEventListener('click', closeCart);

  document.querySelectorAll('.btn-red').forEach(btn => {
    if (btn.textContent.trim().toLowerCase().includes('carrito')) {
      btn.addEventListener('click', () => {
        const qty    = parseInt(document.getElementById('qty-val')?.textContent || '1');
        const nombre = document.querySelector('.pd-title')?.textContent?.trim() || 'Producto';
        const precio = parseFloat(document.querySelector('.pd-price')?.textContent?.replace(/[^0-9.]/g,'')) || 0;
        const img    = document.getElementById('main-img')?.src || '';
        addToCart({ nombre, precio, qty, img });
        openCart();

        const orig = btn.textContent;
        btn.textContent = '✓ Agregado';
        btn.style.background = '#1A8C4E';
        setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 1800);
      });
    }
  });

  document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const card   = btn.closest('.product-card');
      const nombre = card?.querySelector('h3')?.textContent?.trim() || 'Producto';
      const precio = parseFloat(card?.querySelector('.price-now')?.textContent?.replace(/[^0-9.]/g,'')) || 0;
      const img    = card?.querySelector('img')?.src || '';
      addToCart({ nombre, precio, qty: 1, img });
      openCart();
    });
  });

  renderCart();
});

function addToCart({ nombre, precio, qty, img }) {
  const existing = cart.find(i => i.nombre === nombre);
  if (existing) { existing.qty += qty; }
  else { cart.push({ nombre, precio, qty, img }); }
  localStorage.setItem('ck2-cart', JSON.stringify(cart)); // ← agrega esto
  renderCart();
  updateCartCount();
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  localStorage.setItem('ck2-cart', JSON.stringify(cart)); // ← agrega esto
  renderCart();
  updateCartCount();
}

function changeQtyCart(idx, delta) {
  cart[idx].qty += delta;
  if (cart[idx].qty < 1) { removeFromCart(idx); return; }
  localStorage.setItem('ck2-cart', JSON.stringify(cart)); // ← agrega esto
  renderCart();
  updateCartCount();
}

function updateCartCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = total);
}

function renderCart() {
  const body   = document.getElementById('cart-body');
  const footer = document.getElementById('cart-footer');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Tu carrito está vacío</p>
        <span>Agrega productos para continuar</span>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  body.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="ci-img">
        <img src="${item.img}" alt="${item.nombre}" onerror="this.src='https://placehold.co/64x64/E8E8E8/AAAAAA?text=?'">
      </div>
      <div class="ci-info">
        <p class="ci-name">${item.nombre}</p>
        <p class="ci-price">S/. ${item.precio.toFixed(2)}</p>
        <div class="ci-qty">
          <button onclick="changeQtyCart(${i}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQtyCart(${i}, 1)">+</button>
        </div>
      </div>
      <button class="ci-remove" onclick="removeFromCart(${i})">✕</button>
    </div>
  `).join('');

  const total = cart.reduce((s, i) => s + i.precio * i.qty, 0);
  if (footer) {
    footer.style.display = 'block';
    document.getElementById('cart-total').textContent = `S/. ${total.toFixed(2)}`;
  }
  updateCartCount();
}

function pedirPorWhatsApp() {
  if (cart.length === 0) return;
  const lineas = cart.map(i => `• ${i.nombre} x${i.qty} — S/. ${(i.precio * i.qty).toFixed(2)}`).join('\n');
  const total  = cart.reduce((s, i) => s + i.precio * i.qty, 0);
  const msg    = `Hola, quiero hacer un pedido:\n\n${lineas}\n\n*Total: S/. ${total.toFixed(2)}*\n\n¿Tienen stock disponible?`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  // Al final, limpiar el carrito
  cart = [];
  localStorage.removeItem('ck2-cart');
  renderCart();
  updateCartCount();
}

//Oferta del dia
(function() {
  const end = new Date();
  end.setHours(23, 59, 59, 0); // termina a medianoche

  function tick() {
    const diff = end - new Date();
    if (diff <= 0) return;
    const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    const elH = document.getElementById('cd-h');
    const elM = document.getElementById('cd-m');
    const elS = document.getElementById('cd-s');
    if (elH) elH.textContent = h;
    if (elM) elM.textContent = m;
    if (elS) elS.textContent = s;
  }
  tick();
  setInterval(tick, 1000);
})();
// ver imagenes
function abrirLightbox(src) {
  var img   = document.getElementById('lightbox-img');
  var video = document.getElementById('lightbox-video');
  video.pause();
  video.style.display = 'none';
  img.style.display   = 'block';
  img.src = src;
  document.getElementById('lightbox').classList.add('open');
}
function cerrarLightbox() {
  var video = document.getElementById('lightbox-video');
  var img   = document.getElementById('lightbox-img');
  video.pause();
  video.style.display = 'none';
  img.style.display   = 'none';
  document.getElementById('lightbox').classList.remove('open');
}
// ver videos
function abrirLightboxVideo(src) {
  var img   = document.getElementById('lightbox-img');
  var video = document.getElementById('lightbox-video');
  var vsrc  = document.getElementById('lightbox-video-src');

  img.style.display   = 'none';
  video.style.display = 'block';
  vsrc.src = src;
  video.load();
  video.play();

  document.getElementById('lightbox').classList.add('open');
}
function cotizarWa() {
  var color = document.querySelector('.c-dot.active')?.title || 'no especificado';
  var link  = window.location.href;
  var msg   = `Hola, quiero cotizar este producto:\n${link}\n\nColor: ${color}\n\n¿Tienen stock disponible?`;
  window.open(`https://wa.me/51934468388?text=${encodeURIComponent(msg)}`, '_blank');
}

// ── MENÚ MÓVIL ──
document.querySelector('.menu-btn')?.addEventListener('click', function() {
  document.querySelector('.main-nav').classList.toggle('nav-open');
});
