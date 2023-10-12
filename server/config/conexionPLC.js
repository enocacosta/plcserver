const client = require('../helpers/plcSettings');

client.on('error', console.error);


const conexionPLC = async() => {
    try {
        console.log('Conexión establecida');
        await client.connect();
    } catch (error) {
        console.log(`conexion ${error}`);
    }
 
};

module.exports = conexionPLC