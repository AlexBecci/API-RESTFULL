const { pool } = require("../database/db");
const { handleDatabaseError } = require("../error/message");


//inicializacion de la clase RegistrosService

class RegistersService {
    //GET /items → Obtener todos los registros
    async getRegisters() {
        try {
            const [rows] = await pool.query('SELECT * FROM registros')
            return rows
        } catch (error) {
            handleDatabaseError(error)
        }
    }

    //GET /items/{id} → Obtener un registro por ID.
    async getRegister(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM registros WHERE id=?', [id])
            return rows.length ? rows[0] : null;
        } catch (error) {
            handleDatabaseError(error)

        }
    }

    // POST /items → Crear un nuevo registro
    async createRegister({ nombre, email, telefono, direccion, fecha_nacimiento, estado }) {
        try {
            const [result] = await pool.query(
                "INSERT INTO registros (nombre, email, telefono, direccion, fecha_nacimiento, estado) VALUES (?, ?, ?, ?, ?, ?)",
                [nombre, email, telefono, direccion, fecha_nacimiento, estado]
            );
            return { id: result.insertId, nombre, email, telefono, direccion, fecha_nacimiento, estado };
        } catch (error) {
            handleDatabaseError(error);
        }
    }

    // PUT /items/{id} → Actualizar un registro existente
    async updateRegister(id, { nombre, email, telefono, direccion, fecha_nacimiento, estado }) {
        try {
            const [result] = await pool.query(
                "UPDATE registros SET nombre = ?, email = ?, telefono = ?, direccion = ?, fecha_nacimiento = ?, estado = ? WHERE id = ?",
                [nombre, email, telefono, direccion, fecha_nacimiento, estado, id]
            );
            return result.affectedRows > 0 ? { id, nombre, email, telefono, direccion, fecha_nacimiento, estado } : null;
        } catch (error) {
            handleDatabaseError(error);
        }
    }

    // DELETE /items/{id} → Eliminar un registro
    async deleteRegister(id) {
        try {
            const [result] = await pool.query("DELETE FROM registros WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            handleDatabaseError(error);
        }
    }
}

module.exports = { RegistersService }