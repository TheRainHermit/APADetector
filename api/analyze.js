import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ ok: true, info: 'API analyze GET works' });
});

// Este export es el recomendado:
export default function handler(req, res) {
  app(req, res);
}
