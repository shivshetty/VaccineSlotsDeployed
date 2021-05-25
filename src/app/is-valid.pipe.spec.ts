import { IsValidPipe } from './is-valid.pipe';

describe('IsValidPipe', () => {
  it('create an instance', () => {
    const pipe = new IsValidPipe();
    expect(pipe).toBeTruthy();
  });
});
