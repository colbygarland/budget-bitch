import { Select, FormErrorMessage, Input, RadioGroup, Stack, Radio } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { addExpense, getExpenseTypes } from '../../services/api/expense';
import { getCurrentDate } from '../../utils/date';
import { Button } from '../Button';
import { FormBlock, Label } from './shared';

export const AddExpenseForm = ({ onClose }: { onClose: () => void }) => {
  const [expenseTypes, setExpenseTypes] = useState<string[]>([]);
  const [selectedExpenseType, setSelectedExpenseType] = useState<string | null>(null);
  const [newExpenseType, setNewExpenseType] = useState('');
  const [amount, setAmount] = useState<number | null>(null);
  const [date, setDate] = useState(getCurrentDate());
  const [frequency, setFrequency] = useState<string>('Monthly');
  const [budgetedAmount, setBudgetedAmount] = useState<number | null>(null);
  const [selectedParentExpenseType, setSelectedParentExpenseType] = useState<string | null>(null);

  // Error handlers
  const [amountError, setAmountError] = useState('');
  const [selectedExpenseError, setSelectedExpenseError] = useState('');
  const [newExpenseTypeError, setNewExpenseTypeError] = useState('');
  const [budgetedAmountError, setBudgetedAmountError] = useState('');

  function resetState() {
    setSelectedExpenseType(null);
    setNewExpenseType('');
    setAmount(null);
    setSelectedExpenseError('');
    setAmountError('');
  }

  async function getTypes() {
    getExpenseTypes().then((types) => {
      if (types && types.length) {
        setExpenseTypes(types);
      }
    });
  }

  function hasErrors() {
    let hasError = false;
    if (selectedExpenseType === null) {
      setSelectedExpenseError('Please select an Expense Type.');
      hasError = true;
    }
    if (amount === null) {
      setAmountError('Please enter a valid amount.');
      hasError = true;
    }
    if (selectedExpenseType === 'add-new') {
      if (newExpenseType === '') {
        setNewExpenseTypeError('Please enter an Expense Type.');
        hasError = true;
      }
      if (budgetedAmount === null) {
        setBudgetedAmountError('Please enter a valid amount.');
        hasError = true;
      }
    }

    return hasError;
  }

  async function handleOnClick() {
    if (hasErrors()) {
      return;
    }

    // if adding a new expense type, use that instead
    addExpense(
      newExpenseType !== '' ? newExpenseType : (selectedExpenseType as unknown as string),
      amount as number,
      date,
      frequency,
      selectedParentExpenseType
    );
    await getTypes();
    onClose();
    resetState();
  }

  function handleClose() {
    onClose();
    resetState();
  }

  useEffect(() => {
    getTypes();
  }, []);

  return (
    <>
      <FormBlock isInvalid={selectedExpenseError}>
        <Label>Expense Type</Label>
        <Select
          placeholder="Select Expense Type"
          value={selectedExpenseType as unknown as string}
          onChange={(e) => {
            setSelectedExpenseType(e.target.value);
            setSelectedExpenseError('');
          }}
        >
          {expenseTypes?.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
          <option value="add-new">+ Add New Type</option>
        </Select>
        {selectedExpenseError && <FormErrorMessage>{selectedExpenseError}</FormErrorMessage>}
      </FormBlock>
      {selectedExpenseType === 'add-new' && (
        <>
          <FormBlock isInvalid={newExpenseTypeError}>
            <Label>New Expense Type</Label>
            <Input
              placeholder="Expense type"
              type="text"
              onChange={(e) => {
                setNewExpenseType(e.target.value);
                setNewExpenseTypeError('');
              }}
            />
            {newExpenseTypeError && <FormErrorMessage>{newExpenseTypeError}</FormErrorMessage>}
          </FormBlock>
          <FormBlock>
            <Label>Parent Expense Type (optional)</Label>
            <Select
              placeholder="Select Expense Type"
              value={selectedParentExpenseType as unknown as string}
              onChange={(e) => {
                setSelectedParentExpenseType(e.target.value);
              }}
            >
              {expenseTypes?.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </Select>
          </FormBlock>
          <FormBlock>
            <Label>Frequency</Label>
            <RadioGroup onChange={setFrequency} value={frequency}>
              <Stack direction="row">
                <Radio value="Monthly">Monthly</Radio>
                <Radio value="Bi-Weekly">Bi-Weekly</Radio>
              </Stack>
            </RadioGroup>
          </FormBlock>
          <FormBlock isInvalid={budgetedAmountError}>
            <Label>Budgeted Amount</Label>
            <Input
              placeholder="10"
              type="number"
              value={budgetedAmount as number}
              onChange={(e) => {
                setBudgetedAmount(e.target.value as unknown as number);
                setBudgetedAmountError('');
              }}
            />
            {budgetedAmountError && <FormErrorMessage>{budgetedAmountError}</FormErrorMessage>}
          </FormBlock>
        </>
      )}
      <FormBlock isInvalid={amountError}>
        <Label>Amount</Label>
        <Input
          placeholder="10"
          type="number"
          value={amount as number}
          onChange={(e) => {
            setAmount(e.target.value as unknown as number);
            setAmountError('');
          }}
        />
        {amountError && <FormErrorMessage>{amountError}</FormErrorMessage>}
      </FormBlock>
      <FormBlock>
        <Label>Date</Label>
        <Input
          type="date"
          value={date as unknown as string}
          onChange={(e) => {
            setDate(e.target.value as string);
          }}
        />
      </FormBlock>

      <Button onClick={handleOnClick}>+ Add Expense</Button>
      <Button onClick={handleClose} type="outline">
        Close
      </Button>
    </>
  );
};
