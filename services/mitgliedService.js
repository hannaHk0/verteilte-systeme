const db = require('./lowdb');

async function createMitglied(mitgliederId, name, email, telefonnummer, ) {
  await db.read();
  const mitglied = { id: Date.now(), mitgliederId, name, email, telefonnummer };
  db.data.mitglieder.push(mitglied);
  await db.write();
  return mitglied;
}

async function getMitglieder() {
  await db.read();
  return db.data.mitglieder;
}

module.exports = { createMitglied, getMitglieder };
