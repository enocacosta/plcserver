const client = require('../helpers/plcSettings');
const {dbNr,dbVars} = require('../helpers/dbSettings');
const sliceBuff = require('../helpers/slice');
const calcularAcumulado = require('../helpers/hexToDecimal');
const Modelo = require('../model/modeloDB');
const modelBuffer = require('../model/modelBuffer');
const datosDb = require('../model/modeloDB');
// const {tiempoDis,tiempoStand,tiempoParado,calcularTiempo,cronCalcularTiempo}  = require('../helpers/calcularTiempo');

client.on('error', console.error);

let values = {}
let oee = {}

// Read DB
const readPlc = async()=>{
    try {
        res = await client.readDB(dbNr, dbVars);
        
        const values = sliceBuff(res);
        
        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                const accumulation = calcularAcumulado(values[key]);
                oee[key]=accumulation;
            }
        }      
        
        const fecha = new Date(oee.year, oee.mes-1, oee.dia, oee.hora, oee.minuto, oee.segundo);
        
        //console.log(oee);

        const newdatoModelo = new Modelo({
            contador2: oee.contador2,
            contador1: oee.contador1,
            fallosSobre: oee.fallosSobre,
            fallosManual:oee.fallosManual,
            estadoMaquina: oee.estadoMaquina,
            fecha,
        })
        
        const save = newdatoModelo.save()  
        .then(() => {
            console.log('Document saved successfully');
          })
          .catch((error) => {
            console.error('Error saving document:', error);
          });

    } catch (error) {
        console.log(error);
    }
}

module.exports = {readPlc,oee}