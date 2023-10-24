const express = require('express');
const app = express.Router();
const cors = require('cors');
const formatoFecha = require('../helpers/formatoFecha');
const datosOEE = require('../model/modeloOEE');
const datosTipoParada = require('../model/modeloTipoParada');
const datosRechazos = require('../model/modeloRechazos');
app.use(cors());

// Ruta HTTP para recibir la solicitud y enviar la respuesta
app.get('/', async (req, res) => {
    try {
        // Receive data from the front-end
        let { fechaI, fechaF} = req.query; 

        console.log(fechaI);

        const query = {};
        const queryRechazos = {};

        fechaI = formatoFecha(fechaI);
        fechaF = formatoFecha(fechaF);

        console.log(fechaI);

        if (fechaI && fechaF) {
            const startDate = new Date(fechaI);
            startDate.setHours(0, 0, 0, 0); // Set time to midnight
            const endDate = new Date(fechaF);
            endDate.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

            query.createdAt = {
                $gte: startDate,
                $lte: endDate,
            };
            queryRechazos.fecha = {
                $gte: fechaI,
                $lte: fechaF,
            }
            console.log(startDate);
        }

        

        const queryResult = await datosOEE.find(query).exec();
        const queryResultTipo = await datosTipoParada.find(query).exec();
        const queryResultRechazos = await datosRechazos.find(queryRechazos).exec();

        // Combine the results into an object or array
        const combinedResults = {
            datosOEE: queryResult,
            datosTipoParada: queryResultTipo,
            datosRechazos : queryResultRechazos,
        };

        
        
        // Send the combined results as a JSON response
        res.json(combinedResults);


    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = app;
    