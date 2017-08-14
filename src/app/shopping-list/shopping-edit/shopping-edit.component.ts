import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../../shared/ingredient.model';

import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm : NgForm;
  editMode = false;
  editItemIndex : number;
  editedItem : Ingredient;

  editSubscription : Subscription;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
    this.editSubscription = this.shoppingListService.itemmEditStarted.subscribe((index : number) => {
      this.editItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.shoppingListForm.setValue({
        name : this.editedItem.name,
        amount : this.editedItem.amount
      });
    });
  }

  onItemAdd() {
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editItemIndex, new Ingredient(this.shoppingListForm.value.name, this.shoppingListForm.value.amount));
    } else {
      this.shoppingListService.addIngredient(new Ingredient(this.shoppingListForm.value.name, this.shoppingListForm.value.amount));
    }
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onClear(){
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
  }

}
