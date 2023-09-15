const express = require('express')
const cron = require ('node-cron')
const app = express();
const conexionPLC = require('./config/conexionPLC');
const {readPlc,oee} = require('./config/readPlc');
const conexionDB = require('./config/conexionDB');
const userApp = require('./routes/user');
const cronSelectTurno = require('./helpers/selectTurno');
const {calcularTiempo,cronCalcularTiempo}  = require('./helpers/calcularTiempo');

const horaActual = new Date()
console.log(horaActual);

const tiempoLectura = 5000;

conexionPLC();
conexionDB();
setInterval(readPlc,tiempoLectura);

cronSelectTurno.start();
cronCalcularTiempo.start();

app.use('/', userApp);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



 