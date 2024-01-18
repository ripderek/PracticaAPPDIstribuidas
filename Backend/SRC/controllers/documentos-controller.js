const fs = require('fs');
const path = require('path');
let ipFileServer = "../../uploads/";

//FUNCION PARA GUARDAR EL DOCUMENTO EN LA BASE DE DATOS 
const crearDoc = async (req, res, next) => {
    try {
        //file de la foto
        const { file } = req
        const foto = `${ipFileServer}${file?.filename}`;
        //crear el user en la BD
        const { p_enunciado } = req.body;
        const { p_tiempos_segundos } = req.body;
        const { p_tipo_pregunta } = req.body;
        const { p_id_nivel } = req.body;
        const { p_tiempo_img } = req.body;

        if (p_tiempos_segundos <= 0)
            return res.status(404).json({ message: "El tiempo en de respuesta no puede ser menor o igual a 0 segundos" });


        if (p_tiempo_img <= 0)
            return res.status(404).json({ message: "El tiempo en para memorizar la imagen no puede ser menor o igual a 0 segundos" });
        const users = await pool.query('Call SP_Crear_Pregunta_MEMRZAR($1,$2,$3,$4,$5,$6)', [p_enunciado, p_tiempos_segundos, p_tipo_pregunta, p_id_nivel, foto, p_tiempo_img]);
        console.log(users);
        //Llamar a la funcion que enviar el correo
        //enviarMail(nombres, identificacion, correo2);
        return res.status(200).json({ message: "Se creo la pregunta" });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: error.message });
    }
}



module.exports = {
    crearDoc,

};