import { WordsToArrayPipe } from './words-to-array.pipe';

describe('WordsToArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new WordsToArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
