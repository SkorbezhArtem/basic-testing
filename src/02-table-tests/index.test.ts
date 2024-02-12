// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const testCases = [
    { a: 5, b: 3, action: Action.Add, expected: 8 },
    { a: 10, b: 4, action: Action.Subtract, expected: 6 },
    { a: 6, b: 7, action: Action.Multiply, expected: 42 },
    { a: 20, b: 5, action: Action.Divide, expected: 4 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 2, b: 1, action: 'Invalid action', expected: null },
    { a: 'invalid', b: 1, action: Action.Subtract, expected: null },
  ];

  test.each(testCases)(
    'should %p %p and %p to equal %p',
    ({ a, b, action, expected }) => {
      const res = simpleCalculator({ a, b, action });
      expect(res).toBe(expected);
    },
  );
});
