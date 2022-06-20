const mongoose = require('mongoose');
const dbConect = async () => {
    try {
        //await mongoose.connect(`mongodb://${process.env.USERMONGO}:${process.env.PASSWORDMONGO}@${process.env.HOSTMONGO}:27017`, {
        //await mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE}`, {
        await mongoose.connect(`mongodb+srv://${process.env.USERMONGO}:${process.env.PASSWORDMONGO}@cluster0.xduh9.mongodb.net`, {
            dbName: process.env.DATABASE,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("La Conexion a la base de datos MONGO DB se ha realizado con exito");
    } catch (error) {
        console.log(error)
    }
};

module.exports = {dbConect}