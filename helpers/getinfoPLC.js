const { S7Client } = require('node-snap7');
const s7client = new S7Client();
const multiVars = require('../model/modeloRequest')

s7client.ReadMultiVars(multiVars, function(err,result){
    console.log("callback");
    if (err) {
        console.log(err);
    }
    console.log("lectura3");
    console.log(result);
})