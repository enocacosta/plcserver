const express = require('express');
const app = express.Router();
const cors = require('cors');
const datosOEE = require('../model/modeloOEE');
app.use(cors());

// Ruta HTTP para recibir la solicitud y enviar la respuesta
app.get('/', async (req, res) => {
    try {

        // Find the three most recent documents
        const queryResult = await datosOEE.find().sort({ createdAt: -1 }).limit(3).exec();

        res.json(queryResult);

        console.log(queryResult);

    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = app;
    
