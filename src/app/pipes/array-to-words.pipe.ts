import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToWords',
})
export class ArrayToWordsPipe implements PipeTransform {
  transform(value: any) {
    let sentence: string = '';
    value.forEach((word: string) => {
      let firstLetter = word.charAt(0);
      let reminingLetters = word.slice(1);
      sentence += firstLetter.toUpperCase() + reminingLetters;
      sentence += ' ';
    });

    return sentence;
  }
}
