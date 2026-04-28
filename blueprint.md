# AllPOS - Blueprint Project

**Aplikasi Point of Sale (POS) Modular Mobile-First untuk Semua Jenis Dagangan**

**Versi Target:** Beta  
**Status:** Planning & Requirement  
**Tanggal:** 28 April 2026

## 1. Deskripsi Project
AllPOS adalah aplikasi POS mobile berbasis Android yang dirancang **mobile-first**, **offline-first**, dan **modular**. Aplikasi ini bertujuan untuk membantu semua jenis usaha kecil-menengah (sembako, fashion, elektronik, kosmetik, warung, dll) melakukan transaksi penjualan dengan cepat dan mudah tanpa ketergantungan internet.

## 2. Tujuan Utama
- Membuat aplikasi POS yang ringan, cepat, dan user-friendly.
- Full offline capable.
- Sistem modular (bisa aktif/nonaktifkan fitur sesuai jenis toko).
- 100% gratis untuk digunakan.
- Mudah dikembangkan dan dimodifikasi.

## 3. Tech Stack

| Layer                | Teknologi                          | Keterangan                     |
|----------------------|------------------------------------|--------------------------------|
| Framework            | Expo (React Native)                | Mobile-first                   |
| Bahasa               | TypeScript                         | Wajib                          |
| Styling              | NativeWind (Tailwind CSS)          | Cepat dan konsisten            |
| Database Lokal       | Expo SQLite + Drizzle ORM          | Ringan & powerful              |
| State Management     | Zustand                            | Ringan                         |
| Navigation           | React Navigation v6                | -                              |
| Form & Validasi      | React Hook Form + Zod              | -                              |
| Barcode Scanner      | expo-barcode-scanner               | -                              |
| Printer Thermal      | react-native-thermal-receipt-printer | Bluetooth ESC/POS           |

## 4. Arsitektur Project (Modular)

Project harus dibangun dengan struktur **feature-based modular**:

/src
├── core/              # Fitur inti yang selalu aktif
├── modules/
│   ├── product/       # Master barang & variant
│   ├── sales/         # Transaksi penjualan
│   ├── inventory/     # Stok & mutasi barang
│   ├── customer/      # Pelanggan & loyalty
│   ├── report/        # Laporan
│   ├── settings/      # Pengaturan & modul manager
│   └── supplier/      # Supplier (opsional)
├── components/
├── lib/
├── hooks/
├── types/
├── utils/
└── assets/

Setiap module harus bisa diaktifkan atau dinonaktifkan melalui pengaturan.

## 5. Fitur yang Dibutuhkan

### Phase 1 - MVP (Versi Beta)
- Login dengan PIN / Password sederhana
- Master Produk (nama, harga jual, barcode, foto, satuan)
- Transaksi Penjualan (keranjang, diskon manual, pajak)
- Metode pembayaran: Cash, Transfer, QRIS, E-wallet
- Cetak struk thermal via Bluetooth
- Riwayat transaksi
- Laporan penjualan harian
- Backup & Restore database (JSON + Excel)
- Dark Mode
- Offline 100%

### Phase 2 (Setelah Beta)
- Product Variant (ukuran, warna, rasa, dll)
- Manajemen Stok & Alert stok rendah
- Customer Management + Loyalty
- Promo & Diskon Engine
- Multi User + Role (Owner, Kasir)

## 6. Desain & UX Requirement
- Antarmuka sangat sederhana dan besar (mudah dioperasikan kasir)
- Tombol utama besar dan jelas
- Proses checkout cepat (maksimal 3-4 klik)
- Support landscape & portrait
- Search produk cepat via barcode dan nama

## 7. Persyaratan Teknis
- Full offline-first
- Data tersimpan di SQLite lokal di perangkat
- Performa cepat meski ada > 5000 produk
- Backup otomatis setiap hari
- Build APK menggunakan EAS Build
- Kode harus bersih, terdokumentasi, dan mudah dimodifikasi

## 8. Deliverables (Versi Beta)
1. Source code lengkap di GitHub (repository private)
2. Struktur folder modular yang bersih dan terorganisir
3. Dokumentasi instalasi & penggunaan (README.md)
4. Panduan backup & restore data
5. File APK yang sudah bisa diinstal di Android
6. Cara menambahkan module baru

## 9. Catatan Tambahan
- Aplikasi harus tetap ringan dan cepat.
- Prioritas utama adalah kestabilan transaksi dan kemudahan penggunaan.
- Developer diharapkan bisa memberikan saran perbaikan jika ada bagian yang kurang optimal.

