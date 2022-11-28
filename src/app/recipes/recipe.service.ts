import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

import { Recipe } from './recipe.model';

export class RecipeService {
  public recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  

  private recipes: Recipe[] = [
    // new Recipe(
    //   'Test name',
    //   'Test Description',
    //   'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    //   [new Ingredient('Meat', 1), new Ingredient('French fries', 20)]
    // ),
    // new Recipe(
    //   'Test name 2',
    //   'Test Description 2',
    //   'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    //   [new Ingredient('Meat', 1), new Ingredient('Buns', 2)]
    // ),
  ];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
    console.log(this.recipes);
  }
}
