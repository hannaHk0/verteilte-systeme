
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const file = new JSONFile(join(__dirname, '..', 'db.json'));
const db = new Low(file, {defaultData: { mitglied:[]}});


async function initDB() {
  await db.read();
  // Falls noch keine Daten vorhanden sind, initialisiere das Datenmodell
  db.data = db.data || { mitglied: [] };
  await db.write();
}

await initDB(); 


async function createMitglied(mitgliedId, name, email, telefonnummer) {
  await db.read();
  const mitglied = { id: Date.now(),mitgliedId, name, email, telefonnummer };
  db.data.mitglied.push(mitglied);
  await db.write();
  return mitglied;
}


async function getMitglied() {
  await db.read();
  return db.data.mitglied;
}
export { createMitglied, getMitglied };