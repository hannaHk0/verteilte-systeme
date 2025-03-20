import express from 'express';
import { createBuchung, getBuchung, deleteBuchung } from '../services/buchungService.js';
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { buchungId, mitgliedId, kursId, datum } = req.body;
    
   
    if (!buchungId || !mitgliedId || !kursId) {
      return res.status(400).json({ error: 'Buchung-ID, Mitglied-ID und Kurs-ID sind erforderlich' });
    }
    
    const buchung = await createBuchung(buchungId, mitgliedId, kursId, datum);
    res.status(201).json(buchung);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/:buchungId', async (req, res) => {
  try {
    const buchung = await getBuchung(req.params.buchungId);  
    res.status(200).json(buchung);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});


router.delete('/:buchungId', async (req, res) => {
  try {
    const { buchungId } = req.params;
    const deletedBuchung = await deleteBuchung(buchungId);
    res.status(200).json({ message: 'Buchung gelöscht', data: deletedBuchung });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;