const fs = require('fs');
const path = require('path');
let ipFileServer = "../../uploads/";
const pool = require('../db');

//FUNCION PARA GUARDAR EL DOCUMENTO EN LA BASE DE DATOS 
const crearDoc = async (req, res, next) => {
    try {
        //file de la foto
        const { file } = req
        const foto = `${ipFileServer}${file?.filename}`;
        //crear el user en la BD
        const { p_correo } = req.body;
        const { p_descripcion } = req.body;
        const { p_nombre_docuemnto } = req.body;
        const users = await pool.query('Call guardar_documento($1,$2,$3,$4)', [p_correo, foto, p_descripcion, p_nombre_docuemnto]);
        console.log(users);
        //Llamar a la funcion que enviar el correo
        //enviarMail(nombres, identificacion, correo2);
        return res.status(200).json({ message: "Se guardo el documento" });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: error.message });
    }
}
//Funcion para firmar el documento xd 
const FirmarDoc = async (req, res, next) => {
    try {
        //file de la foto
        const { file } = req
        const foto = `${ipFileServer}${file?.filename}`;
        //crear el user en la BD
        const { id_documento } = req.body;
        const users = await pool.query('Call FirmarDoc($1,$2)', [id_documento, foto]);
        console.log(users);
        //Llamar a la funcion que enviar el correo
        //enviarMail(nombres, identificacion, correo2);
        return res.status(200).json({ message: "Se guardo el documento" });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: error.message });
    }
}


//funcion para listar los documentos segun el correo 
const lista_documentos = async (req, res, next) => {
    try {

        const { p_correo } = req.params;
        const users = await pool.query('select * from documentos_usuario($1)', [p_correo]);
        console.log(users);
        //Llamar a la funcion que enviar el correo
        //enviarMail(nombres, identificacion, correo2);
        return res.status(200).json(users.rows);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: error.message });
    }
}
//Funcion para cargar el pdf del alcance si es reforma
const ver_pdf_alcance = async (req, res) => {
    try {
        const { id } = req.params;
        const { original } = req.params;

        //original
        //console.log(id);
        const users = await pool.query('select * from ver_pdf($1,$2)', [id, original]);
        const urlArchivos = path.join(__dirname, users.rows[0].d_url)
        console.log(urlArchivos);
        var data = fs.readFileSync(urlArchivos);
        console.log(data);
        res.contentType("application/pdf");
        res.send(data);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: error.message });

    }
}
//funcion para descargar el pdf y enviarlo a otra API 
const enviar_pdf_cliente = async (req, res, next) => {
    try {
        const { id } = req.params;
        const users = await pool.query('select * from ver_pdf($1,$2)', [id, true]);
        const urlArchivos = path.join(__dirname, users.rows[0].d_url)
        // Lee el archivo PDF utilizando fs
        console.log(urlArchivos);
        return res.download(urlArchivos);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: error.message });
    }
}


module.exports = {
    crearDoc,
    lista_documentos,
    ver_pdf_alcance,
    enviar_pdf_cliente,
    FirmarDoc
};