import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyAYYI7FmjMxv8BKmBErrFMsyhOhdzF8lW0",
      authDomain: "aolpmt-cf7bb.firebaseapp.com"
    });
  }
}
