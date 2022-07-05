import response from 'express';
import Usuario from '../models/usuario';
import Hospital from '../models/hospital';
import Medico from '../models/medicos';


const BusquedaController = {
    buscarTodo: async(req, res = response) => {
        const busqueda = req.params.busqueda;
        const regex = new RegExp(busqueda, 'i')
        const [usuarios, medicos, hospitales] = await Promise.all([
            Usuario.find({ nombre: regex }),
            Medico.find({ nombre: regex }),
            Hospital.find({ nombre: regex }),
        ])

        res.status(200).json({
            ok: true,
            usuarios,
            medicos,
            hospitales,
        })
    },
    buscarDocumentos: async(req, res = response) => {
        const tabla = req.params.tabla
        const busqueda = req.params.busqueda;
        const regex = new RegExp(busqueda, 'i')
        let data = [];

        switch (tabla) {
            case 'medicos':
                data = await Medico.find({ nombre: regex }).populate('usuario', 'nombre img').populate('hospital', 'nombre img')
                break;
            case 'hospitales':
                data = await Hospital.find({ nombre: regex }).populate('usuario', 'nombre img')
                break;
            case 'usuarios':
                data = await Usuario.find({ nombre: regex })

                break;
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'parametro de busqueda incorrecto'
                });
        }

        res.status(200).json({
            ok: true,
            resultado: data
        })
    }
}


module.exports = BusquedaController;