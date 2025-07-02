const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      message: 'Conexión exitosa a PostgreSQL',
      timestamp: result.rows[0].now 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error de conexión' });
  }
});

// Rutas de animales
app.use('/api/animals', require('./routes/animals'));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});