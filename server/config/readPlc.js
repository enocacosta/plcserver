const client = require('./plcSettings');
const {dbNr,dbVars} = require('../helpers/dbSettings')

client.on('error', console.error);

// Read DB
const readPlc = async()=>{
    try {
        const res = await client.readDB(dbNr, dbVars);
  
        let values = ' ';
      
        for (let i = 0; i < dbVars.length; i++) {
          values += dbVars[i].value.toString(16) + ' ';
        } 
      
        console.log(values);
        
    } catch (error) {
        console.log(error);
        
    }

}
  
module.exports = readPlc