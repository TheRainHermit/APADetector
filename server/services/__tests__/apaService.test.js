import { analyzeFile } from '../apaService';
import fs from 'fs';
import path from 'path';

// Mock file system and external dependencies
jest.mock('fs');
jest.mock('pdf-parse');
jest.mock('mammoth');
jest.mock('textract');

describe('APA Service Internationalization', () => {
  // Mock a simple text file for testing
  const mockText = `
    UNIVERSIDAD DE PRUEBA
    FACULTAD DE INGENIERÍA
    TÍTULO DEL TRABAJO
    Autor: Juan Pérez
    Fecha: 2023
    
    RESUMEN
    Este es un resumen de prueba.
    
    INTRODUCCIÓN
    Texto de introducción.
    
    METODOLOGÍA
    Texto de metodología.
    
    RESULTADOS
    Texto de resultados.
    
    DISCUSIÓN
    Texto de discusión.
    
    CONCLUSIÓN
    Texto de conclusión.
    
    REFERENCIAS
    Autor, A. (2020). Título del libro. Editorial.
  `;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock fs.readFileSync to return our test text
    fs.readFileSync.mockReturnValue(mockText);
    
    // Mock fs.existsSync to always return true
    fs.existsSync.mockReturnValue(true);
    
    // Mock fs.statSync to return a basic stat object
    fs.statSync.mockReturnValue({
      isFile: () => true,
      size: 1024
    });
  });

  test('should return Spanish messages when lang is es', async () => {
    const result = await analyzeFile('test.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'es');
    
    // Verify the structure of the results
    expect(result).toHaveProperty('results');
    expect(Array.isArray(result.results)).toBe(true);
    
    // Check that all results have the expected properties
    result.results.forEach(item => {
      expect(item).toHaveProperty('type');
      expect(item).toHaveProperty('titleKey');
      expect(item).toHaveProperty('messageKey');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('message');
      if (item.suggestion) {
        expect(item).toHaveProperty('suggestion');
      }
      expect(item).toHaveProperty('section');
      expect(item).toHaveProperty('sectionKey');
    });
    
    // Check for specific Spanish messages
    const hasSpanishMessage = result.results.some(item => 
      item.message && item.message.includes('resumen') ||
      item.section && item.section.includes('Resumen')
    );
    expect(hasSpanishMessage).toBe(true);
  });

  test('should return English messages when lang is en', async () => {
    const result = await analyzeFile('test.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'en');
    
    // Verify the structure of the results
    expect(result).toHaveProperty('results');
    expect(Array.isArray(result.results)).toBe(true);
    
    // Check that all results have the expected properties
    result.results.forEach(item => {
      expect(item).toHaveProperty('type');
      expect(item).toHaveProperty('titleKey');
      expect(item).toHaveProperty('messageKey');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('message');
      if (item.suggestion) {
        expect(item).toHaveProperty('suggestion');
      }
      expect(item).toHaveProperty('section');
      expect(item).toHaveProperty('sectionKey');
    });
    
    // Check for specific English messages
    const hasEnglishMessage = result.results.some(item => 
      item.message && (item.message.includes('abstract') || item.message.includes('References')) ||
      item.section && (item.section === 'References' || item.section === 'Abstract')
    );
    expect(hasEnglishMessage).toBe(true);
  });

  test('should default to Spanish when an unsupported language is provided', async () => {
    const result = await analyzeFile('test.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'fr');
    
    // Should still have valid results
    expect(result).toHaveProperty('results');
    expect(Array.isArray(result.results)).toBe(true);
    
    // Check for Spanish messages (default)
    const hasSpanishMessage = result.results.some(item => 
      item.message && item.message.includes('resumen') ||
      item.section && item.section.includes('Resumen')
    );
    expect(hasSpanishMessage).toBe(true);
  });

  test('should handle missing sections with appropriate messages', async () => {
    // Create a mock text with missing sections
    const incompleteText = `
      UNIVERSIDAD DE PRUEBA
      FACULTAD DE INGENIERÍA
      TÍTULO DEL TRABAJO
    `;
    
    fs.readFileSync.mockReturnValue(incompleteText);
    
    const result = await analyzeFile('incomplete.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'es');
    
    // Should have warnings about missing sections
    const hasMissingSectionWarning = result.results.some(item => 
      item.type === 'warning' && 
      (item.messageKey === 'resumenNoEncontrado' || 
       item.messageKey === 'referenciasNoEncontradas')
    );
    
    expect(hasMissingSectionWarning).toBe(true);
  });
});
