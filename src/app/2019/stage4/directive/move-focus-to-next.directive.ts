import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[moveFocusToNext]',
})
export class MoveFocusToNextDirective {
  constructor() {}

  @HostListener('input', ['$event']) onInputChange(e: any) {
    let element;

    if (e.target && e.target.maxLength === e.target.value.length) {
      element = e.target.nextSibling.nextSibling;
    }

    element?.focus();
  }
}
