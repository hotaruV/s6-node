import { Schema, Model, model } from 'mongoose';
const cfdiSchema = new Schema({
    clave: { type: String},
    descripcion: { type: String },
    palabras_similares: { type: String },  
});

cfdiSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    return object;
  });
module.exports = model("productos_servicios", cfdiSchema);