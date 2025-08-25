import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import {
  Button, Typography, CircularProgress, Alert, Box, Paper, Stack, Divider,
  FormControl, InputLabel, Select, MenuItem, AlertTitle, Snackbar
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import { useLanguage } from '../../context/LanguageContext';
import useT from '../../i18n/useT';
import useApiError from '../../hooks/useApiError';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import { fetchAnalysisResults } from '../../services/api';

const COLORS = ['#ff7979', '#f6e58d', '#6ab04c', '#686de0', '#30336b'];

const typeMap = {
  error: { severity: 'error', icon: <ErrorIcon fontSize="inherit" /> },
  warning: { severity: 'warning', icon: <WarningIcon fontSize="inherit" /> },
  suggestion: { severity: 'info', icon: <LightbulbIcon fontSize="inherit" /> },
  info: { severity: 'info', icon: <InfoIcon fontSize="inherit" /> },
  success: { severity: 'success', icon: <CheckCircleIcon fontSize="inherit" /> }
};

export default function Results() {
  const currentYear = new Date().getFullYear();
  const { id } = useParams();
  const { language, changeLanguage } = useLanguage();
  const t = useT();
  const getApiErrorMessage = useApiError();
  const navigate = useNavigate();

  // --- getTranslatedMessage debe usar t del scope ---
  const getTranslatedMessage = (result) => {
    if (!result.messageKey) return result.message || '';
    const { messageKey, messageParams = {} } = result;
    const message = t(messageKey, messageParams);
    if (typeof message === 'function') {
      return message(messageParams) || '';
    }
    if (!message) return result.message || '';
    return message;
  };

  //const [document, setDocument] = useState(null);
  const [docInfo, setDocInfo] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pieChartData, setPieChartData] = useState([]);
  const [sectionChartData, setSectionChartData] = useState([]);
  const [score, setScore] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [pollCount, setPollCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [width, height] = useWindowSize();

  useEffect(() => {
    setError('');
    //console.log('[useEffect] Triggered for id:', id, 'lang:', lang);
    async function fetchResults() {
      setLoading(true);
      try {
        //console.log('Current UI language:', language);
        const data = await fetchAnalysisResults(id, language);
        // Detecta si la respuesta es realmente de datos completos y no de "processing"
        if (data && data.results && Array.isArray(data.results) && data.results.length > 0) {
          setProcessing(false);
          setPollCount(0);
          setDocInfo(data.docInfo);
          setResults(data.results);
          setPieChartData(Array.isArray(data.pieChartData) ? data.pieChartData : []);
          setSectionChartData(Array.isArray(data.sectionChartData) ? data.sectionChartData : []);
          setScore(data.score);
          //console.log("SCORE: ", data.score)
          setShowSuccess(true); // <-- Mostrar mensaje de éxito al terminar
        } else {
          setProcessing(true);
          setTimeout(() => setPollCount(c => c + 1), 1200);
        }
        // (Opcional: logs de depuración)
        //console.log('[fetchResults] API FULL DATA:', data);
      } catch (err) {
        // Si el backend responde con status 202 (processing)
        if (err && err.response && err.response.status === 202) {
          setProcessing(true);
          setTimeout(() => setPollCount(c => c + 1), 1200); // Poll cada 1.2s
        } else {
          setError(getApiErrorMessage(err));
        }
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
    // Incluye pollCount en dependencias para hacer polling
  }, [id, language, pollCount]);

  const handleLangChange = (e) => {
    changeLanguage(e.target.value);
  };

  // --- Exportación ---
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(results);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, t('results'));
    XLSX.writeFile(wb, `apa-results-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleExportPDF = () => {
    const input = document.getElementById('results-summary');
    if (!input) return;
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `apa-results-${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, backgroundColor: "#fff" },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(input).save();
  };

  function renderDynamicListMessage({ messageKey, messageParams }, t) {
  const listParams = [
    { key: 'missing', keys: ['messages.coverPage.incomplete', 'messages.headers.missing'] }
  ];

  for (const { key, keys } of listParams) {
    if (keys.includes(messageKey) && messageParams?.[key] && Array.isArray(messageParams[key]) && messageParams[key].length > 0) {
      const label = messageKey === 'messages.coverPage.incomplete'
        ? 'Faltan elementos en la portada:'
        : messageKey === 'messages.headers.missing'
          ? 'Faltan encabezados:'
          : 'Faltan elementos:';
      return (
        <>
          {label}
          {messageParams && messageParams.missing && (
          <ul style={{ margin: '8px 0 0 16px', padding: 0 }}>
            {messageParams.missing.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          )}
        </>
      );
    }
  }
  return null;
}

  

  // Si el análisis está en curso, muestra solo el mensaje de espera y no renderices nada más
  if (processing) {
    return (
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          {t('processingResults') || 'El análisis está en curso. Espera unos segundos...'}
        </Typography>
      </Box>
    );
  }
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>{t('loading')}</Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {getApiErrorMessage(error)}
      </Alert>
    );
  }

  return (
    <Box maxWidth="900px" mx="auto" my={4}>
      {/* Mensaje de éxito al finalizar análisis */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3500}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
          {t('analysisComplete') || '¡Análisis completado exitosamente!'}
        </Alert>
      </Snackbar>

      {/* Confeti animado */}
      {showSuccess && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500}
          recycle={false}
          gravity={0.25}
          wind={0.01}
          initialVelocityY={15}
          tweenDuration={5000}
          colors={[
            "#1976d2", // azul (Material UI primary)
            "#ffd600", // dorado
            "#43a047", // verde
            "#8e24aa", // violeta
            "#f44336", // rojo
            "#ff9800", // naranja
            "#fff"     // blanco
          ]}
        />
      )}

      {/* Botones de exportación y analizar nuevo */}
      <Box display="flex" gap={2} mb={2}>
        <Button variant="outlined" onClick={handleExportExcel}>{t('results.exportExcel')}</Button>
        <Button variant="outlined" onClick={handleExportPDF}>{t('results.exportPdf')}</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/analyze')}
        >
          {t('results.analyzeNewDoc')}
        </Button>
      </Box>

      {/* Bloque de resultados y gráficas para exportar */}
      <div id="results-summary">

        <div
          className="pdf-header"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 24,
            justifyContent: 'center',
            marginBottom: 24,
            width: '100%',
            textAlign: 'left'
          }}
        >
          <img
            src="/APADetector.png"
            alt={t('appTitle')}
            style={{ height: 80, marginBottom: 0, flexShrink: 0 }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 0.5 }}>
              {t('results.reportTitle')}
            </Typography>
            <Typography variant="subtitle2" sx={{ marginBottom: 0.5 }}>
              {new Date().toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
              <b>{t('results.file')}:</b> {docInfo?.originalname} <br />
              <b>{t('results.type')}:</b> {docInfo?.mimetype} <br />
              <b>{t('results.size')}:</b> {Math.round(docInfo?.size / 1024)} KB
            </Typography>
          </div>
        </div>

        {/* Calificación general APA */}
        {score && (
          <Paper elevation={3} sx={{ p: 2, mb: 3, mt: 2, background: '#f7fafd' }}>
            <Typography variant="h6" color="primary" gutterBottom>
              {t('results.generalScore')}
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="h3" color="primary.main">
                {typeof score.value === 'number' ? score.value : '--'}
              </Typography>
              <Box>
                <Typography variant="h5" color="text.primary" sx={{ fontWeight: 600 }}>
                  {score.qualitative ? t(`scores.${score.qualitative.toLowerCase()}`) : '--'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('results.generalScoreDescription')}
                </Typography>
              </Box>
            </Box>
          </Paper>
        )}

        {/* Gráficas */}
        <Box display="flex"
          flexWrap="wrap"
          gap={2}
          my={2}
          alignItems="flex-start"
          justifyContent="center"
          sx={{
            rowGap: 8,
            columnGap: 8,
            px: { xs: 0, md: 4 },
            py: { xs: 2, md: 4 },
          }}>
          {/* Pie Chart */}
          <Box>
            <Typography variant="subtitle1" align="center">{t('results.typeDistribution')}</Typography>
            <div
              role="img"
              aria-label={t('results.typeDistributionAlt')}
              tabIndex={0}
              style={{ outline: 'none' }}
            >
              <PieChart width={350} height={250}>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {Array.isArray(pieChartData) && pieChartData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
              <Typography
                variant="body2"
                component="p"
                sx={{ position: 'absolute', left: '-9999px' }}
              >
                {pieChartData.map(d => `${t(d.name) || d.name}: ${d.value}`).join(', ')}
              </Typography>
            </div>
          </Box>

          {/* Bar Chart por sección */}
          {Array.isArray(sectionChartData) && sectionChartData.length === 0 && (
            <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
              {t('noSectionChartData') || 'No se encontraron datos por sección.'}
            </Typography>
          )}
          {Array.isArray(sectionChartData) && sectionChartData.length > 0 && (
            <Box>
              <Typography variant="subtitle1" align="center">{t('resultsBySection') || 'Resultados por sección'}</Typography>
              <div
                role="img"
                aria-label={t('sectionResultsAlt')}
                tabIndex={0}
                style={{ outline: 'none' }}
              >
                <BarChart width={350} height={250} data={sectionChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="section" angle={-12} textAnchor="end" interval={0} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#686de0" />
                </BarChart>
                {/* Descripción solo para lectores de pantalla */}
                <Typography
                  variant="body2"
                  component="p"
                  sx={{ position: 'absolute', left: '-9999px' }}
                >
                  {sectionChartData.map(d => `${t(d.section) || d.section}: ${d.count}`).join(', ')}
                </Typography>
              </div>
            </Box>
          )}
        </Box>

        {/* Resultados del análisis */}
        <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6" mb={1}>{t('resultsTitle')}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            {Array.isArray(results) && results.map((r, idx) => {
              // Get the severity type (error, warning, info, success)
              const severity = r.type || 'info';
              // Get the title, either from the result or use the severity type as fallback
              const title = r.title || t(`messageTypes.${severity}`, {
                defaultValue: severity.charAt(0).toUpperCase() + severity.slice(1)
              });

              // Get the message, either from the result or a default message
              const message = getTranslatedMessage(r);

              // Get the section, either from the result or use 'general' as fallback
              const section = r.section || 'general';

              const dynamicList = renderDynamicListMessage(r, t);

              return (
                <Alert
                  key={idx}
                  severity={severity}
                  sx={{ mb: 2, alignItems: 'flex-start' }}
                >
                  <AlertTitle>
                    <b>{title}</b>
                  </AlertTitle>
                  

                  {r.messageKey === 'conteoCitas' && r.count !== undefined ? (
                    r.count === 0 ? 'No se encontraron citas en el documento.' :
                      r.count === 1 ? 'Se encontró 1 cita en el documento.' :
                        `Se encontraron ${r.count} citas en el documento.`
                  ) : dynamicList ? (
                    dynamicList
                  ) : typeof message === 'object' ? (
                    JSON.stringify(message)
                  ) : (
                    message
                  )}

                  {/* Show suggestion if available */}
                  {r.suggestion && (
                    <Box mt={1} display="flex" alignItems="center">
                      <LightbulbIcon color="info" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="info.main" fontStyle="italic">
                        {t('suggestion')}: {r.suggestion}
                      </Typography>
                    </Box>
                  )}

                  {/* Show section information */}
                  <Box mt={1}>
                    <Typography variant="caption" color="text.secondary">
                      {t('section')}: {t(`sections.${String(r.sectionKey || r.section || '').toLowerCase()}`) || r.section || r.sectionKey}
                    </Typography>
                  </Box>
                </Alert>
              );
            })}
          </Stack>
        </Paper>

        <div className="pdf-footer" style={{ textAlign: 'center', marginTop: 32, fontSize: 12, color: '#888' }}>
          {t('generatedBy')} {t('appTitle')}
        </div>

      </div>
    </Box>
  );
}