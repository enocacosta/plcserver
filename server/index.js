const express = require('express')
const cors = require('cors');
const app = express();
const conexionPLC = require('./config/conexionPLC');
const readPlc = require('./config/readPlc');
const conexionDB = require('./config/conexionDB');

conexionPLC();

conexionDB();

setInterval(readPlc,5000);

 