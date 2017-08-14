import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  token : string = null;
  constructor(private router : Router) { }

  signupUser(email : string, password : string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      console.log(error);
    });
  }

  signinUser(email : string, password : string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response : Response) => {
      firebase.auth().currentUser.getToken()
      .then((token : string) => {
        this.token = token;
      });
      this.router.navigate(['/']);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getToken() {
    firebase.auth().currentUser.getToken()
    .then((token : string) => {
      this.token = token;
    });
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

}
