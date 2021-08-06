const { response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');


const login = async(req, res) => {

	const { correo, password } = req.body;

	try {

		//verificar si email existe
		const usuario = await Usuario.findOne({ correo });
		if ( !usuario ) {
			return res.status(400).json({
				msg: 'Usuario / Constraseña no son correctos - email'
			});
		} 

		//si el usuario esta activo
		if ( !usuario.estado ) {
			return res.status(400).json({
				msg: 'Usuario / Constraseña no son correctos - estado:false'
			});
		}

		//verificar password
		const validPassword = bcryptjs.compareSync( password, usuario.password );
		if ( !validPassword ) {
			return res.status(400).json({
				msg: 'Usuario / Constraseña no son correctos - password'
			});
		}

		//generar JWT
		//grabamos en el payload el user.id y va a trabajar en base a promesas
		const token = await generarJWT( usuario.id );

		res.json({
			usuario,
			token
		});
		
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Por favor contacte al administrador'
		});
	}

}


module.exports = {
	login
}