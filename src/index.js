const mongoose = require('mongoose');
const app = require('./app');

module.exports = (async() => {
    try {
        await mongoose.connect('mongodb+srv://HotaruV2:m1h4ru@cluster0.xduh9.mongodb.net/blog_hospital', {
            
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    } catch (error) {
        console.log(error)
    }
    console.log("La Conexion a la base de datos MONGO DB se ha realizado con exito");
    //crear el servidor
    app.set('port', process.env.PORT || 3000);
    app.listen(app.get('port'), () => console.log("Escuchando en el puerto ", app.get('port')))
})();

/*Configuracion de base de datos
user: hospital_db
pass: nvhxJnZdawmsClu2

*/
