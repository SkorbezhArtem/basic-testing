import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 500;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 200;
    const withdrawalAmount = 300;
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(withdrawalAmount)).toThrow(
      InsufficientFundsError,
    );
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(200);
    const account2 = getBankAccount(500);

    expect(() => account1.transfer(300, account2)).toThrow(
      InsufficientFundsError,
    );
    expect(account1.getBalance()).toBe(200);
    expect(account2.getBalance()).toBe(500);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(500);
    expect(() => account.transfer(200, account)).toThrow(TransferFailedError);
    expect(account.getBalance()).toBe(500);
  });

  test('should deposit money', () => {
    const initialBalance = 500;
    const depositAmount = 200;
    const account = getBankAccount(initialBalance);
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 500;
    const withdrawalAmount = 200;
    const account = getBankAccount(initialBalance);
    account.withdraw(withdrawalAmount);
    expect(account.getBalance()).toBe(initialBalance - withdrawalAmount);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(500);
    const account2 = getBankAccount(200);
    const transferAmount = 100;
    account1.transfer(transferAmount, account2);
    expect(account1.getBalance()).toBe(500 - transferAmount);
    expect(account2.getBalance()).toBe(200 + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(500);
    const balance = await account.fetchBalance();
    balance !== null ? expect(typeof balance).toBe('number') : null;
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(500);
    account.fetchBalance = jest.fn(() => Promise.resolve(100));
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(500);
    account.fetchBalance = jest.fn(() => Promise.resolve(null));
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
