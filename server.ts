import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `Anda adalah "Tanya Cikgu", tutor maya pintar bagi portal "Sejarah Pendidikan Malaysia - Muzium Digital 3D" (berpandukan sukatan kurikulum Sejarah Pendidikan Malaysia).

Tanggungjawab & Kepakaran anda:
1. Membantu murid, guru pelatih, pensyarah, dan peminat sejarah memahami evolusi sejarah pendidikan negara secara ilmiah, mendalam, dan santun.
2. Era Pra-Kolonial:
   - Pendidikan tidak formal berasaskan pantun, peribahasa, kemahiran kraftangan, perikanan, pertanian, dan hukum adat (Adat Perpatih & Adat Temenggong).
   - Pendidikan formal awal berteraskan Islam: kelas al-Quran di rumah guru, surau, masjid, madrasah, institusi pondok tersohor di Kedah, Kelantan, Terengganu, dan pendidikan istana untuk golongan raja.
3. Era Kolonial di Tiga Wilayah:
   - Semenanjung (Tanah Melayu): Dasar 'pecah dan perintah' mewujudkan 4 aliran vernakular berasingan (Melayu, Inggeris, Cina, Tamil). Sekolah Melayu Gelugor (1816) dan Penang Free School (1816). Penubuhan Malay College Kuala Kangsar (MCKK, 1905) berteraskan model elit England untuk melatih bangsawan bagi Malayan Civil Service (MCS). Sistem dua sesi A.M. Skinner (1870-an) meminggirkan kelas al-Quran ke sesi petang. Sistem Ejaan Rumi Wilkinson (1904) mempercepatkan penghakisan tulisan Jawi. Penubuhan SITC (1922) menyemarakkan nasionalisme guru.
   - Sabah (Borneo Utara): Dikuasai Syarikat Berpiagam Borneo Utara British (SBUB). Pengarah Urusan William Cowie menolak peruntukan $5,000 Gabenor E.W. Birch kerana mementingkan keuntungan komersial syarikat. Douglas J. Jardine (1936) menetapkan dasar agar anak peribumi kekal sebagai 'good cultivators of the soil'.
   - Sarawak: Di bawah Dinasti Brooke dan penyerahan kepada Mahkota British (1946). Monopoli bangsawan Perabangan di Sekolah Abang Kasim (1883). Pekeliling 'Circular No. 9' (1947) melarang penjawat awam menentang penyerahan Sarawak, mencetuskan peletakan jawatan beramai-ramai 87 orang guru Melayu dan pembukaan Sekolah Ra'yat secara swadaya. Grant Code 1956 berat sebelah ($19.30 pelajar Cina vs $1.18 anak peribumi Dayak).
4. Garis Masa Laporan Pendidikan Pra-Merdeka (1946–1955):
   - Rancangan Cheeseman (1946): Sekolah rendah percuma dalam 4 bahasa pengantar dengan Bahasa Inggeris sebagai mata pelajaran wajib.
   - Laporan Barnes (1951): Mengesyorkan Sekolah Kebangsaan tunggal dwibahasa (Melayu & Inggeris) dan memansuhkan vernakular Cina serta Tamil; dibantah hebat masyarakat Cina dan India.
   - Laporan Fenn-Wu (1951): Menolak Laporan Barnes, mempertahankan sekolah vernakular Cina sebagai warisan kebudayaan, mencadangkan sistem tribahasa.
   - Ordinan Pelajaran (1952): Jalan kompromi menubuhkan dua jenis SK (aliran Inggeris dan Melayu) serta kelas bahasa ketiga jika ada 15 orang murid.
   - Laporan Woodhead (1955): Menyelaraskan bantuan kewangan di Sabah & Sarawak serta meluaskan Maktab Perguruan Kent dan Batu Lintang.
5. Asas Sistem Pendidikan Kebangsaan & Pascamerdeka:
   - Penyata Razak (1956): Merumuskan Bahasa Melayu sebagai Bahasa Kebangsaan dan bahasa pengantar utama, sukatan pelajaran seragam berorientasikan Malaysia, sambil mengekalkan sekolah jenis kebangsaan.
   - Laporan Rahman Talib (1960) & Akta Pelajaran (1961): Melaksanakan pendidikan rendah percuma, menaikkan had umur persekolahan ke 15 tahun, dan memperkukuh sistem peperiksaan awam kebangsaan.
6. Tokoh Bersejarah:
   - Pendeta Za'ba (1895–1973): Menerajui Pejabat Karang Mengarang SITC, membakukan Sistem Ejaan Rumi Za'ba, mengarang Pelita Bahasa Melayu (1940) & Ilmu Mengarang Melayu, dan lantang menulis di Al-Ikhwan serta Saudara.
   - Aminuddin Baki (1926–1965): "Bapa Pendidikan Moden Malaysia", pengasas GPMS, perancang utama Penyata Razak 1956 & Rahman Talib 1960, memperkenalkan Sistem Pendidikan Aneka Jurusan (1965), mengasaskan Lembaga Peperiksaan Malaysia. Video dokumentari biografinya turut diembed khas dalam portal ini!
   - Tan Sri Prof. Dr. Awang Had Salleh (1934–2006): Tokoh pemikir Falsafah Pendidikan Kebangsaan (FPK 1988) berpaksikan Insan Seimbang (JERI: Jasmani, Emosi, Rohani, Intelek). NC pertama UUM, NC UKM, pengasas KONPEN.
7. Guru Abad Ke-21: Berperanan sebagai 'Arkitek Sosial' dan 'Kurator Digital' yang menghubungkan Semenanjung, Sabah, dan Sarawak melalui teknologi (DELIMa, AR/VR, gamifikasi, AI beretika) selaras FPK.

Panduan Penyampaian:
- Jawab dalam Bahasa Melayu yang tersusun, kemas, dan mudah difahami.
- Gunakan teks tebal (**tebal**) untuk kata kunci dan fakta tarikh/tokoh.
- Gunakan senarai bertitik agar mudah dibaca oleh pelajar dan pengkaji.
- Selitkan emoji bersesuaian (🎓, 📚, 🏛️, ✍️, 🇲🇾).
- Bersikap ramah, menyokong, dan memberi motivasi akademik.`;

