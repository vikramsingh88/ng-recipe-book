import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
  private ingredients : Ingredient[] =[
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  ingredientAdded = new Subject<void>();
  itemmEditStarted = new Subject<number>();

  constructor() {
  }

  addIngredient(ingredient : Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next();
  }

  updateIngredient(index : number, ingredient : Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientAdded.next();
  }

  addIngredients(ingredients : Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientAdded.next();
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index : number) {
    return this.ingredients.slice()[index];
  }

  deleteIngredient(index : number) {
    this.ingredients.splice(index, 1);
    this.ingredientAdded.next();
  }

}
