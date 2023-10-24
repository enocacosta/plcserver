const {oee} = require('../config/readPlc');
const {calcularTiempo} = require('./calcularTiempo');
const {getContador,getContadorTurno1} = require('./selectTurno');

calcularTiempo(); // Actualiza las variable tiempoDis, tiempoStand,tiempoParado

let disponibilidad;
let rendimiento;
let calidad;
let velocidad;
let totalTurno;
let totalDia;
let availableOperatingTime;

const calculosOEE = () =>{

//Obtenemos los valores del setPoint del turno
const contadorSet = getContador();
console.log(contadorSet);

let contadorTurno1 = getContadorTurno1();
if (contadorTurno1== undefined){
    contadorTurno1 = 0; 
}
console.log(contadorTurno1);

//calculo disponibilidad
let tiempoTotal = 28800;
let tiempoDisTraba = (28800-tiempoParado)
disponibilidad = (tiempoDisTraba/(tiempoTotal))*100;

//calculo rendimiento
let contador = oee.contador1+oee.contador2;
totalTurno = (contador)-(contadorSet);
let availableOperatingTime = tiempoDis + tiempoStand;
rendimiento = ((30*(totalTurno))/availableOperatingTime)*100;
velocidad = totalTurno/availableOperatingTime;

if(velocidad == NaN || velocidad == null || velocidad == undefined){
    velocidad = 0;
}

console.log(tiempoDis);
console.log(tiempoStand);
console.log(tiempoParado);

totalDia = contador-contadorTurno1;

//comprobacion
if (rendimiento == Infinity){
    rendimiento = 0;
}
if(isNaN(rendimiento)){
    rendimiento=0;
}


console.log(disponibilidad,rendimiento,totalTurno);
}

module.exports = {
    getOEE: ()=> ({disponibilidad,
        rendimiento,
        calidad,
        totalTurno,
        totalDia,
        availableOperatingTime,
        velocidad}),
        calculosOEE
};