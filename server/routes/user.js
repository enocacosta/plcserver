const express = require('express');
const app = express.Router();
const cors = require('cors');
const {oee} = require('../config/readPlc');
const {getOEE} = require ('../helpers/calculosOEE');
const {calcularTiempo} = require ('../helpers/calcularTiempo');
app.use(cors());

calcularTiempo(); // Actualiza las variable tiempoDis, tiempoStand,tiempoParado

// Ruta HTTP para recibir la solicitud y enviar la respuesta
app.get('/', (req, res) => {
    try {
        //importar valores calculados de oee
        const oeeCalculado = getOEE();
        res.json({
            'disponibilidad': oeeCalculado.disponibilidad,
            'rendimiento': oeeCalculado.rendimiento,
            'calidad': oeeCalculado.calidad,
            'estadoMaquina': oee.estadoMaquina,
            'totalDia': oeeCalculado.totalDia,
            'produccionTurno': oeeCalculado.totalCant,
            'tiempoStop': tiempoParado,
            'tiempoProductivo': oeeCalculado.availableOperatingTime,
            'velocidad': oeeCalculado.velocidad,

        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.log(error);
    }
});

module.exports = app