function getFallbackAnswer(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('aminuddin baki')) {
    return `**Aminuddin Baki (1926–1965)** digelar sebagai **"Bapa Pendidikan Moden Malaysia"** 🇲🇾.\n\nSumbangan bersejarah beliau meliputi:\n* Dilantik sebagai Ketua Penasihat Pelajaran termuda negara pada usia 36 tahun.\n* Pengasas **Gabungan Pelajar Melayu Semenanjung (GPMS)** pada tahun 1948.\n* Perancang utama bersama di sebalik **Penyata Razak (1956)** dan **Laporan Rahman Talib (1960)**.\n* Mengasaskan **Sistem Pendidikan Aneka Jurusan (1965)** bagi memberi peluang murid sekolah rendah menyambung pelajaran ke peringkat menengah komprehensif.\n* Merintis penubuhan **Lembaga Peperiksaan Malaysia**.\n\n🎬 *Kini anda boleh menonton video dokumentari biografi Aminuddin Baki yang telah kami sediakan di bahagian Modul Tokoh!*`;
  } else if (lower.includes('barnes') || lower.includes('fenn-wu') || lower.includes('fenn')) {
    return `**Perbandingan Laporan Barnes (1951) & Laporan Fenn-Wu (1951)** 📜:\n\n* **Laporan Barnes (1951):**\n  - Dipengerusikan oleh L.J. Barnes.\n  - Mengusulkan satu sistem **Sekolah Kebangsaan dwibahasa** tunggal (Bahasa Melayu & Bahasa Inggeris).\n  - Mencadangkan pemansuhan sekolah vernakular Cina dan Tamil secara beransur-ansur.\n  - Mendapat tentangan kuat masyarakat bukan Melayu kerana bimbang kehilangan bahasa ibunda.\n\n* **Laporan Fenn-Wu (1951):**\n  - Diketuai oleh Dr. William P. Fenn dan Dr. Wu Teh-yao sebagai reaksi balas terhadap Barnes.\n  - Mempertahankan sekolah vernakular Cina sebagai warisan kebudayaan yang bernilai.\n  - Mengemukakan cadangan sistem **tribahasa** (Melayu, Inggeris dan Mandarin).\n\n* Konflik cadangan ini kemudiannya cuba diharmonikan melalui **Ordinan Pelajaran 1952**.`;
  } else if (lower.includes('circular') || lower.includes('sarawak') || lower.includes('pekeliling')) {
    return `**Peristiwa Pekeliling 'Circular No. 9' (1947) di Sarawak** 🏛️:\n\n* Dikeluarkan oleh pihak pentadbiran kolonial British sejurus penyerahan Sarawak oleh Rajah Charles Vyner Brooke kepada Mahkota British.\n* Pekeliling ini **melarang keras penjawat awam (termasuk guru) menyertai gerakan anti-penyerahan Sarawak**.\n* **Impak Bersejarah:**\n  - Seramai **87 daripada 152 orang guru Melayu** bertindak meletakkan jawatan sebagai lambang integriti dan bantahan terhadap penjajah.\n  - Sebanyak 22 buah sekolah kerajaan terpaksa ditutup sementara.\n  - Para guru bersama masyarakat setempat bangkit membina **Sekolah Ra'yat** secara gotong-royong demi memastikan anak bangsa tidak tercicir dari ilmu.`;
  } else if (lower.includes('jeri') || lower.includes('fpk') || lower.includes('awang had') || lower.includes('falsafah')) {
    return `**Gagasan FPK (1988) & Tan Sri Prof. Dr. Awang Had Salleh** 🎯:\n\n* Digubal pada tahun 1988 sebagai panduan teras kurikulum pendidikan negara (menggantikan FPN).\n* **Empat Dimensi Keseimbangan (JERI):**\n  - **J**asmani: Kecergasan tubuh badan, kesihatan dan amalan gaya hidup sihat.\n  - **E**mosi: Kestabilan jiwa, empati kemanusiaan dan kematangan bersosial.\n  - **R**ohani: Pegangan agama yang teguh, akhlak terpuji dan ketakwaan.\n  - **I**ntelek: Daya intelek kritis, kreatif, inovatif dan dahagakan ilmu.\n* Dipelopori oleh sarjana tersohor **Tan Sri Prof. Dr. Awang Had Salleh** (Naib Canselor pertama UUM & NC UKM) bagi memastikan pendidikan tidak hanya mengejar gred semata-mata, sebaliknya membentuk watak insan yang holistik.`;
  } else if (lower.includes('razak') || lower.includes('1956')) {
    return `**Penyata Razak 1956: Teras Sistem Pendidikan Kebangsaan** 📝:\n\n* Dipengerusikan oleh Tun Abdul Razak Hussein (Menteri Pelajaran ketika itu) bersama Aminuddin Baki.\n* **Prinsip Utama:**\n  - Menetapkan **Bahasa Melayu sebagai Bahasa Kebangsaan** dan bahasa pengantar utama.\n  - Memperkenalkan **Sukatan Pelajaran yang seragam dan bercirikan Tanah Melayu** bagi membina perpaduan kaum.\n  - Mewujudkan sistem peperiksaan awam yang setaraf untuk semua sekolah.\n  - Mengiktiraf Sekolah Rendah Jenis Kebangsaan (SRJK) Cina dan Tamil bagi memelihara keharmonian kepelbagaian kaum.\n* Syor Penyata Razak dimaktubkan ke dalam undang-undang menerusi **Ordinan Pelajaran 1957** dan diperkemas dalam **Akta Pelajaran 1961**.`;
  } else if (lower.includes("za'ba") || lower.includes('zaba') || lower.includes('karang mengarang')) {
    return `**Pendeta Za'ba (Zainal Abidin Ahmad, 1895–1973)** 📚:\n\n* Tokoh pemikir bahasa dan cendekiawan agung Melayu.\n* Menerajui **Pejabat Karang Mengarang** di Sultan Idris Training College (SITC) Tanjung Malim.\n* Membakukan tatabahasa Melayu melalui karya monumen **Pelita Bahasa Melayu** (1940) dan **Ilmu Mengarang Melayu**.\n* Menggunakan penulisan dalam akhbar *Al-Ikhwan* dan *Saudara* untuk membangkitkan kesedaran sosioekonomi dan pendidikan masyarakat Melayu.`;
  } else {
    return `Terima kasih atas soalan anda mengenai: "${message}". Cikgu Sejarah AI sedia membimbing anda! Anda boleh meneroka modul nota Bab 1.0 hingga 5.0, menonton video dokumentari Aminuddin Baki di bahagian Tokoh, mencuba permainan isyarat tangan AI, atau bertanya mengenai tokoh (Za'ba, Aminuddin Baki, Awang Had Salleh) dan laporan pendidikan (Barnes, Fenn-Wu, Razak). 📚🎓`;
  }
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Mesej diperlukan.' });
    }

    if (!ai) {
      return res.json({ reply: getFallbackAnswer(message) });
    }

    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.role === 'user' || item.role === 'model') {
          contents.push({
            role: item.role,
            parts: [{ text: item.text }],
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const reply = response.text || getFallbackAnswer(message);
      return res.json({ reply });
    } catch (aiErr: any) {
      console.warn('Gemini generateContent error, falling back to local curriculum knowledge base:', aiErr?.message || aiErr);
      return res.json({ reply: getFallbackAnswer(message) });
    }
  } catch (error: any) {
    console.error('Chat error:', error);
    return res.status(500).json({
      error: 'Ralat semasa memproses jawapan AI.',
      details: error?.message || 'Unknown error',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
