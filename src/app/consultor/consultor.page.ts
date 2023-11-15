import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultor',
  templateUrl: './consultor.page.html',
  styleUrls: ['./consultor.page.scss'],
})
export class ConsultorPage implements OnInit {

  rooms: number[] = [1];
  constructor() { }
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
