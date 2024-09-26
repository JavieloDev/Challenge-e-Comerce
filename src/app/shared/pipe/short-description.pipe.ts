import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shortDescription',
  standalone: true
})
export class ShortDescriptionPipe implements PipeTransform {

  transform(value: string, maxLength: number = 15): string {
    return value.length > maxLength ? value.substring(0, maxLength) + '...' : value;
  }

}

