import { Ingredient } from 'src/app/shared/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { ShopingListService } from './shoping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private shoppinglistService: ShopingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppinglistService.getAllIngredients();
    this.shoppinglistService.ingredientsChanged
    .subscribe((ingredients: Ingredient[])=> {
      this.ingredients = ingredients;
    })
  }
}
