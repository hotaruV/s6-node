import mongoose from "mongoose";
const dbConect = async () => {
  try {
    // await mongoose.connect(`mongodb://${process.env.USERMONGO}:${process.env.PASSWORDMONGO}@${process.env.HOSTMONGO}`, {
    await mongoose.connect(
      `${process.env.MONGOSERV}://${process.env.USERMONGO}:${process.env.PASSWORDMONGO}@${process.env.HOSTMONGO}`,
      {
        dbName: process.env.DATABASE,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(
      "La Conexion a la base de datos MONGO DB se ha realizado con exito"
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { dbConect };
