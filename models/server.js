const express = require('express');
const cors = require('cors');




class Server {

	constructor () {
		this.app = express();
		this.port = process.env.PORT;
		this.usuariosPath = '/api/usuarios';

		
		//middlewares
		this.middlewares();
		
		//llamo mis rutas
		this.routes();

	}

	//metodo para middlewares
	middlewares () {

		//CORS
		this.app.use(cors());

		//lectura y parseo del body
		this.app.use( express.json() );

		//directorio público
		this.app.use( express.static('public') );
	}

	//creo un metodo para las rutas
	routes() {
		
		this.app.use(this.usuariosPath, require('../routes/usuarios'));


	}
	//listo el puerto
	listen() {
		this.app.listen( this.port, ()=> {
			console.log('server runing in port: ', this.port);
		});
	}

}

module.exports = Server;