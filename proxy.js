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
/* 
app.use((req, res, next )=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Resquested-With, Content-Type, Accept');
    next();
});
*/
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

  //api con credencial opcion A

app.get('/credenciales', async(req, res) => {
    try{
        //parametros que vamos a enviar
        const key = req.query.key;
        const num1 = req.query.num1;
        const num2 = req.query.num2;
        //verificar que no falte ningun campo
        if (!key || !num1 || !num2){
            res.status(400).send('falta algun dato');
            return;
        }
        //verificar que la key sea nuestra key
        if(key == '12elvergalarga12'){//inventarse la key
        //en caso de que sea correcta 
        //aqui ejecutara la api
        const total = parseInt(num1) + parseInt(num2);
        res.status(200).send(`la suma de los datos es ${total}`)
        }else{
            //en caso de que ea otra key, regresar un mensaje
            //de error
            req.status(400).send('verificar credenciales');
            return;
        }

    }catch(error){
        //en caso de error, regresa error
        res.status(500).send(error);
    }
});
//revisar la api con
// https://localhost:3000/credenciales?key=12elvergalarga12&num1=5&num2=2

//Contruccion de api restful, ejemplo lista de tareas en un arreglo 
//Api Restful: en pocas palabras, son dos sistemas independientes que utilizan protocolos
//crud (crear, leer, actualizar, eliminar) para manipular informacion
//por peticiones mediante internet (metodos get, post, put, delete) y formatos
//Json, XAML, XML, etc

//Aqui e guardara una lista de tareas en el arreglo a nivel servidor 
let tareas = [];
//1-get
app.get('/tareaspendientes', (req,res) => {
    res.json(tareas);
});
//2-post:Agregar una tarea nueva 
app.post('/tareaspendientes', (req,res) =>{
    const texto = req.query.texto;//informacion que se guarda en la tarea
    const nombre = req.query.nombre;//nombre de la tarea nueva guardada
    const nuevatarea = {
        id:Date.now(),//obtener fecha actual contando 'unix' del momento actual 
        //'unix' es el tiempo actual en Seg desde el 1 de enero de 1970
        nombre:nombre,
        texto:texto,
        completado:false,
    };
    tareas.push(nuevatarea);
    res.json(nuevatarea);
});
app.put('/tareaspendientes/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    //aqui leemos en java '![]' significa false
    //por lo tanto si el arreglo esta vacio entra en if
    if(!id){
        res.status(404).send('no hay informacion en el arreglo');
        return;
    }
    //'find' es una funcion  de busqueda en un arreglo, itera en el arreglo 
    //que se manda llamar y cada posicion iterada se guarda en "t"
    //un for-each simplificado para iteraciones en elementos de un arreglo
    //'==' representa que los  valores deben ser iguales 
    //'===' representa que los valoresdel tipo de dato deben ser iguales 
    //'2' == 2 es true porque representan el mismo valor
    //'2' === 2 es false porque no representa el mismo tipo de dato
    const tarea = tareas.find(t => t.id=== id);
    //si se envia el parametro 'nombre' guardarlo en el arreglo, si no, guardar
    //a si mismo
    if (!tarea) {
    res.status(404).send('No se encontró la tarea con el ID proporcionado.');
    return;
}
    tarea.nombre = req.query.nombre ||tarea.nombre;
    tarea.texto = req.query.texto ||tarea.texto;
    tarea.completado = req.query.completada ||tarea.completada;
    res.json(tarea);
});
//4-delete
app.delete('/tareaspendientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    //filter lo que hace es tomar todos los elementos de un arreglo que coincidan
    //con el parametro colocado, en este caso
    //tomar todos los elementos de tareas que sean diferentes al id enviado
    //tomar todos los elementos de tareas que sean diferentes al id enviado
    //por lo tanto el ID enviado sera exceptuado y eliminado del arrreglo
    tareas = tareas.filter(t => t.id !== id);
    res.send('tarea eliminada')
});
//ya tenemos las 4 funciones, igue generar las urls
//url por consola

//GET
//CURl -X GET localhost:3000/tareaspendientes 

//POST
//CURL -X POST localhost:3000/tareaspendientes?nombre=titulo&texto=texto

//PUT
//CURL -X PUT localhost:3000/tareaspendientes/0?completada=TRUE

//DELETE 
//CURL -X DELETE localhost:3000/tareaspendientes/0


//localhost:3000/tareaspendientes 

//api vacia
//CURl -X GET localhost:3000/elementos
var tarea = [];
app.get('/elementos', (req, res) => {
    res.json(tarea);
});
//CURL -X POST localhost:3000/elementos?receta=polloconsalsa
app.post('/elementos', (req, res) => {
    var receta = req.query.receta;
    var votos = req.query.votos;
    const datos = {
        id:Date.now(),
        informacion:receta,
        cantidad:votos,
    };//<= asi indicamos que es un arreglo clave valor
    tarea.push({...datos});
    res.json('datos guardados')
});

//CURL -X PUT localhost:3000/elementos?id=0&informacion = si
app.put('/elementos', (req, res) => {
    const id = parseInt(req.params.id);
    //aqui leemos en java '![]' significa false
    //por lo tanto si el arreglo esta vacio entra en if
    if(!id){
        res.status(404).send('no hay informacion en el arreglo');
        return;
    }
    
    var text = req.query.informacion;

    // Verificar si el elemento con la ID dada existe antes de actualizarlo
    if (tarea[id]) {
        tarea[id].informacion = text || tarea[id].informacion;
        res.send('actualizado correctamente');
    } else {
        res.status(404).send('Elemento no encontrado');
    }
});

//CURL -X DELETE localhost:3000/elementos?id= aqui va la id de la anterior
app.delete('/elementos', (req,res)=>{
    var id = req.query.id;
    tarea = tarea.filter(tar => tar.id !== id);
    res.send('eliminado')
});
//luna
app.get('/faselunar', async(req,res)=>{
    const id = req.query.id;//id
    //const url 'https://api.farmsense.net/v1/moonphase
    const fecha = 125787192;
    //concatenar url + fecha
    const respuesta = await axios;
});