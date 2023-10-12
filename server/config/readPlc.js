const client = require('../helpers/plcSettings');
const {dbNr,dbVars} = require('../helpers/dbSettings');
const sliceBuff = require('../helpers/slice');
const calcularAcumulado = require('../helpers/hexToDecimal');
const datosDb = require('../model/modeloDB');
const conexionPLC = require('./conexionPLC');

client.on('error', console.error);

let values = {}
let oee = {}

// Read DB
const readPlc = async()=>{
    try {
        //se obtiene la lectura de la DB
        res = await client.readDB(dbNr, dbVars);

        //se separan en cada valor
        const values = sliceBuff(res);

        //se transforma a decimal
        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                const accumulation = calcularAcumulado(values[key]);
                oee[key]=accumulation;
            } 
        }      
        
        //fecha del PLC
        const fecha = new Date(oee.year, oee.mes-1, oee.dia, oee.hora, oee.minuto, oee.segundo);
        
        const newdatosDb = new datosDb({
            contador2: oee.contador2,
            contador1: oee.contador1,
            fallosSobre: oee.fallosSobre,
            fallosManual:oee.fallosManual,
            estadoMaquina: oee.estadoMaquina,
            fecha,
        })
        
        const save = newdatosDb.save()  
        .then(() => {
            console.log('Document saved successfully in datosoees');
          })
          .catch((error) => {
            console.error('Error saving document:', error);
          });

    } catch (error) {
        console.log(`readPLC ${error}`);
        client.disconnect();
        if (client.isConnected() == false){
            conexionPLC();
          }
    }
}

module.exports = {readPlc,oee}
