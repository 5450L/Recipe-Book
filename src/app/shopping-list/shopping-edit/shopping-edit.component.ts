import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @Output() newIngredientEvent = new EventEmitter<Ingredient>();

  @ViewChild('amountInput', { static: true }) amountInput: ElementRef;
  // newIngredient: Ingredient = { name:'', amount:0};
  constructor() {}

  ngOnInit(): void {}

  addIngredient(nameInput: HTMLInputElement) {
    // this.newIngredient.name = nameInput.value;
    // this.newIngredient.amount = this.amountInput.nativeElement.value;
    let ingName = nameInput.value;
    let ingAmount = this.amountInput.nativeElement.value;
    let newIngredient:Ingredient = new Ingredient(ingName, ingAmount);
    this.newIngredientEvent.emit(newIngredient);
  }
}
