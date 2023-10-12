// DBA to read
let dbNr = 54; //database de plc para leer
let bytesSize= 27 //tamaño del offset db
let dbVars = [];
for(let i=0; i<bytesSize; i++){
    dbVars.push({type: "BYTE" , start: i}); //cantidad de bytes para leer
}

module.exports = {dbNr,dbVars};