const {readPlc,oee} = require('../config/readPlc');

const cron = require('node-cron');
const tiempoLectura = 5000;
if (typeof tiempoDis === 'undefined') {
  tiempoDis = 0;
}
if (typeof tiempoStand === 'undefined') {
  tiempoStand = 0;
}
if (typeof tiempoParado === 'undefined') {
  tiempoParado = 0;
}


const cronCalcularTiempo = cron.schedule('10,10,10 00,00,00 0,08,16 * * *', reset = () =>{
  tiempoDis = 0;
  tiempoParado = 0;
  tiempoStand = 0;
}
);

const calcularTiempo = () =>{
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
    // return(tiempoDis,tiempoStand,tiempoParado)
    //console.log(tiempoDis,tiempoStand,tiempoParado);
}

// if (oee.estadoMaquina !== null) {
//     const accionesPorEstado = {
//       1: () => {
//         tiempoDis += tiempoLectura / 1000;
//         return tiempoDis
//       },
//       2: () => {
//         tiempoStand += tiempoLectura / 1000;
//         return tiempoStand
//       },
//       3: () => {
//         tiempoParado += tiempoLectura / 1000;
//         return tiempoParado
//       },
//       default: () => {
//         console.log('Estado no valido');
//       },
//     };
//     const accionElegida = accionesPorEstado[oee.estadoMaquina] || accionesPorEstado.default;
//     accionElegida(); // Execute the corresponding function
//     console.log(tiempoDis,tiempoStand,tiempoParado);




module.exports = {
  tiempoDis,
  tiempoStand,
  tiempoParado,
  calcularTiempo,
  cronCalcularTiempo,   
};
