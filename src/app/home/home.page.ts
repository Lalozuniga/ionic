//home.page.ts
import { Component } from '@angular/core';
//import axios from 'axios';
import firebase from "firebase/app";
import 'firebase/database';
import { AlertController } from '@ionic/angular';
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


  constructor(private alertcontroller: AlertController) {}
  async guardarFormulario(){
    if(this.nombre == '' ||  this.apellidos=='' || this.direccion == '' || this.colonia == '' || this.ciudad == ''){
      this.mostrarMensaje('te falta un campo de texto', 'mensaje')
      return;
    }




    const databaseRef = firebase.database().ref('/formulario');
    const idUnico = databaseRef.push().key;//esta linea genera un id inico para que si alguien tiene el mismo nombre no se actualize
    if (idUnico){
      const datos = {
        direccion: this.direccion,
        nombre: this.nombre,
        colonia: this.colonia,
        ciudad: this.ciudad,
        apellidos: this.apellidos,
      };
      databaseRef.child(idUnico).set(datos).then(()=>{
        //this.mostrarMensaje('mi mensaje' , 'exito!');
        console.log('Subido Exitosamente!')
      });
    }
  }
  
  async mandarmensaje(titulo:string, mensaje:string){
    const alerta = await this.alertcontroller.create({
      //titulo
      //cuerpo
      //botones
      header:titulo,
      message:mensaje,
      buttons:['cerrar']
    });
    await alerta.present();
  }

}
