import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customContent',
})
export class CustomContentPipe implements PipeTransform {
  transform(value: string, ...args: number[]): string {
    if (!value) return '';
    const words = value.split(' ');
    console.log(words);
    if(words.length<=args[0]){
      return value;
    }
    return words.slice(0,args[0]).join(' ')+'....';
  }
}
