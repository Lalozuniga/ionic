//proxy.js
const express = require('express');
const axios = require('axios');
const cors =  require('cors');
const { async } = require('rxjs');

const app = express();
const port = 3000;

app.use((req, res, next )=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-Widht, Content-Type, Accept');
    next();
});
app.get('/direcciones', async(req, res)=>{
    const apiKey = 'AIzaSyB-lSS3vAo5eTvJ_M02kycKor5NY1moxsM'
    const dir1 = encodeURIComponent(req.query.parametro1);
    const dir2 = encodeURIComponent(req.query.parametro2);
    const dirUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${dir1}&destination=${dir2}&units=metric&languaje-es&key=${apiKey}`;
    const respuesta = await axios.get(dirUrl);
    res.send(respuesta);
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