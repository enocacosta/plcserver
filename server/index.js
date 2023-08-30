const express = require('express')
const cors = require('cors');
var snap7 = require('node-snap7');
const app = express();
const conexionDB = require('./config/conexionDB');
const Modelo = require('./model/modeloDB');
require('dotenv').config();

conexionDB();
app.use(cors());


const s7client = new snap7.S7Client();
s7client.ConnectTo(process.env.IPDIR, 0, 1, function(err) {
    if(err) {
        return console.log(' >> Connection failed. Code #' + err + ' - ' + s7client.ErrorText(err));
    }else{
        console.log('Connection succesful');
    }
}); 

let array = ''

//Read the first byte from PLC process outputs...
setInterval(function(){
    s7client.ReadArea(s7client.S7AreaDB, 1 , 0, 15, s7client.S7WLByte,function (err, buf) {
        if (err) {
            console.log(err);
        }
        console.log("Lectura 1");
        console.log(buf);

        let concatenated = '';

        for(let i=0; i<15;i++){
          buffer=buf[i].toString(16);
          concatenated += buffer + ' ';
        }

        concatenated.trim();
        array = concatenated;
        console.log(concatenated);

        const newdatoModelo = new Modelo({
          array: concatenated,
        })
        
        const save = newdatoModelo.save()

        })   
},5000); 


;







