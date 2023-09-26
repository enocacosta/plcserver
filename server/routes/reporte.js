const express = require('express');
const app = express.Router();
const cors = require('cors');
const datosOEE = require('../model/modeloOEE');
app.use(cors());

// Ruta HTTP para recibir la solicitud y enviar la respuesta
app.get('/', async (req, res) => {
    try {
        // Receive data from the front-end
        let { date, turno } = req.query;

        if (date) {
            const parsedDate = new Date(date);
            if (!isNaN(parsedDate.getTime())) { // Check if the parsed date is valid
                parsedDate.setHours(parsedDate.getHours() + 5);
                date = parsedDate;
            } else {
                return res.status(400).json({ error: 'Invalid date format' });
            }
        }

        const query = {
            turno: Number(turno),
        };

        if (date) {
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0); // Set time to midnight
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

            query.createdAt = {
                $gte: startDate,
                $lte: endDate,
            };
        }

        console.log(date);
        console.log(turno);
        const queryResult = await datosOEE.find(query).exec();

        res.json(queryResult);
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = app;
