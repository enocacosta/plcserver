const datosDb = require('../model/modeloDB');

let result;
let turno;

const queryDb = async () => {

try {
const horaActual = new Date()

const turno1 = new Date();
turno1.setHours(0,0,0,0);

const turno2 = new Date();
turno2.setHours(8,0,0,0);

const turno3 = new Date();
turno3.setHours(16,0,0,0);

if (horaActual >= turno1 && horaActual < turno2) {
    turno = turno1
}else if(horaActual >= turno2 && horaActual < turno3) {
        turno = turno2
}else if(horaActual >= turno3 && horaActual < turno1) {
        turno = turno3}
    

    // Perform a query using $or to match any of the conditions
result = await datosDb
.find({ createdAt: { $gte: turno } })
.sort({ createdAt: 1 })
.limit(1)

    if (result.length === 0) {
      console.log("No matching records found.");
      return;
    }

    console.log("Most recent record with a similar hour:", result[0]);
    
  } catch (error) {
    console.error('error', error);
  }
}

module.exports = {queryDb,result};