const datosDb = require('../model/modeloDB');
const cron = require('node-cron');

let result;
let turno;
const toleracion = 50000;
const horaActual = new Date()

const turno1 = new Date();
turno1.setHours(0,0,0,0);
turno1.setDate(turno1.getDate() +1);

const turno2 = new Date();
turno2.setHours(8,0,0,0);

const turno3 = new Date();
turno3.setHours(16,0,0,0);

const selectTurno = async () => {
try {
if (horaActual >= turno1 && horaActual < turno2) {
      turno = turno1
}else if(horaActual >= turno2 && horaActual < turno3) {
      turno = turno2
}else if(horaActual >= turno3 && horaActual < turno1) {
      turno = turno3
}
    
    // Perform a query using $or to match any of the conditions
result = await datosDb
.find({ createdAt: { $gte: turno } })
.sort({ createdAt: 1 })
.limit(1)

    if (result.length === 0) {
      console.log("No matching records found.");
      console.log(turno);
      return;
    }

    console.log("Most recent record with a similar hour:", result[0]);
    console.log(turno);

  } catch (error) {
    console.error('error', error);
  }
}

const cronSelectTurno = cron.schedule('10,10,10 00,00,00 0,08,16 * * *', selectTurno);

module.exports = cronSelectTurno;
