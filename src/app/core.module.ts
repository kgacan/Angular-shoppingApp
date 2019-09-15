import { LoggingService } from './logging.service';
import { NgModule } from '@angular/core';

import { ShopingListService } from './shopping-list/shoping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
    providers: [
        ShopingListService,
        RecipeService, 
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
    ]
})

export class CoreModule {}