import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.model';
import { map, tap, take, exhaustMap } from 'rxjs/Operators'

@Injectable({providedIn: 'root'})
export class DataStorageService {
    recipes: Recipe[];

    constructor(private http: HttpClient, private recipeService: RecipeService, 
        private authService: AuthService) {}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();

        this.http.put('https://ng-complete-guid-32335.firebaseio.com/recipes.json',
        recipes)
        .subscribe( response => {
            console.log(response);
        })
    }

    fetchData() {
        return this.http.get<Recipe[]>(
            'https://ng-complete-guid-32335.firebaseio.com/recipes.json'
        ).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            }));
    }
    
}