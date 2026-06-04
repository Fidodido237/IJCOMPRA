require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { crearTablas } = require('./config/init_db');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Inicializar la base de datos
crearTablas();

// --- RUTAS BÁSICAS DE PRUEBA (Módulo de Seguridad) ---

// 1. Ruta de estado
app.get('/api/status', (req, res) => {
  res.json({ success: true, message: '¡El servidor de IJCOMPRA está funcionando!' });
});

// 2. Ruta para CREAR un usuario (Insertar datos)
app.post('/api/usuarios', async (req, res) => {
  const { nombre, correo, rol } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO usuarios (nombre, correo, rol) VALUES ($1, $2, $3) RETURNING *',
      [nombre, correo, rol || 'usuario']
    );
    res.status(201).json({ success: true, usuario: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al crear usuario o correo duplicado' });
  }
});

// 3. Ruta para LEER todos los usuarios (Consultar datos)
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM usuarios ORDER BY id DESC');
    res.json({ success: true, usuarios: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener usuarios' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
