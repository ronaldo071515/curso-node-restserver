const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


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

const google = async(req, res) => {

	const { id_token } = req.body;

	//llamamos lafuncion de google, es una promesa
	try {
	
	const { nombre, correo, img } = await googleVerify( id_token );
	
	//verificar si el correo ya existe
	let usuario = await Usuario.findOne({ correo });

	
	if ( !usuario ) {
		//debo crearlo
		const data = {
			nombre,
			correo, 
			password: ':P',
			img,
			google: true
		}
		usuario = new Usuario( data );
		await usuario.save();//lo creamos con google 
	}

	//si el usuario en BD ya existe
	if ( !usuario.estado ) {
		return res.status(401).json({
			msg: 'Hable con el administrador, usuario bloqueado'
		});
	}

	//generamos el JWT que ya tenemos el code arriba
	const token = await generarJWT( usuario.id );
		
	res.json({
		usuario,
		token
	});

	} catch (error) {
		res.status(400).json({
			msg: 'Token Google no es válido'
		});
	}


}


module.exports = {
	login,
	google
}