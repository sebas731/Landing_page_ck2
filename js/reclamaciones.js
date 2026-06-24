// ── LIBRO DE RECLAMACIONES ──
document.getElementById('rec-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const required = this.querySelectorAll('[required]');
  let valid = true;
  required.forEach(field => {
    field.style.borderColor = '';
    if (!field.value.trim() && field.type !== 'checkbox' && field.type !== 'radio') {
      field.style.borderColor = '#CC0000';
      valid = false;
    }
    if (field.type === 'checkbox' && !field.checked) valid = false;
    if (field.type === 'radio') {
      const group = document.querySelectorAll(`input[name="${field.name}"]`);
      const checked = [...group].some(r => r.checked);
      if (!checked) valid = false;
    }
  });
  if (!valid) { alert('Por favor completa todos los campos obligatorios.'); return; }

  // Simular envío
  const btn = this.querySelector('.btn-submit');
  btn.textContent = 'Enviando...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('rec-success').style.display = 'flex';
    btn.style.display = 'none';
    document.getElementById('rec-success').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1200);
});
