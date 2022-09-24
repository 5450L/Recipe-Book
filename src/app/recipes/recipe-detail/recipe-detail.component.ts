import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router:Router,
    private recipeService:RecipeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  addRecipeIngredients() {
    for (let i = 0; i < this.recipe.ingredients.length; i++) {
      this.shoppingListService.addIngredient(this.recipe.ingredients[i]);
    }
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo:this.route});
  }
}
