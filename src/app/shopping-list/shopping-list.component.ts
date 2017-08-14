import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients : Ingredient[] =[];
  ingredientSubscription : Subscription;
  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientSubscription = this.shoppingListService.ingredientAdded.subscribe(()=>{
      this.ingredients = this.shoppingListService.getIngredients();
    });
  }

  ngOnDestroy() {
    this.ingredientSubscription.unsubscribe();
  }

  onEditItem(index : number) {
    this.shoppingListService.itemmEditStarted.next(index);
  }
}
