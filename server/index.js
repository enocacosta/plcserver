const express = require('express')
const app = express();
const conexionPLC = require('./config/conexionPLC');
const {readPlc} = require('./config/readPlc');
const conexionDB = require('./config/conexionDB');
const userApp = require('./routes/user');
const {queryDb,result} = require('./helpers/queryC');

conexionPLC();

conexionDB();

setInterval(readPlc,5000);

queryDb();

app.use('/', userApp);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




 