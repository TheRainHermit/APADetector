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
      // Si filename es objeto, extrae el string
      let realFileName = filename;
      if (filename && typeof filename === 'object' && filename.filename) {
        realFileName = filename.filename;
      }
      fileName = realFileName;
      mimeType = mimetype;
      const chunks = [];
      file.on('data', (data) => chunks.push(data));
      file.on('end', () => {
        fileBuffer = Buffer.concat(chunks);
      });
    });
    
    busboy.on('finish', async () => {
      // Nueva validación robusta
      if (!fileBuffer || !fileName || typeof fileName !== 'string') {
        console.error('fileBuffer:', fileBuffer, 'fileName:', fileName, 'typeof:', typeof fileName);
        return res.status(400).json({ error: 'No se recibió archivo válido', fileName, fileBufferType: typeof fileBuffer });
      }
      const tempPath = path.join('/tmp', fileName);
      await writeFile(tempPath, fileBuffer);
    
      try {
        const resultado = await analyzeFile(tempPath, mimeType, 'es');
        return res.status(200).json({ ok: true, resultado });
      } catch (error) {
        return res.status(500).json({ ok: false, error: error.message });
      }
    });

    busboy.on('error', (err) => {
      return res.status(500).json({ ok: false, error: err.message });
    });

    busboy.end(rawBody);
    return;
  }

  res.status(405).json({ error: 'Método no permitido' });
}