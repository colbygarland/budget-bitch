import { Expense } from '../services/api/expense';

export const calculateTotalPrice = (expenses: Expense[]) => {
  return expenses.reduce((prev, curr) => Number(prev) + Number(curr.amount), 0);
};

export const calculateTotalBudgetedPrice = (expenses: Expense[]) => {
  return expenses.reduce((prev, curr) => Number(prev) + Number(curr.budgetedAmount), 0);
};
