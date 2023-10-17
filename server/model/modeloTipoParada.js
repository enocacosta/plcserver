const { default: mongoose } = require('mongoose');

const datosTipoParada = mongoose.model('datosTipoParada', new mongoose.Schema({
  tipoParada: Number,
  tiempo: Number,
  turno: Number,
  },{
    versionKey: false,
    timestamps: true
  }))
  
  module.exports = datosTipoParada;