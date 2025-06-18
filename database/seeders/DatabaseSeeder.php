<?php

namespace Database\Seeders;

use App\Models\MetodePembayaran;
use App\Models\Tagihan;
use App\Models\User;
use App\Models\Utils;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;
use Faker\Factory as Faker;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ✅ 1. Bersihkan cache permission
        app(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();

        // ✅ 2. Buat daftar permissions
        $entities = ['tagihan', 'transaksi', 'history-pembayaran', 'notifikasi'];
        $actions = ['create', 'read', 'update', 'delete'];

        foreach ($entities as $entity) {
            foreach ($actions as $action) {
                Permission::firstOrCreate(['name' => "$action $entity"]);
            }
        }

        // ✅ 3. Buat roles dan assign permission
        Role::firstOrCreate(['name' => 'user'])->givePermissionTo([
            'create tagihan',
            'create transaksi',
            'create history-pembayaran',
            'create notifikasi',
            'read tagihan',
            'read transaksi',
            'read history-pembayaran',
            'read notifikasi',
            'update tagihan',
            'update transaksi',
            'update history-pembayaran',
            'delete tagihan',
            'delete history-pembayaran',
            'delete notifikasi',
        ]);

        Role::firstOrCreate(['name' => 'super-admin'])->givePermissionTo(Permission::all());

        // ✅ 4. Buat user super admin
        $superAdmin = User::firstOrCreate(
            ['email' => 'admin@husnaedupay.com'],
            [
                'username' => 'admin',
                'password' => Hash::make('admin')
            ]
        );
        $superAdmin->assignRole('super-admin');

        // ✅ 5. Generate 100 user + assign role
        $faker = Faker::create();
        $this->command->info('⏳ Menambahkan 100 data user...');
        $this->command->getOutput()->progressStart(100);

        for ($i = 0; $i < 100; $i++) {
            $user = User::create([
                'username' => $faker->userName(),
                'email' => $faker->unique()->safeEmail(),
                'password' => Hash::make('user')
            ]);
            $user->assignRole('user');
            $this->command->getOutput()->progressAdvance();
        }

        $this->command->getOutput()->progressFinish();
        $this->command->info('✅ 100 data user berhasil ditambahkan.');

        // ✅ 6. Generate tagihan (12 per user)
        $statusOptions = ['capture'];
        $users = User::all();
        $totalTagihan = $users->count() * 12;

        $this->command->info("⏳ Menambahkan $totalTagihan data tagihan (12 per user)...");
        $this->command->getOutput()->progressStart($totalTagihan);

        foreach ($users as $user) {
            for ($i = 0; $i < 12; $i++) {
                Tagihan::create([
                    'user_id' => $user->id,
                    'nama_tagihan' => $faker->words(3, true),
                    'kode_tagihan' => strtoupper('INV-' . $faker->unique()->bothify('###??')),
                    'nominal' => 100000,
                    'status' => $faker->randomElement($statusOptions),
                    'tanggal' => Carbon::instance($faker->dateTimeBetween('-6 months', 'now')),
                ]);
                $this->command->getOutput()->progressAdvance();
            }
        }

        $this->command->getOutput()->progressFinish();
        $this->command->info("✅ $totalTagihan tagihan berhasil ditambahkan.");

        // ✅ 7. Tambahkan metode pembayaran
        $this->command->info('⏳ Menambahkan metode pembayaran...');
        $this->command->getOutput()->progressStart(12);

        $metodes = [
            ['nama' => 'BCA', 'kategori' => 'bank_transfer', 'gambar' => 'bank/bca.png'],
            ['nama' => 'BRI', 'kategori' => 'bank_transfer', 'gambar' => 'bank/bri.png'],
            ['nama' => 'BNI', 'kategori' => 'bank_transfer', 'gambar' => 'bank/bni.png'],
            ['nama' => 'PERMATA', 'kategori' => 'bank_transfer', 'gambar' => 'bank/permata_bank.png'],
            ['nama' => 'MANDIRI', 'kategori' => 'bank_transfer', 'gambar' => 'bank/mandiri.png'],
            ['nama' => 'DANA', 'kategori' => 'e_wallet', 'gambar' => 'bank/dana.png'],
            ['nama' => 'GOPAY', 'kategori' => 'e_wallet', 'gambar' => 'bank/gopay_white.png'],
            ['nama' => 'QRIS', 'kategori' => 'e_wallet', 'gambar' => 'bank/qris.png'],
            ['nama' => 'SHOPEEPAY', 'kategori' => 'e_wallet', 'gambar' => 'bank/shopeepay_rectangle_orange.png'],
            ['nama' => 'ALFAMART', 'kategori' => 'cstore', 'gambar' => 'bank/alfamart.png'],
            ['nama' => 'INDOMARET', 'kategori' => 'cstore', 'gambar' => 'bank/indomaret.png'],
        ];

        foreach ($metodes as $metode) {
            MetodePembayaran::updateOrCreate(
                ['nama' => $metode['nama'], 'kategori' => $metode['kategori']],
                ['gambar' => $metode['gambar']]
            );
            $this->command->getOutput()->progressAdvance();
        }

        $this->command->getOutput()->progressFinish();
        $this->command->info("✅ 12 metode pembayaran berhasil ditambahkan.");

        // ✅ 8. Tambah data bantuan dan kebijakan privasi
        Utils::create([
            'kebijakan_privasi' => $this->getKebijakanPrivasiText(),
            'bantuan' => $this->getBantuanText(),
            'syarat_ketentuan' => $this->getSyaratKetentuanText()
        ]);
    }

    private function getBantuanText(): string
    {
        return <<<'MARKDOWN'
# 📘 Panduan Penggunaan Aplikasi **Husna Edu Pay**

Selamat datang di **Husna Edu Pay**, aplikasi resmi dari **Yayasan Al Husna** yang memudahkan Anda dalam melakukan pembayaran tagihan pendidikan secara cepat, aman, dan transparan.

---

## 📱 1. **Instalasi Aplikasi**
Aplikasi **Husna Edu Pay** dapat digunakan di perangkat Android.

### Cara menginstal:
1. Buka tautan yang diberikan oleh pihak sekolah atau yayasan.
2. Unduh file aplikasi (APK).
3. Izinkan pemasangan dari sumber tidak dikenal (jika diminta).
4. Jalankan instalasi hingga selesai.

---

## 🔐 2. **Login ke Aplikasi**
### Langkah-langkah:
1. Buka aplikasi **Husna Edu Pay**.
2. Masukkan **Nomor Induk Siswa (NIS)** atau **username** yang diberikan oleh pihak sekolah.
3. Masukkan **kata sandi** (password).
4. Tap tombol **"Masuk"**.

> 🔒 **Catatan**: Jika Anda lupa password, hubungi pihak administrasi sekolah untuk reset akun.

---

## 📋 3. **Melihat Daftar Tagihan**
Setelah berhasil login, Anda akan diarahkan ke halaman **Beranda**.

### Di halaman ini Anda bisa melihat:
- ✅ Nama siswa dan kelas
- 📅 Tagihan yang masih aktif
- 💰 Jumlah nominal tagihan
- 🟡 Status tagihan: **Belum dibayar / Lunas / Pending**
- 📄 Riwayat pembayaran sebelumnya

---

## 💳 4. **Melakukan Pembayaran**
### Langkah-langkah:
1. Pilih salah satu tagihan yang ingin dibayar.
2. Tekan tombol **"Bayar Sekarang"**.
3. Pilih metode pembayaran yang tersedia:
   - **Transfer Bank (Virtual Account)**
   - **E-Wallet (OVO, GoPay, ShopeePay, dll)**
4. Sistem akan menampilkan instruksi dan nomor pembayaran.
5. Lakukan pembayaran sesuai nominal.
6. Setelah selesai, status akan berubah otomatis menjadi **Pending** dan kemudian **Lunas** setelah diverifikasi.

> ⚠️ **Penting**: Jangan mengubah nominal pembayaran agar verifikasi sistem berjalan otomatis.

---

## 🧾 5. **Melihat Detail Transaksi**
1. Buka menu **Transaksi** atau **Riwayat**.
2. Klik salah satu transaksi untuk melihat:
   - Waktu dan tanggal transaksi
   - Metode pembayaran
   - Nominal
   - Status (Lunas / Pending / Gagal)
   - Bukti transaksi (jika tersedia)

---

## 📢 6. **Menerima Notifikasi Pembayaran**
- Setelah pembayaran berhasil diverifikasi, Anda akan menerima **notifikasi push** yang berisi:
  - Nama tagihan
  - Status pembayaran
  - Waktu update terakhir

Pastikan Anda **mengaktifkan izin notifikasi** untuk aplikasi Husna Edu Pay di perangkat Anda.

---

## 📞 7. **Bantuan & Dukungan**
Jika Anda mengalami kendala seperti:
- Tidak bisa login
- Tagihan tidak muncul
- Pembayaran tidak terverifikasi
- Aplikasi error

### Silakan hubungi:
📧 Email: admin@alhusna.sch.id  
📱 WA/Telepon: 0812-xxxx-xxxx  
🏫 Admin Keuangan Sekolah Al Husna

---

## ✅ Tips Penggunaan Aman
- Gunakan akun resmi yang diberikan sekolah.
- Jangan membagikan username dan password ke orang lain.
- Selalu periksa nominal dan instruksi pembayaran dengan teliti.
- Gunakan perangkat pribadi untuk akses aplikasi.

---

Terima kasih telah menggunakan **Husna Edu Pay**. Semoga aplikasi ini mempermudah proses administrasi dan pembayaran di lingkungan Yayasan Al Husna. 🙏


MARKDOWN;
    }

    private function getKebijakanPrivasiText(): string
    {
        return <<<'MARKDOWN'
**KEBIJAKAN PRIVASI APLIKASI HUSNA EDU PAY**  
*(Dikeluarkan oleh Yayasan Al Husna)*

**Terakhir Diperbarui:** 17 Juni 2025

---

### **1. Pengenalan**
Husna Edu Pay ("Aplikasi") adalah platform pembayaran digital yang dikelola oleh Yayasan Al Husna untuk memfasilitasi transaksi keuangan terkait layanan pendidikan di lingkungan yayasan. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, melindungi, dan mengungkapkan informasi pribadi pengguna. Dengan menggunakan Aplikasi, Anda menyetujui praktik yang dijelaskan dalam dokumen ini.

---

### **2. Informasi yang Kami Kumpulkan**
#### a. Data Pribadi
- Identitas: Nama lengkap, NISN/NIP, tempat/tanggal lahir
- Kontak: Nomor telepon, alamat email, alamat rumah
- Keuangan: Riwayat transaksi, metode pembayaran (tidak termasuk penyimpanan data kartu kredit)
- Akademik: Kelas/jurusan, nama wali (untuk siswa), status keanggotaan yayasan

#### b. Data Otomatis
- Perangkat: Model perangkat, versi OS, alamat IP
- Penggunaan: Log aktivitas, riwayat transaksi, preferensi bahasa
- Lokasi: Perkiraan lokasi berbasis IP (hanya untuk deteksi keamanan)

---

### **3. Tujuan Penggunaan Data**
| Jenis Data | Tujuan Penggunaan | Legal Basis |
|------------|-------------------|-------------|
| Identitas | Verifikasi akun, personalisasi layanan | Kontrak |
| Keuangan | Pemrosesan pembayaran, invoice, refund | Kontrak |
| Akademik | Penagihan otomatis, notifikasi tagihan | Kepentingan Legitim |
| Perangkat | Pencegahan penipuan, optimasi aplikasi | Kepentingan Saham |
| Lokasi | Deteksi transaksi mencurigakan | Perlindungan Vital |

---

### **4. Pembagian Data**
Data Anda **TIDAK AKAN** diperjualbelikan. Pembagian hanya dilakukan kepada:
- **Institusi Pendidikan**: Sekolah di bawah Yayasan Al Husna untuk keperluan administrasi
- **Penyedia Pembayaran**: Bank/Fintech mitra (contoh: BCA, BRI, OVO) hanya untuk pemrosesan transaksi
- **Otoritas Hukum**: Jika diminta berdasarkan peraturan perundangan (contoh: perintah pengadilan)
- **Vendor Teknis**: Penyedia layanan IT dengan perjanjian kerahasiaan ketat (contoh: hosting server)

---

### **5. Keamanan Data**
#### Protokol Perlindungan:
- **Enkripsi**: AES-256 untuk data diam (at-rest), TLS 1.3 untuk data transit
- **Autentikasi**: 2FA (Two-Factor Authentication) untuk akses akun
- **Audit**: Pemindaian kerentanan bulanan dan pentest tahunan
- **Pelatihan**: Sertifikasi ISO 27001 untuk staf penanganan data

#### Praktik Operasional:
- Penyimpanan data di server lokal Indonesia
- Penghancuran dokumen fisik dengan mesin shredder
- Pembatasan akses data berbasis peran (RBAC)

---

### **6. Hak Pengguna**
Anda berhak untuk:
- Mengakses dan menduplikasi data pribadi Anda
- Memperbarui data yang tidak akurat
- Menghapus akun (*right to be forgotten*)
- Menarik persetujuan pemrosesan data
- Melaporkan keluhan ke DPO kami di dpo@alhusna.id

---

### **7. Retensi Data**
| Jenis Data | Masa Penyimpanan |
|------------|------------------|
| Data Transaksi | 10 tahun (sesuai UU Perpajakan) |
| Data Profil Pengguna | Selama akun aktif + 1 tahun setelah nonaktif |
| Log Sistem | 6 bulan |
| Data Anak Dibawah 13 Tahun | Hanya dengan persetujuan orang tua/wali |

---

### **8. Kebijakan Anak**
- Aplikasi tidak ditujukan untuk pengguna di bawah 13 tahun
- Transaksi oleh siswa wajib mendapat persetujuan orang tua/wali
- Konten iklan disaring sesuai rating P3 (Pengawasan Orang Tua)

---

### **9. Perubahan Kebijakan**
Perubahan signifikan akan:
- Diumumkan melalui notifikasi dalam aplikasi 30 hari sebelumnya
- Meminta persetujuan ulang jika terkait pemrosesan data baru
- Versi terdokumentasi tersedia di [privacy.alhusna.id/husna-edu-pay]()

---

### **10. Kontak**
Penanggung Jawab Perlindungan Data (DPO):  
**Yayasan Al Husna**  
Alamat: Jl. Pendidikan No. 123, Jakarta Selatan, Indonesia  
Email: privacy@alhusna.id  
Telepon: +62 21 7890 1234 (Senin-Jumat, 09.00-16.00 WIB)

---

*Kebijakan ini mengacu pada:*
- Undang-Undang No. 27 Tahun 2022 tentang Perlindungan Data Pribadi
- Permendikbud No. 20 Tahun 2016 tentang Pengelolaan Data Pendidikan
- Standar PCI DSS untuk Transaksi Keuangan

**Dokumen ini berlaku efektif sejak tanggal diterbitkan**  
*© 2025 Yayasan Al Husna. Hak Cipta Dilindungi.*
MARKDOWN;
    }

    private function getSyaratKetentuanText()
    {
        return <<<'MARKDOWN'
# Syarat & Ketentuan Penggunaan Aplikasi Husna Edu Pay

**Terakhir diperbarui: 12 Juni 2025**

Selamat datang di aplikasi **Husna Edu Pay**, aplikasi resmi milik **Yayasan Al Husna** yang digunakan untuk mempermudah pembayaran berbagai tagihan pendidikan seperti SPP, buku, kegiatan sekolah, dan lainnya.

Dengan mengakses dan menggunakan aplikasi ini, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui seluruh **Syarat & Ketentuan** berikut ini. Jika Anda tidak menyetujui sebagian atau seluruh ketentuan ini, Anda tidak diperkenankan menggunakan aplikasi ini.

---

## 1. Definisi

- **Aplikasi**: Aplikasi mobile atau web bernama **Husna Edu Pay** milik Yayasan Al Husna.
- **Yayasan**: Yayasan Al Husna, sebagai pemilik dan pengelola resmi aplikasi.
- **Pengguna**: Individu atau wali murid yang telah mendaftar dan menggunakan aplikasi ini.
- **Tagihan**: Kewajiban pembayaran biaya pendidikan, administrasi, atau kewajiban lainnya yang ditentukan oleh Yayasan.

---

## 2. Pendaftaran & Akun Pengguna

1. Pengguna wajib mengisi data dengan benar dan jujur saat mendaftar.
2. Pengguna bertanggung jawab untuk menjaga kerahasiaan akun dan kata sandi.
3. Yayasan berhak membekukan atau menghapus akun jika ditemukan aktivitas mencurigakan atau pelanggaran aturan.

---

## 3. Fitur & Layanan

Aplikasi **Husna Edu Pay** menyediakan layanan:

- Informasi tagihan siswa (SPP, buku, kegiatan, dll)
- Riwayat transaksi pembayaran
- Fitur notifikasi pengingat pembayaran
- Download bukti pembayaran
- Komunikasi antara wali murid dan pihak yayasan

---

## 4. Pembayaran

1. Semua transaksi pembayaran dilakukan melalui metode yang tersedia di aplikasi (transfer bank, e-wallet, atau QRIS).
2. Pembayaran dianggap sah setelah sistem kami menerima konfirmasi pembayaran dari mitra pembayaran.
3. Bukti pembayaran akan dikirim dan dapat diakses melalui aplikasi.
4. Yayasan tidak bertanggung jawab atas kesalahan penginputan nominal atau data oleh pengguna.

---

## 5. Kebijakan Pengembalian Dana

1. Dana yang sudah dibayarkan **tidak dapat dikembalikan**, kecuali terdapat kesalahan dari sistem aplikasi atau pihak Yayasan.
2. Pengajuan refund harus disertai bukti transaksi dan akan ditinjau oleh pihak Yayasan dalam waktu maksimal 14 hari kerja.

---

## 6. Privasi & Keamanan Data

1. Data pengguna (nama, email, data anak, transaksi, dll) disimpan dengan aman dan hanya digunakan untuk keperluan operasional aplikasi.
2. Data tidak akan dibagikan ke pihak ketiga tanpa persetujuan pengguna, kecuali diwajibkan oleh hukum.

---

## 7. Hak Kekayaan Intelektual

Seluruh konten, desain, logo, dan sistem dalam aplikasi ini adalah milik Yayasan Al Husna dan dilindungi oleh hukum hak cipta yang berlaku di Indonesia.

---

## 8. Larangan

Pengguna dilarang untuk:

- Menyalahgunakan aplikasi untuk tujuan ilegal.
- Mengakses atau mencoba mengakses data pengguna lain.
- Menyebarkan informasi palsu atau menyesatkan dalam aplikasi.
- Meretas, menyalin, atau menduplikasi aplikasi tanpa izin.

---

## 9. Perubahan Syarat & Ketentuan

Yayasan Al Husna berhak melakukan perubahan terhadap Syarat & Ketentuan ini tanpa pemberitahuan sebelumnya. Perubahan akan ditampilkan pada halaman ini dan berlaku segera setelah dipublikasikan.

---

## 10. Kontak & Bantuan

Jika Anda memiliki pertanyaan atau membutuhkan bantuan, silakan hubungi kami:

- **Email**: admin@alhusna.or.id  
- **Telp / WhatsApp**: 08xxxxxxxxxx  
- **Alamat**: Yayasan Al Husna, Jl. Pendidikan No. 123, Jakarta  

---

Dengan menggunakan aplikasi **Husna Edu Pay**, Anda dianggap telah membaca, memahami, dan menyetujui seluruh Syarat & Ketentuan di atas.

**Terima kasih atas kepercayaan Anda.**

MARKDOWN;
    }
}
