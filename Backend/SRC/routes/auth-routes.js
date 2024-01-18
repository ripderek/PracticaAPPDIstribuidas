const { Router } = require('express');
const router = Router();
const { prueba_conexion, verificaUserGoogle } = require('../controllers/Auth/auth-controller')


router.get('/Saludo', prueba_conexion);
router.post('/LoginG', verificaUserGoogle);


module.exports = router; 