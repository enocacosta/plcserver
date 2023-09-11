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

        const value1 = res.slice(0,4)
        const contador1 = value1.readUInt16LE(0);
        const values= {
            contador1,
        }
        console.log(contador1);
      
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