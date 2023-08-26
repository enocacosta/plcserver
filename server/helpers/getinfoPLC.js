const { S7Client } = require('node-snap7');
const s7client = new S7Client();


const readAreaAsync = () =>{
    return new Promise((resolve, reject) => {
        s7client.ReadArea(s7client.S7AreaDB, 54, 0, 46, s7client.S7WLByte, (err, buf) => {
            if (err) {
                reject(`Error promesa ${err}`);
            } else {
                resolve(buf);
            }
        });
    });
}

const getinforPLC = async () => {
    try {
        const buf = await readAreaAsync();
        console.log("Lectura");
        console.log(buf);
    } catch (err) {
        console.log(`Error funcion ${err}`);
    }
}

module.exports = getinforPLC
