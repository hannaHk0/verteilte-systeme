const db = require('./lowdb');

async function createKurs(kursId,trainer, datum, uhrzeit,kursname ) {
  await db.read();
  const kurs = { id: Date.now(), kursId, trainer, datum, uhrzeit, kursname };
  db.data.kurs.push(kurs);
  await db.write();
  return kurs;
}

async function getKurs() {
  await db.read();
  return db.data.kurs;
}

module.exports = { createKurs, getKurs };
