import { writeFile } from 'fs/promises';
import path from 'path';
// IMPORTA TU SERVICIO
import { analyzeFile } from '../server/services/apaService.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const contentType = req.headers['content-type'] || '';
    if (!contentType.startsWith('multipart/form-data')) {
      return res.status(400).json({ error: 'Content-Type debe ser multipart/form-data' });
    }

    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const rawBody = Buffer.concat(buffers);

    const Busboy = (await import('busboy')).default;
    const busboy = Busboy({ headers: req.headers });

    let fileBuffer = null;
    let fileName = null;
    let mimeType = null;

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      fileName = filename;
      mimeType = mimetype;
      const chunks = [];
      file.on('data', (data) => chunks.push(data));
      file.on('end', () => {
        fileBuffer = Buffer.concat(chunks);
      });
    });

    busboy.end(rawBody);

    await new Promise((resolve, reject) => {
      busboy.on('finish', resolve);
      busboy.on('error', reject);
    });

    if (!fileBuffer) {
      return res.status(400).json({ error: 'No se recibió archivo' });
    }

    const tempPath = path.join('/tmp', fileName);
    await writeFile(tempPath, fileBuffer);

    // AQUÍ INTEGRAS TU SERVICIO DE ANÁLISIS
    try {
      const resultado = await analyzeFile(tempPath, mimeType, 'es'); // O 'en' según idioma
      return res.status(200).json({ ok: true, resultado });
    } catch (error) {
      return res.status(500).json({ ok: false, error: error.message });
    }
  }

  res.status(405).json({ error: 'Método no permitido' });
}