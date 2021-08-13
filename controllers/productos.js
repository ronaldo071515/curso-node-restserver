const { response } = require("express");
const { Producto } = require("../models");


const crearProducto = async(req, res = response ) => {
	//saco usuario y estado por que no los puedo permitir
	const { usuario, estado, ...body } = req.body;

	const productoDB = await Producto.findOne({ nombre: body.nombre });

	if ( productoDB ) {
		return res.status(400).json({
			msg: `El producto ${ productoDB.nombre } ya existe`
		})
	}

	const data = {
		...body,
		nombre: req.body.nombre.toUpperCase(),
		usuario: req.usuario._id
	}

	const producto = new Producto( data );
	await producto.save();

	res.status(201).json({
		msg: 'Producto creado correctamente',
		producto
	});

}

const getProductos = async(req, res = response) => {

	const query = { estado: true };

	const { limite = 5, desde = 0 } = req.query;

	const [total, productos] = await Promise.all([
		Producto.countDocuments(query),
		Producto.find(query)
			.skip( Number(desde) )
			.limit( Number(limite) )
			.populate({
				path: 'usuario',
				select: 'nombre'
			})
			.populate({
				path: 'categoria',
				select: 'nombre'
			})
	]);

	res.status(200).json({
		total,
		productos
	});
	
}


const getProducto = async(req, res) => {

	const { id } = req.params;

	const producto = await Producto.findById( id )
		.populate
		({
			path: 'usuario',
			select: 'nombre'
		})
		.populate
		({
			path: 'categoria',
			select: 'nombre'
		});

	res.status(200).json({
		producto
	});

}


const actualizarProducto = async(req, res) => {

	const { id } = req.params;
	const { estado, usuario, ...data } = req.body;

	if( data.nombre ){
		data.nombre = data.nombre.toUpperCase();
	}

	data.usuario = req.usuario._id;//el usuario que lo esta actualizando

	const productoActualizado = await Producto.findByIdAndUpdate(id, data, { new: true });

	res.status(201).json(productoActualizado);

}

const eliminarProducto = async(req, res) => {
	const { id } = req.params;

	const productoEliminado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

	res.status(200).json({
		productoEliminado
	})
}




module.exports = {
	actualizarProducto,
	crearProducto,
	eliminarProducto,
	getProductos,
	getProducto,
}