import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  // @HostListener('click') toggleOpen(){
  //   event.preventDefault();
  //   this.isOpen = !this.isOpen
  // }
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    // event.preventDefault();
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen: false;
  }
  constructor(private elRef: ElementRef) {}
}
