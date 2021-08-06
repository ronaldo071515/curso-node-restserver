const { request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async(req = request, res, next) => {

	const token = req.header('x-token');

	if ( !token ) {
		return res.status(401).json({
			msg: 'No hay token en la petición'
		})
	}

	try {

		const { uid } = jwt.verify( token, process.env.CRYPTOKEY );
		//leer modelo de la bd
		const usuario = await Usuario.findById(uid);

		if (!usuario) {
			return res.status(401).json({
				msg: 'Token no válido - Usuario no existe en DB'
			})			
		}

		//verificar si uid tiene estado en true
		if (!usuario.estado) {
			return res.status(401).json({
				msg: 'Token no válido - Usuario con estado: false'
			})
		}


		req.usuario = usuario;

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			msg: 'Token no válido'
		})
	}

}



module.exports = {
	validarJWT
}