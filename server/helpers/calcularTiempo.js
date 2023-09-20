const {oee} = require('../config/readPlc');

const cron = require('node-cron');
const tiempoLectura = 5000;

//estas variables corresponden a los 3 estados de la maquina
tiempoDis = 0; 
tiempoStand = 0;
tiempoParado = 0;

//cada cambio de turno los tiempos vuelven a 0
const cronCalcularTiempo = cron.schedule('10,10,10 00,00,00 0,08,16 * * *', reset = () =>{
  tiempoDis = 0;
  tiempoParado = 0;
  tiempoStand = 0;
}
);

const calcularTiempo = () =>{
//se le suma el tiempo entre la llegada de paquetes a los tiempos de la maquina que depende de los estados
  if (oee.estadoMaquina !== null) {
    if (oee.estadoMaquina == 1){
      tiempoDis += tiempoLectura / 1000;
    }else if (oee.estadoMaquina == 2){
      tiempoStand += tiempoLectura / 1000;
    }else if (oee.estadoMaquina == 3){
      tiempoParado += tiempoLectura / 1000;
    }
  }
    console.log(tiempoDis,tiempoStand,tiempoParado);
}

module.exports = {
  tiempoDis,
  tiempoStand,
  tiempoParado,
  calcularTiempo,
  cronCalcularTiempo,   
};
