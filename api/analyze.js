import express from 'express';
import upload from '../server/middlewares/uploadMiddleware.js';
import { analyzeDocument, getAllDocuments, getAnalysisResults } from '../server/controllers/analysisController.js';

const app = express();

app.use((req, res, next) => {
    console.log('--- Nueva petición recibida ---');
    console.log('Método:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', req.headers);
  
    // Intenta loggear el body (solo si no es un stream, cuidado con archivos grandes)
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      let body = [];
      req.on('data', chunk => body.push(chunk));
      req.on('end', () => {
        const raw = Buffer.concat(body).toString();
        // Solo muestra los primeros 1000 caracteres para evitar logs enormes
        console.log('Body (primeros 1000 chars):', raw.slice(0, 1000));
        next();
      });
    } else {
      next();
    }
  });

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ ok: true, info: 'API analyze GET works' });
  });

// POST /api/analyze — Subir y analizar documento
app.post('/', upload.single('file'), async (req, res, next) => {
    try {
      console.log('Archivo recibido:', req.file);
      console.log('Body recibido:', req.body);
      // Llama tu controlador real (si es async, usa await)
      await analyzeDocument(req, res, next);
    } catch (error) {
      console.error('Error en analyze POST:', error);
      // Puedes devolver un error genérico o el mensaje real
      res.status(500).json({ error: 'Error interno al analizar el documento', details: error.message });
    }
  });

// GET /api/analyze/documents — Listar todos los documentos analizados
app.get('/documents', getAllDocuments);

// GET /api/analyze/results/:id — Obtener resultados de un documento por ID
app.get('/results/:id', getAnalysisResults);

export default app;