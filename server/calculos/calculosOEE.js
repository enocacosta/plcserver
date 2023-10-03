const {oee} = require('../config/readPlc');
const {calcularTiempo, tiempoParado} = require('./calcularTiempo');
const {getContador,getContadorTurno1} = require('./selectTurno');

calcularTiempo(); // Actualiza las variable tiempoDis, tiempoStand,tiempoParado

let disponibilidad;
let rendimiento;
let calidad;
let velocidad;
let totalCant;
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
totalCant = (contador)-(contadorSet);
let availableOperatingTime = tiempoDis + tiempoStand;
rendimiento = ((30*(totalCant))/availableOperatingTime)*100;
velocidad = totalCant/availableOperatingTime;

if(velocidad == NaN || velocidad == null || velocidad == undefined){
    velocidad = 0;
}

console.log(tiempoDis);
console.log(tiempoStand);
console.log(tiempoParado);

//calculo calidad
calidad = ((totalCant-0)/totalCant)*100;

totalDia = contador-contadorTurno1;

//comprobacion
if (rendimiento == Infinity){
    rendimiento = 0;
}
if(isNaN(rendimiento)){
    rendimiento=0;
}
if(isNaN(calidad)){
    calidad=0;
}

console.log(disponibilidad,rendimiento,calidad);
}

module.exports = {
    getOEE: ()=> ({disponibilidad,
        rendimiento,
        calidad,
        totalCant,
        totalDia,
        availableOperatingTime,
        velocidad}),
        calculosOEE
};