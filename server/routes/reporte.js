const express = require('express');
const app = express.Router();
const cors = require('cors');
const datosOEE = require('../model/modeloOEE');
const formatoFecha = require('../helpers/formatoFecha');
app.use(cors());

// Ruta HTTP para recibir la solicitud y enviar la respuesta
app.get('/', async (req, res) => {
    try {
        // Receive data from the front-end
        let { fechaI, fechaF} = req.query; 

        console.log(fechaI);

        const query = {};

        fechaI = formatoFecha(fechaI);
        fechaF = formatoFecha(fechaF);

        if (fechaI && fechaF) {
            const startDate = new Date(fechaI);
            startDate.setHours(0, 0, 0, 0); // Set time to midnight
            const endDate = new Date(fechaF);
            endDate.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

            query.createdAt = {
                $gte: startDate,
                $lte: endDate,
            };
        }

        console.log(fechaF);
        console.log(fechaI);

        const queryResult = await datosOEE.find(query).exec();
        // console.log(queryResult);
        res.json(queryResult);

    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = app;
    