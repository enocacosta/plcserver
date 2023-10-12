const { default: mongoose } = require('mongoose');

const datosDbBuffer = mongoose.model('datos', new mongoose.Schema({
    array: String,
  },{
    versionKey: false,
    timestamps: true
  }))
  
  module.exports = datosDbBuffer;