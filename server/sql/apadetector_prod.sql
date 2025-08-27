CREATE TABLE IF NOT EXISTS documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    originalname VARCHAR(255) NOT NULL,
    mimetype VARCHAR(100),
    size INT,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS analysis_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    document_id INT NOT NULL,
    type ENUM('success', 'error', 'warning', 'suggestion') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    suggestion TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);

CREATE INDEX idx_document_uploaded_at ON documents(uploaded_at DESC);
CREATE INDEX idx_analysis_document_id ON analysis_results(document_id);

CREATE TABLE IF NOT EXISTS error_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    error_message TEXT NOT NULL,
    stack_trace TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE analysis_results ADD COLUMN section VARCHAR(255) DEFAULT NULL;
ALTER TABLE analysis_results ADD COLUMN count INT DEFAULT NULL;
ALTER TABLE analysis_results
  ADD COLUMN titleKey VARCHAR(128),
  ADD COLUMN messageKey VARCHAR(128),
  ADD COLUMN suggestionKey VARCHAR(128),
  ADD COLUMN sectionKey VARCHAR(64);
ALTER TABLE analysis_results ADD COLUMN messageParams TEXT;