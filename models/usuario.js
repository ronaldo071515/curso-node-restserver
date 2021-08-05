const { Schema, model } = require('mongoose');



const UsuarioSchema = Schema({
	nombre: {
		type: String,
		required: [true, 'El nombre es obligatorio']
	},
	correo: {
		type: String,
		require: [true, 'El correo es obligatorio'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'La contraseña es obligatorio'],
	},
	img: {
		type: String,
	},
	rol: {
		type: String,
		required: true
	},
	estado: {
		type: Boolean,
		default: true
	},
	google: {
		type: Boolean,
		default: false
	}
});


//usamos una funcion normal por que se usará el this. y no funcion 
//de flecha por que esta retiene el this fuera de la estructura

UsuarioSchema.methods.toJSON = function () {

	//con esta opcion lo que hago es sacar algunas propiedades el objeto
	//y usamos el operador res(...) para unificarlos en uno solo y se llamara usuario
	const { __v, password, ...usuario } = this.toObject();
	return usuario;
}


module.exports = model('Usuario', UsuarioSchema);