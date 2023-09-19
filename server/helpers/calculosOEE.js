const {readPlc,oee} = require('../config/readPlc');
const { TiempoDis, TiempoStand, TiempoParado, calcularTiempo, cronCalcularTiempo } = require('./calcularTiempo');

calcularTiempo(); // This will update the tiempoDis, tiempoStand, tiempoParado values

let disponibilidad;
let rendimiento;
let calidad

const calculosOEE = () =>{

//calculo disponibilidad
let tiempoDisTraba = (28800-tiempoParado)
disponibilidad = (tiempoDisTraba/28800)*100;

//calculo rendimiento
totalCant = oee.contador1+oee.contador2
let tiempoDisRend = tiempoDis + tiempoStand
rendimiento = ((30*(totalCant))/tiempoDisRend)*100

console.log(tiempoDis);
console.log(tiempoStand);
console.log(tiempoParado);

//calculo calidad
calidad = ((totalCant-0)/totalCant)*100

console.log(disponibilidad,rendimiento,calidad);
}

module.exports = {
    disponibilidad, rendimiento,calidad,calculosOEE
};