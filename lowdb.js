import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);


const defaultData = {
  mitglied: [],    
  kurs: [],        
  buchungen: []    
};


const db = new Low(adapter, defaultData);

export async function initDB() {
  try {
   
    await db.read();

    
    if (db.data === null) {
      db.data = defaultData;
      await db.write(); 
      console.log('Datenbank initialisiert und Standardwerte gesetzt.');
    } else {
      console.log('Datenbank bereits initialisiert.');
    }
    
    return db;
  } catch (error) {
    console.error('Fehler bei der Initialisierung der Datenbank:', error);
    throw error;
  }
}


export function getDB() {
  return db;
}