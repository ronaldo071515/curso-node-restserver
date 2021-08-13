const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');


class Server {

	constructor () {
		this.app = express();
		this.port = process.env.PORT;

		this.paths = {
			authPath: '/api/auth',
			buscarPath: '/api/buscar',
			categoriasPath: '/api/categorias',
			productosPath: '/api/productos',
			usuariosPath: '/api/usuarios'
		}


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
		this.app.use(this.paths.authPath, require('../routes/auth'));
		this.app.use(this.paths.buscarPath, require('../routes/buscar'));
		this.app.use(this.paths.categoriasPath, require('../routes/categorias'));
		this.app.use(this.paths.usuariosPath, require('../routes/usuarios'));
		this.app.use(this.paths.productosPath, require('../routes/productos'));
	}
	
	//listo el puerto
	listen() {
		this.app.listen( this.port, ()=> {
			console.log('server runing in port: ', this.port);
		});
	}

}

module.exports = Server;