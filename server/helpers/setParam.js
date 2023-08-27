const { S7Client } = require('node-snap7');
const s7client = new S7Client();

const setParam = () => {
    s7client.SetParam(1,51000);//try first param in 1 in order to see if that modify the local port.
}

module.exports = setParam