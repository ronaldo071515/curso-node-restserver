const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');


class Server {

	constructor () {
		this.app = express();
		this.port = process.env.PORT;
		this.usuariosPath = '/api/usuarios';
		this.authPath = '/api/auth';


		//Conectar a bd mongoDB
		this.conectarDB();
		
		//middlewares
		this.middlewares();
		
		//llamo mis rutas
		this.routes();

	}

	async conectarDB() {
		await dbConection()
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
		this.app.use(this.authPath, require('../routes/auth'));
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