import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickLogger]',
  standalone: true
})
export class ClickLoggerDirective {
  @HostListener('click', ['$event'])
  handleClick(event: Event) {
    console.log('Elemento clicado:', event);
  }
  constructor() { }

}

