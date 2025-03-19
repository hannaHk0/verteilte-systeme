import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const file = new JSONFile(join(__dirname, '..', 'db.json'));
const db = new Low(file, {defaultData: {kurs: []}});


async function initDB() {
  await db.read();
  // Falls noch keine Daten vorhanden sind, initialisiere das Datenmodell
  db.data = db.data || { kurs: [] };
  await db.write();
}

await initDB(); 


async function createKurs(kursId,trainer, datum, uhrzeit,kursname ) {
  await db.read();
  const kurs = { id: Date.now(), kursId, trainer, datum, uhrzeit, kursname };
  db.data.kurs.push(kurs);
  await db.write();
  return kurs;
}

async function getKurse() {
  await db.read();
  return db.data.kurs;
}

export { createKurs, getKurse };
