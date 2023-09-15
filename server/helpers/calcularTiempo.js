const cron = require('node-cron');

const tiempoLectura = 5000;
let tiempoDis = 0;
let tiempoStand = 0;
let tiempoParado = 0;

const cronCalcularTiempo = cron.schedule('10,10,10 00,00,00 0,08,16 * * *', reset = () =>{

  tiempoDis = 0;
  tiempoParado = 0;
  tiempoStand = 0;
}
);

const calcularTiempo = (newEstadoActual) =>{
if (newEstadoActual !== null) {
    const accionesPorEstado = {
      1: () => {
        tiempoDis += tiempoLectura / 1000;
      },
      2: () => {
        tiempoStand += tiempoLectura / 1000;
      },
      3: () => {
        tiempoParado += tiempoLectura / 1000;
      },
      default: () => {
        console.log('Estado no valido');
      },
    };
    const accionElegida = accionesPorEstado[newEstadoActual] || accionesPorEstado.default;
    accionElegida(); // Execute the corresponding function
    console.log(tiempoDis,tiempoStand,tiempoParado);
}
};

module.exports = {calcularTiempo,cronCalcularTiempo};