const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { login, google } = require('../controllers/auth');


const router = Router();

router.post('/login', [
	check('correo', 'el correo es oblogatorio').isEmail(),
	check('password', 'la contraseña es obligatoria').not().isEmpty(),
	validarCampos
],
login);


router.post('/google', [
	check('id_token', 'el id token es necesario').not().isEmpty(),
	validarCampos
],
google);







module.exports = router;