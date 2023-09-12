const express = require('express')
const app = express();
<<<<<<< HEAD


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
    { type: "BYTE", start: 0, bit:14 },

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
=======
const conexionPLC = require('./config/conexionPLC');
const {readPlc} = require('./config/readPlc');
const conexionDB = require('./config/conexionDB');
const userApp = require('./routes/user')

conexionPLC();

conexionDB();

setInterval(readPlc,5000);

app.use('/', userApp);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
>>>>>>> 79590ce4671e61e11ec50e5e0f32b1b0ca68a608




 