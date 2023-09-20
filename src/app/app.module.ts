import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import firebase from "firebase/app";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

const firebaseConfig = {
  apiKey: "AIzaSyCfHVjTuDWBU1BNfRCP2rgvRP_97ntU0ck",
  authDomain: "db-api-en-tiempo-real-a1af2.firebaseapp.com",
  projectId: "db-api-en-tiempo-real-a1af2",
  storageBucket: "db-api-en-tiempo-real-a1af2.appspot.com",
  messagingSenderId: "989440459400",
  appId: "1:989440459400:web:9afd166389fee1c696153d"
};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
