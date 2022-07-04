const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');
const fs = require('fs');

const borrarImagen = async(modelo, nameFile, tipo) => {
    const pathViejo = `./src/uploads/${tipo}/${modelo.img}`;
    const existe = fs.existsSync(pathViejo);
    if (existe) {
        fs.unlinkSync(pathViejo);
    }
    modelo.img = nameFile;
    await modelo.save();
    return true;
}


  // itemsShow: async (req, res = response) => {
  //   const id = req.params.id;
  //   let ID = getID(items, id);
  //   if (!items) {
  //     return res.status(404).json({
  //       ok: false,
  //       msg: "No existe usuario",
  //     });
  //   }
  //   res.status(200).json({
  //     items,
  //   });
  // },
  
const actualizarImagen = async(tipo, id, nameFile) => {
    switch (tipo) {

        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('Error a obtener medico');
                return false;
            }
            borrarImagen(medico, nameFile, 'medicos');
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('Error a obtener medico');
                return false;
            }
            borrarImagen(hospital, nameFile, 'hospitales');

            break;
        case 'usuarios':
            const usuarios = await Usuario.findById(id);
            if (!usuarios) {
                console.log('Error a obtener medico');
                return false;
            }
            borrarImagen(usuarios, nameFile, 'usuarios');
            break;
    }
}

module.exports = { actualizarImagen };