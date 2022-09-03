import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('amountInput', { static: true }) amountInput: ElementRef;
  
  constructor( private shoppingListService : ShoppingListService) {}

  ngOnInit() {}

 addIngredient(nameInput: HTMLInputElement) {
    let ingName = nameInput.value;
    let ingAmount:number = this.amountInput.nativeElement.value;
    let newIngredient:Ingredient = new Ingredient(ingName, ingAmount);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
