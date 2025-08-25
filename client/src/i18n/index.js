const I18N = {
  es: {
    // UI Elements
    appTitle: 'APA Detector',
    home: 'Inicio',
    analyze: 'Analizar',
    documents: 'Documentos',
    results: 'Resultados',
    back: 'Volver',
    close: 'Cerrar',
    loading: 'Cargando...',
    cancel: 'Cancelar',
    about: 'Acerca de',
    contact: 'Contacto',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Uso',
    language: 'Idioma',
    menu: 'Menú',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',

    // General
    general: 'General',
    
    // Message Types
    error: 'Error',
    warning: 'Advertencia',
    info: 'Información',
    success: 'Éxito',
    suggestion: 'Sugerencia',
    section: 'Sección',
    
    // Message Types Object (for dynamic access)
    messageTypes: {
      error: 'Error',
      warning: 'Advertencia',
      info: 'Información',
      success: 'Éxito',
      suggestion: 'Sugerencia',
      section: 'Sección'
    },

    // Sections
    sections: {
      general: 'General',
      portada: 'Portada',
      resumen: 'Resumen',
      referencias: 'Referencias',
      citas: 'Citas',
      encabezados: 'Encabezados',
      conclusiones: 'Conclusiones',
      introduccion: 'Introducción',
      metodologia: 'Metodología',
      resultados: 'Resultados',
      discusion: 'Discusión',
      anexos: 'Anexos',
      tablas: 'Tablas',
      figuras: 'Figuras',
      apendices: 'Apéndices',
      abstract: 'Resumen',
      references: 'Referencias',
      citations: 'Citas',
      headers: 'Encabezados'
    },

    // Messages
    messages: {
      // Document validation messages
      documentSize: {
        tooManyLines: ({ lines, max }) => 
          `El documento tiene demasiadas líneas (${lines}). El límite es ${max} líneas.`,
        tooManyWords: ({ words, max }) =>
          `El documento tiene demasiadas palabras (${words}). El límite es ${max} palabras.`,
        notEnoughPages: ({ pages }) =>
          `El documento tiene muy pocas páginas (${pages}). Se recomiendan al menos 2 páginas.`,
        tooShort: ({ words, min }) =>
          `El documento es muy corto (${words} palabras). Se recomiendan al menos ${min} palabras.`,
        reduceSize: 'Por favor, reduce el tamaño del documento dividiéndolo en archivos más pequeños.',
        reduceContent: 'Por favor, reduce el tamaño del documento eliminando contenido innecesario.',
        increasePages: 'Considera ampliar el contenido de tu documento para cumplir con los requisitos mínimos.',
        increaseWords: 'Amplía el contenido de tu documento para cumplir con los requisitos mínimos.'
      },

      // Error messages
      errors: {
        fileNotFound: 'No se pudo encontrar el archivo: {{filePath}}',
        fileEmpty: 'El archivo está vacío.',
        fileTooLarge: 'El archivo es demasiado grande ({{size}} MB). El tamaño máximo permitido es de 10 MB.',
        unsupportedFileType: 'Tipo de archivo no soportado: {{mimetype}}',
        pdfProcessingError: 'Error al procesar el archivo PDF: {{error}}',
        docxProcessingError: 'Error al procesar el documento de Word: {{error}}',
        textExtractionError: 'Error al extraer texto del documento: {{error}}',
        generalProcessingError: 'Error al procesar el documento: {{error}}'
      },

      // Cover page messages
      coverPage: {
        incomplete: 'Faltan elementos en la portada:',
        suggestion: 'Asegúrate de incluir todos los elementos de la portada según el formato APA.'
      },

      // Abstract messages
      abstract: {
        notFound: 'No se encontró una sección de resumen o abstract en el documento.',
        suggestion: 'Incluye un resumen o abstract al inicio de tu documento siguiendo el formato APA.'
      },

      // References messages
      references: {
        notFound: 'No se encontraron referencias en formato APA en el documento.',
        suggestion: 'Asegúrate de incluir una sección de referencias al final del documento siguiendo el formato APA.',
        formatSuggestion: 'Revisa el formato de las referencias para que sigan el estándar APA.',
        usingBibliography: 'Se encontró una sección de Bibliografía en lugar de Referencias.',
        useReferences: 'En formato APA se recomienda usar "Referencias" en lugar de "Bibliografía".',
        valid: 'Se encontraron {{count}} referencias en formato APA.',
        invalidFormat: 'Se encontraron {{count}} referencias que no siguen el formato APA estándar.',
        sectionNotFound: 'No se encontró una sección de referencias en el documento.'
      },

      // Headers messages
      headers: {
        missing: 'Faltan los siguientes encabezados:',
        suggestion: 'Asegúrate de incluir todos los encabezados requeridos en tu documento.',
        wrongOrder: 'El orden de los encabezados no sigue el formato estándar.',
        orderSuggestion: 'Revisa el orden de las secciones según las normas APA.',
        correctOrder: 'El orden de los encabezados sigue el formato estándar.'
      },

      // Citations messages
      citations: {
        notEnough: 'No se detectaron suficientes citas en el texto.',
        suggestion: 'Incluye citas en el texto siguiendo el formato APA.',
        count: {
          none: 'No se encontraron citas en el texto.',
          one: 'Se encontró una cita en el texto.',
          many: 'Se encontraron {{count}} citas en el texto.'
        }
      },

      // Feedback
      feedback: {
        minorReview: 'El documento solo requiere revisión menor.',
        generalSuggestion: 'Revisa los detalles informativos para mejorar aún más tu documento.',
        validationSuccess: 'El documento cumple con las validaciones APA básicas.'
      }
    },

    // Landing Page
    landing: {
      title: "Verifica el Formato APA de tus Documentos",
      subtitle: "Asegúrate de que tus trabajos académicos cumplan con las normas APA de manera fácil y rápida.",
      cta: "Analizar documento",
      ctaSecondary: "Ver historial",
      benefit1: "Análisis Automático",
      benefit1Desc: "Detecta errores y sugerencias en tus documentos al instante.",
      benefit2: "Resultados Confiables",
      benefit2Desc: "Cumple con la 7ma edición de normas APA.",
      benefit3: "Rápido y Fácil",
      benefit3Desc: "Sube tu archivo y obtén resultados en segundos.",
      benefit4: "Aprendizaje Mejorado",
      benefit4Desc: "Aprende las reglas APA con nuestras explicaciones detalladas.",
      benefit5: "Formato PDF",
      benefit5Desc: "Analiza documentos en PDF y obtén resultados inmediatos."
    },

    // Analyze Page
    analyzeTitle: 'Analizar Documento',
    dropHere: 'Arrastra y suelta un archivo aquí, o haz clic para seleccionar uno.',
    dropActive: 'Suelta el archivo aquí...',
    allowedTypes: 'Formatos soportados: PDF, DOCX, ODT, TXT',
    maxSize: 'Máximo permitido: 5 MB.',
    fileTypeError: 'Tipo de archivo no permitido. Solo PDF, Word, ODT o TXT.',
    fileSizeError: 'El archivo es demasiado grande. Máximo permitido: 5 MB.',
    fileRequired: 'Selecciona un archivo para analizar.',
    analyzeBtn: 'Analizar',
    analyzing: 'Analizando documento...',
    analyzeError: 'Error al analizar el documento',
    removeFile: 'Eliminar archivo',
    language: 'Idioma del análisis',
    analyzeNewDoc: 'Analizar un nuevo documento',

    // Results Page
    resultsTitle: 'Resultados del Análisis',
    resultsFor: 'Resultados para',
    reportTitle: 'Informe de Análisis APA',
    file: 'Archivo',
    type: 'Tipo',
    size: 'Tamaño',
    generatedBy: 'Generado por',
    results: 'Resultados',
    downloadPdf: 'Descargar PDF',
    downloadExcel: 'Descargar Excel',
    errorLoading: 'No se pudieron cargar los resultados.',
    uploadedAt: 'Subido el',
    noResults: 'No se encontraron resultados para este documento.',
    position: 'Posición',
    context: 'Contexto',
    backToAnalyze: 'Volver a analizar otro documento',
    resultsTypeDistribution: 'Distribución de tipos',
    resultsBySection: 'Resultados por sección',
    reportLang: 'Idioma del reporte',
    noSectionChartData: 'No se encontraron datos por sección.',
    processingResults: 'El análisis está en curso. Espera unos segundos...',
    analysisComplete: '¡Análisis completado exitosamente!',
    typeDistributionAlt: 'Gráfico circular que muestra la cantidad de advertencias, sugerencias e información detectadas en el análisis.',
    sectionResultsAlt: 'Gráfico de barras que muestra la cantidad de hallazgos por sección del documento.',
    generalScoreTitle: 'Calificación general APA',
    generalScoreDescription: 'Este puntaje resume el cumplimiento global de normas APA.',
    results: {
      exportExcel: 'Descargar Excel',
      exportPdf: 'Descargar PDF',
      analyzeNewDoc: 'Analizar un nuevo documento',
      reportTitle: 'Informe de Análisis APA',
      file: 'Archivo',
      type: 'Tipo',
      size: 'Tamaño',
      generalScore: 'Calificación general APA',
      generalScoreDescription: 'Este puntaje resume el cumplimiento global de normas APA.',
      typeDistribution: 'Distribución de tipos',
      typeDistributionAlt: 'Gráfico de distribución de tipos de resultados',
    },
    
    // Scores
    scores: {
      excellent: 'Excelente',
      good: 'Bueno',
      acceptable: 'Aceptable',
      poor: 'Deficiente',
      very_poor: 'Muy deficiente'
    },

    // Documents Page
    documentsTitle: 'Mis Documentos Analizados',
    uploadNew: 'Subir Nuevo Documento',
    name: 'Nombre',
    date: 'Fecha',
    actions: 'Acciones',
    view: 'Ver',
    noDocuments: 'No tienes documentos analizados aún.',
    loadingDocuments: 'Cargando documentos...',
    errorDocuments: 'No se pudieron cargar los documentos.',
    search: 'Buscar',
    dateFrom: 'Fecha desde',
    dateTo: 'Fecha hasta',

    // About Page
    aboutPage: {
      title: 'Sobre Nosotros',
      description1: 'Somos un equipo apasionado por la educación y la tecnología, comprometidos con facilitar el proceso de escritura académica mediante herramientas innovadoras.',
      mission: 'Nuestra misión es ayudar a estudiantes, investigadores y profesionales a asegurar que sus documentos cumplan con los estándares de formato APA, ahorrando tiempo y mejorando la calidad de sus trabajos académicos.'
    },

    // Contact section
    contactPage: {
      title: 'Contáctanos',
      subtitle: '¿Tienes alguna pregunta? Nos encantaría saber de ti',
      form: {
        name: 'Nombre',
        email: 'Correo electrónico',
        subject: 'Asunto',
        message: 'Mensaje',
        submit: 'Enviar mensaje',
        submitting: 'Enviando...',
        success: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.',
        error: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.'
      },
      info: {
        title: 'Información de contacto',
        email: 'contacto@apadetector.com',
        phone: '+57 3194247585',
        address: 'Zonamérica, Cali, Colombia',
        hours: 'Lunes a Viernes: 9:00 - 18:00',
        social: 'Síguenos en redes sociales:'
      },
      faq: {
        title: 'Preguntas frecuentes',
        question1: '¿Cómo funciona el detector APA?',
        answer1: 'Nuestro sistema analiza tu documento y verifica el formato según las normas APA.',
        question2: '¿Es gratuito el servicio?',
        answer2: 'Sí, ofrecemos una versión gratuita con funciones básicas.'
      }
    },

    footer: {
      title: 'APA Detector',
      quickLinks: 'Enlaces Rápidos',
      resources: 'Recursos',
      apaGuide: 'Guía de Estilo APA',
      citationGuide: 'Guía de Citas APA',
      citationGenerator: 'Generador de Citas',
      copyright: 'Todos los derechos reservados.',
      copyrightName: 'Miguel Angel Fabra Montaño - TheRainHermit',
      description: 'Herramienta de análisis de formato APA para trabajos académicos.',
      
      
      links: {
        about: 'Acerca de',
        contact: 'Contacto',
        privacy: 'Privacidad',
        terms: 'Términos',
        github: 'GitHub',
        documentation: 'Documentación',
        api: 'API',
        status: 'Estado del servicio'
      },
      languageSelector: 'Idioma:',
      themeSelector: 'Tema:',
      themeLight: 'Claro',
      themeDark: 'Oscuro',
      themeSystem: 'Sistema'
    },

    // Legal
    legal: {
      privacyTitle: "Política de Privacidad",
      privacyDate: "Última actualización: 24 de agosto de 2025",
      termsTitle: "Términos de Uso",
      termsDate: "Última actualización: 24 de agosto de 2025",
      
      privacySections: {
        section1: "1. Introducción",
        intro1: "En APA Detector, respetamos su privacidad y nos comprometemos a proteger su información personal. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando utiliza nuestro servicio.",
        intro2: "Al utilizar nuestro servicio, usted acepta las prácticas descritas en esta política. Si no está de acuerdo con nuestras políticas y prácticas, no utilice nuestro servicio.",
        
        section2: "2. Información que Recopilamos",
        info1: "Recopilamos varios tipos de información, incluyendo:",
        infoList: [
          "Información que nos proporciona directamente, como su nombre y dirección de correo electrónico.",
          "Documentos que carga para su análisis, que pueden contener información personal o académica.",
          "Datos de uso, como la hora y duración de su visita, y cómo interactúa con nuestro servicio."
        ],
        
        section3: "3. Uso de la Información",
        use1: "Utilizamos la información que recopilamos para:",
        useList: [
          "Proporcionar, mantener y mejorar nuestro servicio.",
          "Analizar documentos según las normas APA.",
          "Responder a sus consultas y brindar soporte al cliente.",
          "Enviar actualizaciones y comunicaciones relacionadas con el servicio."
        ],
        
        section4: "4. Compartir Información",
        share1: "No vendemos ni alquilamos su información personal a terceros. Podemos compartir su información en las siguientes circunstancias:",
        share2: "Con proveedores de servicios que nos ayudan a operar nuestro servicio, siempre que acuerden mantener la confidencialidad de la información.",
        
        section5: "5. Seguridad",
        security: "Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro, por lo que no podemos garantizar su seguridad absoluta.",
        
        section6: "6. Sus Derechos",
        rights1: "Usted tiene derecho a:",
        rightsList: [
          "Acceder a la información personal que tenemos sobre usted.",
          "Solicitar la corrección de información inexacta.",
          "Solicitar la eliminación de su información personal.",
          "Oponerse al procesamiento de sus datos personales."
        ],
        rights2: "Para ejercer estos derechos, contáctenos utilizando la información proporcionada a continuación.",
        
        section7: "7. Cambios en la Política de Privacidad",
        changes: "Nos reservamos el derecho de actualizar nuestra Política de Privacidad ocasionalmente. Le notificaremos de cualquier cambio publicando la nueva Política de Privacidad en esta página y actualizando la fecha de 'Última actualización'.",
        
        section8: "8. Contáctenos",
        contact1: "Si tiene alguna pregunta sobre esta Política de Privacidad, puede contactarnos a través de:",
        contactList: [
          "Correo electrónico: contacto@apadetector.com",
          "Dirección: Calle 62B # 1A9 - 75 Cali, Colombia",
          "Teléfono: +57 3194247585"
        ]
      },
      
      termsSections: {
        section1: "1. Introducción",
        intro1: "Al acceder y utilizar el servicio APA Detector, usted acepta cumplir con estos Términos de Uso. Si no está de acuerdo con estos términos, no utilice nuestro servicio.",
        
        section2: "2. Descripción del Servicio",
        desc1: "APA Detector es una herramienta en línea que ayuda a los usuarios a verificar el formato de sus documentos según las normas APA. El servicio incluye:",
        descList: [
          "Análisis de formato de documentos académicos.",
          "Sugerencias para la corrección según las normas APA.",
          "Herramientas adicionales para la gestión de referencias."
        ],
        disclaimer: "APA Detector es una herramienta de asistencia y no garantiza la exactitud absoluta de los resultados. Los usuarios son responsables de verificar la exactitud de cualquier sugerencia proporcionada.",
        
        section3: "3. Licencia de Uso",
        license1: "Se le otorga una licencia limitada, no exclusiva, intransferible y revocable para utilizar nuestro servicio, sujeta a las siguientes restricciones:",
        licenseList: [
          "No puede copiar, modificar o crear trabajos derivados del servicio.",
          "No puede utilizar el servicio con fines ilegales o no autorizados.",
          "No puede intentar obtener acceso no autorizado a ningún sistema o red relacionada con el servicio."
        ],
        
        section4: "4. Conducta del Usuario",
        conduct1: "Usted acepta no realizar ninguna de las siguientes acciones:",
        conductList: [
          "Cargar contenido ilegal, difamatorio o que viole derechos de terceros.",
          "Utilizar el servicio para enviar spam o publicidad no solicitada.",
          "Interferir con la seguridad o el funcionamiento del servicio."
        ],
        
        section5: "5. Contenido del Usuario",
        userContent: "Usted conserva todos los derechos de propiedad de los documentos que cargue. Sin embargo, al cargar contenido, nos otorga una licencia mundial, no exclusiva y libre de regalías para usar, reproducir y procesar dicho contenido únicamente con el fin de proporcionarle el servicio.",
        
        section6: "6. Limitación de Responsabilidad",
        limitation1: "En la máxima medida permitida por la ley, APA Detector no será responsable por:",
        limitationList: [
          "Daños indirectos, incidentales o consecuentes.",
          "Pérdida de datos o información.",
          "Interrupciones del servicio o fallas técnicas."
        ],
        limitation2: "Nuestra responsabilidad total por cualquier reclamo relacionado con el servicio estará limitada al monto que haya pagado, si corresponde, por el uso del servicio durante los 12 meses anteriores al reclamo.",
        
        section7: "7. Modificaciones",
        modifications1: "Nos reservamos el derecho de modificar estos Términos de Uso en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación. El uso continuado del servicio después de dichas modificaciones constituye su aceptación de los nuevos términos.",
        modificationsList: [
          "Las modificaciones menores pueden realizarse sin previo aviso.",
          "Los cambios sustanciales se notificarán con al menos 30 días de anticipación."
        ],
        modifications2: "Es su responsabilidad revisar periódicamente estos Términos de Uso para estar informado sobre las actualizaciones.",
        
        section8: "8. Ley Aplicable",
        law: "Estos Términos de Uso se regirán e interpretarán de acuerdo con las leyes de [País/Estado], sin tener en cuenta sus disposiciones sobre conflicto de leyes.",
        
        section9: "9. Contacto",
        contact1: "Si tiene alguna pregunta sobre estos Términos de Uso, puede contactarnos a través de:",
        contactList: [
          "Correo electrónico: contacto@apadetector.com",
          "Dirección: Calle 62B # 1A9 - 75 Cali, Colombia",
          "Teléfono: +57 3194247585"
        ]
      }
    },
  },
  en: {
    // UI Elements
    appTitle: 'APA Detector',
    home: 'Home',
    analyze: 'Analyze',
    documents: 'Documents',
    results: 'Results',
    back: 'Back',
    close: 'Close',
    loading: 'Loading...',
    cancel: 'Cancel',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    language: 'Language',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',

    // General
    general: 'General',
    
    // Message Types
    error: 'Error',
    warning: 'Warning',
    info: 'Information',
    success: 'Success',
    suggestion: 'Suggestion',
    section: 'Section',
    
    // Message Types Object (for dynamic access)
    messageTypes: {
      error: 'Error',
      warning: 'Warning',
      info: 'Information',
      success: 'Success',
      suggestion: 'Suggestion',
      section: 'Section'
    },

    // Sections
    sections: {
      general: 'General',
      portada: 'Title Page',
      resumen: 'Abstract',
      referencias: 'References',
      citas: 'Citations',
      encabezados: 'Headings',
      conclusiones: 'Conclusions',
      introduccion: 'Introduction',
      metodologia: 'Methodology',
      resultados: 'Results',
      discusion: 'Discussion',
      anexos: 'Annexes',
      tablas: 'Tables',
      figuras: 'Figures',
      apendices: 'Appendices'
    },

    // Messages
    messages: {
      // Document validation messages
      documentSize: {
        tooManyLines: ({ lines, max }) => 
          `The document has too many lines (${lines}). The limit is ${max} lines.`,
        tooManyWords: ({ words, max }) =>
          `The document has too many words (${words}). The limit is ${max} words.`,
        notEnoughPages: ({ pages }) =>
          `The document has too few pages (${pages}). At least 2 pages are recommended.`,
        tooShort: ({ words, min }) =>
          `The document is too short (${words} words). At least ${min} words are recommended.`,
        reduceSize: 'Please reduce the document size by splitting it into smaller files.',
        reduceContent: 'Please reduce the document size by removing unnecessary content.',
        increasePages: 'Consider expanding your document content to meet the minimum requirements.',
        increaseWords: 'Expand your document content to meet the minimum requirements.'
      },

      // Error messages
      errors: {
        fileNotFound: 'Could not find file: {{filePath}}',
        fileEmpty: 'The file is empty.',
        fileTooLarge: 'The file is too large ({{size}} MB). Maximum allowed size is 10 MB.',
        unsupportedFileType: 'Unsupported file type: {{mimetype}}',
        pdfProcessingError: 'Error processing PDF file: {{error}}',
        docxProcessingError: 'Error processing Word document: {{error}}',
        textExtractionError: 'Error extracting text from document: {{error}}',
        generalProcessingError: 'Error processing document: {{error}}'
      },

      // Cover page messages
      coverPage: {
        incomplete: 'Missing elements in the cover page:',
        suggestion: 'Make sure to include all cover page elements according to APA format.'
      },

      // Abstract messages
      abstract: {
        notFound: 'No abstract section was found in the document.',
        suggestion: 'Include an abstract at the beginning of your document following APA format.'
      },

      // References messages
      references: {
        notFound: 'No APA-formatted references were found in the document.',
        suggestion: 'Make sure to include a references section at the end of your document following APA format.',
        formatSuggestion: 'Check the format of the references to ensure they follow APA standards.',
        usingBibliography: 'A Bibliography section was found instead of References.',
        useReferences: 'In APA format, it is recommended to use "References" instead of "Bibliography".',
        valid: 'Found {{count}} APA-formatted references.',
        invalidFormat: 'Found {{count}} references that do not follow the standard APA format.',
        sectionNotFound: 'No references section was found in the document.'
      },

      // Headers messages
      headers: {
        missing: 'The following headers are missing:',
        suggestion: 'Make sure to include all required headers in your document.',
        wrongOrder: 'The order of the headers does not follow the standard format.',
        orderSuggestion: 'Review the order of sections according to APA guidelines.',
        correctOrder: 'The order of the headers follows the standard format.'
      },

      // Citations messages
      citations: {
        notEnough: 'Not enough citations were detected in the text.',
        suggestion: 'Include citations in the text following APA format.',
        count: {
          none: 'No citations were found in the text.',
          one: 'One citation was found in the text.',
          many: 'Found {{count}} citations in the text.'
        }
      },

      // Feedback
      feedback: {
        minorReview: 'The document only requires minor review.',
        generalSuggestion: 'Review the informational details to further improve your document.',
        validationSuccess: 'The document meets basic APA validation requirements.'
      }
    },

    // Landing Page
    landing: {
      title: "Check the APA Format of Your Documents",
      subtitle: "Make sure your academic papers comply with APA standards easily and quickly.",
      cta: "Analyze document",
      ctaSecondary: "View history",
      benefit1: "Automatic Analysis",
      benefit1Desc: "Detect errors and suggestions in your documents instantly.",
      benefit2: "Reliable Results",
      benefit2Desc: "Complies with 7th edition APA standards.",
      benefit3: "Quick and Easy",
      benefit3Desc: "Upload your file and get results in seconds.",
      benefit4: "Enhanced Learning",
      benefit4Desc: "Learn APA rules with our detailed explanations.",
      benefit5: "PDF Format",
      benefit5Desc: "Analyze PDF documents and get immediate results."
    },

    // Analyze Page
    analyzeTitle: 'Analyze Document',
    dropHere: 'Drag and drop a file here, or click to select one.',
    dropActive: 'Drop the file here...',
    allowedTypes: 'Supported formats: PDF, DOCX, ODT, TXT',
    maxSize: 'Maximum allowed: 5 MB.',
    fileTypeError: 'File type not allowed. Only PDF, Word, ODT or TXT.',
    fileSizeError: 'The file is too large. Maximum allowed: 5 MB.',
    fileRequired: 'Select a file to analyze.',
    analyzeBtn: 'Analyze',
    analyzing: 'Analyzing document...',
    analyzeError: 'Error analyzing the document',
    removeFile: 'Remove file',
    language: 'Analysis language',
    analyzeNewDoc: 'Analyze a new document',

    // Results Page
    resultsTitle: 'Analysis Results',
    resultsFor: 'Results for',
    reportTitle: 'APA Analysis Report',
    file: 'File',
    type: 'Type',
    size: 'Size',
    generatedBy: 'Generated by',
    results: 'Results',
    downloadPdf: 'Download PDF',
    downloadExcel: 'Download Excel',
    errorLoading: 'Could not load results.',
    uploadedAt: 'Uploaded on',
    noResults: 'No results found for this document.',
    position: 'Position',
    context: 'Context',
    backToAnalyze: 'Back to analyze another document',
    resultsTypeDistribution: 'Type distribution',
    resultsBySection: 'Results by section',
    reportLang: 'Report language',
    noSectionChartData: 'No section data found.',
    processingResults: 'Analysis is in progress. Please wait a few seconds...',
    analysisComplete: 'Analysis completed successfully!',
    typeDistributionAlt: 'Pie chart showing the number of warnings, suggestions and information detected in the analysis.',
    sectionResultsAlt: 'Bar chart showing the number of findings by document section.',
    generalScoreTitle: 'Overall APA Score',
    generalScoreDescription: 'This score summarizes overall APA compliance.',
    results: {
      exportExcel: 'Download Excel',
      exportPdf: 'Download PDF',
      analyzeNewDoc: 'Analyze a new document',
      reportTitle: 'APA Analysis Report',
      file: 'File',
      type: 'Type',
      size: 'Size',
      generalScore: 'APA Overall Score',
      generalScoreDescription: 'This score summarizes overall APA compliance.',
      typeDistribution: 'Results Type Distribution',
      typeDistributionAlt: 'Results type distribution chart',
    },
    
    // Scores
    scores: {
      excellent: 'Excellent',
      good: 'Good',
      acceptable: 'Acceptable',
      poor: 'Poor',
      very_poor: 'Very Poor'
    },

    // Documents Page
    documentsTitle: 'My Analyzed Documents',
    uploadNew: 'Upload New Document',
    name: 'Name',
    date: 'Date',
    actions: 'Actions',
    view: 'View',
    noDocuments: 'You have no analyzed documents yet.',
    loadingDocuments: 'Loading documents...',
    errorDocuments: 'Could not load documents.',
    search: 'Search',
    dateFrom: 'Date from',
    dateTo: 'Date to',

    // About Page
    aboutPage: {
      title: 'About Us',
      description1: 'We are a team passionate about education and technology, committed to facilitating the academic writing process through innovative tools.',
      mission: 'Our mission is to help students, researchers and professionals ensure their documents comply with APA format standards, saving time and improving the quality of their academic work.'
    },

    // Contact section
    contactPage: {
      title: 'Contact Us',
      subtitle: 'Have any questions? We\'d love to hear from you',
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        submit: 'Send Message',
        submitting: 'Sending...',
        success: 'Message sent successfully! We\'ll get back to you soon.',
        error: 'Error sending message. Please try again later.'
      },
      info: {
        title: 'Contact Information',
        email: 'contacto@apadetector.com',
        phone: '+57 3194247585',
        address: 'Zonamérica, Cali, Colombia',
        hours: 'Monday - Friday: 9:00 AM - 6:00 PM',
        social: 'Follow us on social media:'
      },
      faq: {
        title: 'Frequently Asked Questions',
        question1: 'How does the APA detector work?',
        answer1: 'Our system analyzes your document and verifies the format according to APA guidelines.',
        question2: 'Is the service free?',
        answer2: 'Yes, we offer a free version with basic features.'
      }
    },

    footer: {
      title: 'APA Detector',
      quickLinks: 'Quick Links',
      resources: 'Resources',
      apaGuide: 'APA Style Guide',
      citationGuide: 'Citation Guide',
      citationGenerator: 'Citation Generator',
      copyright: 'All rights reserved.',
      copyrightName: 'Miguel Angel Fabra Montaño - TheRainHermit',
      description: 'APA format analysis tool for academic papers.',
      
      
      links: {
        about: 'About',
        contact: 'Contact',
        privacy: 'Privacy Policy',
        terms: 'Terms of Use',
        github: 'GitHub',
        documentation: 'Documentation',
        api: 'API',
        status: 'Service Status'
      },
      languageSelector: 'Language:',
      themeSelector: 'Theme:',
      themeLight: 'Light',
      themeDark: 'Dark',
      themeSystem: 'System'
    },

    // Legal
    legal: {
      privacyTitle: "Privacy Policy",
      privacyDate: "Last updated: January 1, 2023",
      termsTitle: "Terms of Use",
      termsDate: "Last updated: January 1, 2023",
      
      privacySections: {
        section1: "1. Introduction",
        intro1: "At APA Detector, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.",
        intro2: "By using our service, you agree to the practices described in this policy. If you do not agree with our policies and practices, please do not use our service.",
        
        section2: "2. Information We Collect",
        info1: "We collect several types of information, including:",
        infoList: [
          "Information you provide directly, such as your name and email address.",
          "Documents you upload for analysis, which may contain personal or academic information.",
          "Usage data, such as the time and duration of your visit, and how you interact with our service."
        ],
        
        section3: "3. Use of Information",
        use1: "We use the information we collect to:",
        useList: [
          "Provide, maintain, and improve our service.",
          "Analyze documents according to APA guidelines.",
          "Respond to your inquiries and provide customer support.",
          "Send updates and communications related to the service."
        ],
        
        section4: "4. Sharing Information",
        share1: "We do not sell or rent your personal information to third parties. We may share your information in the following circumstances:",
        share2: "With service providers who assist us in operating our service, provided they agree to keep the information confidential.",
        
        section5: "5. Security",
        security: "We implement technical and organizational security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.",
        
        section6: "6. Your Rights",
        rights1: "You have the right to:",
        rightsList: [
          "Access the personal information we hold about you.",
          "Request correction of inaccurate information.",
          "Request deletion of your personal information.",
          "Object to the processing of your personal data."
        ],
        rights2: "To exercise these rights, please contact us using the information provided below.",
        
        section7: "7. Changes to the Privacy Policy",
        changes: "We reserve the right to update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date.",
        
        section8: "8. Contact Us",
        contact1: "If you have any questions about this Privacy Policy, you can contact us at:",
        contactList: [
          "Email: contact@apadetector.com",
          "Address: [Your Address Here]",
          "Phone: [Your Phone Number]"
        ]
      },
      
      termsSections: {
        section1: "1. Introduction",
        intro1: "By accessing and using the APA Detector service, you agree to comply with these Terms of Use. If you do not agree with these terms, please do not use our service.",
        
        section2: "2. Service Description",
        desc1: "APA Detector is an online tool that helps users verify the format of their documents according to APA guidelines. The service includes:",
        descList: [
          "Analysis of academic document formatting.",
          "Suggestions for corrections based on APA guidelines.",
          "Additional tools for reference management."
        ],
        disclaimer: "APA Detector is an assistance tool and does not guarantee the absolute accuracy of results. Users are responsible for verifying the accuracy of any suggestions provided.",
        
        section3: "3. License to Use",
        license1: "You are granted a limited, non-exclusive, non-transferable, and revocable license to use our service, subject to the following restrictions:",
        licenseList: [
          "You may not copy, modify, or create derivative works of the service.",
          "You may not use the service for any illegal or unauthorized purpose.",
          "You may not attempt to gain unauthorized access to any system or network related to the service."
        ],
        
        section4: "4. User Conduct",
        conduct1: "You agree not to engage in any of the following actions:",
        conductList: [
          "Uploading illegal, defamatory, or rights-infringing content.",
          "Using the service to send spam or unsolicited advertising.",
          "Interfering with the security or operation of the service."
        ],
        
        section5: "5. User Content",
        userContent: "You retain all ownership rights to the documents you upload. However, by uploading content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and process such content solely for the purpose of providing you with the service.",
        
        section6: "6. Limitation of Liability",
        limitation1: "To the maximum extent permitted by law, APA Detector shall not be liable for:",
        limitationList: [
          "Indirect, incidental, or consequential damages.",
          "Loss of data or information.",
          "Service interruptions or technical failures."
        ],
        limitation2: "Our total liability for any claim related to the service shall be limited to the amount you paid, if any, for using the service during the 12 months prior to the claim.",
        
        section7: "7. Modifications",
        modifications1: "We reserve the right to modify these Terms of Use at any time. Modifications will take effect immediately upon posting. Continued use of the service after such modifications constitutes your acceptance of the new terms.",
        modificationsList: [
          "Minor modifications may be made without prior notice.",
          "Substantial changes will be notified at least 30 days in advance."
        ],
        modifications2: "It is your responsibility to periodically review these Terms of Use to stay informed about updates.",
        
        section8: "8. Governing Law",
        law: "These Terms of Use shall be governed by and construed in accordance with the laws of [Country/State], without regard to its conflict of law provisions.",
        
        section9: "9. Contact",
        contact1: "If you have any questions about these Terms of Use, you can contact us at:",
        contactList: [
          "Email: contact@apadetector.com",
          "Address: [Your Address Here]",
          "Phone: [Your Phone Number]"
        ]
      }
    },
  }
};

export default I18N;
