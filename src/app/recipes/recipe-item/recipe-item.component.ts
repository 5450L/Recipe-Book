import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Output() selectedRecipeItem = new EventEmitter<void>();
  @Input() recipe: Recipe;

  constructor() {}

  ngOnInit(): void {}

  recipeItemSelect() {
    event.preventDefault();
    this.selectedRecipeItem.emit();
  }
}
