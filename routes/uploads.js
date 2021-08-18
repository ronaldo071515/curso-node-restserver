const { Router } = require('express');
const { check } = require('express-validator');


const { cargarArchivo,
	actualizarImagen,
	mostrarImagen, 
	actualizarImagenCloudinary} = require('../controllers/uploads');
const { coleccinesPermitidas } = require('../helpers');

const { validarCampos, validarArchivoSubir } = require('../middlewares');


const router = Router();

router.get('/:coleccion/:id', [
	check('id', 'El id debe ser de mongo').isMongoId(),
	check('coleccion').custom(c => coleccinesPermitidas( c, [ 'usuarios', 'productos' ] )),
	validarCampos
], mostrarImagen);

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
	validarArchivoSubir,
	check('id', 'El id debe ser de mongo').isMongoId(),
	check('coleccion').custom(c => coleccinesPermitidas( c, [ 'usuarios', 'productos' ] )),
	validarCampos
],
actualizarImagenCloudinary);
//actualizarImagen);


module.exports = router;