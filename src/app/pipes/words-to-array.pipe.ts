import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordsToArray'
})
export class WordsToArrayPipe implements PipeTransform {

  transform(value: string) {
    let splitter = value.split(' ');
    let arr:any[] = [];
    splitter.forEach((word:string) => {
      arr.push(word.toLowerCase());
    })

    return arr;
  }

}
