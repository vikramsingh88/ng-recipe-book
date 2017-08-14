import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id : number;
  editMode = false;

  recipeEditForm : FormGroup;

  constructor(private route : ActivatedRoute, private recipe : RecipeService, private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe((params : Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    let recipeName = '';
    let imageUrl = '';
    let description = '';
    let recipeIngrediets = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipe.getRecipeById(this.id);
      recipeName = recipe.name;
      imageUrl = recipe.imagePath;
      description = recipe.description;

      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients) {
          recipeIngrediets.push(new FormGroup({
            'name' : new FormControl(ingredient.name,Validators.required),
            'amount' : new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }
    this.recipeEditForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imageUrl' : new FormControl(imageUrl,  Validators.required),
      'description' : new FormControl(description,  Validators.required),
      'ingredients' : recipeIngrediets
    });
  }

  onSubmit() {
    const newRecipe = new Recipe(this.recipeEditForm.value['name'],
                                  this.recipeEditForm.value['description'],
                                  this.recipeEditForm.value['imageUrl'],
                                  this.recipeEditForm.value['ingredients']);
    if(this.editMode) {
      this.recipe.updateRecipe(this.id, newRecipe);
    } else {
      this.recipe.addRecipe(newRecipe);
    }

    this.recipeEditForm.reset();
    this.editMode = false;

    this.router.navigate(['../'], {relativeTo : this.route});
  }

  onAddIngredient() {
    (<FormArray>this.recipeEditForm.get('ingredients')).push(new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'amount' : new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo : this.route});
  }

  onDeleteIngredient(index : number) {
    console.log(index);
    (<FormArray>this.recipeEditForm.get('ingredients')).removeAt(index);
  }

}
