Buatkan game edukasi interaktif 2D side-scrolling platformer bergaya retro 8-bit NES bertema bawah laut yang sangat mirip dengan Super Mario Bros World 2-2, lengkap dengan fisika berenang dan sistem kuis pop-up.

PARAMETER UTAMA:  
\- Materi Pembelajaran: \[IKUT KEPADA BAB 1.0 DALAM PENULISAN NOTA\]  
\- Jenjang Pendidikan: \[TAHUN 4-5\]

1\. FISIKA BAWAH LAUT & KONTROL (WAJIB DITERAPKAN):  
\- Karakter Utama: Tetap gunakan sprite Mario 8-bit asli (topi merah, baju cokelat, baju kodok/overall merah-oranye). Jangan diganti dengan karakter lain.  
\- Gravitasi Air (Sinking Physics): Di dalam air, jika pemain diam (tidak menekan tombol lompat/berenang), Mario akan turun/tenggelam secara perlahan ke arah dasar laut (gravitasi rendah, sekitar 30% dari gravitasi darat).  
\- Mekanik Berenang: Setiap kali tombol Lompat/Spasi/Atas ditekan berulang kali, Mario akan mengayuh naik ke atas secara bertahap sambil mengeluarkan partikel gelembung udara putih kecil dari tubuhnya yang naik ke permukaan.  
\- Batas Atas Air: Mario tidak bisa melompat keluar melewati garis gelombang permukaan air di bagian atas layar.

2\. DETAIL VISUAL & LINGKUNGAN BAWAH LAUT (WORLD 2-2):  
\- Latar Belakang (Background): Air laut berwarna biru tua pekat (\#0058F8) di seluruh area permainan, dengan bagian paling atas layar berwarna biru langit muda yang dibatasi oleh garis gelombang air berwarna putih.  
\- HUD (Bagian Atas Layar): Tampilkan teks font pixel putih di area langit atas berisi indikator: "MARIO (000000)", ikon koin beserta jumlahnya (x00), "WORLD 2-2", dan "TIME".  
\- Dasar Laut & Rintangan: Lantai dasar laut dan pijakan melayang tersusun dari balok batu karang berwarna hijau bertekstur pixel klasik. Buat beberapa celah jurang bawah laut (abyss) di dasar laut yang berbahaya jika Mario tenggelam ke dalamnya.  
\- Ornamen Laut: Tambahkan tanaman karang/rumput laut berwarna merah muda (pink coral) yang tumbuh menjulang di atas balok-balok batu hijau melayang, serta deretan koin emas/perunggu yang melayang di dekat dasar maupun di sela-sela rintangan.

3\. MEKANIK MUSUH BAWAH LAUT:  
\- Musuh 1 \- Cumi-cumi Putih (Blooper): Sprite cumi-cumi pixel putih bermata hitam yang bergerak secara diagonal naik-turun (zig-zag mengapung) mengejar posisi ketinggian Mario.  
\- Musuh 2 \- Ikan Buntal Bersayap (Cheep Cheep): Sprite ikan bulat berwarna oranye/abu-abu yang berenang lurus secara horizontal dari kanan ke kiri dengan kecepatan konstan di berbagai ketinggian air.  
\- Interaksi Musuh: Di bawah air, Mario tidak bisa menginjak musuh. Mario harus berenang menghindari Cumi-cumi dan Ikan. Jika bersentuhan dengan musuh, koin/skor berkurang sedikit dan Mario berkedip sebentar (invulnerable sementara) tanpa mengulang dari awal.

4\. DESAIN 5 BLOK "?" & SISTEM KUIS (BOLEH ULANG JIKA SALAH):  
\- Sebarkan tepat 5 Blok Tanda Tanya ("?") berwarna oranye keemasan di sepanjang rute bawah laut (ada yang berada di dekat dasar laut, ada yang melayang tinggi di dekat karang merah muda, dan ada yang dijaga oleh Cumi-cumi Blooper).  
\- Buat 5 soal pilihan ganda (A, B, C, D) yang sesuai dengan \[Materi Pembelajaran\] dan \[Jenjang Pendidikan\] di atas.  
\- Saat Mario menyentuh atau menyundul Blok "?", permainan dijeda (pause) dan muncul layar Pop-Up Pertanyaan bergaya retro:  
  \* JIKA JAWABAN BENAR: Blok "?" berubah menjadi balok cokelat polos (non-aktif), pemain mendapat tambahan Skor \+1000 serta \+10 Koin, dan muncul pesan apresiasi singkat.  
  \* JIKA JAWABAN SALAH: Muncul petunjuk singkat (hint), dan pemain BOLEH MENGULANG menjawab soal tersebut (tersedia tombol "Coba Lagi" pada pop-up atau pemain bisa menyundul kembali Blok "?" tersebut kapan saja hingga terjawab benar).

5\. GARIS AKHIR FLEKSIBEL (LANGSUNG MUNCUL SKOR):  
\- Di ujung paling kanan level, letakkan Tiang Bendera Bawah Laut atau Pipa Hijau Besar sebagai titik Finish.  
\- Mekanisme Finish Bebas: Pemain TIDAK diwajibkan menjawab semua 5 soal untuk bisa menyentuh garis Finish. Begitu Mario menyentuh titik Finish di ujung level (meskipun masih ada Blok "?" yang terlewat atau belum terjawab), permainan langsung berakhir.  
\- Layar Skor Akhir (Result Screen): Langsung tampilkan papan rincian hasil akhir yang memuat:  
  1\. Total Skor Akhir & Koin yang dikumpulkan.  
  2\. Jumlah Soal Terjawab Benar (contoh: "Soal Dijawab: 3 dari 5").  
  3\. Tombol "Main Lagi" untuk mengulang level.

6\. KONTROL PERMAINAN:  
\- Sediakan dukungan tombol Keyboard (Panah Kiri/Kanan untuk bergerak horizontal, Spasi/Panah Atas untuk mengayuh berenang naik) serta tombol layar sentuh (On-Screen D-Pad & tombol "SWIM") yang responsif.

7.BAHASA  
\-BAHASA GAME INI MESTILAH DALAM BAHASA MELAYU