import { child, get, ref, set, push, onValue, query, startAt, endAt, orderByChild } from 'firebase/database';
import { useEffect, useState } from 'react';
import { getCurrentDate } from '../../utils/date';
import { firebaseDatabase } from '../firebase';

export interface Expense {
  amount: number;
  budgetedAmount: number | null;
  createdAt: string;
  expenseType: string;
  frequency: string;
  parentExpenseType: string;
}

export const addExpense = async (
  expenseType: string,
  amount: number,
  date?: string,
  frequency?: string,
  parentExpenseType?: string | null,
  budgetedAmount?: number | null
) => {
  const expenseRef = ref(firebaseDatabase, 'expenses');
  const newExpense = push(expenseRef);
  set(newExpense, {
    expenseType,
    amount,
    createdAt: date ?? getCurrentDate(),
    frequency: frequency ?? 'Monthly',
    parentExpenseType: parentExpenseType ?? '',
    budgetedAmount: budgetedAmount ?? null,
  });
};

export const getExpenseTypes = async (): Promise<string[] | null> => {
  const dbRef = ref(firebaseDatabase);
  const snapshot = await get(child(dbRef, `expenses`));
  if (snapshot.exists()) {
    const val = snapshot.val();
    const types = new Set();
    for (let key in val) {
      types.add(val[key].expenseType as string);
    }
    // @ts-ignore
    return Array.from(types);
  }

  console.log('No expenses');
  return null;
};

export const getExpense = async (expenseType: string): Promise<Expense | null> => {
  const dbRef = ref(firebaseDatabase);
  const snapshot = await get(child(dbRef, `expenses/${expenseType}`));
  if (snapshot.exists()) {
    console.log(snapshot);
    return snapshot.val();
  }

  console.log('No expenses');
  return null;
};

export const useGetExpenses = (from: string, to: string) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const expensesRef = query(ref(firebaseDatabase, 'expenses'), orderByChild('createdAt'), startAt(from), endAt(to));

  useEffect(() => {
    onValue(expensesRef, (snapshot) => {
      const snapshots: Expense[] = [];
      snapshot.forEach((child) => {
        snapshots.push(child.val());
      });
      setExpenses(snapshots);
    });

    // return () => expensesRef.off();
  }, [from, to]);

  return expenses;
};
