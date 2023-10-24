const { default: mongoose } = require('mongoose');

const datosRechazos = mongoose.model('datosRechazos', new mongoose.Schema({
  fecha: String,
  turno: Number,
  cantidad: Number,
  },{
    versionKey: false,
    timestamps: true
  }))
  
  module.exports = datosRechazos;