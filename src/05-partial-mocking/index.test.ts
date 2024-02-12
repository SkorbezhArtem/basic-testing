import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

describe('partial mocking', () => {
  let consoleLogSpy: jest.SpyInstance<
    void,
    [message?: unknown, ...optionalParams: unknown[]],
    unknown
  >;

  beforeAll(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn());

    const createMockModule = () => {
      const originalModule =
        jest.requireActual<typeof import('./index')>('./index');

      return {
        ...originalModule,
        mockOne: jest.fn(),
        mockTwo: jest.fn(),
        mockThree: jest.fn(),
      };
    };

    jest.mock('./index', () => createMockModule());
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleLogSpy.mockRestore();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();

    expect(consoleLogSpy).not.toHaveBeenCalled();
  });
});
