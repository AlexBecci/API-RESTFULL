const express = require('express')
const morgan = require('morgan')
const app = express()
const path = require('path')
const cors = require('cors')
//requerimos la libreria
const cookieParser = require('cookie-parser')
//importamos la conexion a la  base de datos
const { testConnection } = require('./database/db')

//llamando a las routes
const UserRoutes = require('./routes/user.routes')
const RegisterRoutes = require('./routes/register.routes')
const AuthRoutes = require('./routes/auth.routes')
const { authenticateToken } = require('./controller/auth.controller')

//cors modificado
const corsOptions = {
    origin: 'http://localhost:5173',  // Especifica directamente la URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas,
    credentials: true, // Permitir cookies y credenciales
}
//settings

//middlewares
app.use(express.json())
app.use(cookieParser()); // Añadir middleware de cookie-parser
app.use(morgan('dev'))
// Configuración de CORS
app.use(cors(corsOptions))  // Usa el middleware cors

//server static files from public directory
app.use(express.static('src/public'))

// Montar rutas con el prefijo /api
app.use('/api', AuthRoutes)
app.use('/api', RegisterRoutes)
app.use('/api', authenticateToken, UserRoutes)

//probar la conexion y luego levantar el servidor
async function startServer() {
    try {
        //probar la conexion a la base de datos
        await testConnection();
        // Iniciar servidor
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        //manejar errores de conexion
        console.error("Error en la conexion a la base de datos. No se puede levantar el servidor", error)
    }
}
startServer()
