const { handleError } = require("../error/message");
const { RegistersService } = require("../service/register.service");

//creamos la instancia de la clase
const registerService = new RegistersService();

class RegisterController {
    //traer registros
    async getRegisters(req, res) {
        try {
            const result = await registerService.getRegisters();
            if (result.length === 0) {
                return res.json(204).json({ message: 'No se encontraron registros' })
            }
            return res.json(result)
        } catch (error) {
            handleError(res, error)
        }
    }
    //traer registro
    async getRegister(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: 'el ID es requerido' })
        }
        try {
            const result = await registerService.getRegister(id);
            if (!result) {  // Verifica si es null
                return res.status(404).json({ message: "No se encontró registro con ese ID" });
            }
            return res.json(result)
        } catch (error) {
            handleError(res, error)
        }
    }

    //crear registro
    async createRegister(req, res) {
        const { nombre, email, telefono, direccion, fecha_nacimiento, estado } = req.body;
        if (!nombre || !email || !telefono || !direccion || !fecha_nacimiento || !estado) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }
        try {
            const result = await registerService.createRegister({ nombre, email, telefono, direccion, fecha_nacimiento, estado });
            return res.status(201).json(result)
        } catch (error) {
            handleError(res, error)
        }
    }
    //delete registro
    async deleteRegister(req, res) {
        const { id } = req.params
        if (!id) {
            return res.status(404).json({ message: 'el ID es requerido' })
        }
        try {
            const register = await registerService.getRegister(id);
            if (!register) {
                return res.status(404).json({ message: 'No se encontró un registro con ese ID' });
            }
            await registerService.deleteRegister(id);
            return res.status(200).json({ message: 'Registro eliminado correctamente' });
        } catch (error) {
            handleError(res, error)
        }
    }

    //update
    async updateRegister(req, res) {
        const { id } = req.params;
        const { nombre, email, telefono, direccion, fecha_nacimiento, estado } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'El ID es requerido' });
        }
        if (!nombre || !email || !telefono || !direccion || !fecha_nacimiento || !estado) {
            return res.status(400).json({ message: 'Todos los campos son requeridos para actualizar el registro' });
        }
        try {
            const register = await registerService.getRegister(id);
            if (!register) {
                return res.status(404).json({ message: 'No se encontró un registro con ese ID' });
            }
            const updatedRegister = await registerService.updateRegister(id, { nombre, email, telefono, direccion, fecha_nacimiento, estado });
            return res.status(200).json(updatedRegister);
        } catch (error) {
            handleError(res, error);
        }
    }
}

module.exports = { RegisterController }