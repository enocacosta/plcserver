
// DBA to read
let dbNr = 14; //database de plc para leer
let dbVars = [];
for(let i=0; i<14; i++){
    dbVars.push({type: "BYTE" , start: i}); //cantidad de bytes para leer
}

module.exports = {dbNr,dbVars};