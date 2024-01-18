const pool = require('../../db');
const jwt = require('jsonwebtoken');
const { serialize } = require('cookie');

//funcion para verificar la conexion a la bd
const prueba_conexion = async (req, res, next) => {
    try {
        const users = await pool.query('select 3 as numero');
        console.log(users);
        return res.status(200).json(users.rows[0]);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//VerficarUsuario y otorgar token
const verificaUserGoogle = async (req, res, next) => {
    try {
        const { email } = req.body;
        console.log(email);
        const users = await pool.query('select * from Verification_Auth($1)', [email]);

        console.log(users);
        console.log(users.rows[0]);
        let verification = users.rows[0];


        //Extraer el resultado del bool para saber si el login es correcto
        let result = verification.verification;
        //console.log('The result is:' + result);

        //si el login es false entonces crear la cuenta si no entonces otorgar token 


        if (!result) {
            const createUser = await pool.query('call crear_usuario($1)', [email]);
        }
        //entonces crear la cuenta 



        //En ambos casos se otorga el token de acceso
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            email: email,
        }, 'SECRET') //el secret deberia estan en el .env

        const serialized = serialize('myTokenName', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 1000 * 60 * 2, //dos minutos para hacer las pruebas
            path: '/'
        })
        //maxAge: 1000 * 60 * 60 * 24 * 30, //30 dias
        //1000 * 60 * 15,  // 15 minutos
        res.setHeader('Set-Cookie', serialized)
        console.log(serialized);
        console.log(token);

        //Ver si el usuario es admin de area y guardar en json para que se guarde como cookie
        return res.json({ verification: "true", token: token });

    } catch (error) {
        next(error);
    }
}

















module.exports = {
    verificaUserGoogle,
    prueba_conexion,
};