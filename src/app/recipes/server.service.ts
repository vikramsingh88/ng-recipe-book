import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Recipe } from './recipe.model';
import 'rxjs/Rx';

import {AuthService} from '../auth.service';

@Injectable()
export class ServerService {
  dbUrl = 'https://aolpmt-cf7bb.firebaseio.com/recipes.json';
  constructor(private http : Http, private authService : AuthService) { }

  saveRecipes(recipes : Recipe[]) {
    const token = this.authService.getToken();
    return this.http.put(this.dbUrl+"?auth="+token, recipes)
    .map((res : Response) => {
      return res.json();
    });
  }

  getRecipes() {
    const token = this.authService.getToken();
    return this.http.get(this.dbUrl+"?auth="+token)
    .map((res : Response) => {
      const recipes : Recipe[] = res.json();
      for(let recipe of recipes) {
        if(!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return recipes ;
    });
  }

}
