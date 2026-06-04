const db = require('./db');

const crearTablas = async () => {
  const queryUsuarios = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      correo VARCHAR(100) UNIQUE NOT NULL,
      rol VARCHAR(50) DEFAULT 'usuario',
      estado VARCHAR(20) DEFAULT 'activo',
      fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await db.query(queryUsuarios);
    console.log('✅ Tablas creadas o verificadas correctamente.');
  } catch (error) {
    console.error('❌ Error creando las tablas:', error);
  }
};

module.exports = { crearTablas };
