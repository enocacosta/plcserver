const client = require('./plcSettings');
const {dbNr,dbVars} = require('../helpers/dbSettings')
const Modelo = require('../model/modeloDB')



client.on('error', console.error);

// Read DB
const readPlc = async()=>{
    try {
        const res = await client.readDB(dbNr, dbVars);
  
        let values = ' ';
      
        for (let i = 0; i < dbVars.length; i++) {
          values += dbVars[i].value.toString(16) + ' ';
        } 
         
        values.trim();
        console.log(values);
        const newdatoModelo = new Modelo({
            array: values,
        })
          
        const save = newdatoModelo.save()
        


        
    } catch (error) {
        console.log(error);
        
    }

}
  
module.exports = readPlc