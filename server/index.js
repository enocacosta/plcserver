const express = require('express')
const cors = require('cors');
const app = express();
const connectionPLC = require('./config/conexionPLC')
const getinforPLC = require('./helpers/getinfoPLC')
const setParam = require('./helpers/setParam')

setParam();
connectionPLC()
const result = getinforPLC();
getinforPLC()
console.log(result);
app.use(cors());

// const s7client = new snap7.S7Client();

// s7client.ConnectTo('192.168.1.10', 0, 2, function(err) {
//     if(err) {
//         return console.log(' >> Connection failed. Code #' + err + ' - ' + s7client.ErrorText(err));
//     }else{
//         console.log('Connection succesful');
//     }
// }); 

// Read the first byte from PLC process outputs...
// setInterval(function(){
//     s7client.ReadArea(s7client.S7AreaDB, 14 , 0, 14, s7client.S7WLBit,function (err, buf) {
//         if (err) {
//             console.log(err);
//         }
//         console.log("Lectura 1");
//         console.log(buf);
//         })   
// },5000); 

// // Read the first byte from PLC process outputs... leer un solo byte
// setInterval(function(){
//     s7client.ReadArea(s7client.S7AreaDB, 13 , 16, 1, s7client.S7WLBit,function (err, buf1) {
//         if (err) {
//             console.log(err);
//         }
//         console.log("Lectura 2");
//         console.log(buf1);
//         })   
// },5000); 



