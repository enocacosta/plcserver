
// DBA to read
let dbNr = 54; //database de plc para leer
let dbVars = [];
for(let i=0; i<26; i++){
    dbVars.push({type: "BYTE" , start: i}); //cantidad de bytes para leer
}

module.exports = {dbNr,dbVars};