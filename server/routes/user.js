const express = require('express')
const app = express();
const cors = require('cors');
const {oee} = require('../config/readPlc');
const {getOEE} = require ('../helpers/calculosOEE')
app.use(cors());

// Ruta HTTP para recibir la solicitud y enviar la respuesta
app.get('/', (req, res) => {
    try {
        //importar valores calculados de oee
        const oeeCalculado = getOEE();
        res.json({
            'disponibilidad': oeeCalculado.disponibilidad,
            'rendimiento': oeeCalculado.rendimiento,
            'calidad': oeeCalculado.calidad,
            'estadoMaquina': oee.estadoMaquina
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = app