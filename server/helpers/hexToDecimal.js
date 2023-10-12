const calcularAcumulado = (values) => {
    let acumulador = 0;
    // se tranforma a decimal los bytes leidos de la maquina
    for (let i = 1; i <= values.length; i++) {
    const obj = values[values.length - i];
    value = obj.value*(256**(i-1));
    acumulador = acumulador + value;
  }
  return acumulador
}

module.exports = calcularAcumulado;