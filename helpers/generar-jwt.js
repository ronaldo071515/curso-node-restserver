const jwt = require('jsonwebtoken');



const generarJWT = ( uid = '' ) => {

	return new Promise( (resolve, reject) => {

		const payload = { uid };

		//firmar un nuevo token es jwt.sign()
		jwt.sign( payload, process.env.CRYPTOKEY, {
			expiresIn: '4h'
		}, ( err, token ) => {
			if ( err ) {
				console.log(err);
				reject('No se pudo generar el token');
			} else {
				resolve( token );
			}
		});
	});

}





module.exports = {
	generarJWT
};