import { getDB } from '../lowdb.js';
import { publishMessage } from '../mqtt/mqttPublisher.js';


async function createMitglied(mitgliedId, name, email, telefonnummer) {
  const db = getDB();
  await db.read();
  
 
  const mitglied = { 
    id: Date.now(),
    mitgliedId, 
    name, 
    email, 
    telefonnummer
  };
  
  
  db.data.mitglied.push(mitglied);
  await db.write();

  const topic = `WWI23B3_Huber/Mitglied`; 
  const message = JSON.stringify({
    event: 'mitgliedErstellt',
    url: '/mitglied',  
    data: mitglied
  });
  publishMessage(topic, message);
  
  return mitglied;
}


async function getMitglied(mitgliedId) {
  const db = getDB();
  await db.read();
  
  const mitglied = db.data.mitglied.find(m => String(m.mitgliedId) === String(mitgliedId));
  
  if (!mitglied) {
    throw new Error(`Mitglied mit ID ${mitgliedId} nicht gefunden`);
  }
  
  const topic = `WWI23B3_Huber/Mitglied`; 
  const message = JSON.stringify({
    event: 'mitgliedAbgerufen',
    url: `/mitglied/${mitgliedId}`,
    data: mitglied
  });
  publishMessage(topic, message);

  return mitglied;
}


async function updateMitglied(mitgliedId, updateData) {
  const db = getDB();
  await db.read();
  
  const index = db.data.mitglied.findIndex(m => String(m.mitgliedId) === String(mitgliedId));
  
  if (index === -1) {
    throw new Error(`Mitglied mit ID ${mitgliedId} nicht gefunden`);
  }
  
  const updatedMitglied = {
    ...db.data.mitglied[index],
    ...updateData,
    id: db.data.mitglied[index].id,         
    mitgliedId: db.data.mitglied[index].mitgliedId  
  };
  
  db.data.mitglied[index] = updatedMitglied;
  await db.write();
  
  const topic = `WWI23B3_Huber/Mitglied`; 
  const message = JSON.stringify({
    event: 'mitgliedAktualisiert',
    url: `/mitglied/${mitgliedId}`,
    data: updatedMitglied
  });
  publishMessage(topic, message);
  
  return updatedMitglied;
}


async function deleteMitglied(mitgliedId) {
  const db = getDB();
  await db.read();
  
  const index = db.data.mitglied.findIndex(m => String(m.mitgliedId) === String(mitgliedId));
  
  if (index === -1) {
    throw new Error(`Mitglied mit ID ${mitgliedId} nicht gefunden`);
  }

  const deletedMitglied = db.data.mitglied.splice(index, 1)[0];
  await db.write();

  const topic = `WWI23B3_Huber/Mitglied`; 
  const message = JSON.stringify({
    event: 'mitgliedGelöscht',
    url: `/mitglied/${mitgliedId}`,
    data: deletedMitglied
  });
  publishMessage(topic, message);

  return deletedMitglied;
}

export { createMitglied, getMitglied, updateMitglied, deleteMitglied };