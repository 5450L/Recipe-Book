import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsCganged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Meat', 5),
    new Ingredient('Tomato', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(newIngredient:Ingredient) {
    let isSameName: boolean = false;

    for (let i = 0; i < this.ingredients.length; i++) {
      if (this.ingredients[i].name === newIngredient.name) {
        this.ingredients[i].amount = +this.ingredients[i].amount + +newIngredient.amount;
        isSameName = true;
      }
    }
    if (isSameName === false) {
      this.ingredients.push(newIngredient);
    }

    this.ingredientsCganged.emit(this.ingredients.slice());
  }
}
