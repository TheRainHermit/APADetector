import express, { json } from 'express';
import cors from 'cors';
import analysisRoutes from './routes/analysisRoutes.js';
import { errorResponse } from './utils/errors.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// Configuración de CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://apadetector.vercel.app',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir solicitudes sin origen (como aplicaciones móviles o curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `Origen '${origin}' no permitido por CORS`;
      console.warn(msg);
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11) tienen problemas con 204
};

// Middlewares globales
app.use(cors(corsOptions));
app.use(json());

// Log de peticiones (útil para depuración)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Rutas de la API
app.use('/api/analyze', analysisRoutes);

// Servir archivos estáticos (si es necesario para producción)
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Ruta de fallback para SPA (debe ir después de las rutas de API)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Middleware global de errores
app.use((err, req, res, next) => {
  console.error('Error en el servidor:', err);
  if (err.code && err.message) {
    return errorResponse(res, err.code, err.message, err.details || {}, err.status || 500);
  }
  // Error genérico
  return errorResponse(res, 'INTERNAL_SERVER_ERROR', 'Error interno del servidor.', {}, 500);
});

// Inicio del servidor
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor APA Detector backend corriendo en puerto ${PORT}`);
  console.log(`Modo: ${process.env.NODE_ENV || 'development'}`);
});

// Manejo de errores de conexión
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`El puerto ${PORT} ya está en uso.`);
  } else {
    console.error('Error al iniciar el servidor:', error);
  }
  process.exit(1);
});

export default app;