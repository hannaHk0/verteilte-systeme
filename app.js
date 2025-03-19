const express = require('express');

import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hallo, verteilte Systeme!');
});
import mitgliedRoutes from './routes/mitgliedRoutes.js';
import kursRoutes from './routes/kursRoutes.js';
import buchungRoutes from './routes/buchungRoutes.js';

app.use(express.json());
app.use('/mitglied', mitgliedRoutes);
app.use('/kurs', kursRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
