const { Categoria, Producto, Usuario } = require('../models');
const Role = require('../models/role');

const esRolValido = async(rol = '' ) => {
	const existeRol = await Role.findOne({ rol });
	if (!existeRol) {
		throw new Error(`El rol ${ rol } no esta registrado en la bd`);
	}
}


//verificar si el correo existe
const existeEmail = async(correo = '') => {
	const existeEmailInBD = await Usuario.findOne({ correo });
	if ( existeEmailInBD ) {
		throw new Error(`El correo ${ correo } ya existe en la bd`);
/* 		return res.status(400).json({ 
			msg: 'El correo ya existe'
		 }); */
	}
}

//validación para el id si existe
const validarId = async( id ) => {
	const existeUsuarioPorId = await Usuario.findById(id);
	if ( !existeUsuarioPorId ) {
		throw new Error(`El id: ${ id }, no existe`);
	}
}

const existeCategoriaID = async( id ) => {
	const existeCategoriaPorId = await Categoria.findById(id);
	if ( !existeCategoriaPorId ) {
		throw new Error(`El id: ${ id }, no existe`);
	}
}

const existeProducto = async( id ) => {
	const existeProductoPorId = await Producto.findById(id);
	if ( !existeProductoPorId ) {
		throw new Error(`El id: ${ id }, no existe `);
	}
}



module.exports = {
	esRolValido,
	existeEmail,
	validarId,
	existeCategoriaID,
	existeProducto
}