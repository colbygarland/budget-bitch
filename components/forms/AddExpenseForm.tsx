import { FormControl, FormLabel, Select, FormErrorMessage, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { addExpense, getExpenseTypes } from '../../services/api/expense';
import { getCurrentDate } from '../../utils/date';
import { Button } from '../Button';

const FormBlock = styled(FormControl)`
  margin-bottom: 10px;
`;

export const AddExpenseForm = ({ onClose }: { onClose: () => void }) => {
  const [expenseTypes, setExpenseTypes] = useState<string[]>([]);
  const [selectedExpenseType, setSelectedExpenseType] = useState<string | null>(null);
  const [newExpenseType, setNewExpenseType] = useState('');
  const [amount, setAmount] = useState<number | null>(null);
  const [date, setDate] = useState(getCurrentDate());

  const [amountError, setAmountError] = useState('');
  const [selectedExpenseError, setSelectedExpenseError] = useState('');

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

  async function handleOnClick() {
    if (selectedExpenseType === null) {
      setSelectedExpenseError('Please select an Expense Type.');
    }
    if (amount === null) {
      setAmountError('Please enter a valid amount.');
      return;
    }
    // if adding a new expense type, use that instead
    addExpense(newExpenseType !== '' ? newExpenseType : (selectedExpenseType as unknown as string), amount, date);
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
        <FormLabel>Expense Type</FormLabel>
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
        <FormBlock>
          <FormLabel>New Expense Type</FormLabel>
          <Input
            placeholder="Expense type"
            type="text"
            onChange={(e) => {
              setNewExpenseType(e.target.value);
            }}
          />
        </FormBlock>
      )}
      <FormBlock isInvalid={amountError}>
        <FormLabel>Amount</FormLabel>
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
        <FormLabel>Date</FormLabel>
        <Input
          type="date"
          value={date as unknown as string}
          onChange={(e) => {
            setDate(e.target.value as string);
          }}
        />
        {amountError && <FormErrorMessage>{amountError}</FormErrorMessage>}
      </FormBlock>
      <Button onClick={handleOnClick}>+ Add Expense</Button>
      <Button onClick={handleClose} type="outline">
        Close
      </Button>
    </>
  );
};
