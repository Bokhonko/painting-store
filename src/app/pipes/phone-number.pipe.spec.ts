import { PhoneNumberPipe } from './phone-number.pipe';

describe('PhoneNumberPipe', () => {
  const pipe = new PhoneNumberPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('transform number 1', () => {
expect(pipe.transform('0991234567')).toBe('+380 (99) 123-45-67')
  });
  it('transform number 2', () => {
expect(pipe.transform('380991234567')).toBe('+380 (99) 123-45-67')
  });
  it('transform number 3', () => {
expect(pipe.transform('+380991234567')).toBe('+380 (99) 123-45-67')
  });
  it('transform number 4', () => {
expect(pipe.transform('(099)1234567')).toBe('+380 (99) 123-45-67')
  });
  it('transform number 5', () => {
expect(pipe.transform('099 123 45 67')).toBe('+380 (99) 123-45-67')
  });
  it('transform number 6', () => {
expect(pipe.transform('099 12 345 67')).toBe('+380 (99) 123-45-67')
  });
});
