import { LoggingService } from './../logging.service';
import { NgModule } from '@angular/core';

import { PlaceholderDirectives } from './placeholder/placeholder.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirectives,
        DropdownDirective
    ],
    imports:[
        CommonModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirectives,
        DropdownDirective,
        CommonModule
    ],
    entryComponents: [
        AlertComponent
      ],
    providers:[ LoggingService]
})
export class SharedModule{

}