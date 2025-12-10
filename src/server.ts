import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  return next();
});


const dbPath = join(process.cwd(), 'src', 'db.json');

async function readDB() {
  try {
    const raw = await readFile(dbPath, 'utf8');
    return JSON.parse(raw || '{}');
  } catch {
    return {};
  }
}

async function writeDB(data: any) {
  await writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
}


/*
 get by email
*/

app.get('/records', async (req, res) => {
  const db = await readDB();
  const records = db.records || [];
  const email = typeof req.query['email'] === 'string' ? req.query['email'] : undefined;

  if (email) {
    const matches = records.filter((r: any) => String(r.email).toLowerCase() === String(email).toLowerCase());
    return res.json(matches);
  }
  return res.json(records);
});

/*
  Inset a new record
*/

app.post('/records', async (req, res) => {
  const db = await readDB();
  db.records = db.records || [];
  const newRecord = { id: Date.now(), ...req.body };
  db.records.push(newRecord);
  await writeDB(db);
  return res.status(201).json(newRecord);
});

/*
  Get all users
*/

app.get('/users', async (req, res) => {
  const db = await readDB();
  return res.json(db.records || []);
});


app.get('/records/:id', async (req, res) => {
  const db = await readDB();
  const id = String(req.params.id);
  const record = (db.records || []).find((r: any) => String(r.id) === id);
  if (!record) return res.status(404).json({ message: 'Not Found' });
  return res.json(record);
});

/*
  update by email

*/

app.put('/records/:email', async (req, res) => {
  const db = await readDB();
  db.records = db.records || [];
  const email = String(req.params.email);
  const emailIndex = db.records.findIndex((r: any) => String(r.email) === email);
  if (emailIndex === -1) return res.status(404).json({ message: 'Not Found' });
  const updated = { ...db.records[emailIndex], ...req.body, id: db.records[emailIndex].id };
  db.records[emailIndex] = updated;
  await writeDB(db);
  return res.json(updated);
});


/*
  delete by email
*/


app.delete('/records/:email', async (req, res) => {
  const db = await readDB();
  db.records = db.records || [];
  const email = String(req.params.email);
  const emailindex = db.records.findIndex((r: any) => String(r.email) === email);
  if (emailindex === -1) return res.status(404).json({ message: 'Not Found' });
  const removed = db.records.splice(emailindex, 1)[0];
  await writeDB(db);
  return res.json(removed);
});


app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);


app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});


if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}


export const reqHandler = createNodeRequestHandler(app);
