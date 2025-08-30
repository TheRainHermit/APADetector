import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Falta el id de documento' });
  }

  // Obtiene resultados del análisis
  const { data: results, error } = await supabase
    .from('analysis_results')
    .select('*')
    .eq('document_id', id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  if (!results || results.length === 0) {
    return res.status(404).json({ error: 'No se encontraron resultados para este documento' });
  }

  // (Opcional) Obtiene info del documento
  const { data: document, error: docError } = await supabase
    .from('documents')
    .select('*')
    .eq('id', id)
    .single();

  if (docError) {
    return res.status(500).json({ error: docError.message });
  }

  return res.status(200).json({
    ok: true,
    document,
    results,
  });
}