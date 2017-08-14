import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {ServerService} from './server.service';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('A test recipe',
     'This is simply test','http://media3.sailusfood.com/wp-content/uploads/2016/02/cheese-corn-balls.jpg',
      [new Ingredient('Meat', 1),new Ingredient('French Fries', 20)]),
    new Recipe('A test recipe 2',
    'This is simply test 2',
    'http://media3.sailusfood.com/wp-content/uploads/2016/02/cheese-corn-balls.jpg',
    [new Ingredient('Buns', 2),new Ingredient('Meat', 2)])
  ];

  recipeChanged = new Subject<Recipe[]>();
  constructor(private slService : ShoppingListService, private serverService : ServerService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id : number) {
    return this.recipes.slice()[id];
  }

  addIngredientsToShoppingList(ingredients : Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe : Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index : number, recipe : Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index : number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  saveRecipes() {
    this.serverService.saveRecipes(this.recipes).subscribe((res : any[]) => {
      console.log(res);
    });
  }

  getRecipesFromServer() {
    this.serverService.getRecipes().subscribe((res : any[]) => {
      console.log(res);
      this.recipes = res;
      this.recipeChanged.next(this.recipes.slice());
    });
  }

}
