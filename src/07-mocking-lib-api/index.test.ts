import { throttledGetDataFromApi } from './index';
import axios from 'axios';

jest.useFakeTimers();

const baseURL = 'https://jsonplaceholder.typicode.com';

afterEach(() => {
  jest.runAllTimers();
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/todos/1');
    expect(createSpy).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const getSpy = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi('/todos/1');
    expect(getSpy).toHaveBeenCalledWith('/todos/1');
  });

  test('should return response data', async () => {
    const response = [{ id: 1, title: 'Test' }];
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: response });
    const data = await throttledGetDataFromApi('/todos/1');
    expect(data).toEqual(response);
  });
});
