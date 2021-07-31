const { response } = require('express');

const getUsuarios = (req, res = response) => {

	const { q, nombre = 'no name', apiKey, page = '1', limit } = req.query;

	res.json({
		msg: 'GET sucessfully - Controller',
		q,
		nombre,
		apiKey,
		page,
		limit
	});
}

const putUsuarios = (req, res) => {

	const { id } = req.params;

	res.status(500).json({
		msg: 'PUT sucessfully - Controller',
		id
	});
}

const postUsuarios = (req, res) => {

	const { nombre, edad } = req.body;

	res.status(201).json({
		msg: 'POST sucessfully - Controller',
		nombre, 
		edad
	});
}

const deleteUsuarios = (req, res) => {
	res.json({
		msg: 'DELETE sucessfully - Controller'
	});
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