const pajakPPN = 11; // Global Scope

function hitungHarga(harga) {
  // Variabel pajakPPN dari Global Scope dapat diakses di sini
  const pajak = harga * (pajakPPN / 100);
  return harga + pajak;
}

console.log(hitungHarga(100000)); // Output: 111000
console.log(pajakPPN); // Output: 11 — dapat diakses di mana saja

function prosesLogin() {
  const tokenSesi = "abc123xyz"; // Local Scope — hanya ada di dalam fungsi ini
  console.log("Token:", tokenSesi); // Output: Token: abc123xyz
}

prosesLogin();
console.log(tokenSesi);
// ReferenceError: tokenSesi is not defined
// Variabel ini tidak ada di luar fungsi prosesLogin

if (true) {
  let pesanDalam = "Saya ada di dalam blok if";
  console.log(pesanDalam); // Output: Saya ada di dalam blok if
}
console.log(pesanDalam);
// ReferenceError: pesanDalam is not defined

// Contoh dengan for loop
for (let i = 0; i < 3; i++) {
  // variabel i hanya ada di dalam blok for
}
console.log(i);
// ReferenceError: i is not defined

const nama = "Global"; // Global Scope

function luarFungsi() {
  const nama = "Luar"; // Function Scope — menutupi variabel global di dalam fungsi ini

  function dalamFungsi() {
    const nama = "Dalam"; // Function Scope — menutupi variabel luar di dalam fungsi ini
    console.log(nama); // Output: "Dalam"
  }

  dalamFungsi();
  console.log(nama); // Output: "Luar"
}

luarFungsi();
console.log(nama); // Output: "Global"

// Dipanggil sebelum dideklarasikan
sapaUser(); // Output: Halo, Pengguna!

// Deklarasi fungsi ada di bawah
function sapaUser() {
  console.log("Halo, Pengguna!");
}

console.log(warna); // Output: undefined — deklarasi diangkat, tapi nilai belum ada
var warna = "biru";
console.log(warna); // Output: "biru"

console.log(kota);
// ReferenceError: Cannot access 'kota' before initialization
const kota = "Jakarta";

function buatPenghitung() {
  let hitungan = 0; // Variabel di scope luar

  // Fungsi dalam — memiliki akses ke variabel "hitungan"
  return function tambah() {
    hitungan++;
    console.log("Hitungan saat ini:", hitungan);
  };
}

const penghitung = buatPenghitung();
// Fungsi buatPenghitung() selesai dieksekusi, namun "hitungan" tetap diingat

penghitung(); // Output: Hitungan saat ini: 1
penghitung(); // Output: Hitungan saat ini: 2
penghitung(); // Output: Hitungan saat ini: 3

function buatRekening(saldoAwal) {
  let saldo = saldoAwal; // Variabel privat — tidak dapat diakses dari luar

  return {
    setor(jumlah) {
      saldo += jumlah;
      console.log("Setoran berhasil. Saldo:", saldo);
    },
    tarik(jumlah) {
      if (jumlah > saldo) {
        console.log("Saldo tidak mencukupi.");
        return;
      }
      saldo -= jumlah;
      console.log("Penarikan berhasil. Saldo:", saldo);
    },
    cekSaldo() {
      console.log("Saldo saat ini:", saldo);
    },
  };
}

const rekeningBudi = buatRekening(1000000);

rekeningBudi.cekSaldo(); // Output: Saldo saat ini: 1000000
rekeningBudi.setor(500000); // Output: Setoran berhasil. Saldo: 1500000
rekeningBudi.tarik(200000); // Output: Penarikan berhasil. Saldo: 1300000

// Variabel "saldo" tidak dapat diakses langsung dari luar
console.log(rekeningBudi.saldo); // Output: undefined — terlindungi oleh closure
{
const rekeningAni = buatRekening(500000);
const rekeningBudi = buatRekening(2000000);

rekeningAni.setor(100000);
// Output: Setoran berhasil. Saldo: 600000

rekeningBudi.tarik(500000);
// Output: Penarikan berhasil. Saldo: 1500000

// Kedua rekening memiliki variabel "saldo" yang sepenuhnya terpisah
rekeningAni.cekSaldo(); // Output: Saldo saat ini: 600000
rekeningBudi.cekSaldo(); // Output: Saldo saat ini: 1500000
}

