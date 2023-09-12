const {S7Client} = require('s7client');

// PLC Connection Settings
const plcSettings = {
    name: "LocalPLC",
    host: '192.168.1.10',
    port: 102,
    rack: 0,
    slot: 2
  };

let client = new S7Client(plcSettings);

module.exports = client;