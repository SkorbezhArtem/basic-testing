import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const inputValues = [1, 2, 3];
    const expectedLinkedList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    const result = generateLinkedList(inputValues);

    expect(result).toStrictEqual(expectedLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const inputValues = [1, 2, 3];
    const result = generateLinkedList(inputValues);
    expect(result).toMatchSnapshot();
  });
});
