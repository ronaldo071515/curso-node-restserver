const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const getUsuarios = async(req, res = response) => {

	//const { q, nombre = 'no name', apiKey, page = '1', limit } = req.query;

	const query = { estado: true };

	const { limite = 5, desde = 0 } = req.query;
/* 	const usuarios = await Usuario.find(query)
		.skip( Number(desde) )
		.limit( Number(limite) );

	const total = await Usuario.countDocuments(query); */

	const [total, usuarios] = await Promise.all([
		Usuario.countDocuments(query),
		Usuario.find(query)
			.skip( Number(desde) )
			.limit( Number(limite) )
	])

	res.json({
		total,
		usuarios
	});
}

const putUsuarios = async(req, res) => {

	const { id } = req.params;
	const { _id, password, google, correo, ...resto } = req.body;

	//TODO: Validar contra base de datos

	if ( password ) {
		//Encriptar la contraseña
		const salt = bcryptjs.genSaltSync();
		resto.password = bcryptjs.hashSync( password, salt);
	}
	//actualizar este registro usando el modelo Usuario y usamos findByIdAndUpdate()
	const usuario = await Usuario.findByIdAndUpdate( id, resto );

	res.json(usuario);
}

const postUsuarios = async(req, res) => {

	const { nombre, correo, password, rol } = req.body;
	const usuario = new Usuario( {
		nombre,
		correo,
		password,
		rol
	} );


	//Encriptar la contraseña
	const salt = bcryptjs.genSaltSync();
	usuario.password = bcryptjs.hashSync( password, salt);


	//guardar en la base de datos
	await usuario.save();

	res.json({
		msg: 'Usuario creado correctamente',
		usuario
	});
}

const deleteUsuarios = async(req, res) => {

	const { id } = req.params;
	//extraigo el uid que biene en el request.uid
/* 	const uid = req.uid; */

	//Fisicamente lo borramos
	/* const usuario = await Usuario.findByIdAndDelete(id); */
	//Eliminar de forma segura para no perder la entidad referencial en la bd
	const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

	res.json(usuario);
}

const patchUsuarios = (req, res) => {

	res.json({
		msg: 'PATCH sucessfully - Controller'
	});
}


module.exports = {
	getUsuarios,
	putUsuarios,
	postUsuarios,
	deleteUsuarios,
	patchUsuarios
}