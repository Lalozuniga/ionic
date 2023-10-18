import { Component, OnInit } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-directions-api',
  templateUrl: './directions-api.page.html',
  styleUrls: ['./directions-api.page.scss'],
})
export class DirectionsApiPage implements OnInit {
  distanciaKm:any;
  distanciaMin:any;
  dir1:string='';
  dir2:string='';
  constructor() { }

  async calcular(){
    //%2A %20 significa que esta cambiando caracteres especiales por estandar
    const dir1 = encodeURIComponent(this.dir1);
    const dir2 = encodeURIComponent(this.dir2);
    const url = `http://localhost:3000/direcciones/?parametro1=${dir1}?parametro2=${dir2}`;
    const respuesta = await axios.get(url);
    console.log(respuesta.data);
  }

  ngOnInit() {
  }

}
