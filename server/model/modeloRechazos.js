const { default: mongoose } = require('mongoose');

const datosRechazos = mongoose.model('datosRechazos', new mongoose.Schema({
  fecha: Date,
  turno: Number,
  cantidad: Number,
  },{
    versionKey: false,
    timestamps: true
  }))
  
  module.exports = datosRechazos;