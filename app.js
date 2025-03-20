
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'js-yaml'
import { initDB } from './lowdb.js';

const app = express();
const openapiDocument = yaml.load(fs.readFileSync('./openapi.yaml', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

import mitgliedRoutes from './routes/mitgliedRoutes.js';
import kursRoutes from './routes/kursRoutes.js';
import buchungRoutes from './routes/buchungRoutes.js';

app.use(express.json());

app.use('/mitglied', mitgliedRoutes);
app.use('/kurs', kursRoutes);
app.use('/buchung', buchungRoutes);

const port = 3000;
app.listen(port, () => {
  initDB();
  console.log(`Server läuft auf http://localhost:${port}`);
  console.log(`API-Dokumentation verfügbar unter http://localhost:${port}/api-docs`);
});
