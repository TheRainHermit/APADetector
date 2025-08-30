// api/analyze.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.json({ ok: true, info: 'API analyze GET works' });
  } else if (req.method === 'POST') {
    // lógica para analizar documento
  } else {
    res.status(405).end();
  }
}