const {getOEE} = require ('../helpers/calculosOEE')
const datosOEE = require('../model/modeloOEE');
const {getTurnoNumero} = require('../helpers/selectTurno')
const cron = require('node-cron');

const guardarOEE = async() =>{
    try {
        const oeeCalculado = getOEE();
        const turnoNumero = getTurnoNumero();

        const newdatosOEE = new datosOEE({
            disponibilidad: oeeCalculado.disponibilidad,
            rendimiento: oeeCalculado.rendimiento,
            calidad: oeeCalculado.calidad,
            turno: turnoNumero
        })
        
        const save = await newdatosOEE.save()  
        .then(() => {
            console.log('Document saved successfully in datos oeecalculados');
          })
          .catch((error) => {
            console.error('Error saving document:', error);
          });
        
    } catch (error) {
        console.log(error);

    }
}

const cronGuardarOEE = cron.schedule('00,00,59 00,00,59 08,16,23 * * *', guardarOEE);


module.exports = cronGuardarOEE;
