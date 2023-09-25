const express = require('express');
const app = express();
const conexionPLC = require('./config/conexionPLC');
const {readPlc} = require('./config/readPlc');
const conexionDB = require('./config/conexionDB');
const userApp = require('./routes/user');
const {selectTurno, cronSelectTurno} = require('./helpers/selectTurno');
const {calcularTiempo,cronCalcularTiempo}  = require('./helpers/calcularTiempo');
const {calculosOEE} = require('./helpers/calculosOEE');
const cronGuardarOEE = require('./helpers/guardarOEE');
const queryApp = require('./routes/reporte');


const tiempoLectura = 5000;

conexionPLC();
conexionDB();
selectTurno();

setInterval(readPlc,tiempoLectura);

setInterval(calcularTiempo,tiempoLectura);

setInterval(calculosOEE,tiempoLectura);

cronSelectTurno.start();
cronCalcularTiempo.start();
cronGuardarOEE.start();

app.use('/', userApp);
app.use('/reporte', queryApp);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



 