const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port: process.env.DB_PORT,
});

pool.on('connect', () => {
  console.log('🔗 Conectado a la base de datos PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Error inesperado en la conexión a la base de datos', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
