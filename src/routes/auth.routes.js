const { Router } = require('express')
const { register, login, logout, authenticateToken } = require('../controller/auth.controller')

const router = Router()


router.post('/register', register)

router.post('/login', login)

router.post('/logout', logout)

router.get('/check_session', authenticateToken)


module.exports = router