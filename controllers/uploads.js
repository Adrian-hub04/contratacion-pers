const path = require('path');
const fs = require('fs');
const {subirArchivo} = require('../helpers/subir-archivo');
const Candidatos = require('../models/candidatos');
const Contratos = require('../models/contrato');
const Empleados = require('../models/empleados');
const cargarArchivo = async (req, res) =>{
  
  try {
    
    // const nombre = await subirArchivo(req.files, ['PNG','jpg'], 'img');
    const nombre = await subirArchivo(req.files, undefined, 'cv');
    res.json({nombre});
  } catch (error) {
    res.status(400).json({error})
  }
}

const actualizarArchivo = async (req, res) =>{
  const {uuid, coleccion} = req.params;

  let modelo;
  switch (coleccion) {
    case 'candidatos':
      modelo = await Candidatos.findByPk(uuid);
      if (!modelo) {
        return res.status(404).json({msg: `No existe un candidato con el id: ${uuid}`});
      }
      
      break;
      case 'empleados':
      modelo = await Empleados.findByPk(uuid);
      if (!modelo) {
        return res.status(404).json({msg: `No existe un empleado con el id: ${uuid}`});
      }
      
      break;
    default:
      return res.status(500).json({msg: 'Validar esta seccion'});
  }

  // Limpiar archivos previos
  modelo = await Candidatos.documento;
  if (modelo) {
    const pathArchivo = path.join(__dirname, '../uploads', coleccion, modelo);
    if (fs.existsSync(pathArchivo)) {
      fs.unlinkSync(pathArchivo);
      
    }
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.documento = nombre;
  await modelo.save();
  res.json(modelo);

}

const mostrarDocumento = (req, res) => {
  const {uuid, coleccion} = req.params;

  res.json({id, coleccion});
}

module.exports = {
    cargarArchivo,
    actualizarArchivo,
    mostrarDocumento
}