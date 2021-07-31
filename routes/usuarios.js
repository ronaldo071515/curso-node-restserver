


const { Router } = require('express');
const { getUsuarios, 
		putUsuarios, 
		postUsuarios, 
		deleteUsuarios, 
		patchUsuarios 
	} = require('../controllers/usuarios');


//llamamos la funcion router
const router = Router();

router.get('/', getUsuarios);

router.put('/:id', putUsuarios);

router.post('/', postUsuarios);

router.delete('/', deleteUsuarios);

router.patch('/', patchUsuarios);

module.exports = router;