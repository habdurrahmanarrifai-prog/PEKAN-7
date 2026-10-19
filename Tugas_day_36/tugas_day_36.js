// ============================================================
// Tugas Day 36: Kasir Warung dengan Scope, Hoisting, dan Closure
// ============================================================

// ------------------------------------------------------------
// Langkah 1: Tebak dulu, baru cek
// ------------------------------------------------------------

// Potongan A
// Tebakan:
// - console.log(nama) di dalam dalam(): "Dalam"
// - console.log(nama) di dalam luar(): "Luar"
// - console.log(nama) global: "Global"
// - console.log(hitung(100)): 85
// - console.log(pesanBlok): "di dalam blok"
// - console.log("putaran", i): 0, 1
// Hasil asli: seperti tebakan di atas.

const nama = "Global";

function luar() {
  const nama = "Luar";

  function dalam() {
    const nama = "Dalam";
    console.log(nama);
  }

  dalam();
  console.log(nama);
}

luar();
console.log(nama);

const diskonGlobal = 10;

function hitung(harga) {
  const diskonLokal = 5;
  return harga - diskonGlobal - diskonLokal;
}

console.log(hitung(100));

if (true) {
  let pesanBlok = "di dalam blok";
  console.log(pesanBlok);
}

for (let i = 0; i < 2; i++) {
  console.log("putaran", i);
}

// Percobaan tambahan untuk pesanBlok dan i di luar blok.
// Tebakan: ReferenceError karena let hanya hidup di dalam blok.
// Hasil asli: ReferenceError karena variabel tidak ada di scope luar.
/*
console.log(pesanBlok);
console.log(i);
*/

// Potongan B
// Tebakan:
// - console.log(sapa()) -> "Halo!"
// - console.log(warna) -> undefined (var diangkat tapi nilainya belum diisi)
// - console.log(lokasi) -> ReferenceError karena const sebelum inisialisasi
// - console.log(salam()) -> ReferenceError karena const function expression belum siap

console.log(sapa());

function sapa() {
  return "Halo!";
}

console.log(warna);
var warna = "biru";
console.log(warna);

try {
  console.log(lokasi);
  const lokasi = "Sleman";
} catch (error) {
  console.log("Error potongan B (lokasi):", error.message);
}

try {
  console.log(salam());
  const salam = function () {
    return "Hai";
  };
} catch (error) {
  console.log("Error potongan B (salam):", error.message);
}

// Potongan C
// Tebakan:
// - penghitungA(): 1, 2, 3
// - penghitungB(): 1
// Hasil asli: penghitungA terus bertambah karena closure menyimpan hitungan di scope luar.
// Beda scope untuk penghitungA dan penghitungB karena masing-masing dibuat dari pemanggilan buatPenghitung() yang baru.

function buatPenghitung() {
  let hitungan = 0;

  return function () {
    hitungan++;
    return hitungan;
  };
}

const penghitungA = buatPenghitung();
const penghitungB = buatPenghitung();

console.log(penghitungA());
console.log(penghitungA());
console.log(penghitungA());
console.log(penghitungB());
console.log(penghitungA());

// Pertanyaan jawaban:
// 1. Pada Potongan A, tiga console.log(nama) berbeda karena JavaScript mencari variabel dari scope paling dekat ke paling luar.
//    Di dalam fungsi dalam(), nama yang dipakai adalah "Dalam"; di dalam luar(), nama yang dipakai adalah "Luar"; di global, nama adalah "Global".
//    hitung(100) tetap bisa memakai diskonGlobal karena diskonGlobal berada di scope global, dan fungsi bisa mengakses variabel luar.
//    pesanBlok dan i error di luar blok karena let dan const bersifat block-scoped, tidak bisa diakses di luar blok tempat ia dibuat.
// 2. Pada Potongan B, sapa() bisa dipanggil sebelum didefinisikan karena function declaration di-hoist ke atas, sedangkan warna bernilai undefined karena var di-hoist dan baru diberi nilai setelah baris assignment.
//    lokasi dan salam error karena const dan function expression dengan const memiliki Temporal Dead Zone (TDZ), sehingga tidak bisa dipakai sebelum inisialisasi.
// 3. Pada Potongan C, penghitungA terus bertambah karena closure mengingat hitungan dari satu pabrik function yang sama.
//    penghitungB mulai dari 1 lagi karena tiap kali buatPenghitung() dipanggil, ia membuat scope baru dan variabel hitungan baru lagi.

// ------------------------------------------------------------
// Langkah 2: Perbaiki 8 kesalahan
// ------------------------------------------------------------

console.log("\n=== Langkah 2: Perbaiki 8 kesalahan ===");

// Cek stok. Seharusnya tercetak: Stok aman
const stok = 10;
let pesanStok = "";
if (stok > 5) {
  pesanStok = "Stok aman";
}
console.log(pesanStok); // FIX: variabel pesanStok dibuat di scope yang bisa diakses saat console.log

