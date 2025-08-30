-- Crear tabla de documentos subidos
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    originalname VARCHAR(255) NOT NULL,
    mimetype VARCHAR(100),
    size INTEGER,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de resultados de análisis
-- PostgreSQL sí soporta ENUM, pero para máxima compatibilidad puedes usar VARCHAR y un CHECK
CREATE TABLE IF NOT EXISTS analysis_results (
    id SERIAL PRIMARY KEY,
    document_id INTEGER NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    type VARCHAR(16) NOT NULL CHECK (type IN ('success', 'error', 'warning', 'suggestion')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    suggestion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    section VARCHAR(255) DEFAULT NULL,
    count INTEGER DEFAULT NULL,
    titleKey VARCHAR(128),
    messageKey VARCHAR(128),
    suggestionKey VARCHAR(128),
    sectionKey VARCHAR(64),
    messageParams TEXT
);

-- Índices para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_document_uploaded_at ON documents(uploaded_at DESC);
CREATE INDEX IF NOT EXISTS idx_analysis_document_id ON analysis_results(document_id);

-- Tabla de logs de errores del sistema
CREATE TABLE IF NOT EXISTS error_logs (
    id SERIAL PRIMARY KEY,
    error_message TEXT NOT NULL,
    stack_trace TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);