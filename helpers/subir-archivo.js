const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionesValidas = [ 'png', 'jpg', 'gif', 'jpeg' ], carpeta = '' ) => {


	return new Promise( (resolve, reject ) => {
	//el nombre del archivo que quiero subir
	const { archivo } = files;


	const nombreCortado = archivo.name.split('.');
	const extension = nombreCortado[ nombreCortado.length - 1 ];

	//validar la extension
	// const extensionesValidas = [ 'png', 'jpg', 'gif', 'jpeg' ];

	if ( !extensionesValidas.includes( extension ) ) {
		return reject(`La extensión ${ extension } no es permitida: ${ extensionesValidas }.`);
	}

	//renombramos el archivo con el id que genera uuid
	const nombreTemp = uuidv4() + '.' + extension;

	//ruta donde va a ir el archivo que quiero subir usamos el path.join para unir la ruta del archivo
	const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);
  
	archivo.mv(uploadPath, (err) => {
	  	if (err) {
			return reject(err);
	  	}
  
		resolve( nombreTemp );

		});

	});

}



module.exports = {
	subirArchivo
}