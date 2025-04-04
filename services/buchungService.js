import { getDB } from '../lowdb.js';
import { publishMessage } from '../mqtt/mqttPublisher.js';


async function createBuchung(buchungId, mitgliederId, kursId, buchungsdatum) {
  const db = getDB();
  await db.read();
  
  
  const buchung = { 
    id: Date.now(),
    buchungId, 
    mitgliederId, 
    kursId,
    buchungsdatum: buchungsdatum || new Date().toISOString()
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


async function updateBuchung(buchungId, updateData) {
  const db = getDB();
  await db.read();
  
  const index = db.data.buchungen.findIndex(b => String(b.buchungId) === String(buchungId));
  
  if (index === -1) {
    throw new Error(`Buchung mit ID ${buchungId} nicht gefunden`);
  }
  

  const updatedBuchung = {
    ...db.data.buchungen[index],
    ...updateData,
    id: db.data.buchungen[index].id,               
    buchungId: db.data.buchungen[index].buchungId  
  };
  
  db.data.buchungen[index] = updatedBuchung;
  await db.write();
  
  
  const topic = `WWI23B3_Huber/Buchung`; 
  const message = JSON.stringify({
    event: 'buchungAktualisiert',
    url: `/buchung/${buchungId}`,
    data: updatedBuchung
  });
  publishMessage(topic, message);
  
  return updatedBuchung;
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

export { createBuchung, getBuchung, updateBuchung, deleteBuchung };