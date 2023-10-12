const formatoFecha = (fecha) =>{
    try {
        if (fecha) {
            const parsedDate = new Date(fecha);
            if (!isNaN(parsedDate.getTime())) { // Check if the parsed fechaI is valid
                parsedDate.setHours(parsedDate.getHours() + 5);
                fecha = parsedDate;
                return fecha
            } else {
                throw new Error('Formato invalido');
            }
        }
    } catch (error) {
        throw error;
    }
}

module.exports = formatoFecha;