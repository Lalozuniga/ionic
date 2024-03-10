import { Component, OnInit } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-consultor',
  templateUrl: './consultor.page.html',
  styleUrls: ['./consultor.page.scss'],
})
export class ConsultorPage implements OnInit {

  rooms: number[] = [1];
  variables:any[] = [];
  valores:any[] = [];
  constructor() { }
  async leerInputs(){
    this.rooms.forEach(room=>{
      const input = document.getElementById('nombresvariables'+ room)as HTMLInputElement;
      const input2 = document.getElementById('input' + room)as HTMLInputElement;

      this.variables.push(input.value);
      //const imput2
      this.variables.push(input2.value);
    });
    let posturl = '';
    for(let i = 0; i < this.variables.length;i++){
      posturl = posturl + this.variables[i] + '=' + encodeURIComponent(this.valores[i]) + '&'
    }

    posturl = posturl.slice(0, -1);
    posturl = encodeURIComponent(posturl);
    //funciones
    const respuesta = await axios.get('http://localhost:3000/consultar-api?petition='+posturl);
    console.log(respuesta.data);
  }
  agregarRoom(){
    const sizeRoom = this.rooms.length +1;
    this.rooms.push(sizeRoom);
  }
  eliminarRoom(){
    if(this.rooms.length>1){
      //condicion ternaria
      //(this.rooms.lenght > 1)?this.rooms.pop();return;
      this.rooms.pop();
    }
  }
  ngOnInit() {
  }

}
