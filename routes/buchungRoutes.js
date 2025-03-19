
import express from 'express';
import { createBuchung, getBuchung } from '../services/buchungService.js';
const router = express.Router();


router.post('/', async (req, res) => {
  const { buchungId, mitgliedId, kursId, buchungsdatum } = req.body;
  const buchung = await createBuchung(buchungId, mitgliedId, kursId, buchungsdatum);
  res.status(201).json(buchung);
});


router.get('/', async (req, res) => {
  const buchung = await getBuchung();
  res.status(200).json(buchung);
});

export default router;
