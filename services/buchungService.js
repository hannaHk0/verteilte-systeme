import { getDB } from '../lowdb.js';
import { publishMessage } from '../mqtt/mqttPublisher.js';


async function createBuchung(buchungId, mitgliedId, kursId, datum) {
  const db = getDB();
  await db.read();
  

  const buchung = { 
    id: Date.now(),
    buchungId, 
    mitgliedId, 
    kursId,
    datum: datum || new Date().toISOString()
  };
  
  
  db.data.buchungen.push(buchung);
  await db.write();

  
  const topic = `WWI23B3_Huber/Buchung`; 
  const message = JSON.stringify({
    event: 'buchungErstellt',
    url: '/buchung',  
    data: buchung
  });
  publishMessage(topic, message);
  
  return buchung;
}


async function getBuchung(buchungId) {
  const db = getDB();
  await db.read();
  
 
  const buchung = db.data.buchungen.find(b => String(b.buchungId) === String(buchungId));
  
  if (!buchung) {
    throw new Error(`Buchung mit ID ${buchungId} nicht gefunden`);
  }
  
 
  const topic = `WWI23B3_Huber/Buchung`; 
  const message = JSON.stringify({
    event: 'buchungAbgerufen',
    url: `/buchung/${buchungId}`,
    data: buchung
  });
  publishMessage(topic, message);

  return buchung;
}


async function deleteBuchung(buchungId) {
  const db = getDB();
  await db.read();
  
  const index = db.data.buchungen.findIndex(b => String(b.buchungId) === String(buchungId));
  
  if (index === -1) {
    throw new Error(`Buchung mit ID ${buchungId} nicht gefunden`);
  }

 
  const deletedBuchung = db.data.buchungen.splice(index, 1)[0];
  await db.write();

  
  const topic = `WWI23B3_Huber/Buchung`; 
  const message = JSON.stringify({
    event: 'buchungGelöscht',
    url: `/buchung/${buchungId}`,
    data: deletedBuchung
  });
  publishMessage(topic, message);

  return deletedBuchung;
}

export { createBuchung, getBuchung, deleteBuchung };