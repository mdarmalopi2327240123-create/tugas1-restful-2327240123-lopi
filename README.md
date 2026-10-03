# Tugas 1 RESTful API

- **Nama**: Darmalopi
- **NIM**: 2327240123
- **Nomor Topik**: 5 (Kursus Bahasa: Kelas Bahasa)
- **Link Vercel**: [Link Deployment Vercel Anda]

## Cara Menjalankan Lokal
1. Buka terminal di folder project ini
2. Install dependency menggunakan perintah:
   ```bash
   npm install
   ```
3. Jalankan server lokal:
   ```bash
   npm run dev
   ```
4. Server akan berjalan di `http://localhost:3000`

## Daftar Endpoint

- `GET /` : Menampilkan informasi dasar API
- `GET /kelas-bahasa` : Mengambil semua data kelas bahasa
- `GET /kelas-bahasa/:id` : Mengambil satu data kelas bahasa berdasarkan ID
- `POST /kelas-bahasa` : Menambahkan data kelas bahasa baru
- `PUT /kelas-bahasa/:id` : Mengubah seluruh data kelas bahasa berdasarkan ID
- `DELETE /kelas-bahasa/:id` : Menghapus data kelas bahasa berdasarkan ID
- `GET /kelas-bahasa?bahasa=nilai` : Memfilter data kelas berdasarkan bahasa (contoh: `/kelas-bahasa?bahasa=Jepang`)
