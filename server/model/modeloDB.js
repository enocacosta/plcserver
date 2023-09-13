const { default: mongoose } = require('mongoose');

const datosDb = mongoose.model('datosOEE', new mongoose.Schema({
  contador2: Number,
  contador1: Number,
  fallosSobre: Number,
  fallosManual: Number,
  estadoMaquina: Number,
  },{
    versionKey: false,
    timestamps: true
  }))
  
  module.exports = datosDb;