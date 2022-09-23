import { Pipe, PipeTransform } from '@angular/core';
import { convertNumbersWithCommas, NumberSuffix } from './helpers';

@Pipe({
  name: 'numberSuffix'
})
export class NumberSuffixPipe implements PipeTransform {
  
  transform(input: any, args?: any): any {

    return NumberSuffix(input,args)
  }
}


@Pipe({
  name: 'convertNumbersWithCommas'
})
export class ConvertNumbersWithCommasPipe implements PipeTransform {
  
  transform(input: any): any {

    return convertNumbersWithCommas(input)
  }
}

