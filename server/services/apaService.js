import fs from 'fs';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import textract from 'textract';

// Configuración internacionalizada (i18n)
const i18nConfig = {
  es: {
    // General terms
    general: {
      error: 'Error',
      warning: 'Advertencia',
      suggestion: 'Sugerencia',
      info: 'Información',
      success: 'Éxito',
      minor: 'Revisión menor',
      required: 'Requerido',
      optional: 'Opcional'
    },

    // Keywords for section detection
    resumenKeywords: ['resumen', 'abstract', 'resumen ejecutivo'],
    referenciasKeywords: ['referencias', 'references', 'bibliografía', 'bibliography', 'bibliographic references'],
    headers: [
      ['introducción', 'introduccion', 'introduction'],
      ['metodología', 'metodologia', 'methodology', 'métodos', 'metodos', 'methods'],
      ['resultados', 'results', 'hallazgos', 'findings'],
      ['discusión', 'discusion', 'discussion', 'análisis', 'analisis', 'analysis'],
      ['conclusiones', 'conclusions', 'conclusión', 'conclusion'],
      ['referencias', 'references', 'bibliografía', 'bibliography']
    ],

    // Document sections
    sections: {
      general: 'General',
      portada: 'Portada',
      resumen: 'Resumen',
      referencias: 'Referencias',
      citas: 'Citas',
      encabezados: 'Encabezados',
      abstract: 'Resumen',
      bibliografia: 'Bibliografía',
      conclusiones: 'Conclusiones',
      metodologia: 'Metodología',
      resultados: 'Resultados',
      discusion: 'Discusión',
      introduccion: 'Introducción',
      anexos: 'Anexos',
      apendices: 'Apéndices',
      agradecimientos: 'Agradecimientos'
    },

    // Messages
    messages: {
      documentSize: {
        tooManyLines: (lines, max) => `El documento tiene demasiadas líneas (${lines}). El límite es ${max} líneas.`,
        tooManyWords: (words, max) => `El documento tiene demasiadas palabras (${words}). El límite es ${max} palabras.`,
        notEnoughPages: (pages) => `El documento tiene muy pocas páginas (${pages}). Se recomiendan al menos 2 páginas.`,
        tooShort: (words, min) => `El documento es muy corto (${words} palabras). Se recomiendan al menos ${min} palabras.`,
        reduceSize: 'Por favor, reduce el tamaño del documento dividiéndolo en archivos más pequeños.',
        reduceContent: 'Por favor, reduce el tamaño del documento eliminando contenido innecesario.',
        increasePages: 'Considera ampliar el contenido de tu documento para cumplir con los requisitos mínimos.',
        increaseWords: 'Amplía el contenido de tu documento para cumplir con los requisitos mínimos.'
      },

      coverPage: {
        incomplete: 'Faltan elementos en la portada:',
        suggestion: 'Asegúrate de incluir todos los elementos de la portada según el formato APA.'
      },

      abstract: {
        notFound: 'No se encontró una sección de resumen o abstract en el documento.',
        suggestion: 'Incluye un resumen o abstract al inicio de tu documento siguiendo el formato APA.'
      },

      references: {
        notFound: 'No se encontraron referencias en formato APA en el documento.',
        suggestion: 'Asegúrate de incluir una sección de referencias al final del documento siguiendo el formato APA.',
        formatSuggestion: 'Revisa el formato de las referencias para que sigan el estándar APA.',
        usingBibliography: 'Se encontró una sección de Bibliografía en lugar de Referencias.',
        useReferences: 'En formato APA se recomienda usar "Referencias" en lugar de "Bibliografía".',
        valid: (count) => `Se encontraron ${count} referencias en formato APA.`,
        invalidFormat: (count) => `Se encontraron ${count} referencias que no siguen el formato APA estándar.`
      },

      headers: {
        missing: 'Faltan los siguientes encabezados:',
        suggestion: 'Asegúrate de incluir todos los encabezados requeridos en tu documento.',
        wrongOrder: 'El orden de los encabezados no sigue el formato estándar.',
        orderSuggestion: 'Revisa el orden de las secciones según las normas APA.',
        correctOrder: 'El orden de los encabezados sigue el formato estándar.'
      },

      citations: {
        notEnough: 'No se detectaron suficientes citas en el texto.',
        suggestion: 'Incluye citas en el texto siguiendo el formato APA.',
        count: {
          none: 'No se encontraron citas en el texto.',
          one: 'Se encontró una cita en el texto.',
          many: (count) => `Se encontraron ${count} citas en el texto.`
        }
      },

      feedback: {
        minorReview: 'El documento solo requiere revisión menor.',
        generalSuggestion: 'Revisa los detalles informativos para mejorar aún más tu documento.',
        validationSuccess: 'El documento cumple con las validaciones APA básicas.'
      }
    }
  },

  en: {
    general: {
      error: 'Error',
      warning: 'Warning',
      suggestion: 'Suggestion',
      info: 'Information',
      success: 'Success',
      minor: 'Minor Review',
      required: 'Required',
      optional: 'Optional'
    },

    resumenKeywords: ['abstract', 'summary', 'executive summary'],
    referenciasKeywords: ['references', 'bibliography', 'bibliographic references', 'citations'],
    headers: [
      ['introduction', 'introducción', 'introduccion'],
      ['methodology', 'methods', 'métodos', 'metodos', 'metodología', 'metodologia'],
      ['results', 'findings', 'resultados', 'hallazgos'],
      ['discussion', 'analysis', 'discusión', 'discusion', 'análisis', 'analisis'],
      ['conclusions', 'conclusion', 'conclusiones', 'conclusión'],
      ['references', 'bibliography', 'referencias', 'bibliografía']
    ],

    sections: {
      general: 'General',
      portada: 'Cover Page',
      resumen: 'Abstract',
      referencias: 'References',
      citas: 'Citations',
      encabezados: 'Headers',
      abstract: 'Abstract',
      bibliografia: 'Bibliography',
      conclusiones: 'Conclusions',
      metodologia: 'Methodology',
      resultados: 'Results',
      discusion: 'Discussion',
      introduccion: 'Introduction',
      anexos: 'Annexes',
      apendices: 'Appendices',
      agradecimientos: 'Acknowledgments'
    },

    messages: {
      documentSize: {
        tooManyLines: (lines, max) => `The document has too many lines (${lines}). The limit is ${max} lines.`,
        tooManyWords: (words, max) => `The document has too many words (${words}). The limit is ${max} words.`,
        notEnoughPages: (pages) => `The document has too few pages (${pages}). At least 2 pages are recommended.`,
        tooShort: (words, min) => `The document is too short (${words} words). At least ${min} words are recommended.`,
        reduceSize: 'Please reduce the document size by splitting it into smaller files.',
        reduceContent: 'Please reduce the document size by removing unnecessary content.',
        increasePages: 'Consider expanding your document content to meet the minimum requirements.',
        increaseWords: 'Expand your document content to meet the minimum requirements.'
      },

      coverPage: {
        incomplete: 'Missing elements in the cover page:',
        suggestion: 'Make sure to include all cover page elements according to APA format.'
      },

      abstract: {
        notFound: 'No abstract section was found in the document.',
        suggestion: 'Include an abstract at the beginning of your document following APA format.'
      },

      references: {
        notFound: 'No APA-formatted references were found in the document.',
        suggestion: 'Make sure to include a references section at the end of your document following APA format.',
        formatSuggestion: 'Review the format of the references to ensure they follow APA standards.',
        usingBibliography: 'A Bibliography section was found instead of References.',
        useReferences: 'In APA format, it is recommended to use "References" instead of "Bibliography".',
        valid: (count) => `${count} APA-formatted references were found.`,
        invalidFormat: (count) => `${count} references were found that do not follow the standard APA format.`
      },

      headers: {
        missing: 'The following headers are missing:',
        suggestion: 'Make sure to include all required headers in your document.',
        wrongOrder: 'The order of the headers does not follow the standard format.',
        orderSuggestion: 'Review the order of sections according to APA guidelines.',
        correctOrder: 'The order of the headers follows the standard format.'
      },

      citations: {
        notEnough: 'Not enough citations were detected in the text.',
        suggestion: 'Include citations in the text following APA format.',
        count: {
          none: 'No citations were found in the text.',
          one: 'One citation was found in the text.',
          many: (count) => `A total of ${count} citations were found in the text.`
        }
      },

      feedback: {
        minorReview: 'The document only requires minor review.',
        generalSuggestion: 'Review the informational details to further improve your document.',
        validationSuccess: 'The document passes basic APA validations.'
      }
    }
  }
};

