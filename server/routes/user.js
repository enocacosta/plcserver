const express = require('express')
const app = express();
const cors = require('cors');
const {values} = require('../config/readPlc');
app.use(cors());

// Ruta HTTP para recibir la solicitud y enviar la respuesta
app.get('/', (req, res) => {
    res.json({
        values
    }); 

});

module.exports = app