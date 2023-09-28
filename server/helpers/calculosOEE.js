const {oee} = require('../config/readPlc');
const {calcularTiempo} = require('./calcularTiempo');
const {getContador,getContadorTurno1} = require('../helpers/selectTurno');

calcularTiempo(); // Actualiza las variable tiempoDis, tiempoStand,tiempoParado

let disponibilidad;
let rendimiento;
let calidad;

const calculosOEE = () =>{

//Obtenemos los valores del setPoint del turno
const contadorSet = getContador();
console.log(contadorSet);

const contadorTurno1 = getContadorTurno1();
console.log(contadorTurno1);

//calculo disponibilidad
let tiempoDisTraba = (28800-tiempoParado)
disponibilidad = (tiempoDisTraba/28800)*100;

//calculo rendimiento
let contador = oee.contador1+oee.contador2;
totalCant = (contador)-(contadorSet);
let availableOperatingTime = tiempoDis + tiempoStand;
rendimiento = ((30*(totalCant))/availableOperatingTime)*100;

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
    getOEE: ()=> ({disponibilidad,rendimiento,calidad,totalCant,totalDia}),
    calculosOEE
};