// Potongan 10%. Seharusnya tercetak: 45000
function hitungPotongan(harga) {
  const potongan = harga * 0.1;
  return harga - potongan;
}
console.log(hitungPotongan(50000)); // FIX: hasil fungsi dipanggil dan dicetak

// Sambutan. Seharusnya tercetak: Selamat datang di Kedai Senja
const sambutan = function () {
  return "Selamat datang di Kedai Senja";
};
console.log(sambutan()); // FIX: function expression sudah dibuat sebelum dipanggil

// Kota. Seharusnya tercetak: Yogyakarta
let kota = "Yogyakarta";
console.log(kota); // FIX: inisialisasi let sebelum dipakai

// Total awal 100000. Diskon 90000 hanya dipakai di dalam blok.
// Seharusnya setelah blok, total tetap: 100000
let total = 100000;
if (true) {
  let totalBlok = 90000; // FIX: gunakan variabel baru di blok, bukan re-declare total luar
  console.log("nilai di blok:", totalBlok);
}
console.log(total); // FIX: total luar tetap 100000

// Saldo kas. Seharusnya setelah tambahKas(50000): 150000
let saldoKas = 100000;
function tambahKas(jumlah) {
  saldoKas += jumlah; // FIX: ubah saldoKas global, bukan variabel lokal baru
}
tambahKas(50000);
console.log(saldoKas);

// Nomor antrean. Seharusnya tercetak: 1 2 3
function buatAntrean() {
  let nomor = 0;
  return function () {
    nomor += 1;
    return nomor;
  };
}
const ambilNomor = buatAntrean();
console.log(ambilNomor(), ambilNomor(), ambilNomor()); // FIX: let nomor di scope closure, bukan di dalam return function tiap kali

// Dompet. Seharusnya setelah belanja(30000), cekSaldo() mengembalikan: 70000
function buatDompet(saldoAwal) {
  let saldo = saldoAwal;
  return {
    belanja(jumlah) {
      saldo -= jumlah;
    },
    cekSaldo() {
      return saldo; // FIX: this.saldo tidak ada; saldo adalah variabel closure
    },
  };
}
const dompet = buatDompet(100000);
dompet.belanja(30000);
console.log(dompet.cekSaldo());

// Ke-8 kesalahan ringkas:
// 1. pesanStok dipakai di luar if padahal dideklarasi di dalam blok -> pindah ke scope yang bisa diakses.
// 2. hasil hitungPotongan tidak dicetak -> panggil fungsi dan console.log hasilnya.
// 3. sambutan dipanggil sebelum function expression dibuat -> deklarasi const di atas pemanggilan.
// 4. kota dipakai sebelum inisialisasi -> buat variabel let dulu lalu console.log.
// 5. total di dalam blok memakai var yang menimpa total luar -> pakai let blok baru.
// 6. saldoKas di dalam tambahKas dibuat baru, bukan mengubah saldo luar -> hapus let lokal dan pakai saldoKas luar.
// 7. nomor selalu di-reset karena dideklarasi di dalam fungsi inner -> pindahkan ke closure outer.
// 8. cekSaldo memakai this.saldo padahal saldo tidak dibuat sebagai property -> kembalikan variabel saldo closure.
// Kesalahan yang menyebabkan error di console: kota, sambutan, dan potensi penggunaan var/const sebelum inisialisasi, serta access ke variable yang tidak dideklarasi. Kesalahan lain tidak selalu error, tapi hasilnya salah.
// let saldoKas = 0; di dalam tambahKas membuat variabel baru yang hanya ada di fungsi. Ini disebut shadowing atau variable shadowing, karena nama yang sama tersembunyi di scope lokal.
// this.saldo di cekSaldo menghasilkan undefined karena this merujuk ke object hasil return, bukan ke variabel saldo yang ada di closure. saldo tidak dipasang sebagai property object.

// ------------------------------------------------------------
// Langkah 3: Bikin kasir sendiri
// ------------------------------------------------------------

console.log("\n=== Langkah 3: Kasir sendiri ===");

const NAMA_WARUNG = "kedai senja";
const TARIF_PAJAK = 0.11;

function cetakJudul() {
  console.log(NAMA_WARUNG.toUpperCase());
}

cetakJudul();

function buatKasir(namaKasir, modalAwal) {
  let saldoKas = modalAwal;
  let jumlahTransaksi = 0;
  const riwayat = [];

  return {
    catatPenjualan(namaMenu, harga, jumlah) {
      const subtotal = harga * jumlah;
      const pajak = subtotal * TARIF_PAJAK;
      const total = subtotal + pajak;

      saldoKas += total;
      jumlahTransaksi += 1;
      riwayat.push({ namaMenu, jumlah, total });
      return total;
    },
    ambilKas(jumlah) {
      if (jumlah > saldoKas) {
        return false;
      }
      saldoKas -= jumlah;
      return true;
    },
    cekSaldo() {
      return saldoKas;
    },
    lihatRiwayat() {
      return riwayat.slice();
    },
    ringkasan() {
      console.log(`${namaKasir} | transaksi: ${jumlahTransaksi} | saldo: ${saldoKas}`);
    },
  };
}

