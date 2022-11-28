import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) shoppingListForm: NgForm;

  shoppingEditSubscriptions: Subscription[] = [];
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit() {
    this.shoppingEditSubscriptions.push(
      this.shoppingListService.startedEditing.subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.shoppingEditSubscriptions.push(
          this.store.select('shoppingList').subscribe((ingredients) => {
            this.editedItem = ingredients.ingredients[this.editedItemIndex];
          })
        );
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      })
    );
  }

  addIngredient(form: NgForm) {
    let ingName = form.value.name;
    let ingAmount: number = +form.value.amount;
    let newIngredient: Ingredient = new Ingredient(ingName, +ingAmount);
    // this.shoppingListService.addIngredient(newIngredient);
    this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onUpdate(form: NgForm) {
    let ingName = form.value.name;
    let ingAmount: number = +form.value.amount;
    let newIngredient: Ingredient = new Ingredient(ingName, +ingAmount);
    this.shoppingListService.updateIngredient(
      this.editedItemIndex,
      newIngredient
    );
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(): void {
    this.shoppingEditSubscriptions.forEach((sub) => sub.unsubscribe());
  }
}
