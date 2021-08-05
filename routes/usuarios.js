const { Router } = require('express');
const { check } = require('express-validator');

const { esRolValido, existeEmail, validarId } = require('../helpers/db-validatos');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, 
		putUsuarios, 
		postUsuarios, 
		deleteUsuarios, 
		patchUsuarios 
	} = require('../controllers/usuarios');
	


//llamamos la funcion router
const router = Router();

router.get('/', getUsuarios);

router.put('/:id', [
	check('id', 'No es un ID Válido').isMongoId(),
	check('id').custom( validarId ),
	check('rol').custom( esRolValido ),
	validarCampos
], putUsuarios);

	/* check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']), */
router.post('/', [ 
	check('nombre', 'El nombre es obligatorio').not().isEmpty(),
	check('password', 'El password es obligatorio y mas de 6 letras').isLength({ min: 6 }),
	check('correo').custom( existeEmail ),
	check('correo', 'El correo no es válido').isEmail(),
	check('rol').custom( esRolValido ),
	validarCampos
] ,postUsuarios);

router.delete('/:id', [
	check('id', 'No es un ID Válido').isMongoId(),
	check('id').custom( validarId ),
	validarCampos
], deleteUsuarios);

router.patch('/', patchUsuarios);

module.exports = router;