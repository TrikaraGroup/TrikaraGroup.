document.addEventListener('DOMContentLoaded', () => {

    // 1. Variabel penampung data (Global di scope DOM)
    let dataOrder = { 
        layanan: '', 
        luas: 0, 
        total: '0' 
    };

    const btnHitung = document.getElementById('btnHitung');
    const btnWA1 = document.getElementById('btnWA1');
    const btnWA2 = document.getElementById('btnWA2');

    // 2. LOGIKA HITUNG
    if (btnHitung) {
        btnHitung.addEventListener('click', () => {
            const elLayanan = document.getElementById("layanan");
            const elLuas = document.getElementById("luas");
            
            if (!elLayanan || !elLuas) return;

            const luasVal = parseFloat(elLuas.value);
            const hargaM2 = parseInt(elLayanan.value);
            
            const opsiTerpilih = elLayanan.querySelector('option:checked');
            const teksLayanan = opsiTerpilih ? opsiTerpilih.textContent : "Layanan";

            // Validasi Input
            if (isNaN(luasVal) || luasVal <= 0) {
                alert("Masukkan luas bangunan dalam angka dulu!");
                return;
            }

            // Hitung Total
            const totalHitung = hargaM2 * luasVal;
            const totalFormat = totalHitung.toLocaleString('id-ID');

            // SIMPAN DATA KE MEMORI
            dataOrder.layanan = teksLayanan;
            dataOrder.luas = luasVal;
            dataOrder.total = totalFormat;

            // TAMPILKAN HASIL DI WEB
            const displayHarga = document.getElementById("totalHarga");
            const boxHasil = document.getElementById("resultBox");
            
            if (displayHarga && boxHasil) {
                displayHarga.innerText = "Rp " + totalFormat;
                boxHasil.classList.remove("hidden");
                
                // Scroll otomatis ke hasil agar user tidak bingung
                boxHasil.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    // 3. FUNGSI KIRIM WHATSAPP (REUSABLE)
    const kirimKeWhatsApp = (noWA) => {
        if (dataOrder.total === '0') {
            alert("Hitung dulu estimasinya baru kirim ke WA!");
            return;
        }

        const msg = `Halo TRIKARA Group, saya tertarik dengan jasa desain Anda.\n\n` +
                    `*Detail Pesanan:*\n` +
                    `- Layanan: ${dataOrder.layanan}\n` +
                    `- Luas: ${dataOrder.luas} m2\n` +
                    `- Estimasi Harga: Rp ${dataOrder.total}\n\n` +
                    `Mohon informasi selanjutnya.`;

        window.open(`https://wa.me/${noWA}?text=${encodeURIComponent(msg)}`, '_blank');
    };

    // Event Listener untuk masing-masing tombol Admin di Kalkulator
    btnWA1?.addEventListener('click', () => kirimKeWhatsApp("6289699473145"));
    btnWA2?.addEventListener('click', () => kirimKeWhatsApp("6281320007741"));

    // 4. TOGGLE MENU MOBILE
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileBtn?.addEventListener('click', () => {
        mobileMenu?.classList.toggle('hidden');
    });

    // Tutup menu saat link diklik (UX Improvement)
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu?.classList.add('hidden');
        });
    });
});