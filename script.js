// Buka undangan
  document.getElementById('btnBuka').addEventListener('click', function(){
    document.getElementById('cover').classList.add('opened');
    document.body.style.overflow = 'auto';
  });

  // Hitung mundur — ganti tanggal target sesuai acara
  const targetDate = new Date('2027-08-07T08:00:00+07:00').getTime();

  function updateCountdown(){
    const now = new Date().getTime();
    const diff = targetDate - now;

    const els = {
      hari: document.getElementById('cd-hari'),
      jam: document.getElementById('cd-jam'),
      menit: document.getElementById('cd-menit'),
      detik: document.getElementById('cd-detik'),
    };

    if(diff <= 0){
      els.hari.textContent = '00';
      els.jam.textContent = '00';
      els.menit.textContent = '00';
      els.detik.textContent = '00';
      return;
    }

    const hari = Math.floor(diff / (1000*60*60*24));
    const jam = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const menit = Math.floor((diff % (1000*60*60)) / (1000*60));
    const detik = Math.floor((diff % (1000*60)) / 1000);

    els.hari.textContent = String(hari).padStart(2,'0');
    els.jam.textContent = String(jam).padStart(2,'0');
    els.menit.textContent = String(menit).padStart(2,'0');
    els.detik.textContent = String(detik).padStart(2,'0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // RSVP sederhana (disimpan hanya di sesi ini, tampil sebagai daftar ucapan)
  const wishes = [];
  const wishesList = document.getElementById('wishesList');
  const wishEmpty = document.getElementById('wishEmpty');

  document.getElementById('formRsvp').addEventListener('submit', function(e){
    e.preventDefault();
    const nama = document.getElementById('nama').value.trim();
    const kehadiran = document.getElementById('kehadiran').value;
    const ucapan = document.getElementById('ucapan').value.trim();

    if(!nama) return;

    wishes.unshift({ nama, kehadiran, ucapan });
    renderWishes();
    this.reset();
    document.getElementById('jumlah').value = 1;
  });

  function renderWishes(){
    if(wishes.length === 0){
      wishEmpty.style.display = 'block';
      wishesList.innerHTML = '';
      return;
    }
    wishEmpty.style.display = 'none';
    wishesList.innerHTML = wishes.map(w => `
      <div class="wish-item">
        <b>${escapeHtml(w.nama)} · ${escapeHtml(w.kehadiran)}</b>
        ${w.ucapan ? escapeHtml(w.ucapan) : '<em>Semoga bahagia selalu.</em>'}
      </div>
    `).join('');
  }

  function escapeHtml(str){
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
        }
