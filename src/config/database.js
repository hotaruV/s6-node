const mongoose = require('mongoose');

const dbConect = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })
        console.log("Conexion a base de datos Exitosa!");
    } catch (error) {
        console.log("Error", error);
    }

}
module.exports = {dbConect}
