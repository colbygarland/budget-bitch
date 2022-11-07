import { child, get, ref, set } from 'firebase/database';
import { firebaseDatabase } from '../firebase';

export interface Expense {
  expenseType: string;
  amount: number;
  createdAt: number;
}

export const addExpense = async (expenseType: string, amount: number, date?: Date) => {
  set(ref(firebaseDatabase, `expenses/${expenseType}`), {
    expenseType,
    amount,
    createdAt: date ?? Date.now(),
  });
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
