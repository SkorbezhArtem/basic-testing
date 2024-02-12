import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

const setupFakeTimers = () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });
};

describe('doStuffByTimeout', () => {
  let mockCallback: jest.Mock;
  let mockTimeout: number;

  setupFakeTimers();

  beforeEach(() => {
    mockCallback = jest.fn();
    mockTimeout = 500;
  });

  test('sets timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(mockCallback, mockTimeout);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(mockCallback, mockTimeout);
  });

  test('calls callback only after timeout', () => {
    doStuffByTimeout(mockCallback, mockTimeout);
    expect(mockCallback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(mockCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  let mockInterval: number;

  setupFakeTimers();

  beforeEach(() => {
    mockInterval = 500;
  });

  test('sets interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const mockCallback = jest.fn();

    doStuffByInterval(mockCallback, mockInterval);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(mockCallback, mockInterval);
  });

  test('calls callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();
    doStuffByInterval(mockCallback, mockInterval);
    expect(mockCallback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(mockInterval);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(mockInterval);
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  const mockPathToFile = 'test.txt';
  const mockFileContent = 'File content';

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('calls join with pathToFile', async () => {
    const joinMock = jest.spyOn(path, 'join');
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    await readFileAsynchronously(mockPathToFile);
    expect(joinMock).toHaveBeenCalledWith(expect.any(String), mockPathToFile);
  });

  test('returns null if file does not exist', async () => {
    jest.spyOn(path, 'join').mockReturnValue(mockPathToFile);
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously(mockPathToFile);
    expect(result).toBeNull();
  });

  test('returns file content if file exists', async () => {
    jest.spyOn(path, 'join').mockReturnValue(mockPathToFile);
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(mockFileContent);

    const result = await readFileAsynchronously(mockPathToFile);
    expect(result).toBe(mockFileContent);
  });
});
