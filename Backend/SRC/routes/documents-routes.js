const { Router } = require('express');
const router = Router();
const { crearDoc, lista_documentos, ver_pdf_alcance, enviar_pdf_cliente, FirmarDoc } = require('../controllers/documentos-controller')
const { uploadRes } = require('../middleware/multer-documentos');

router.get('/ListaDocs/:p_correo', lista_documentos);
router.get('/VerPDF/:id/:original', ver_pdf_alcance);
router.get('/PDF_para_firmar/:id', enviar_pdf_cliente);

router.post('/CrearDocumento', uploadRes.single('file'), crearDoc);
router.post('/DocumentoFirmado', uploadRes.single('file'), FirmarDoc);


module.exports = router; 