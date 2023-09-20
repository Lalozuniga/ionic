//home.page.ts
import { Component } from '@angular/core';
//import axios from 'axios';
import firebase from "firebase/app";
import 'firebase/database';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  direccion:any;
  colonia:any;
  ciudad:any;
  nombre:any;
  apellidos:any;

  constructor() {}
  async guardarFormulario(){
    const databaseRef = firebase.database().ref('/formulario');
    const datos = {
      direccion: this.direccion,
      nombre: this.nombre,
      colonia: this.colonia,
      ciudad: this.ciudad,
      apellidos: this.apellidos,
    };
    databaseRef.child(this.nombre).set(datos).then(()=>{
    console.log('Subido Exitosamente!')
  });
  }

}
