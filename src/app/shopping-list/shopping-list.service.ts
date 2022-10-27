import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Meat', 5),
    new Ingredient('Tomato', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index) {
    return this.ingredients[index];
  }

  addIngredient(newIngredient: Ingredient) {
    let isSameName: boolean = false;

    for (let i = 0; i < this.ingredients.length; i++) {
      if (this.ingredients[i].name === newIngredient.name) {
        this.ingredients[i].amount =
          +this.ingredients[i].amount + +newIngredient.amount;
        isSameName = true;
      }
    }
    if (isSameName === false) {
      this.ingredients.push(newIngredient);
    }

    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
