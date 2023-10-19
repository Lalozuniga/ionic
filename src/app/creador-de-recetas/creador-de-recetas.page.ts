import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import firebase from "firebase/app";
import 'firebase/database';
@Component({
  selector: 'app-creador-de-recetas',
  templateUrl: './creador-de-recetas.page.html',
  styleUrls: ['./creador-de-recetas.page.scss'],
})
export class CreadorDeRecetasPage implements OnInit {
  nombreReceta:any;
  porciones:any;
  calorias:any;
  paso1:any;
  paso2:any;
  paso3:any;
  paso4:any;
  paso5:any;
  ingrediente1:any;
  ingrediente2:any;
  ingrediente3:any;
  ingrediente4:any;
  ingrediente5:any;

  constructor(private alertController: AlertController,
    private navcontroller:NavController) {}
    
    async navVista(){
      this.navcontroller.navigateRoot('/home');
      }

  async guardarReceta(){
    const pasos = {
      0:this.paso1,
      1:this.paso2,
      2:this.paso3,
      3:this.paso4,
      4:this.paso5,

    };
    const ingredientes = {
      0:this.ingrediente1,
      1:this.ingrediente2,
      2:this.ingrediente3,
      3:this.ingrediente4,
      4:this.ingrediente5,
    };
    const datos = {
      porciones:this.porciones,
      pasos:pasos,
      ingredientes:ingredientes,
      calorias:this.calorias,
    };
    const referencia = firebase.database().ref('/recetas');
    referencia.child(this.nombreReceta).set(datos).then(()=>{
      this.limpieza();
    }).catch((error)=>{
      console.log(error);
    });
  }
  limpieza(){
    this.nombreReceta= '';
    this.calorias = '';
    this.paso1 = '';
    this.paso2 = '';
    this.paso3 = '';
    this.paso4 = '';
    this.paso5 = '';
    this.ingrediente1 = '';
    this.ingrediente2 = '';
    this.ingrediente3 = '';
    this.ingrediente4 = '';
    this.ingrediente5 = '';
    
  }
  ngOnInit() {
  }

}
