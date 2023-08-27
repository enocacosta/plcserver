const { S7Client } = require('node-snap7');
const s7client = new S7Client();

const connectToPLC = () => {
    return new Promise((resolve, reject) => {
        s7client.ConnectTo('192.168.1.10', 0, 2, (err) => {
            if (err) {
                reject(new Error(`Error promise: ${err}`));
            } else {
                resolve('Conexión exitosa');
            }
        });
    });
};

const connectionPLC = async () => {
    try {
        const conn = await connectToPLC();
        console.log(`Conexion con PLC establecida: ${conn}`);
    } catch (error) {
        console.error(`Error function: ${error.message}`);
    }
};

module.exports = connectionPLC