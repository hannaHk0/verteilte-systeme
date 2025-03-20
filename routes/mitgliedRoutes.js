import express from 'express';
import { createMitglied, getMitglied, deleteMitglied } from '../services/mitgliedService.js';
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { mitgliedId, name, email, telefonnummer } = req.body;
    const mitglied = await createMitglied(mitgliedId, name, email, telefonnummer);
    res.status(201).json(mitglied);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:mitgliedId', async (req, res) => {
  try {
    const mitglied = await getMitglied(req.params.mitgliedId);  
    res.status(200).json(mitglied);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});


router.delete('/:mitgliedId', async (req, res) => {
  try {
    const { mitgliedId } = req.params;
    const deletedMitglied = await deleteMitglied(mitgliedId);
    res.status(200).json({ message: 'Mitglied gelöscht', data: deletedMitglied });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;