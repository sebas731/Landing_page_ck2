// ── GALERÍA DE PRODUCTO ──
const mainImg = document.getElementById('main-img');
document.querySelectorAll('.thumb').forEach(thumb => {
  thumb.addEventListener('click', function () {
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    const src = this.dataset.img;
    if (src && mainImg) {
      mainImg.style.opacity = '0';
      setTimeout(() => { mainImg.src = src; mainImg.style.opacity = '1'; }, 180);
      mainImg.style.transition = 'opacity .18s';
    }
  });
});

// ── CANTIDAD ──
const qtyVal = document.getElementById('qty-val');
document.getElementById('qty-minus')?.addEventListener('click', () => {
  const v = parseInt(qtyVal.textContent);
  if (v > 1) qtyVal.textContent = v - 1;
});
document.getElementById('qty-plus')?.addEventListener('click', () => {
  qtyVal.textContent = parseInt(qtyVal.textContent) + 1;
});

// ── VIDEO EN GALERÍA ──
document.querySelectorAll('.thumb-video').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var videoSrc = this.dataset.video;
    var main = document.getElementById('main-img');
    var mainWrap = main.parentElement;

    // Quitar video anterior si existe
    var oldVideo = mainWrap.querySelector('video');
    if (oldVideo) oldVideo.remove();
    main.style.display = 'none';

    // Crear el video
    var video = document.createElement('video');
    video.src = videoSrc;
    video.controls = true;
    video.autoplay = true;
    video.style.cssText = 'width:100%;height:100%;object-fit:contain;border-radius:14px;background:#000';
    mainWrap.appendChild(video);

    // Marcar thumb activo
    document.querySelectorAll('.thumb').forEach(function(t) { t.classList.remove('active'); });
    btn.classList.add('active');
  });
});

// Al hacer click en thumb de imagen, quitar el video
document.querySelectorAll('.thumb:not(.thumb-video)').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var mainWrap = document.getElementById('main-img').parentElement;
    var oldVideo = mainWrap.querySelector('video');
    if (oldVideo) oldVideo.remove();
    document.getElementById('main-img').style.display = 'block';
  });
});