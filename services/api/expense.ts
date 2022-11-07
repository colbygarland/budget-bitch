import { child, get, ref, set, push } from 'firebase/database';
import { firebaseDatabase } from '../firebase';

export interface Expense {
  expenseType: string;
  amount: number;
  createdAt: number;
}

export const addExpense = async (expenseType: string, amount: number, date?: Date) => {
  const expenseRef = ref(firebaseDatabase, 'expenses');
  const newExpense = push(expenseRef);
  set(newExpense, {
    expenseType,
    amount,
    createdAt: date ?? Date.now(),
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
