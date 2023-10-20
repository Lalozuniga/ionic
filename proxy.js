//proxy.js
const express = require('express');
const axios = require('axios');
const cors =  require('cors');
const nodemailer = require('nodemailer');
const ics = require('ics');
var admin = require("firebase-admin");

var serviceAccount = require("./credenciales.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://db-api-en-tiempo-real-a1af2-default-rtdb.firebaseio.com"
});



const app = express();
const port = 3000;

app.use((req, res, next )=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Resquested-With, Content-Type, Accept');
    next();
});
app.get('/direcciones', async(req, res)=>{
    const apiKey = 'AIzaSyB-lSS3vAo5eTvJ_M02kycKor5NY1moxsM'
    const dir1 = encodeURIComponent(req.query.parametro1);
    const dir2 = encodeURIComponent(req.query.parametro2);
    const dirUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${dir1}&destination=${dir2}&units=metric&languaje=es&key=${apiKey}`;
    const respuesta = await axios.get(dirUrl);
    res.send(respuesta.data);
});
//localhost:3000/mi-proxy
//get, push, post, delete
//req ->request
//res -> result
//    AIzaSyB-lSS3vAo5eTvJ_M02kycKor5NY1moxsM
app.get('/mi-proxy', (req, res)=>{
    const direccion1 = req.query.parametro1;
    const direccion2 = req.query.parametro2;
    res.send('Datos recibidos '+
    direccion1 + direccion2);
    console.log(`datos recibidos! ${direccion1}`)
});

app.listen(port, ()=>{
    console.log(`proxy escuchado en el puerto ${port}`);
});

app.post('/crearEvento',
    async(req,res)=>{
        try{
            const transporter = nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:'lalozuniga520@gmail.com',
                    pass:'neeq jbom xxyd atre'
                },
            });
            const to = req.query.to;
            const subject = req.query.subject;
            const text = req.query.text;
            const mail = {
                from: 'lalozuniga520@gmail.com',
                to: to,
                subject: subject,
                text: text,
            };
            await transporter.sendMail(mail);
            res.status(200).send('correo enviado');
        }catch(error){0
            res.status(500).send('error al enviar el correo')
        }
    });
    

    app.get('/recibirReceta', async(req,res)=>{
        //pedir una receta y regresar la informacion 
        //leer elmparametro nombre de la URL
        const nombreReceta = req.query.nombre;
        //
        if(!nombreReceta){
            res.status(400).send('Se requiere un parametro');
            //finaliza el programa
            return;
            //si encuentra informacion regresarla en formato json
        }
        //conectarse con firebase
        const snapshot = await admin.database().ref(`/recetas/${nombreReceta}`).once('value');
        if(!snapshot.exists()){
            res.status(404).send('No existe el registro');
            return;
        }
        else {
            const data = snapshot.val();
            res.json(data);
        }
        
    });
  //  http://localhost:3000/recibirReceta?nombre=pozole