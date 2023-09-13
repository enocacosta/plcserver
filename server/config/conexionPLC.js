const client = require('../helpers/plcSettings');

client.on('error', console.error);


const conexionPLC = async() => {
    try {
        console.log('Conexión establecida');
        await client.connect();
    } catch (error) {
        console.log(error);
    }
 
};

module.exports = conexionPLC