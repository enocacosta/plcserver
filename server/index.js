const express = require('express');
const app = express();
const cors = require('cors');
const conexionPLC = require('./config/conexionPLC');
const {readPlc} = require('./config/readPlc');
const conexionDB = require('./config/conexionDB');
const {selectTurno, cronSelectTurno} = require('./calculos/selectTurno');
const {calcularTiempo,cronCalcularTiempo}  = require('./calculos/calcularTiempo');
const {calculosOEE} = require('./calculos/calculosOEE');
const {cronGuardarOEE,cronGuardarOEEMediaNoche} = require('./helpers/guardarOEE');
const userApp = require('./routes/user');
const queryApp = require('./routes/reporte');
const gerencialApp = require('./routes/gerencial');
const rechazosApp = require('./routes/rechazos');

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

app.use(cors());
app.use(express.static('client'))
app.use(express.static(path.join(__dirname, '/client/logos/')));
app.use(express.static(path.join(__dirname, '/client/Inicio')));
app.use(express.static(path.join(__dirname, '/client/Acercade/')));
app.use(express.static(path.join(__dirname, '/client/Gerencial')));
app.use(express.static(path.join(__dirname, '/client/Historicos/')));
app.use(express.static(path.join(__dirname, '/client/Mantenimiento')));
app.use(express.static(path.join(__dirname, '/client/Operario/')));
app.use(express.static(path.join(__dirname, '/client/Produccion')));

app.use('/', userApp);
app.use('/reporte', queryApp);
app.use('/gerencial',gerencialApp);
app.use('/rechazos',rechazosApp);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



