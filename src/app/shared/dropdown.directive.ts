import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appDropdown]',
    exportAs:'appDropDown'
  })
export class DropdownDirective {
    
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') toggleOpen(){ // eventdata: Event  -->moze se koristiti kao argument
        this.isOpen = !this.isOpen;
    } 
}