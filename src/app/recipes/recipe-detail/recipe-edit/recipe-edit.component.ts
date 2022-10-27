import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService:RecipeService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    });
  }

  private initForm(){
    let recipe = this.recipeService.getRecipe(this.id);
    let recipeName = '';
    if(this.editMode){
      recipeName = recipeName
    }

    let recipeForm = new FormGroup({
      'name' : new FormControl()
    });
  }

}