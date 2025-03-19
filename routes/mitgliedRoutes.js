import express from 'express';
import { createMitglied, getMitglied } from '../services/mitgliedService.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { mitgliedId, name, email, telefonnummer} = req.body;
  const mitglied = await createMitglied(mitgliedId, name, email, telefonnummer);
  res.status(201).json(mitglied);
});


router.get('/', async (req, res) => {
  const mitglied = await getMitglied();
  res.status(200).json(mitglied);
});

export default router;
