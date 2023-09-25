const { default: mongoose } = require('mongoose');

const datosOEE = mongoose.model('datosCalculadosOEE', new mongoose.Schema({
  disponibilidad: Number,
  rendimiento: Number,
  calidad: Number,
  turno: Number,
  },{
    versionKey: false,
    timestamps: true
  }))
  
  module.exports = datosOEE;