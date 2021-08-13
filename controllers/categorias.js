const { Categoria } = require("../models");



const crearCategoria = async (req, res) => {

	const nombre = req.body.nombre.toUpperCase();

	const categoriaDB = await Categoria.findOne({ nombre });

	if ( categoriaDB ) {
		return res.status(400).json({
			msg: `La categoria ${ categoriaDB.nombre } ya existe`
		})
	}

	//generar la data que quiero guardar
	const data = {
		nombre,
		usuario: req.usuario._id
	}

	const categoria = new Categoria( data );
	await categoria.save();
	
	res.status(201).json({
		categoria
	});

}

const getCategorias = async(req, res) => {

	const query = { estado: true };

	const { limite = 5, desde = 0 } = req.query;

	const [total, categorias] = await Promise.all([
		Categoria.countDocuments(query),
		Categoria.find(query)
			.skip( Number(desde) )
			.limit( Number(limite) )
			.populate({
				path: 'usuario',
				select: 'nombre'
			})
	]);

	res.status(200).json({
		total,
		categorias
	});
}

const getCategoria = async(req, res) => {

	//const query = { estado: true };
	const { id } = req.params;

	const categoria = await Categoria.findById( id ).populate({
		path: 'usuario',
		select: 'nombre'
	});

	res.status(200).json({
		categoria
	});

}

const actualizarCategoria = async(req, res) => {

	const { id } = req.params;
	const { estado, usuario, ...data } = req.body;
	data.nombre = data.nombre.toUpperCase();
	data.usuario = req.usuario._id;

	const categoriaactualizada = await Categoria.findByIdAndUpdate(id, data, { new: true });

	res.status(201).json(categoriaactualizada);

}

const eliminarCategoria = async(req, res) => {

	const { id } = req.params;
	//mandamos el { new: true }, para que se miren los cambios reflejados 
	const categoriaEliminada = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true } );

	res.status(200).json(categoriaEliminada);

}


module.exports = {
	actualizarCategoria,
	crearCategoria,
	eliminarCategoria,
	getCategorias,
	getCategoria
}