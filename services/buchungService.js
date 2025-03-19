import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const file = new JSONFile(join(__dirname, '..', 'db.json'));
const db = new Low(file, {defaultData: {buchung:[]}});


async function initDB() {
  await db.read();
  // Falls noch keine Daten vorhanden sind, initialisiere das Datenmodell
  db.data = db.data || { buchung: [] };
  await db.write();
}

await initDB(); 


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

export { createBuchung, getBuchung };
