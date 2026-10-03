const express = require('express');
const app = express();

app.use(express.json());

let languageClasses = [
    {
        id: 1,
        namaKelas: "Nihongo Pemula",
        bahasa: "Jepang",
        level: "dasar",
        jumlahPertemuan: 16,
        biaya: 1200000
    },
    {
        id: 2,
        namaKelas: "English for Business",
        bahasa: "Inggris",
        level: "menengah",
        jumlahPertemuan: 20,
        biaya: 2500000
    },
    {
        id: 3,
        namaKelas: "Kookmin Korean",
        bahasa: "Korea",
        level: "lanjut",
        jumlahPertemuan: 12,
        biaya: 1800000
    }
];

let nextId = 4;

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

// GET /kelas-bahasa
app.get('/kelas-bahasa', (req, res) => {
    const { bahasa } = req.query;
    if (bahasa) {
        const filtered = languageClasses.filter(c => c.bahasa.toLowerCase() === bahasa.toLowerCase());
        return res.status(200).json(filtered);
    }
    return res.status(200).json(languageClasses);
});

// GET /kelas-bahasa/:id
app.get('/kelas-bahasa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const result = languageClasses.find(c => c.id === id);
    if (!result) {
        return res.status(404).json({
            status: "error",
            message: `Data dengan id ${id} tidak ditemukan`,
            data: null
        });
    }
    return res.status(200).json(result);
});

// POST /kelas-bahasa
// Body: { "namaKelas": "Nihongo Pemula", "bahasa": "Jepang", "level": "dasar", "jumlahPertemuan": 16, "biaya": 1200000 }
app.post('/kelas-bahasa', (req, res) => {
    const { namaKelas, bahasa, level, jumlahPertemuan, biaya } = req.body;
    
    if (!namaKelas || !bahasa || !level || jumlahPertemuan === undefined || biaya === undefined) {
        return res.status(400).json({
            status: "error",
            message: "Semua field wajib diisi",
            data: null
        });
    }

    const validLevels = ["dasar", "menengah", "lanjut"];
    if (!validLevels.includes(level)) {
        return res.status(400).json({
            status: "error",
            message: "Level harus dasar, menengah, atau lanjut",
            data: null
        });
    }

    const newClass = {
        id: nextId++,
        namaKelas,
        bahasa,
        level,
        jumlahPertemuan: Number(jumlahPertemuan),
        biaya: Number(biaya)
    };

    languageClasses.push(newClass);

    res.status(201).json({
        status: "success",
        message: "Data berhasil ditambahkan",
        data: newClass
    });
});

// PUT /kelas-bahasa/:id
// Body: { "namaKelas": "Nihongo Menengah", "bahasa": "Jepang", "level": "menengah", "jumlahPertemuan": 20, "biaya": 1500000 }
app.put('/kelas-bahasa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = languageClasses.findIndex(c => c.id === id);
    
    if (index === -1) {
        return res.status(404).json({
            status: "error",
            message: `Data dengan id ${id} tidak ditemukan`,
            data: null
        });
    }

    const { namaKelas, bahasa, level, jumlahPertemuan, biaya } = req.body;
    
    if (!namaKelas || !bahasa || !level || jumlahPertemuan === undefined || biaya === undefined) {
        return res.status(400).json({
            status: "error",
            message: "Semua field wajib diisi",
            data: null
        });
    }

    const validLevels = ["dasar", "menengah", "lanjut"];
    if (!validLevels.includes(level)) {
        return res.status(400).json({
            status: "error",
            message: "Level harus dasar, menengah, atau lanjut",
            data: null
        });
    }

    languageClasses[index] = {
        id,
        namaKelas,
        bahasa,
        level,
        jumlahPertemuan: Number(jumlahPertemuan),
        biaya: Number(biaya)
    };

    res.status(200).json({
        status: "success",
        message: "Data berhasil diubah",
        data: languageClasses[index]
    });
});

// DELETE /kelas-bahasa/:id
app.delete('/kelas-bahasa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = languageClasses.findIndex(c => c.id === id);
    
    if (index === -1) {
        return res.status(404).json({
            status: "error",
            message: `Data dengan id ${id} tidak ditemukan`,
            data: null
        });
    }

    languageClasses.splice(index, 1);
    
    res.status(200).json({
        status: "success",
        message: `Data kelas dengan id ${id} berhasil dihapus`,
        data: null
    });
});

// catch-all 404
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Endpoint tidak ditemukan",
        data: null
    });
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
}

module.exports = app;
