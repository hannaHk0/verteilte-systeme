
import express from 'express';
import { createKurs, getKurse} from '../services/kursService.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { kursId, kursname, trainer, uhrzeit, datum } = req.body;
  const kurs = await createKurs(kursId, kursname, trainer, uhrzeit, datum);
  res.status(201).json(kurs);
});


router.get('/', async (req, res) => {
  const kurse = await getKurse();
  res.status(200).json(kurse);
});

export default router;
