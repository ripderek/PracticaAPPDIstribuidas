const { Router } = require('express');
const router = Router();
const { crearDoc } = require('../controllers/documentos-controller')
const { uploadRes } = require('../middleware/multer-documentos');

//router.get('/Saludo', prueba_conexion);
router.post('/CrearDocumento', uploadRes.single('file'), crearDoc);


module.exports = router; 