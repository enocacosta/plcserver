const express = require('express');
const app = express.Router();
const cors = require('cors');
const datosRechazos = require('../model/modeloRechazos');
app.use(cors());

// Ruta HTTP para recibir la solicitud y enviar la respuesta
app.get('/', async (req, res) => {
    try {

        let { fecha, turno, numeromalos} = req.query;
        
        console.log(fecha);
        console.log(turno);
        console.log(numeromalos);


        const newDatosRechazos = new datosRechazos({
            fecha,
            turno,
            cantidad: numeromalos,
        })

        const save = await newDatosRechazos.save()  
        .then(() => {
            console.log('Document saved successfully in datos tipo parada');
          })
          .catch((error) => {
            console.error('Error saving document:', error);
          });

        console.log(`datos guardados en rechazos ${newDatosRechazos}`);

        // Send a response to the client
        res.status(200).json({ message: 'Data saved successfully' });

    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = app;
    