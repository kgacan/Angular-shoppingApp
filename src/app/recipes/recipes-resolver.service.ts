import { DataStorageService } from './../shared/data-storage.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipes.model';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';


@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {
    
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | import("rxjs").Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipeService.getRecipes();
        if(recipes.length === 0){
            return this.dataStorageService.fetchData();
        }
    }


    // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    //     return this.dataStorageService.fetchData();
    // }

    constructor(private dataStorageService: DataStorageService,
                private recipeService: RecipeService) {}
    
}