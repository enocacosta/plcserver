
// DBA to read
let dbNr = 14;
let dbVars = [];
for(let i=0; i<14; i++){
    dbVars.push({type: "BYTE" , start: i});
}

module.exports = {dbNr,dbVars};