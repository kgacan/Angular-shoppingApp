import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {path:'', redirectTo: '/recipes', pathMatch:'full'},
  {path: 'auth', component:AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
