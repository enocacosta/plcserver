const { default: mongoose } = require('mongoose');

const datosDb = mongoose.model('datos', new mongoose.Schema({
    array: String,
  },{
    versionKey: false,
    timestamps: true
  }))
  
  module.exports = datosDb;