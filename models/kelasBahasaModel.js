let kelasBahasa = [
  { id: 1, namaKelas: "Nihongo Pemula", bahasa: "Jepang", level: "dasar", jumlahPertemuan: 16, biaya: 1200000 },
  { id: 2, namaKelas: "English for Business", bahasa: "Inggris", level: "menengah", jumlahPertemuan: 20, biaya: 2500000 },
  { id: 3, namaKelas: "Kookmin Korean", bahasa: "Korea", level: "lanjut", jumlahPertemuan: 12, biaya: 1800000 }
];
let nextId = 4;

function getAll(bahasa) {
  if (bahasa) return kelasBahasa.filter((c) => c.bahasa.toLowerCase() === bahasa.toLowerCase());
  return kelasBahasa;
}

function getById(id) {
  return kelasBahasa.find((c) => c.id === id);
}

function create(data) {
  const baru = { id: nextId++, ...data };
  kelasBahasa.push(baru);
  return baru;
}

function update(id, data) {
  const index = kelasBahasa.findIndex((c) => c.id === id);
  if (index === -1) return null;
  kelasBahasa[index] = { ...kelasBahasa[index], ...data, id };
  return kelasBahasa[index];
}

function remove(id) {
  const index = kelasBahasa.findIndex((c) => c.id === id);
  if (index === -1) return false;
  kelasBahasa.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };