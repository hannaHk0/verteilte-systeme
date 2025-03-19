const db = require('./lowdb');

async function createBuchung(buchungId, kursId, mitgliederId, buchungsdatum ) {
  await db.read();
  const buchung = { id: Date.now(), buchungId, kursId, mitgliederId, buchungsdatum };
  db.data.buchung.push(buchung);
  await db.write();
  return buchung;
}

async function getBuchung() {
  await db.read();
  return db.data.buchung;
}

module.exports = { createBuchung, getBuchung };
