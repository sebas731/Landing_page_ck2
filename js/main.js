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
