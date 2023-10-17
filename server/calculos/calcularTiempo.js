const {oee} = require('../config/readPlc');
const {guardarTipoParada} = require('../helpers/guardarTipoParo');
const {getTurnoNumero} = require('../calculos/selectTurno');
const tiempoLectura = 5000;
const cron = require('node-cron');



let estadoAnterior = 0;

//estas variables corresponden a los 3 estados de la maquina
tiempoDis = 0; 
tiempoStand = 0;
tiempoParado = 0;
tiempoTipoParado = 0;
let tiempoTemp;

//cada cambio de turno los tiempos vuelven a 0
const cronCalcularTiempo = cron.schedule('5 00,00,00 0,08,16 * * *', reset = () =>{
  tiempoDis = 0;
  tiempoParado = 0;
  tiempoStand = 0;
}
);

const calcularTiempo = () =>{
  const turno = getTurnoNumero();
//se le suma el tiempo entre la llegada de paquetes a los tiempos de la maquina que depende de los estados
  if (oee.estadoMaquina !== null) {
    tiempoTemp = tiempoTipoParado;
    if (oee.estadoMaquina == 1){
      tiempoDis += tiempoLectura / 1000;
      tiempoTipoParado = 0;
    }else if (oee.estadoMaquina == 2){
      tiempoStand += tiempoLectura / 1000;
      tiempoTipoParado = 0;
    }else if (oee.estadoMaquina == 3){
      tiempoParado += tiempoLectura / 1000;
      tiempoTipoParado += tiempoLectura / 1000;
    }
    console.log(`estado de maquina ${oee.estadoMaquina}`);
    console.log(`estado anterior ${estadoAnterior}`);
    

    if(oee.estadoMaquina != 3 && estadoAnterior == 3){
      console.log("entramos al if"); 
      guardarTipoParada(oee.tipoParada, tiempoTemp, turno);

    }

    estadoAnterior = oee.estadoMaquina;
  }

    console.log(tiempoDis,tiempoStand,tiempoParado,tiempoTipoParado);
}

module.exports = {
  tiempoDis,
  tiempoStand,
  tiempoParado,
  calcularTiempo,
  cronCalcularTiempo,   
};
