require('dotenv').config();

const express = require('express');
const cors = require('cors');

const logger = require('./middlewares/logger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const kelasBahasaRoutes = require('./routes/kelasBahasaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware global ----------
app.use(logger);
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// ---------- Route dasar ----------
app.get('/', (req, res) => {
    res.json({
        nama_mahasiswa: "Darmalopi",
        NIM: "2327240123",
        nomor_topik: 5,
        daftar_endpoint: [
            "GET /kelas-bahasa",
            "GET /kelas-bahasa/:id",
            "POST /kelas-bahasa",
            "PUT /kelas-bahasa/:id",
            "DELETE /kelas-bahasa/:id",
            "GET /kelas-bahasa?bahasa=nilai"
        ]
    });
});

// ---------- Route per modul ----------
app.use('/kelas-bahasa', kelasBahasaRoutes);

// Route untuk mensimulasikan error tak terduga (hapus sebelum dipublikasikan jika mau)
app.get('/error-uji', () => {
  throw new Error('Kesalahan tak terduga untuk pengujian');
});

// ---------- Handler 404 dan error handler (paling bawah) ----------
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});