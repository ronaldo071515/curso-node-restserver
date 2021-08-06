const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { login } = require('../controllers/auth');


const router = Router();

router.post('/login', [
	check('correo', 'el correo es oblogatorio').isEmail(),
	check('password', 'la contraseña es obligatoria').not().isEmpty(),
	validarCampos
],
login);





module.exports = router;