import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector:'[appPlaceholder]'
})
export class PlaceholderDirectives {
    constructor(public viewContainerRef: ViewContainerRef) {}
}