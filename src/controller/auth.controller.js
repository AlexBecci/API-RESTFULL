const { createUserService, getUserByUsername } = require('../service/user.service')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { SECRET_KEY, NODE_ENV } = require('../config/server');

async function register(req, res) {
    const { username, password, email } = req.body

    if (!username || !password || !email) {
        return res.status(400).json({
            message: "TODOS LOS CAMPOS (email, username,password) SON REQUERIDOS"
        })
    }
    const valid = await usernameIsValid(username)
    if (!valid) {
        console.log('retornar mensaje de usuario repetido')
        return res.status(409).json({
            message: "El usuario ingresado ya esta en uso"
        })
    }
    console.log(req.body)
    try {
        // Encriptar la contraseña
        const hash = await bcrypt.hash(password, 10);
        console.log(hash);
        const result = await createUserService(username, hash, email);
        return res.status(201).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error en la creacion del user en la base de datos" })

    }
}
//LOGOUT
function logout(req, res) {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'Strict'
    })
    res.status(200).json({ message: 'Logout successful' });
}


async function login(req, res) {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({
            message: "TODOS LOS CAMPOS username,password) SON REQUERIDOS"
        })
    }
    try {
        const hash = await bcrypt.hash(password, 10);
        console.log('hash', hash)
        //llamando al service de auth para pasarle username y password(hash)
        const userFound = await getUserByUsername(username);
        if (userFound.length <= 0) {
            console.log('No encontro user:', userFound)
            return res.status(404).json({ message: "No se encontro usuario con esas credenciales" })
        }
        console.log('econtro', userFound[0], 'contra', userFound[0].password)
        //implementacion con cookies
        const isMatch = await comparePasswords(password, userFound[0].password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Nombre de usuario o Contraseña invalida ' });
        }
        //generamos el token
        const token = jwt.sign({ id: userFound[0].id, username: userFound[0].username }, SECRET_KEY, { expiresIn: '4h' })
        //variable de tiempo
        const fourHoursInMs = 4 * 3600000; // 4 horas en milisegundos
        //configurar opciones de la cookie
        const cookieOptions = {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: fourHoursInMs
        }
        //enviar la cookie con el token
        res.cookie('authToken', token, cookieOptions)
        res.status(200).json({ message: 'Login successful', token: token, cookie: cookieOptions, userId: userFound[0].id });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//comparar la contrasena con el hash almacenado
async function comparePasswords(password, nativePassword) {
    const boolean = await bcrypt.compare(password, nativePassword)
    return boolean
}
async function usernameIsValid(username) {
    try {
        const result = await getUserByUsername(username);
        if (result.length > 0) {
            console.log('encontro user:', result)
            return false
        }
        console.log('username valido', result)
        return true
    } catch (error) {
        console.log(error)
    }
}



function authenticateToken(req, res, next) {
    // Intentar obtener el token de las cookies
    let token = req.cookies.authToken;

    // Si no está en las cookies, intenta obtenerlo desde el header Authorization
    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1]; // Extrae el token del header
        }
    }

    // Si no hay token, devuelve un error 401
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Verificar el token
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.log("Error de verificación de token:", err);
            return res.status(403).json({ message: "Invalid token" });
        }

        // Adjuntar el usuario al objeto de request
        req.user = user;
        next();
    });
}


//funcion vieja
/* function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('token: ', token, 'header', authHeader)
    if (token == null) {
        return res.sendStatus(401)
    }
    jwt.verify(token, 'your_secret_key', (err, user) => {
        console.log(err, user)
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next()
    })
} */
module.exports = {
    register,
    login,
    authenticateToken,
    logout
}