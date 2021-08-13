const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { Usuario, Categoria, Producto } = require('../models');


const coleccionesPermitidas = [
	'categorias',
	'productos',
	'roles',
	'usuarios'
];


const buscarCategorias = async( termino = '', res = response ) => {

	const esMongoID = ObjectId.isValid( termino );

	if (esMongoID) {
		const categoria = await Categoria.findById( termino );
		return res.json({
			results: ( categoria ) ? [ categoria ] : []//uso el operador ternario para evaluar si viene o no un usuario
		});
	}

	const regexp = new RegExp(termino, 'i')

	const categorias = await Categoria.find({nombre: regexp, estado: true});

	return res.json({
		results: categorias
	});

}

const buscarProductos = async( termino = '', res = response ) => {

	const esMongoID = ObjectId.isValid( termino );

	if (esMongoID) {
		const producto = await Producto.findById( termino ).populate({
			path: 'categoria',
			select: 'nombre'
		});
		return res.json({
			results: ( producto ) ? [ producto ] : []//uso el operador ternario para evaluar si viene o no un usuario
		});
	}

	//busquedas insencibles con expresion regular
	const regexp = new RegExp(termino, 'i')

	const productos = await Producto.find({ nombre: regexp, estado: true }).populate({
		path: 'categoria',
		select: 'nombre'
	});;

	return res.json({
		results: productos
	});	

}


const buscarUsuarios = async( termino = '', res = response ) => {

	const esMongoID = ObjectId.isValid( termino );

	if (esMongoID) {
		const usuario = await Usuario.findById( termino );
		return res.json({
			results: ( usuario ) ? [ usuario ] : []//uso el operador ternario para evaluar si viene o no un usuario
		});
	}

	//busquedas insencibles con expresion regular
	const regexp = new RegExp(termino, 'i')

	const usuarios = await Usuario.find({
		$or: [{ nombre: regexp }, { correo: regexp }],
		$and: [{ estado: true }]
	});

	return res.json({
		results: usuarios
	});

}


const buscar = (req, res = response) => {

	const { coleccion, termino } = req.params;

	if ( !coleccionesPermitidas.includes( coleccion ) ) {
		return res.status(400).json({
			msg: `La colecciones permitidas son: ${ coleccionesPermitidas }`
		});
	}

	switch (coleccion) {

		case 'categorias':
			buscarCategorias( termino, res );
		break;
		case 'productos':
			buscarProductos( termino, res );
		break;
		case 'usuarios':
			buscarUsuarios( termino, res );
		break;

		default:
			res.status(500).json({
				msg: 'Se me olvido hacer esta busqueda'
			});
	}
}



module.exports = {
	buscar
}