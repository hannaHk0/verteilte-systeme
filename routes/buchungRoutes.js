import express from 'express';
import { createBuchung, getBuchung, updateBuchung, deleteBuchung } from '../services/buchungService.js';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { buchungId, kursId, mitgliederId, buchungsdatum } = req.body;
    
    if (!buchungId || !kursId || !mitgliederId) {
      return res.status(400).json({ error: 'Buchung-ID, Kurs-ID und Mitglieder-ID sind erforderlich' });
    }
    
    const buchung = await createBuchung(buchungId, mitgliederId, kursId, buchungsdatum);
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

router.put('/:buchungId', async (req, res) => {
  try {
    const { kursId, mitgliederId, buchungsdatum } = req.body;
    const updateData = { kursId, mitgliederId, buchungsdatum };
    
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );
    
    const updatedBuchung = await updateBuchung(req.params.buchungId, updateData);
    res.status(200).json(updatedBuchung);
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