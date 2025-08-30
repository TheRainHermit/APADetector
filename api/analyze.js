import express from 'express';
import upload from '../server/middlewares/uploadMiddleware.js';
import { analyzeDocument, getAllDocuments, getAnalysisResults } from '../server/controllers/analysisController.js';

const app = express();
app.use(express.json());

// POST /api/analyze — Subir y analizar documento
app.post('/', upload.single('file'), analyzeDocument);

// GET /api/analyze/documents — Listar todos los documentos analizados
app.get('/documents', getAllDocuments);

// GET /api/analyze/results/:id — Obtener resultados de un documento por ID
app.get('/results/:id', getAnalysisResults);

export default app;