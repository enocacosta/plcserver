const express = require('express')
const app = express();
const cors = require('cors');
const datosOEE = require('../model/modeloOEE');
app.use(cors());

// Ruta HTTP para recibir la solicitud y enviar la respuesta
app.get('/reporte', async(req, res) => {
    try {
        //recibir datos del front
        const {date, turno} = req.query;
        
        const queryResult = await datosOEE.find({
            createdAt: new Date(date),
            turno: Number(turno),
        }).exec();

        res.json({queryResult});
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = app