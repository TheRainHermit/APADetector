// server/models/db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.PG_HOST,      // Host de Supabase
  port: process.env.PG_PORT,      // 5432
  user: process.env.PG_USER,      // Usuario de Supabase
  password: process.env.PG_PASS,  // Contraseña de Supabase
  database: process.env.PG_DB,    // Nombre de la base de datos
  ssl: { rejectUnauthorized: false } // Importante para Supabase
});

export default pool;