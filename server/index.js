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
let dbVars = [{
    ident: 'Int',
    type: 'INT',
    start: 4,
}
]

let client = new S7Client(plcSettings);
client.on('error', console.error);

(async function() {
    await client.setParam(1,5000);
  await client.connect();

  // Read DB
  const res = await client.readDB(dbNr, dbVars);
  console.log(res);

  client.disconnect();
})();



