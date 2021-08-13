const { Router } = require('express');
const { check } = require('express-validator');


const { crearProducto,
	getProductos,
	getProducto,
	actualizarProducto,
	eliminarProducto 
} = require('../controllers/productos');

const { existeCategoriaID, existeProducto } = require('../helpers/db-validatos');
const { validarJWT,
		validarCampos, 
		esAdminRol} = require('../middlewares');


const router = new Router();


router.get('/', getProductos);

router.get('/:id', [
	check('id', 'No es un ID Válido').isMongoId(),
	check('id').custom( existeProducto ),
	validarCampos
], getProducto);

router.post('/', [validarJWT,
	check('nombre', 'nombre es obligatorio').not().isEmpty(),
	check('categoria', 'no es mongo id').isMongoId(), 
	check('categoria').custom( existeCategoriaID ),
	validarCampos,
], crearProducto);

router.put('/:id', [
	validarJWT,
	check('id', 'No es un ID válido').isMongoId(),
	check('id').custom( existeProducto ),
	validarCampos
], actualizarProducto);

router.delete('/:id', [
	validarJWT,
	esAdminRol,
	check('id', 'No es un ID válido').isMongoId(),
	check('id').custom( existeProducto ),
	validarCampos
], eliminarProducto);


module.exports = router

