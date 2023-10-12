//se separa el array de objetos proveniente de readPLC
const sliceBuff = (res) =>{
    contador2 = res.slice(0,4); //contador2
    contador1 = res.slice(4,8); // //contador1
    fallosSobre = res.slice(8,12); //fallos sobre
    fallosManual = res.slice(12,16); //fallo manual
    estadoMaquina = res.slice(16,17); //estado 
    year = res.slice(18,20); //año
    mes = res.slice(20,21); //mes
    dia = res.slice(21,22); //dia
    diaSemana = res.slice(22,23); //dia de la semana
    hora = res.slice(23,24); //hora
    minuto = res.slice(24,25); //minuto
    segundo = res.slice(25,26); //segundo
    tipoParo = res.slice(26,27); //tipo de Paro 

    return{
        contador2,
        contador1,
        fallosSobre,
        fallosManual,
        estadoMaquina,
        year,
        mes,
        dia,
        diaSemana,
        hora,
        minuto,
        segundo,
        tipoParo,
    }
}

module.exports = sliceBuff;