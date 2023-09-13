const client = require('./plcSettings');
const {dbNr,dbVars} = require('../helpers/dbSettings')
const Modelo = require('../model/modeloDB')

client.on('error', console.error);
let values = {}

// Read DB
const readPlc = async()=>{
    try {
        const res = await client.readDB(dbNr, dbVars);

        // let values = ' ';
        const value1 = res.slice(0,4); //contador2
        const value2 = res.slice(4,8); //contador1
        const value3 = res.slice(8,12); //fallos sobre
        const value4 = res.slice(12,16); //fallo manual
        const value5 = res.slice(16,18); //estado 
        const value6 = res.slice(18,20); //año
        const value7 = res.slice(20,21); //mes
        const value8 = res.slice(21,22); //dia
        const value9 = res.slice(22,23); //dia de la semana
        const value10 = res.slice(23,24) //hora
        const value11 = res.slice(24,25); //minuto
        const value12 = res.slice(25,26); //segundo

        const contador2 = value1.readUInt16LE(0);
        const contador1 = value2.readUInt16LE(0);
        const fallosSobre = value3.readUInt16LE(0);
        const fallosManual = value4.readUInt16LE(0);
        const estadoMaquina = value5.readUInt16LE(0);
        const año = value6.readUInt16LE(0);
        const mes = value7.readUInt16LE(0);
        const dia = value8.readUInt16LE(0);
        const diaSemana = value9.readUInt16LE(0);
        const hora = value110.readUInt16LE(0);
        const minutos = value11.readUInt16LE(0);
        const segundos = value12.readUInt16LE(0);

        const values= {
            contador1,
            contador2,
            fallosSobre,
            fallosManual,
            estadoMaquina,
            año,
            mes,
            dia,
            diaSemana,
            hora,
            minutos,
            segundos,
        }

        console.log(res);
        console.log(values);
      
        // for (let i = 0; i < dbVars.length; i++) {
        //   values += dbVars[i].rest.toString(16) + ' ';
        // } 
         
        // values.trim();
        // console.log(values);
        // const newdatoModelo = new Modelo({
        //     array: values,
        // })
          
        const save = newdatoModelo.save()
        
    } catch (error) {
        console.log(error);
        
    }

}
  
module.exports = {readPlc,values}