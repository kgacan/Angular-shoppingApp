import { Ingredient } from 'src/app/shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShopingListService } from './shoping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;

  constructor(private shoppinglistService: ShopingListService, private loggingService: LoggingService) { }

  ngOnInit() {
    this.ingredients = this.shoppinglistService.getAllIngredients();
    this.igChangeSub = this.shoppinglistService.ingredientsChanged
    .subscribe((ingredients: Ingredient[])=> {
      this.ingredients = ingredients;
    })

    this.loggingService.printLog('Hello from Shpping-list component ngOnInit');
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
