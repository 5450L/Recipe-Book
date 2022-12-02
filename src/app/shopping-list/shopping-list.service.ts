import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reduser';

import * as _ from 'lodash';

@Injectable()
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  constructor(
    private store: Store<fromShoppingList.AppState>
  ) {}

  private ingredients: Ingredient[];

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index) {
    return this.ingredients[index];
  }

  addIngredient(newIngredient: Ingredient) {
    let isSameName: boolean = false;

    this.store.select('shoppingList').subscribe((ingredients) => {
      this.ingredients = ingredients.ingredients;
    });

    let ingredients = _.cloneDeep(this.ingredients);

    for (let i = 0; i < this.ingredients.length; i++) {
      if (ingredients[i].name === newIngredient.name) {
        ingredients[i].amount = +ingredients[i].amount + +newIngredient.amount;
        isSameName = true;

        this.store.dispatch(
          new ShoppingListActions.AddIngredients(ingredients)
        );
      }
    }
    if (isSameName === false) {
      ingredients.push(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }
  }

  updateIngredient(ingredient: Ingredient) {
    this.store.dispatch(
      new ShoppingListActions.UpdateIngredient(ingredient )
    );
  }

  deleteIngredient() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());

    // this.ingredients.splice(index, 1);
    // this.ingredientsChanged.next(this.ingredients.slice());
  }
}
