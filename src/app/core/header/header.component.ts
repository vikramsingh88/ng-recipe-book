import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {RecipeService} from '../../recipes/recipe.service';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor( private recipeService : RecipeService, public authService : AuthService, private router : Router) { }

  ngOnInit() {
    console.log(this.authService.isAuthenticated());
  }

  onSaveRecipes() {
    this.recipeService.saveRecipes();
  }

  onGetRecipes() {
    this.recipeService.getRecipesFromServer();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
