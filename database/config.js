const mongoose = require('mongoose');


const dbConection = async() => {

	try {

		await mongoose.connect( process.env.MONGODB_CNN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});

		console.log('Base de datos online');
		
	} catch (error) {
		console.log(error);
		throw new Error('the bd not exist in cloud');
	}

}


module.exports = {
	dbConection
}