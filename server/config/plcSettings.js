const {S7Client} = require('s7client');

// PLC Connection Settings
const plcSettings = {
    name: "Llenadora_PLC",
    host: '192.168.1.100',
    port: 102,
    rack: 0,
    slot: 1
  };

let client = new S7Client(plcSettings);

module.exports = client;