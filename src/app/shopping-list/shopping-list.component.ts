import { Ingredient } from 'src/app/shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShopingListService } from './shoping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;

  constructor(private shoppinglistService: ShopingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppinglistService.getAllIngredients();
    this.igChangeSub = this.shoppinglistService.ingredientsChanged
    .subscribe((ingredients: Ingredient[])=> {
      this.ingredients = ingredients;
    })
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.igChangeSub.unsubscribe();
  }
  onEditItem(index: number){
    this.shoppinglistService.startedEditing.next(index);
  }
}
