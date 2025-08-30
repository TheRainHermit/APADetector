import { writeFile } from 'fs/promises';
import path from 'path';
import pool from '../server/models/db_pg.js'; // Usa el nuevo pool de PostgreSQL
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
      if (!fileBuffer || !fileName || typeof fileName !== 'string') {
        console.error('fileBuffer:', fileBuffer, 'fileName:', fileName, 'typeof:', typeof fileName);
        return res.status(400).json({ error: 'No se recibió archivo válido', fileName, fileBufferType: typeof fileBuffer });
      }
      const tempPath = path.join('/tmp', fileName);
      await writeFile(tempPath, fileBuffer);

      try {
        // 1. Guardar documento en la base de datos
        const docResult = await pool.query(
          `INSERT INTO documents (filename, originalname, mimetype, size)
           VALUES ($1, $2, $3, $4)
           RETURNING id`,
          [fileName, fileName, mimeType, fileBuffer.length]
        );
        const documentId = docResult.rows[0].id;

        // 2. Analizar el archivo
        const analysis = await analyzeFile(tempPath, mimeType, 'es');
        if (!analysis || !Array.isArray(analysis.results)) {
          return res.status(500).json({ error: 'Análisis inválido' });
        }

        // 3. Guardar resultados en la base de datos
        const insertPromises = analysis.results.map(result =>
          pool.query(
            `INSERT INTO analysis_results
              (document_id, type, title, message, suggestion, section, count, titleKey, messageKey, suggestionKey, sectionKey, messageParams)
             VALUES
              ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
            [
              documentId,
              result.type,
              result.title,
              typeof result.message === 'object' ? JSON.stringify(result.message) : result.message,
              result.suggestion,
              result.section,
              result.count || null,
              result.titleKey || null,
              result.messageKey || null,
              result.suggestionKey || null,
              result.sectionKey || null,
              result.messageParams ? JSON.stringify(result.messageParams) : null,
            ]
          )
        );
        await Promise.all(insertPromises);

        // 4. Responder con el ID y el análisis
        return res.status(200).json({ ok: true, id: documentId, resultado: analysis });
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