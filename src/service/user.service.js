const { pool } = require("../database/db");
const { handleDatabaseError } = require("../error/message");

async function getUsersService(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows)
    } catch (error) {
        console.log(error)
        handleDatabaseError(error)
    }
}

async function getUserById(id) {
    try {
        const [row] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
        return row
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        handleDatabaseError(error)
    }
}

async function getUserByUsername(username) {
    try {
        const [row] = await pool.query('SELECT * FROM users WHERE username =?', [username])
        return row
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        handleDatabaseError(error)

    }
}

async function createUserService(username, password, email) {
    try {
        const result = await pool.query('INSERT INTO users (username,password,email) VALUES (?,?,?)', [username, password, email])
        return { id: result.insertId, message: 'Usuario  creado con exito' }

    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        handleDatabaseError(error)
    }
}

module.exports = { createUserService, getUserByUsername, getUserById, getUsersService }



