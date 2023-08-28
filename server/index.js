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
let dbVars = [
  { type: "DINT", start: 7 },
  { type: "WORD", start: 7},
  { type: 'BYTE', start: 2 }
];

let client = new S7Client(plcSettings);
client.on('error', console.error);

(async function() {
  await client.connect();

  // Read DB
  const res = await client.readDB(dbNr, dbVars);
  console.log(res);

  client.disconnect();
})();