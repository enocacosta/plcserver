const express = require('express');
const app = express();
const cors = require('cors');
const conexionPLC = require('./config/conexionPLC');
const {readPlc} = require('./config/readPlc');
const conexionDB = require('./config/conexionDB');
const {selectTurno, cronSelectTurno} = require('./calculos/selectTurno');
const {calcularTiempo,cronCalcularTiempo}  = require('./calculos/calcularTiempo');
const {calculosOEE} = require('./calculos/calculosOEE');
const {cronGuardarOEE,cronGuardarOEEMediaNoche} = require('./calculos/guardarOEE');
const userApp = require('./routes/user');
const queryApp = require('./routes/reporte');
const gerencialApp = require('./routes/gerencial');

app.use(cors());  
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
cronGuardarOEEMediaNoche.start();

app.use('/', userApp);
app.use('/reporte', queryApp);
app.use('/gerencial',gerencialApp);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// function getTipoParo(x) {
//   const obj = {
//   1: "Paro por mantenimiento",
//   2: "Paro por ausencia",
//   3: "Paro por ...",
//   4: "Paro por tin",
//   5: "Paro por tan",

//   }
//   return obs[x] ?? "Error al recibir tipo de paro"
// }

 