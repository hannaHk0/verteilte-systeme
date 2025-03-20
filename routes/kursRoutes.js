import express from 'express';
import { createKurs, getKurs, deleteKurs } from '../services/kursService.js';
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { kursId, titel, beschreibung, trainer } = req.body;
    const kurs = await createKurs(kursId, titel, beschreibung, trainer);
    res.status(201).json(kurs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/:kursId', async (req, res) => {
  try {
    const kurs = await getKurs(req.params.kursId);  
    res.status(200).json(kurs);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});


router.delete('/:kursId', async (req, res) => {
  try {
    const { kursId } = req.params;
    const deletedKurs = await deleteKurs(kursId);
    res.status(200).json({ message: 'Kurs gelöscht', data: deletedKurs });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;