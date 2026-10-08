const kelasBahasaModel = require('../models/kelasBahasaModel');
const { errorHttp } = require('../middlewares/errorHandler');

exports.getAll = (req, res) => {
  const { bahasa } = req.query;
  res.json(kelasBahasaModel.getAll(bahasa));
};

exports.getById = (req, res, next) => {
  const id = parseInt(req.params.id);
  const data = kelasBahasaModel.getById(id);
  if (!data) return next(errorHttp(404, `Data dengan id ${id} tidak ditemukan`));
  res.json(data);
};

exports.create = (req, res, next) => {
  const { namaKelas, bahasa, level, jumlahPertemuan, biaya } = req.body;
  
  if (!namaKelas || !bahasa || !level || jumlahPertemuan === undefined || biaya === undefined) {
    return next(errorHttp(400, 'Semua field wajib diisi'));
  }

  const levelTersedia = ["dasar", "menengah", "lanjut"];
  if (!levelTersedia.includes(level)) {
    return next(errorHttp(400, 'Level harus dasar, menengah, atau lanjut'));
  }

  const baru = kelasBahasaModel.create({ 
    namaKelas, 
    bahasa, 
    level, 
    jumlahPertemuan: Number(jumlahPertemuan), 
    biaya: Number(biaya) 
  });
  
  res.status(201).json({
    status: "success",
    message: "Data berhasil ditambahkan",
    data: baru
  });
};

exports.update = (req, res, next) => {
  const id = parseInt(req.params.id);
  const { namaKelas, bahasa, level, jumlahPertemuan, biaya } = req.body;
  
  if (!namaKelas || !bahasa || !level || jumlahPertemuan === undefined || biaya === undefined) {
    return next(errorHttp(400, 'Semua field wajib diisi'));
  }

  const levelTersedia = ["dasar", "menengah", "lanjut"];
  if (!levelTersedia.includes(level)) {
    return next(errorHttp(400, 'Level harus dasar, menengah, atau lanjut'));
  }

  const hasil = kelasBahasaModel.update(id, { 
    namaKelas, 
    bahasa, 
    level, 
    jumlahPertemuan: Number(jumlahPertemuan), 
    biaya: Number(biaya) 
  });
  
  if (!hasil) return next(errorHttp(404, `Data dengan id ${id} tidak ditemukan`));
  
  res.status(200).json({
    status: "success",
    message: "Data berhasil diubah",
    data: hasil
  });
};

exports.remove = (req, res, next) => {
  const id = parseInt(req.params.id);
  const berhasil = kelasBahasaModel.remove(id);
  
  if (!berhasil) return next(errorHttp(404, `Data dengan id ${id} tidak ditemukan`));
  
  res.status(200).json({
    status: "success",
    message: `Data kelas dengan id ${id} berhasil dihapus`,
    data: null
  });
};