import { analyzeFile, calculateApaScore, t } from '../services/apaService.js';
import pool from '../models/db.js';
import { unlinkSync } from 'fs';
import multer from 'multer';
import { errorResponse } from '../utils/errors.js';
import i18n from '../../client/src/i18n/index.js'; // Asegúrate de que este archivo exista

// Analizar documento

export async function analyzeDocument(req, res) {
  try {
    //console.log('req.file:', req.file);
    // Verificar que se haya enviado un archivo
    if (!req.file) {
      return errorResponse(res, 400, 'No se envió ningún archivo o el archivo no es válido.');
    }

    // 1. Guardar documento
    const [docResult] = await pool.query(
      `INSERT INTO documents (filename, originalname, mimetype, size)
       VALUES (?, ?, ?, ?)`,
      [req.file.filename, req.file.originalname, req.file.mimetype, req.file.size]
    );
    const documentId = docResult.insertId;

    // 2. Analizar archivo (ahora retorna { results, pieChartData, sectionChartData })
    const lang = req.body?.lang || req.query?.lang || 'es';
    //console.log('LANG PARAM RECEIVED:', lang);
    const analysis = await analyzeFile(req.file.path, req.file.mimetype, lang);
    //console.log('ANALYSIS:', analysis);

    if (!analysis || !Array.isArray(analysis.results)) {
      return errorResponse(res, 500, 'Error interno: análisis inválido');
    }

    // 3. Asegurar que todos los resultados tengan los campos requeridos
    const safeResults = analysis.results.map(result => {
      // Mapear tipos a severidades compatibles con Material-UI
      const typeMap = {
        'error': 'error',
        'warning': 'warning',
        'suggestion': 'info',
        'info': 'info',
        'success': 'success'
      };

      const severity = typeMap[result.type] || 'info';
      const defaultTitle = severity.charAt(0).toUpperCase() + severity.slice(1);

      return {
        type: severity,

        title: result.title || defaultTitle,
        message: (() => {
          if (result.messageKey) {
            const msg = t(
              result.messageKey,
              result.messageParams ? (typeof result.messageParams === 'string' ? JSON.parse(result.messageParams) : result.messageParams) : {},
              lang
            );
            return typeof msg === 'function' ? msg(result.messageParams || {}) : msg;
          }
          if (typeof result.message === 'function') {
            return result.message(result.messageParams || {});
          }
          if (typeof result.message === 'object') {
            return JSON.stringify(result.message);
          }
          if (result.message && typeof result.message === 'string' && result.message !== 'Se ha completado el análisis del documento') {
            return result.message;
          }
          if (result.messageKey) {
            const msg = t(
              result.messageKey,
              result.messageParams ? (typeof result.messageParams === 'string' ? JSON.parse(result.messageParams) : result.messageParams) : {},
              lang
            );
            return typeof msg === 'function' ? msg(result.messageParams || {}) : msg;
          }
          return '';
        })(),
        suggestion: result.suggestion || null,

        section: result.section || 'general',
        count: result.count || null,
        // Mantener las claves originales para referencia
        ...(result.titleKey && { titleKey: result.titleKey }),
        ...(result.messageKey && { messageKey: result.messageKey }),
        ...(result.suggestionKey && { suggestionKey: result.suggestionKey }),
        ...(result.sectionKey && { sectionKey: result.sectionKey }),
        ...(result.messageParams && { messageParams: result.messageParams })
      };
    });

    // 4. Guardar resultados en la base de datos
    const insertPromises = safeResults.map(result => {
      const insertParams = [
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
        result.messageParams ? JSON.stringify(result.messageParams) : null
      ];
      console.log('Insert params:', insertParams, 'Types:', insertParams.map(v => typeof v));
      return pool.query(
        `INSERT INTO analysis_results (document_id, type, title, message, suggestion, section, count, titleKey, messageKey, suggestionKey, sectionKey, messageParams)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        insertParams
      );
    });

    try {
      await Promise.all(insertPromises);
    } catch (dbError) {
      console.error('Error al guardar los resultados en la base de datos:', dbError);
      // Continuamos a pesar del error para no interrumpir el flujo
    }

    // 4. Eliminar archivo temporal
    unlinkSync(req.file.path);

    // 5. Asegurar que siempre haya datos para el frontend
    const responseData = {
      documentId,
      results: safeResults.length > 0 ? safeResults : [{
        type: 'info',
        title: 'Análisis completado',
        message: 'El documento ha sido analizado correctamente',
        section: 'general'
      }],
      pieChartData: analysis.pieChartData || [
        { name: 'info', value: 1 }
      ],
      sectionChartData: analysis.sectionChartData || [
        { section: 'general', count: 1 }
      ],
      docInfo: {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      }
    };

    console.log('Enviando respuesta al frontend con', responseData.results.length, 'resultados');
    res.json(responseData);

  } catch (error) {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return errorResponse(res, 'FILE_TOO_LARGE', 'El archivo es demasiado grande. Máximo permitido: 5 MB.', {}, 413);
      }
      return errorResponse(res, 'UPLOAD_ERROR', error.message, {}, 400);
    }
    if (error.code === 'FILE_TYPE_NOT_ALLOWED') {
      return errorResponse(res, 'FILE_TYPE_NOT_ALLOWED', error.message, error.details, 415);
    }
    console.error(error);
    return errorResponse(res, 500, 'Error al analizar el documento.');
  }
}

// Obtener todos los documentos analizados
export async function getAllDocuments(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const mimetype = req.query.mimetype || '';
    const dateFrom = req.query.dateFrom || '';
    const dateTo = req.query.dateTo || '';
    const orderBy = req.query.orderBy || 'uploaded_at';
    const orderDir = (req.query.orderDir || 'DESC').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE 1=1';
    let params = [];

    if (search) {
      whereClause += ' AND originalname LIKE ?';
      params.push(`%${search}%`);
    }
    if (mimetype) {
      whereClause += ' AND mimetype = ?';
      params.push(mimetype);
    }
    if (dateFrom) {
      whereClause += ' AND uploaded_at >= ?';
      params.push(dateFrom);
    }
    if (dateTo) {
      whereClause += ' AND uploaded_at <= ?';
      params.push(dateTo);
    }

    // Total count for pagination
    const [countRows] = await pool.query(
      `SELECT COUNT(*) as total FROM documents ${whereClause}`,
      params
    );
    const total = countRows[0].total;

    // Fetch paginated documents with ordering
    const [rows] = await pool.query(
      `SELECT * FROM documents ${whereClause} ORDER BY ${orderBy} ${orderDir} LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({
      documents: rows,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, 'Error al obtener el historial de documentos.');
  }
}

// Obtener resultados de un documento específico
export async function getAnalysisResults(req, res) {
  const { id } = req.params;
  try {
    // Verifica que el documento exista
    const [docs] = await pool.query(
      `SELECT * FROM documents WHERE id = ?`, [id]
    );
    if (docs.length === 0) {
      return errorResponse(res, 404, 'Documento no encontrado.');
    }

    // Trae los resultados asociados
    const [results] = await pool.query(
      `SELECT * FROM analysis_results WHERE document_id = ? ORDER BY created_at ASC`, [id]
    );

    console.log('Results:', results);

    // --- Calcula los datos para las gráficas ---
    const typeCount = {};
    const sectionCount = {};
    results.forEach(r => {
      typeCount[r.type] = (typeCount[r.type] || 0) + 1;
      if (r.section) sectionCount[r.section] = (sectionCount[r.section] || 0) + 1;
    });
    const pieChartData = Object.entries(typeCount).map(([name, value]) => ({ name, value }));
    const sectionChartData = Object.entries(sectionCount).map(([section, count]) => ({ section, count }));

    // --- Chequeo: solo responde si hay resultados y datos de sección ---
    if (!results || results.length === 0 || !sectionChartData || sectionChartData.length === 0) {
      // Puedes devolver un status 202 (Accepted) para indicar que el análisis está en curso
      return res.status(202).json({
        status: 'processing',
        message: 'El análisis está en curso. Intenta nuevamente en unos segundos.'
      });
    }

    // --- Determina el idioma solicitado ---
    const lang = req.query.lang || docs[0]?.lang || 'es';

    // --- Retraduce los resultados usando las keys guardadas ---
    const translatedResults = results.map(r => ({
      ...r,
      title: r.titleKey ? t(r.titleKey, {}, lang) : r.title,
      message: r.messageKey ? t(
        r.messageKey,
        r.messageParams ? (typeof r.messageParams === 'string' ? JSON.parse(r.messageParams) : r.messageParams) : {},
        lang
      ) : r.message,
      suggestion: r.suggestionKey ? t(
        r.suggestionKey,
        r.suggestionParams ? (typeof r.suggestionParams === 'string' ? JSON.parse(r.suggestionParams) : r.suggestionParams) : {},
        lang
      ) : r.suggestion,
      section: r.sectionKey ? t('sections.' + r.sectionKey, {}, lang) : r.section,
      ...(r.messageParams && { messageParams: typeof r.messageParams === 'string' ? JSON.parse(r.messageParams) : r.messageParams })
    }));

    console.log('Translated results:', translatedResults);

    // --- Calcula el score general APA usando función utilitaria ---
    const score = calculateApaScore(translatedResults, lang);

    // --- Responde con todo lo necesario ---
    res.json({
      document: docs[0],
      results: translatedResults,
      pieChartData,
      sectionChartData,
      score,
      docInfo: {
        originalname: docs[0].originalname,
        mimetype: docs[0].mimetype,
        size: docs[0].size
      }
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, 'Error al obtener resultados.');
  }
}