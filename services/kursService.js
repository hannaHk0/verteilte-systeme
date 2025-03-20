import { getDB } from '../lowdb.js';
import { publishMessage } from '../mqtt/mqttPublisher.js';


async function createKurs(kursId, titel, beschreibung, trainer) {
  const db = getDB();
  await db.read();
  
  
  const kurs = { 
    id: Date.now(),
    kursId, 
    titel, 
    beschreibung,
    trainer
  };
  
  
  db.data.kurs.push(kurs);
  await db.write();

 
  const topic = `WWI23B3_Huber/Kurs`; 
  const message = JSON.stringify({
    event: 'kursErstellt',
    url: '/kurs',  
    data: kurs
  });
  publishMessage(topic, message);
  
  return kurs;
}


async function getKurs(kursId) {
  const db = getDB();
  await db.read();
  
  const kurs = db.data.kurs.find(k => String(k.kursId) === String(kursId));
  
  if (!kurs) {
    throw new Error(`Kurs mit ID ${kursId} nicht gefunden`);
  }
  
 
  const topic = `WWI23B3_Huber/Kurs`; 
  const message = JSON.stringify({
    event: 'kursAbgerufen',
    url: `/kurs/${kursId}`,
    data: kurs
  });
  publishMessage(topic, message);

  return kurs;
}


async function deleteKurs(kursId) {
  const db = getDB();
  await db.read();
  
  const index = db.data.kurs.findIndex(k => String(k.kursId) === String(kursId));
  
  if (index === -1) {
    throw new Error(`Kurs mit ID ${kursId} nicht gefunden`);
  }

 
  const deletedKurs = db.data.kurs.splice(index, 1)[0];
  await db.write();

  
  const topic = `WWI23B3_Huber/Kurs`; 
  const message = JSON.stringify({
    event: 'kursGelöscht',
    url: `/kurs/${kursId}`,
    data: deletedKurs
  });
  publishMessage(topic, message);

  return deletedKurs;
}

export { createKurs, getKurs, deleteKurs };