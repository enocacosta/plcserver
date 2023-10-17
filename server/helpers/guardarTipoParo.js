const datosTipoParada = require('../model/modeloTipoParada');
 
const guardarTipoParada = async(tipoParada , tiempo , turno) =>{
    try {
        const newdatosOEE = new datosTipoParada({
            tipoParada: tipoParada,
            tiempo: tiempo,
            turno: turno,
        })
        
        const save = await newdatosOEE.save()  
        .then(() => {
            console.log('Document saved successfully in datos tipo parada');
          })
          .catch((error) => {
            console.error('Error saving document:', error);
          });
        
    } catch (error) {
        console.log(error);

    }
}


module.exports = {guardarTipoParada};