// Helper function to get translated messages with deep lookup
export function t(key, params = {}, lang = 'es') {
  // Soporta claves anidadas con notación de punto
  const getNested = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };
  let str = getNested(i18nConfig[lang], key) || key;
  if (params && typeof str === 'string') {
    Object.entries(params).forEach(([k, v]) => {
      const value = Array.isArray(v) ? v.join(', ') : (v ?? '');
      str = str.replace(new RegExp(`{${k}}`, 'g'), value);
    });
  }
  return str;
}

// Normalización del texto
function normalize(str) {
  return str
    .toLowerCase()                        // Convierte todo a minúsculas
    .normalize("NFD")                     // Quita tildes y diacríticos
    .replace(/[\u0300-\u036f]/g, "")      // Elimina los restos de diacríticos
    .replace(/[“”‘’«»]/g, "")             // Elimina comillas especiales
    .replace(/[^\\w\\s:]/g, "")           // Quita caracteres especiales, pero conserva los dos puntos
    .replace(/\\s+/g, " ")                // Reemplaza múltiples espacios por uno
    .trim();                              // Elimina espacios al inicio y final
}

function buildLooseHeaderRegex(word) {
  // Convierte "REFERENCIAS" en "R\s*E\s*F\s*E\s*R\s*E\s*N\s*C\s*I\s*A\s*S"
  return new RegExp(
    word
      .split('')
      .map(char => `[${char}${char.toLowerCase()}]\\s*`)
      .join(''),
    'm'
  );
}

//Encontrar el último match de un regex
function lastRegexMatchIndex(regex, text) {
  let match;
  let lastIndex = -1;
  let lastMatch;
  while ((match = regex.exec(text)) !== null) {
    lastIndex = match.index;
    lastMatch = match;
    // Evita bucle infinito con regex global sin avance
    if (regex.lastIndex === match.index) regex.lastIndex++;
  }
  return lastIndex;
}

function findLastHeaderIndex(header, text) {
  // Normaliza ambos para evitar problemas de mayúsculas/minúsculas y espacios
  const normText = text.toLowerCase().replace(/[\s\r\n]+/g, '');
  const normHeader = header.toLowerCase().replace(/[\s\r\n]+/g, '');
  return normText.lastIndexOf(normHeader);
}

