const { set } = require('mongoose');
const datosDb = require('../model/modeloDB');
const cron = require('node-cron');

let turno;
let setPointTurno;
let contador;
let turnoNumero;

const selectTurno = async () => {
  
try {
const horaActual = new Date()
console.log(horaActual);

console.log(`HORA ACTUAL CON GMT ${horaActual}`);

//seteo de horas de turno
const turno1 = new Date();
turno1.setHours(0,0,0,0);
turno1.setDate(turno1.getDate());

const turno2 = new Date();
turno2.setHours(8,0,0,0);

const turno3 = new Date();
turno3.setHours(16,0,0,0);

console.log(`el turno 1 es ${turno1}`);
console.log(`el turno 3 es ${turno3}`);

//se selecciona el turno basado en la hora actual
if (horaActual >= turno1 && horaActual < turno2) {
      turno = turno1;
      turnoNumero = 1;
}else if(horaActual >= turno2 && horaActual < turno3) {
      turno = turno2;
      turnoNumero = 2;
}else if(horaActual >= turno3 && horaActual < turno1.setDate(turno1.getDate() + 1)) {
      turno = turno3;
      turnoNumero = 3;
}
console.log(`el turno escogio es ${turno}`);

// Se realiza el query basado en el turno
setPointTurno = await datosDb
.find({ createdAt: { $gte: turno } })
.sort({ createdAt: 1 })
.limit(1)

    if (setPointTurno.length === 0) {
      console.log("No matching records found.");
    }
    console.log("Most recent record with a similar hour:", setPointTurno[0]);
    contador = setPointTurno[0].contador1 + setPointTurno[0].contador2 ;
    console.log(contador);
    
  } catch (error) {
    console.error('error', error);
  }
}
//en las horas de cambio de turno se vuelve a ejecutar la funcion
const cronSelectTurno = cron.schedule('10,10,10 00,00,00 00,08,16 * * *', selectTurno);

module.exports = {selectTurno,
  getContador: ()=> contador,
  getTurnoNumero: () => turnoNumero,
  cronSelectTurno};
