const { Router } = require('express');
const { check } = require('express-validator');


const { crearCategoria, 
	getCategorias, 
	getCategoria, 
	actualizarCategoria, 
	eliminarCategoria 
} = require('../controllers/categorias');

const { existeCategoriaID } = require('../helpers/db-validatos');

const {
	validarJWT, 
	validarCampos, 
	esAdminRol
} = require('../middlewares');


const router = Router();


//obtener todas las categorias -público
router.get('/', getCategorias);


//obtener una categoria por id -público
router.get('/:id', [ 
	check('id', 'No es un ID Válido').isMongoId(),
	check('id').custom( existeCategoriaID ),
	validarCampos
 ], getCategoria);


//crear una categoria - privado - cualquier persona con token válido
router.post('/', [ validarJWT,
	check('nombre', 'nombre es obligatorio').not().isEmpty(),
	validarCampos
], crearCategoria);

//Actualizar categoría - privado - cualquier persona con token válido
router.put('/:id', [
	validarJWT,
	check('id', 'No es un ID válido').isMongoId(),
	check('id').custom( existeCategoriaID ),
	check('nombre', 'nombre es obligatorio').not().isEmpty(),
	validarCampos
], actualizarCategoria);


//ELiminar categoría - privado - Admin
router.delete('/:id', [
	validarJWT,
	esAdminRol,
	check('id', 'No es un ID válido').isMongoId(),
	check('id').custom( existeCategoriaID ),
	validarCampos
], eliminarCategoria);





module.exports = router;