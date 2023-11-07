

const express = require('express');
const axios = require('axios');
const cors =  require('cors');
const nodemailer = require('nodemailer');
const ics = require('ics');
const app = express();
const port = 3000;

app.listen(port, ()=>{
    console.log(`proxy escuchado en el puerto ${port}`);
});
