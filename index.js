const express = require('express')
const cors = require('cors');
const app = express();
const snap7 = require('node-snap7');

app.use(cors());


const s7client = new snap7.S7Client();
s7client.ConnectTo('192.168.1.10', 0, 2, function(err) {
    if(err)
        return console.log(' >> Connection failed. Code #' + err + ' - ' + s7client.ErrorText(err));

    // Read the first byte from PLC process outputs...
    s7client.ReadArea(s7client.S7AreaDB, 14 , 0, 15, s7client.S7WLByte,function (err, buf) {
        if (err) {
            console.log(err);
        }
        console.log(buf);
        })
}); 