const kasirPagi = buatKasir("Rina", 100000);
const kasirMalam = buatKasir("Dodi", 50000);

kasirPagi.catatPenjualan("Nasi Gudeg", 20000, 2);
kasirPagi.catatPenjualan("Es Teh", 5000, 3);
kasirPagi.catatPenjualan("Mie Ayam", 15000, 2);

kasirMalam.catatPenjualan("Ayam Geprek", 18000, 2);
kasirMalam.catatPenjualan("Bakso", 12000, 1);

console.log("ambilKas berhasil:", kasirPagi.ambilKas(20000));
console.log("ambilKas gagal:", kasirPagi.ambilKas(1000000));

kasirPagi.ringkasan();
kasirMalam.ringkasan();

// Buktikan data privat:
console.log("kasirPagi.saldoKas:", kasirPagi.saldoKas); // undefined
kasirPagi.saldoKas = 999999;
console.log("saldo setelah coba diubah dari luar:", kasirPagi.cekSaldo());
// Hasilnya: undefined saat dicetak langsung, lalu saldo yang asli tetap berubah sesuai method karena saldoKas memang ada di closure, bukan property object.

// Buktikan salinan:
const riwayatSalinan = kasirPagi.lihatRiwayat();
riwayatSalinan.push({ namaMenu: "Bonus", jumlah: 1, total: 0 });
console.log("panjang riwayat setelah push ke salinan:", kasirPagi.lihatRiwayat().length);
// Hasilnya: panjang riwayat tetap sama, karena lihatRiwayat() mengembalikan salinan array, bukan array asli.

function buatPenghitungDiskon(persen) {
  return (harga) => harga - (harga * persen / 100);
}

const diskon10 = buatPenghitungDiskon(10);
const diskon25 = buatPenghitungDiskon(25);

console.log("diskon10(80000):", diskon10(80000));
console.log("diskon25(80000):", diskon25(80000));

// Shadowing:
const namaKunci = "Global";
function cekShadowing() {
  const namaKunci = "Lokal";
  console.log("global:", namaKunci);
  console.log("local:", namaKunci);
}
cekShadowing();
// Hasilnya: di dalam function, namaKunci lokal menutupi variable global. Kalau console.log global dibuat di luar function, maka ia menunjukkan nilai global.

// Pertanyaan jawaban:
// 1. kasirPagi.saldoKas menghasilkan undefined karena saldoKas adalah variabel privat di scope closure, bukan property pada object yang dikembalikan.
//    Method kasir bisa mengubah saldoKas karena closure memberi akses ke variabel yang diciptakan di dalam buatKasir.
// 2. saldo kasirPagi dan kasirMalam terpisah karena setiap kali buatKasir() dipanggil, ia membuat environment baru dan variabel saldoKas, jumlahTransaksi, serta riwayat baru.
// 3. Setelah buatKasir selesai dijalankan, variabel yang masih diingat adalah saldoKas, jumlahTransaksi, dan riwayat karena function method di object menangkap closure.
//    Variabel itu tidak hilang karena masih dipakai oleh method yang dikembalikan.
// 4. TARIF_PAJAK bisa dipakai di dalam method karena JavaScript mencari variabel dari scope terdekat sampai scope global; ini disebut lexical scoping (lingkup leksikal).
// 5. cetakJudul() bisa dipanggil sebelum didefinisikan karena function declaration di-hoist ke atas saat script dibaca.
//    Jika dibuat seperti function expression dengan const, maka pemanggilan sebelum deklarasi akan error karena TDZ.
//    // const cetakJudulBaru = function () { console.log("Coba"); };
//    // cetakJudulBaru(); // ReferenceError: Cannot access 'cetakJudulBaru' before initialization
// 6. Pada buatPenghitungDiskon, nilai persen tidak dikirim lagi saat diskon10(80000) dipanggil karena closure menangkap nilai persen dari saat fungsi pabrik dijalankan.
//    Itulah mekanisme closure: fungsi inner tetap ingat variabel dari scope parent walaupun parent sudah selesai berjalan.

// Bonus:
// Tebakan:
// - fungsiLet -> 0 1 2
// - fungsiVar -> 3 3 3
// Hasil asli: let menjaga scope per iterasi, sedangkan var memakai satu scope yang sama untuk semua iterasi.
// Ketika fungsi dipanggil nanti, ia membaca nilai i/j terakhir yang sedang ada, maka var menunjukkan 3 pada semua elemen.
const fungsiLet = [];
for (let i = 0; i < 3; i++) {
  fungsiLet.push(() => i);
}
console.log("bonus let:", fungsiLet[0](), fungsiLet[1](), fungsiLet[2]());

const fungsiVar = [];
for (var j = 0; j < 3; j++) {
  fungsiVar.push(() => j);
}
console.log("bonus var:", fungsiVar[0](), fungsiVar[1](), fungsiVar[2]());

// ============================================================
// Selesai
// ============================================================
