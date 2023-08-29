const express = require('express')
const cors = require('cors');
var snap7 = require('node-snap7');
const app = express();
const conexionDB = require('./config/conexionDB');
const Modelo = require('./model/modeloDB');

conexionDB();
app.use(cors());

const s7client = new snap7.S7Client();

s7client.ConnectTo('192.168.1.10', 0, 2, function(err) {
    if(err) {
        return console.log(' >> Connection failed. Code #' + err + ' - ' + s7client.ErrorText(err));
    }else{
        console.log('Connection succesful');
    }
}); 


//Read the first byte from PLC process outputs...
setInterval(function(){
    s7client.ReadArea(s7client.S7AreaDB, 14 , 0, 14, s7client.S7WLByte,function (err, buf) {
        if (err) {
            console.log(err);
        }
        console.log("Lectura 1");
        console.log(buf);
        let array='';
        for(let i=0; i<14;i++){
          buffer=buf[i].toString(16);
          console.log(buffer);
          array += buffer + ' ';
        }
        array.trim();
        console.log(array);

        })   
},5000); 









