// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const res = simpleCalculator({ a: 5, b: 3, action: Action.Add });
    expect(res).toEqual(8);
  });

  test('should subtract two numbers', () => {
    const res = simpleCalculator({ a: 10, b: 4, action: Action.Subtract });
    expect(res).toEqual(6);
  });

  test('should multiply two numbers', () => {
    const res = simpleCalculator({ a: 6, b: 7, action: Action.Multiply });
    expect(res).toEqual(42);
  });

  test('should divide two numbers', () => {
    const res = simpleCalculator({ a: 20, b: 5, action: Action.Divide });
    expect(res).toEqual(4);
  });

  test('should exponentiate two numbers', () => {
    const res = simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate });
    expect(res).toEqual(8);
  });

  test('should return null for invalid action', () => {
    const res = simpleCalculator({ a: 2, b: 1, action: 'Invalid action' });
    expect(res).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const res = simpleCalculator({
      a: 'invalid',
      b: 1,
      action: Action.Subtract,
    });
    expect(res).toBeNull();
  });
});
