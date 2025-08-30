import { writeFile } from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { analyzeFile } from '../server/services/apaService.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {

  // LOG de depuración de variables de entorno
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL, 'SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY);
  
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
        // 1. Guardar documento en Supabase
        const { data: docData, error: docError } = await supabase
          .from('documents')
          .insert([
            {
              filename: fileName,
              originalname: fileName,
              mimetype: mimeType,
              size: fileBuffer.length
            }
          ])
          .select('id')
          .single();
        if (docError) throw docError;
        const documentId = docData.id;

        // 2. Analizar el archivo
        const analysis = await analyzeFile(tempPath, mimeType, 'es');
        if (!analysis || !Array.isArray(analysis.results)) {
          return res.status(500).json({ error: 'Análisis inválido' });
        }

        // 3. Guardar resultados en Supabase
        const resultsToInsert = analysis.results.map(result => ({
          document_id: documentId,
          type: result.type,
          title: result.title,
          message: typeof result.message === 'object' ? JSON.stringify(result.message) : result.message,
          suggestion: result.suggestion,
          section: result.section,
          count: result.count || null,
          titleKey: result.titleKey || null,
          messageKey: result.messageKey || null,
          suggestionKey: result.suggestionKey || null,
          sectionKey: result.sectionKey || null,
          messageParams: result.messageParams ? JSON.stringify(result.messageParams) : null,
        }));

        const { error: resultsError } = await supabase
          .from('analysis_results')
          .insert(resultsToInsert);
        if (resultsError) throw resultsError;

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