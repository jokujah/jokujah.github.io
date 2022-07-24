import { Pipe, PipeTransform } from '@angular/core';
import { NumberSuffix } from './helpers';

@Pipe({
  name: 'numberSuffix'
})
export class NumberSuffixPipe implements PipeTransform {
  
  transform(input: any, args?: any): any {

    return NumberSuffix(input,args)
  }
}