const { default: mongoose } = require('mongoose');

const datosDb = mongoose.model('datos', new mongoose.Schema({
    hora: String,
    cMalos: String,
    cBidones: String,
  },{
    versionKey: false,
    timestamps: true
  }))
  
  module.exports = datosDb;