const express = require('express')
const cors = require('cors');
const app = express();
const {S7Client} = require('s7client');

// PLC Connection Settings
const plcSettings = {
  name: "LocalPLC",
  host: '192.168.1.10',
  port: 102,
  rack: 0,
  slot: 2
};

// DBA to read
let dbNr = 14;
let dbVars = [];
for(let i=0; i<14; i++){
    dbVars.push({type: "BYTE" , start: i});
}

let client = new S7Client(plcSettings);
client.on('error', console.error);
 

(async function() {
  await client.connect();

  
  // Read DB
  setInterval(async function(){

  const res = await client.readDB(dbNr, dbVars);

  let values = ' ';

  for (let i = 0; i < dbVars.length; i++) {
    values += dbVars[i].value.toString(16) + ' ';
  } 

  console.log(values);
  },5000);

  
})();