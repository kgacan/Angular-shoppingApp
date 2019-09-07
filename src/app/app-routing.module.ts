import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeResolverService } from './recipes/recipes-resolver.service';


const routes: Routes = [
  {path:'', redirectTo: '/recipes', pathMatch:'full'},
  {path:'recipes', component: RecipesComponent, children:[
    {path:'', component: RecipeStartComponent},
    {path:'new', component: RecipeEditComponent},
    {path:':id', component: RecipesDetailComponent, resolve: [RecipeResolverService]},
    {path:':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]}
  ]},
  {path: 'shopping-list', component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
