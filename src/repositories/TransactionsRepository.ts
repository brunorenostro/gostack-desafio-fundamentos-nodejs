/* eslint-disable @typescript-eslint/no-unused-vars */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    if (
      typeof this.transactions !== 'undefined' &&
      this.transactions.length > 0
    ) {
      const valuesIncome = this.transactions.map(transaction =>
        transaction.type === 'income' ? transaction.value : 0,
      );
      const income = valuesIncome.reduce(
        (prevValue, currentValue) => prevValue + currentValue,
      );
      const valuesOutcome = this.transactions.map(transaction =>
        transaction.type === 'outcome' ? transaction.value : 0,
      );
      const outcome = valuesOutcome.reduce(
        (prevValue, currentValue) => prevValue + currentValue,
      );
      const total = income - outcome;
      const balance = {
        income,
        outcome,
        total,
      };

      return balance;
    }

    const balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction(title, value, type);
    this.transactions.push(transaction);
    console.log(transaction);
    return transaction;
  }
}
export default TransactionsRepository;
