const mysql = require('mysql2/promise');
const { MYSQL_URL } = require('../config/server'); // Tomar directamente la URL de la configuración

// Configuración de la conexión a la base de datos usando MYSQL_URL
const pool = mysql.createPool(MYSQL_URL);

// Función para probar la conexión
async function testConnection() {
    try {
        const [rows] = await pool.query('SELECT 1');
        console.log('CONEXIÓN A LA BASE DE DATOS ESTABLECIDA CORRECTAMENTE');
        return rows;
    } catch (error) {
        console.error('Error conectando a la base de datos', error.stack);
        throw error;
    }
}

module.exports = { pool, testConnection };