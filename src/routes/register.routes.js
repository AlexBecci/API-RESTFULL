const { Router } = require('express');
const { RegisterController } = require('../controller/register.controller');
const swaggerJSDoc = require('swagger-jsdoc');
const { swaggerOptions } = require('../config/swagger');
const swaggerUi = require('swagger-ui-express');
const { authenticateToken } = require('../controller/auth.controller');
const registerController = new RegisterController();
const router = Router()

//instanciamos swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions)
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

/**
 * @swagger
 * /registers:
 *   get:
 *     summary: Obtiene todos los registros
 *     description: Retorna una lista de registros
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de registros obtenida correctamente
 *       204:
 *         description: No se encontraron registros
 *       500:
 *         description: Error en el servidor
 */
router.get('/registers', authenticateToken, registerController.getRegisters);
/**
 * @swagger
 * /registers/{id}:
 *   get:
 *     summary: Obtiene un registro por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del registro
 *     responses:
 *       200:
 *         description: Registro encontrado
 *       400:
 *         description: ID requerido
 *       404:
 *         description: No se encontró el registro
 *       500:
 *         description: Error en el servidor
 */
router.get('/registers/:id', authenticateToken, registerController.getRegister);
/**
 * @swagger
 * /registers:
 *   post:
 *     summary: Crea un nuevo registro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registro creado exitosamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error en el servidor
 */
router.post('/registers', authenticateToken, registerController.createRegister);

/**
 * @swagger
 * /registers/{id}:
 *   put:
 *     summary: Actualiza un registro por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del registro a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro actualizado correctamente
 *       400:
 *         description: Datos faltantes o ID no válido
 *       404:
 *         description: No se encontró el registro
 *       500:
 *         description: Error en el servidor
 */
router.put('/registers/:id', authenticateToken, registerController.updateRegister);
/**
 * @swagger
 * /registers/{id}:
 *   delete:
 *     summary: Elimina un registro por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del registro a eliminar
 *     responses:
 *       200:
 *         description: Registro eliminado correctamente
 *       400:
 *         description: ID requerido
 *       404:
 *         description: No se encontró el registro
 *       500:
 *         description: Error en el servidor
 */
router.delete('/registers/:id', authenticateToken, registerController.deleteRegister);

module.exports = router
