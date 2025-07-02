const express = require('express');
const pool = require('../config/database');
const router = express.Router();

// Obtener todos los animales
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, tipo, genero, edad, region, descripcion, imagen, fecha_registro FROM animales ORDER BY fecha_registro DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener animales:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Obtener animales por tipo
router.get('/tipo/:tipo', async (req, res) => {
  try {
    const { tipo } = req.params;
    const result = await pool.query(
      'SELECT id, nombre, tipo, genero, edad, region, descripcion, imagen, fecha_registro FROM animales WHERE tipo = $1 ORDER BY fecha_registro DESC',
      [tipo]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al filtrar animales:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Obtener un animal por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id, nombre, tipo, genero, edad, region, descripcion, imagen, fecha_registro FROM animales WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Animal no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener animal:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Crear un nuevo animal
router.post('/', async (req, res) => {
  try {
    const { nombre, tipo, genero, edad, region, descripcion, imagen } = req.body;
    
    // Validaciones básicas
    if (!nombre || !tipo || !genero || !edad || !region) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    
    const result = await pool.query(
      'INSERT INTO animales (nombre, tipo, genero, edad, region, descripcion, imagen) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [nombre, tipo, genero, edad, region, descripcion, imagen]
    );
    
    res.status(201).json({ 
      message: 'Animal creado exitosamente', 
      id: result.rows[0].id 
    });
  } catch (error) {
    console.error('Error al crear animal:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Actualizar un animal
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, tipo, genero, edad, region, descripcion, imagen } = req.body;
    
    const result = await pool.query(
      'UPDATE animales SET nombre = $1, tipo = $2, genero = $3, edad = $4, region = $5, descripcion = $6, imagen = $7 WHERE id = $8 RETURNING id',
      [nombre, tipo, genero, edad, region, descripcion, imagen, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Animal no encontrado' });
    }
    
    res.json({ message: 'Animal actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar animal:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Eliminar un animal
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM animales WHERE id = $1 RETURNING id',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Animal no encontrado' });
    }
    
    res.json({ message: 'Animal eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar animal:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;