// Regex mejorado para referencias APA (acepta múltiples autores, iniciales, año, título, etc.)
const apaRefRegex = /^([A-Z][a-zA-Záéíóúüñ]+, (?:[A-Z]\.\s?)+(?:, [A-Z][a-zA-Záéíóúüñ]+, (?:[A-Z]\.\s?)+)*(?:,? (?:&|y) [A-Z][a-zA-Záéíóúüñ]+, (?:[A-Z]\.\s?)+)?) \(\d{4}\)\. .+?\./m;

export async function analyzeFile(filePath, mimetype, lang = 'es') {
  const supportedLangs = ['es', 'en'];
  if (!supportedLangs.includes(lang)) lang = 'es';
  const config = i18nConfig[lang];
  let text = '';
  let results = [];
  let numPages = null;

  try {
    if (!fs.existsSync(filePath)) {
      console.error('File does not exist:', filePath);
      throw new Error(t('general.error', {}, lang));
    }

    const stat = fs.statSync(filePath);
    //console.log('Antes del if PDF, mimetype:', mimetype, 'filePath:', filePath);

    if (mimetype === 'application/pdf') {
      // Extracción de PDF
      //console.log('Entrando a rama PDF');
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      text = pdfData.text;
      numPages = pdfData.numpages || (pdfData && pdfData.pdfInfo && pdfData.pdfInfo.numpages);
      //console.log('Texto extraído PDF (sin normalizar):', text ? text.slice(0, 2000) : '[VACÍO]');
      //console.log('Longitud texto extraído PDF:', text ? text.length : 0);

      // --- Log de todos los encabezados detectados en el texto completo ---
      const headerRegex = /^.{0,40}(referencias|bibliografia|bibliografía|anexos?|ap[eé]ndice|índice|appendix|attachments?|tables?|figuras?|gráficos?).{0,40}$/gim;
      const allHeaders = [...text.matchAll(headerRegex)].map(m => m[0]);
      //console.log('Encabezados detectados en el texto:', allHeaders);

    } else if (
      mimetype &&
      mimetype.toLowerCase().includes('openxmlformats-officedocument.wordprocessingml.document') ||
      (filePath && filePath.toLowerCase().endsWith('.docx'))
    ) {
      // Extracción de DOCX con manejo robusto de errores y fallback a textract
      try {
        await new Promise(resolve => setTimeout(resolve, 200));
        const buffer = fs.readFileSync(filePath);
        const { value } = await mammoth.extractRawText({ buffer });
        text = value;
        if (!text || text.trim().length === 0) throw new Error(t('general.error', {}, lang));
        //console.log('Texto extraído por Mammoth (primeros 2000):', text.slice(0, 2000));
        //console.log('Texto extraído por Mammoth (últimos 2000):', text.slice(-2000));
      } catch (err) {
        console.error('Mammoth extraction failed:', err);
        // Fallback a textract
        try {
          text = await new Promise((resolve, reject) => {
            textract.fromFileWithPath(filePath, (error, extractedText) => {
              if (error) {
                console.error('Textract extraction failed:', error);
                return resolve('');
              }
              resolve(extractedText);
            });
          });
          if (!text || text.trim().length === 0) throw new Error(t('general.error', {}, lang));
          //console.log('Texto extraído por textract (primeros 2000):', text.slice(0, 2000));
          //console.log('Texto extraído por textract (últimos 2000):', text.slice(-2000));
        } catch (err2) {
          console.error('Error extrayendo DOCX con textract:', err2);
          throw new Error(t('general.error', {}, lang));
        }
      }
    } else if (mimetype === 'application/vnd.oasis.opendocument.text') {
      // Extracción de ODT
      try {
        text = await new Promise((resolve, reject) => {
          textract.fromFileWithPath(filePath, (error, text) => {
            if (error) reject(error);
            else resolve(text);
          });
        });
      } catch (err) {
        console.error('Error extrayendo ODT:', err);
        throw new Error(t('general.error', {}, lang));
      }
    } else {
      // Por defecto: trata como texto plano
      try {
        text = fs.readFileSync(filePath, 'utf8');
      } catch (err) {
        console.error('Error leyendo archivo como texto plano:', err);
        throw new Error(t('general.error', {}, lang));
      }
    }
  } catch (err) {
    console.error('ERROR EN ANALISIS:', err);
    throw new Error(t('general.error', {}, lang));
  }

  // Normalizar el texto (¡ahora sí, después de toda la extracción y fallback!)
  const normalizedText = normalize(text);  // Log temporal para depuración
  //console.log('Texto usado para análisis (primeros 100000):', text.slice(0, 100000));
  //console.log('NormalizedText (primeros 100000):', normalizedText.slice(0, 100000));

  // --- Límite de performance ---
  const MAX_LINES = 20000;
  const MAX_WORDS = 200000;
  const linesArray = text.split('\n');
  if (linesArray.length > MAX_LINES) {
    results.push({
      type: 'error',
      titleKey: 'general.error',
      messageKey: 'messages.documentSize.tooManyLines',
      title: t('general.error', {}, lang),
      message: t('messages.documentSize.tooManyLines', { lines: linesArray.length, max: MAX_LINES }, lang),
      suggestion: t('messages.documentSize.reduceSize', {}, lang),
      section: t('sections.general', {}, lang),
      suggestionKey: 'messages.documentSize.reduceSize',
      sectionKey: 'general'
    });
    return { results, pieChartData: [], sectionChartData: [] };
  }
  const totalWords = text.split(/\s+/).filter(Boolean).length;
  if (totalWords > MAX_WORDS) {
    results.push({
      type: 'error',
      titleKey: 'general.error',
      messageKey: 'messages.documentSize.tooManyWords',
      title: t('general.error', {}, lang),
      message: t('messages.documentSize.tooManyWords', { words: totalWords, max: MAX_WORDS }, lang),
      suggestion: t('messages.documentSize.reduceContent', {}, lang),
      section: t('sections.general', {}, lang),
      suggestionKey: 'messages.documentSize.reduceContent',
      sectionKey: 'general'
    });
    return { results, pieChartData: [], sectionChartData: [] };
  }

  // --- Validación de longitud mínima por páginas (solo PDF) ---
  if (numPages !== null && numPages < 2) {
    results.push({
      type: 'warning',
      titleKey: 'general.warning',
      messageKey: 'messages.documentSize.notEnoughPages',
      title: t('general.warning', {}, lang),
      message: t('messages.documentSize.notEnoughPages', { pages: numPages }, lang),
      suggestion: t('messages.documentSize.increasePages', {}, lang),
      section: t('sections.general', {}, lang),
      suggestionKey: 'messages.documentSize.increasePages',
      sectionKey: 'general'
    });
  }

  // --- Validación de longitud mínima por palabras (universal) ---
  const minWords = 500;
  const wordCount = totalWords;
  if (wordCount < minWords) {
    results.push({
      type: 'warning',
      titleKey: 'general.warning',
      messageKey: 'messages.documentSize.tooShort',
      title: t('general.warning', {}, lang),
      message: t('messages.documentSize.tooShort', { words: wordCount, min: minWords }, lang),
      suggestion: t('messages.documentSize.increaseWords', {}, lang),
      section: t('sections.general', {}, lang),
      suggestionKey: 'messages.documentSize.increaseWords',
      sectionKey: 'general'
    });
  }

  // Selecciona el texto para heurística de portada:
  // - Para PDF: solo la primera página (portadaText)
  // - Para DOCX/ODT: hasta la primera sección fuerte o hasta 80 líneas
  // - Para otros: todo el texto
  let portadaHeuristicaText;

  // --- Mejora: primero PDF, luego DOCX/ODT, luego general ---
  if (mimetype === 'application/pdf' && typeof portadaText === 'string') {
    let primeraPagina = portadaText.split(/\f|\r?\n\s*\d+\s*\r?\n/)[0];
    // Si no hay salto de página, limitar por líneas
    const primerasLineas = primeraPagina.split('\n').slice(0, 40).join('\n');
    portadaHeuristicaText = primerasLineas;
  } else if (
    mimetype &&
    (
      mimetype.toLowerCase().includes('openxmlformats-officedocument.wordprocessingml.document') ||
      mimetype === 'application/vnd.oasis.opendocument.text' ||
      (filePath && (
        filePath.toLowerCase().endsWith('.docx') ||
        filePath.toLowerCase().endsWith('.odt')
      ))
    )
  ) {
    // DOCX/ODT: hasta la primera sección fuerte o máximo 80 líneas
    const portadaMaxLines = 80;
    const strongHeaders = [
      'INTRODUCCIÓN', 'RESUMEN', 'ABSTRACT', 'CONTENIDO', 'ÍNDICE',
      'TABLA DE CONTENIDO', 'OBJETIVOS', 'PLANTEAMIENTO', 'JUSTIFICACIÓN'
    ];
    const docLines = (text || '').split('\n');
    let portadaEnd = Math.min(docLines.length, portadaMaxLines);
    for (let i = 0; i < Math.min(docLines.length, portadaMaxLines); i++) {
      if (strongHeaders.some(h => docLines[i].toUpperCase().includes(h))) {
        portadaEnd = i;
        break;
      }
    }
    portadaHeuristicaText = docLines.slice(0, portadaEnd).join('\n');
  } else {
    portadaHeuristicaText = text;
  }

  // Normalizar el texto (¡ahora sí, después de toda la extracción y fallback!)
  const normText = text ? text.normalize('NFC') : '';
  // --- Detección robusta de portada con logs y variantes ---
  const portadaLines = portadaHeuristicaText
    .normalize('NFC')
    .split('\n')
    .map(l => l.trim())
    .filter(l =>
      l.length > 0 &&
      !/^(Figura|Tabla|Índice|Pág\.?|Capítulo|Sección|Resumen|Abstract)/i.test(l)
    );
  let detected = {
    universidad: null,
    facultad: null,
    titulo: null,
    autores: [],
    fecha: null
  };


  // Genera ventanas de 2 y 3 líneas consecutivas para detectar frases partidas
  function ventanasDeLineas(lines, size) {
    const res = [];
    for (let i = 0; i <= lines.length - size; i++) {
      // Une solo líneas no vacías
      const chunk = lines.slice(i, i + size).filter(Boolean).join(' ');
      if (chunk.trim().length > 0) res.push(chunk);
    }
    return res;
  }
  // Genera ventanas de 2 a 5 líneas
  let portadaVentanas = [...portadaLines];
  for (let n = 2; n <= 5; n++) {
    portadaVentanas.push(...ventanasDeLineas(portadaLines, n));
  }
  // Agrega toda la portada unida como último recurso
  portadaVentanas.push(portadaLines.join(' '));

  // Universidad: toma la última coincidencia relevante en portadaVentanas
  const universidadRegex = /(UNIVERSIDAD|INSTITUCION|INSTITUCIÓN|UNIVERSITARIA|UNIVERSITARIO)/i;
  // Solo buscar en las primeras 25 líneas de portadaLines
  const universidadCandidates = portadaLines.slice(0, 25).filter(l => universidadRegex.test(l));
  detected.universidad = universidadCandidates.length > 0 ? universidadCandidates[universidadCandidates.length - 1] : null;
  //console.log('Universidad detectada:', detected.universidad);

  // Facultad (o variantes)
  detected.facultad = portadaLines.find(l => /(facultad|departamento|escuela|instituto)/i.test(l));
  //console.log('Facultad/variante detectada:', detected.facultad);

  // Título: línea larga en mayúsculas, no sea universidad/facultad
  detected.titulo = portadaLines.find(l =>
    l.length > 18 &&
    l === l.toUpperCase() &&
    !/universidad|facultad|departamento|escuela|instituto/i.test(l)
  );
  //console.log('Título detectado:', detected.titulo);

  // Autores: SOLO en las primeras 20 líneas, líneas cortas (2-5 palabras), sin instituciones
  const forbiddenAuthorWords = [
    'UNIVERSIDAD', 'INSTITUCION', 'INSTITUCIÓN', 'FACULTAD', 'COLEGIO', 'ESCUELA', 'INSTITUTO'
  ];
  let palabrasNoNombre = [
    'ADMINISTRACIÓN', 'GENERAL', 'DESCRIPCIÓN', 'ANÁLISIS', 'EMPRESA', 'FUNDAMENTOS',
    'APLICADO', 'A', 'LA', 'DE', 'EL', 'Y', 'EN', 'DEL'
  ];
  if (detected.universidad) palabrasNoNombre.push(...detected.universidad.split(/\s+/));
  if (detected.facultad) palabrasNoNombre.push(...detected.facultad.split(/\s+/));
  if (detected.titulo) palabrasNoNombre.push(...detected.titulo.split(/\s+/));
  if (detected.fecha) palabrasNoNombre.push(...detected.fecha.split(/\s+/));
  palabrasNoNombre = palabrasNoNombre.map(w => w.toUpperCase());

  const portadaPrimerasLineas = portadaLines.slice(0, 20);
  detected.autores = portadaPrimerasLineas.filter(l => {
    const lineaMayus = l.toUpperCase();
    const words = l.split(/\s+/);
    return (
      words.length >= 2 && words.length <= 5 &&
      forbiddenAuthorWords.every(w => !lineaMayus.includes(w)) &&
      words.every(w =>
        (w.length >= 3) &&
        (
          /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+$/.test(w) ||
          /^[A-ZÁÉÍÓÚÜÑ]+$/.test(w)
        ) &&
        !palabrasNoNombre.includes(w.toUpperCase())
      ) &&
      !/[.:",]/.test(l) &&
      l !== detected.universidad
    );
  });
  // Filtra autores únicos
  detected.autores = Array.from(new Set(detected.autores));
  //console.log('Autores detectados:', detected.autores);

  function limpiarLinea(l) {
    return l.replace(/\s+/g, ' ').trim().toUpperCase();
  }

  // Fecha: busca año o fecha larga, tolerando frases partidas
  detected.fecha = portadaVentanas.find(l => {
    const norm = limpiarLinea(l);
    return /\b(20\d{2}|19\d{2})\b/.test(norm) ||
      /\b\d{1,2} DE [A-ZÁÉÍÓÚÜÑ]+ DE \d{4}\b/.test(norm);
  });
  //console.log('Fecha detectada:', detected.fecha);

  // Puedes usar detected.universidad, detected.facultad, etc. para validar y armar los warnings.

  // 1. Portada (cover page)
  // --- Detección estricta de portada por grupo ---
  const portadaGroups = config.portadaGroups;
  const portadaFaltantes = [];

  // Validación precisa de elementos de portada
  if (!detected.universidad) portadaFaltantes.push('universidad');
  if (!detected.facultad) portadaFaltantes.push('facultad');
  if (!detected.titulo) portadaFaltantes.push('título');
  if (!detected.autores || detected.autores.length === 0) portadaFaltantes.push('autor');
  if (!detected.fecha) portadaFaltantes.push('fecha');

  if (portadaFaltantes.length > 0) {
    // Get the missing elements as a comma-separated string
    const missingElements = portadaFaltantes.join(', ');

    // Create the message using the translation function
    const message = t('messages.coverPage.incomplete', { missing: missingElements }, lang);
    const missingList = Array.isArray(missingElements) ? missingElements : (missingElements ? [missingElements] : []);

    results.push({
      type: 'warning',
      titleKey: 'general.warning',
      messageKey: 'messages.coverPage.incomplete',
      messageParams: { missing: portadaFaltantes },
      title: t('general.warning', {}, lang),
      suggestion: t('messages.coverPage.suggestion', {}, lang),
      section: t('sections.portada', {}, lang),
      suggestionKey: 'messages.coverPage.suggestion',
      sectionKey: 'portada',
      // Incluye los elementos faltantes crudos para posible uso en frontend
      missingElements: missingElements
    });
  }

  // 2. Resumen/Abstract
  const resumenRegex = new RegExp(config.resumenKeywords.join('|'), 'i');
  if (!resumenRegex.test(text)) {
    results.push({
      type: 'warning',
      titleKey: 'general.warning',
      messageKey: 'messages.abstract.notFound',
      title: t('general.warning', {}, lang),
      suggestion: t('messages.abstract.suggestion', {}, lang),
      section: t('sections.resumen', {}, lang),
      suggestionKey: 'messages.abstract.suggestion',
      sectionKey: 'resumen'
    });
  }

  // --- 3. Referencias/References (multilenguaje robusto) ---
  // --- Detección robusta de encabezados de referencias y bibliografía ---
  // Si es PDF, usar regex tolerante a espacios y saltos de línea
  let hasMainRef = false;
  let hasAltRef = false;
  let referenciasLoose, bibliografiaLoose, bibliografíaLoose;
  let textForHeader = text;
  if (mimetype === 'application/pdf') {
    // Normaliza solo para buscar encabezados (quita espacios y saltos de línea extras)
    textForHeader = text.replace(/[\r\n]+/g, ' ');
    referenciasLoose = buildLooseHeaderRegex('REFERENCIAS');
    bibliografiaLoose = buildLooseHeaderRegex('BIBLIOGRAFIA');
    bibliografíaLoose = buildLooseHeaderRegex('BIBLIOGRAFÍA');
    const lastChunk = text.slice(-20000);
    // Buscar en última parte y en todo el texto colapsado
    if (
      referenciasLoose.test(lastChunk) ||
      referenciasLoose.test(textForHeader)
    ) {
      hasMainRef = true;
    }
    if (
      bibliografiaLoose.test(lastChunk) ||
      bibliografiaLoose.test(textForHeader) ||
      bibliografíaLoose.test(lastChunk) ||
      bibliografíaLoose.test(textForHeader)
    ) {
      hasAltRef = true;
    }
  } else {
    // DOCX y otros: detección tradicional
    const referenciasHeader = /^(\s)*(referencias)(\s|:|$)/im;
    const bibliografiaHeader = /^(\s)*(bibliografia|bibliografía)(\s|:|$)/im;
    if (referenciasHeader.test(text)) {
      hasMainRef = true;
    }
    if (bibliografiaHeader.test(text)) {
      hasAltRef = true;
    }
  }

  // --- Análisis de la sección de referencias (solo si hay referencias o bibliografía) ---
  let refSection = '';
  if (hasMainRef) {
    if (mimetype === 'application/pdf') {
      const idx = findLastHeaderIndex('referencias', text);
      refSection = idx !== -1 ? text.slice(idx) : '';
    } else {
      // DOCX: puedes mantener el split tradicional
      const parts = text.split(/referencias/i);
      refSection = parts.length > 1 ? parts[parts.length - 1] : '';
    }
  } else if (hasAltRef) {
    if (mimetype === 'application/pdf') {
      // Prueba ambos encabezados
      const idx1 = findLastHeaderIndex('bibliografia', text);
      const idx2 = findLastHeaderIndex('bibliografía', text);
      const idx = Math.max(idx1, idx2);
      refSection = idx !== -1 ? text.slice(idx) : '';
    } else {
      const parts = text.split(/bibliografia|bibliografía/i);
      refSection = parts.length > 1 ? parts[parts.length - 1] : '';
    }
    // ADVERTENCIA: Se encontró "Bibliografía" pero no "Referencias"
    results.push({
      type: 'warning',
      titleKey: 'general.warning',
      messageKey: 'messages.references.usingBibliography',
      title: t('general.warning', {}, lang),
      suggestion: t('messages.references.useReferences', {}, lang),
      section: t('sections.referencias', {}, lang),
      suggestionKey: 'messages.references.useReferences',
      sectionKey: 'referencias'
    });
  }

  // --- Limitar la sección de referencias hasta el próximo encabezado fuerte ---
  if (refSection && mimetype === 'application/pdf') {
    const strongHeaders = [
      'anexos?', 'ap[eé]ndice', 'índice', 'appendix', 'attachments?', 'tables?', 'figuras?', 'gráficos?'
    ];
    const nextHeaderRegex = new RegExp(`^\\s*(${strongHeaders.join('|')})\\b`, 'im');
    const match = nextHeaderRegex.exec(refSection);
    if (match && match.index > 0) {
      refSection = refSection.slice(0, match.index);
      //console.log('Sección de referencias recortada hasta el siguiente encabezado fuerte:', match[0]);
    }
  }

  if (refSection) {
    // DEPURACIÓN: muestra el bloque de referencias extraído
    //console.log('Primeros 1000 caracteres de refSection extraída:', refSection.slice(0, 1000));

    const lines = refSection.split('\n').map(l => l.trim()).filter(l => l);
    // DEPURACIÓN: muestra las primeras 10 líneas después del encabezado
    //console.log('Primeras 10 líneas en sección de referencias extraída:', lines.slice(0, 10));
    // Filtrar solo referencias válidas (estricto APA)
    const filteredRefLines = lines.filter(line =>
      line.length > 0 &&
      !config.referenciasKeywords.some(keyword => line.toLowerCase().includes(keyword)) &&
      /^[A-ZÁÉÍÓÚÜÑ][^:]+?\(\d{4}\)/.test(line)
    );
    const numReferences = filteredRefLines.length;

    // Filtrar referencias tolerantes (año entre paréntesis y punto final)
    const tolerantRefLines = lines.filter(line =>
      line.length > 0 &&
      /\(\d{4}\)/.test(line) &&
      /\./.test(line)
    );
    // Solo mostrar advertencia si hay líneas que parecen referencias pero no cumplen APA
    if (numReferences === 0 && tolerantRefLines.length > 0) {
      results.push({
        type: 'warning',
        titleKey: 'general.warning',
        messageKey: 'messages.references.notFound',
        title: t('general.warning', {}, lang),
        suggestion: t('messages.references.suggestion', {}, lang),
        section: t('sections.referencias', {}, lang),
        suggestionKey: 'messages.references.suggestion',
        sectionKey: 'referencias'
      });
    }
    // DEPURACIÓN: muestra las primeras 5 referencias tolerantes detectadas
    //console.log('Primeras 5 referencias detectadas (tolerante):', tolerantRefLines.slice(0, 5));

    // Contar referencias mal formateadas
    let badRefs = 0;
    filteredRefLines.forEach(line => {
      if (!apaRefRegex.test(line)) {
        badRefs++;
      }
    });

    if (filteredRefLines.length > 0 && badRefs > 0) {
      results.push({
        type: 'suggestion',
        titleKey: 'general.suggestion',
        messageKey: 'messages.references.invalidFormat',
        title: t('general.suggestion', {}, lang),
        message: t('messages.references.invalidFormat', { count: badRefs }, lang),
        suggestion: t('messages.references.formatSuggestion', {}, lang),
        section: t('sections.referencias', {}, lang),
        suggestionKey: 'messages.references.formatSuggestion',
        sectionKey: 'referencias'
      });
    }

    if (numReferences > 0) {
      results.push({
        type: 'info',
        titleKey: 'general.info',
        messageKey: 'messages.references.valid',
        title: t('general.info', {}, lang),
        message: t('messages.references.valid', { count: numReferences }, lang),
        section: t('sections.referencias', {}, lang),
        sectionKey: 'referencias'
      });
    } else {
      results.push({
        type: 'warning',
        titleKey: 'general.warning',
        messageKey: 'messages.references.notFound',
        title: t('general.warning', {}, lang),
        message: t('messages.references.notFound', {}, lang),
        suggestion: t('messages.references.suggestion', {}, lang),
        section: t('sections.referencias', {}, lang),
        suggestionKey: 'messages.references.suggestion',
        sectionKey: 'referencias'
      });
    }
  } else {
    // No references section found at all
    results.push({
      type: 'warning',
      titleKey: 'general.warning',
      messageKey: 'messages.references.sectionNotFound',
      title: t('general.warning', {}, lang),
      message: t('messages.references.sectionNotFound', {}, lang),
      suggestion: t('messages.references.suggestion', {}, lang),
      section: t('sections.referencias', {}, lang),
      suggestionKey: 'messages.references.suggestion',
      sectionKey: 'referencias'
    });
  }


  // 5. Encabezados principales (headers)
  // --- Detección de encabezados principales (APA) ---
  const headers = config.headers;
  const missingHeaders = [];
  const headerPositions = [];
  const normalizedTexto = text.toLowerCase(); // Convertir el texto a minúsculas para búsqueda insensible a mayúsculas

  // Primera pasada: buscar encabezados y registrar sus posiciones
  for (const [index, headerVariants] of headers.entries()) {
    let found = false;
    let minPos = Infinity;

    for (const variant of headerVariants) {
      // Convertir la variante a minúsculas para coincidencia insensible a mayúsculas
      const variantLower = variant.toLowerCase();
      // Buscar todas las ocurrencias del encabezado (sin usar \b para evitar problemas con acentos)
      const regex = new RegExp(`(^|\\s)${escapeRegExp(variantLower)}(\\s|$|:)`, 'gi');
      let match;

      // Buscar en todo el texto
      while ((match = regex.exec(normalizedTexto)) !== null) {
        // Verificar que sea una coincidencia completa de palabra
        const matchText = match[0].toLowerCase().trim();
        if (matchText === variantLower) {
          const pos = match.index;
          if (pos < minPos) {
            minPos = pos;
          }
          found = true;
        }
      }
    }

    if (found) {
      headerPositions.push({
        name: headerVariants[0], // Usar el primer nombre del encabezado como identificador
        position: minPos
      });
    } else {
      // Solo agregar a missingHeaders si no se encontró ninguna variante
      missingHeaders.push(headerVariants[0]);
    }
  }

  //console.log('Missing headers:', missingHeaders);
  //console.log('Header positions:', headerPositions);

  // Resultado enriquecido: orden de encabezados
  // Solo evalúa el orden si no faltan encabezados principales
  if (missingHeaders.length > 0) {
    results.push({
      type: 'info',
      titleKey: 'general.info',
      messageKey: 'messages.headers.missing',
      messageParams: { missing: missingHeaders },
      title: t('general.info', {}, lang),
      suggestion: t('messages.headers.suggestion', {}, lang),
      section: t('sections.encabezados', {}, lang),
      suggestionKey: 'messages.headers.suggestion',
      sectionKey: 'encabezados',
      missingHeaders: missingHeaders
    });
  } else {
    // --- Orden de encabezados ---
    // Ordenar los encabezados por su posición en el documento
    const sortedHeaders = [...headerPositions].sort((a, b) => a.position - b.position);
    const isOrderCorrect = headerPositions.every((header, index) => {
      if (index === 0) return true;
      return header.position > headerPositions[index - 1].position;
    });

    if (!isOrderCorrect) {
      results.push({
        type: 'info',
        titleKey: 'general.info',
        messageKey: 'messages.headers.wrongOrder',
        title: t('general.info', {}, lang),
        message: t('messages.headers.wrongOrder', {}, lang),
        suggestion: t('messages.headers.orderSuggestion', {}, lang),
        section: t('sections.encabezados', {}, lang),
        sectionKey: 'encabezados',
        expectedOrder: headerPositions.map(h => h.name).join(' → '),
        actualOrder: sortedHeaders.map(h => h.name).join(' → ')
      });
    } else {
      results.push({
        type: 'info',
        titleKey: 'general.info',
        messageKey: 'messages.headers.correctOrder',
        title: t('general.info', {}, lang),
        message: t('messages.headers.correctOrder', {}, lang),
        section: t('sections.encabezados', {}, lang),
        sectionKey: 'encabezados',
        order: headerPositions.map(h => h.name).join(' → ')
      });
    }
  }


  // 6. Citas en el texto (APA: variantes)
  const citaRegex = /\(([A-ZÁÉÍÓÚÜÑ][a-zA-Záéíóúüñ]+(?:\s(?:y|&|et al\.)\s[A-ZÁÉÍÓÚÜÑ][a-zA-Záéíóúüñ]+)*(?:, [A-Z]\.)?(?:, [A-ZÁÉÍÓÚÜÑ][a-zA-Záéíóúüñ]+)*(?:; ?[A-ZÁÉÍÓÚÜÑ][a-zA-Záéíóúüñ]+(?:, [A-Z]\.)?,?)*), (\d{4})\)/g;
  const citationMatches = text.match(citaRegex);
  const numCitas = citationMatches ? citationMatches.length : 0;

  // Create formatted message based on count
  let citationMessage, messageKey;
  if (numCitas === 0) {
    messageKey = 'messages.citations.count.none';
    citationMessage = t(messageKey, {}, lang);
  } else if (numCitas === 1) {
    messageKey = 'messages.citations.count.one';
    citationMessage = t(messageKey, {}, lang);
  } else {
    messageKey = 'messages.citations.count.many';
    citationMessage = t(messageKey, { count: numCitas }, lang);
  }

  // Add citation count to results
  results.push({
    type: 'info',
    titleKey: 'general.info',
    messageKey: messageKey,
    title: t('general.info', {}, lang),
    message: citationMessage,
    section: t('sections.citas', {}, lang),
    sectionKey: 'citas',
    count: numCitas
  });

  if (numCitas < 2) {
    results.push({
      type: 'suggestion',
      titleKey: 'general.suggestion',
      messageKey: 'messages.citations.notEnough',
      title: t('general.suggestion', {}, lang),
      message: t('messages.citations.notEnough', {}, lang),
      suggestion: t('messages.citations.suggestion', {}, lang),
      section: t('sections.citas', {}, lang),
      suggestionKey: 'messages.citations.suggestion',
      sectionKey: 'citas'
    });
  }

  // 7. Sugerencia general si no hay advertencias, errores ni sugerencias
  const onlyInfo = results.length > 0 && results.every(r => r.type === 'info');
  if (onlyInfo) {
    results.push({
      type: 'minor',
      titleKey: 'general.info',
      messageKey: 'messages.feedback.minorReview',
      title: t('general.info', {}, lang),
      message: t('messages.feedback.minorReview', {}, lang),
      suggestion: t('messages.feedback.generalSuggestion', {}, lang),
      section: t('sections.general', {}, lang),
      suggestionKey: 'messages.feedback.generalSuggestion',
      sectionKey: 'general'
    });
  } else if (results.length === 0) {
    results.push({
      type: 'success',
      titleKey: 'general.success',
      messageKey: 'messages.feedback.validationSuccess',
      title: t('general.success', {}, lang),
      message: t('messages.feedback.validationSuccess', {}, lang),
      section: t('sections.general', {}, lang),
      sectionKey: 'general'
    });
  }

  // Pie y bar chart
  const pieChartData = [];
  const sectionChartData = [];
  const typeCount = {};
  const sectionCount = {};

  results.forEach(r => {
    typeCount[r.type] = (typeCount[r.type] || 0) + 1;
    if (r.section) sectionCount[r.section] = (sectionCount[r.section] || 0) + 1;
  });

  for (const [name, value] of Object.entries(typeCount)) {
    pieChartData.push({ name, value });
  }
  for (const [section, count] of Object.entries(sectionCount)) {
    sectionChartData.push({ section, count });
  }

  // --- Calificación general (score) ---
  const score = calculateApaScore(results, lang);

  return { results, pieChartData, sectionChartData, score };
}

// --- Score utilitario reutilizable ---
export function calculateApaScore(results, lang = 'es') {
  const scoreWeights = {
    error: -3,
    warning: -2,
    suggestion: -1,
    minor: 0,
    info: 0,
    success: 1
  };
  let rawScore = 0;
  let total = 0;
  let minScore = 0;
  let maxScore = 0;
  results.forEach(r => {
    const w = scoreWeights[r.type] ?? 0;
    rawScore += w;
    total++;
  });
  if (total > 0) {
    minScore = total * Math.min(...Object.values(scoreWeights));
    maxScore = total * Math.max(...Object.values(scoreWeights));
  } else {
    minScore = 0;
    maxScore = 1;
  }
  let normalizedScore = 0;
  if (maxScore !== minScore) {
    normalizedScore = Math.round(((rawScore - minScore) / (maxScore - minScore)) * 100);
  }
  let qualitative = '';
  if (normalizedScore >= 90) qualitative = 'excellent';
  else if (normalizedScore >= 75) qualitative = 'good';
  else if (normalizedScore >= 60) qualitative = 'acceptable';
  else if (normalizedScore >= 40) qualitative = 'poor';
  else qualitative = 'very_poor';
  return { value: normalizedScore, qualitative };
}

// Función auxiliar para escapar caracteres especiales en expresiones regulares
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}