import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ ok: true, info: 'Express basic handler works' });
});

export default function handler(req, res) {
  app(req, res);
}
