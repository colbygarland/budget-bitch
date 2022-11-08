import { useUser } from '../services/auth/useUser';
import styled from 'styled-components';
import { Loader } from '../components/Loader';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';
import { Button } from '../components/Button';
import { useEffect, useState } from 'react';
import { addExpense, Expense, getExpenseTypes, useGetExpenses } from '../services/api/expense';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Container,
  Input,
  Select,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { zIndex } from '../theme/zIndex';

const Page = styled.div`
  background-color: ${colors.primary};
  color: ${colors.white};
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Loading = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: grid;
  place-items: center;
`;

const Price = styled.h2`
  font-size: 40px;
  margin-bottom: 8px;
`;

const Pill = styled.span`
  display: inline-block;
  background-color: ${colors.secondary};
  color: ${colors.white};
  font-size: 30%;
  padding: 6px 12px;
  border-radius: 30px;
  position: relative;
  bottom: 10px;
  margin-left: 12px;
`;

const FloatingButton = styled(Button)`
  position: fixed;
  margin: 0;
  bottom: 40px;
  right: 40px;
  z-index: ${zIndex[100]};
`;

const FormBlock = styled(FormControl)`
  margin-bottom: 10px;
`;

function calculateExpenses(expenses: Expense[]) {
  let total = 0;
  expenses.map((expense) => {
    total += Number(expense.amount);
  });
  return total;
}

export default function Home() {
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [expenseTypes, setExpenseTypes] = useState<string[]>([]);
  const [selectedExpenseType, setSelectedExpenseType] = useState<string | null>(null);
  const [newExpenseType, setNewExpenseType] = useState('');
  const [amount, setAmount] = useState<number | null>(null);
  const expenses = useGetExpenses();

  function resetState() {
    // reset the state
    setSelectedExpenseType(null);
    setNewExpenseType('');
    setAmount(null);
  }

  async function handleOnClick() {
    if (selectedExpenseType === null || amount === null) {
      return; // TODO: add error handling
    }
    // if adding a new expense type, use that instead
    addExpense(newExpenseType !== '' ? newExpenseType : (selectedExpenseType as unknown as string), amount);
    await getTypes();
    onClose();
    resetState();
  }

  function handleClose() {
    onClose();
    resetState();
  }

  async function getTypes() {
    getExpenseTypes().then((types) => {
      if (types && types.length) {
        setExpenseTypes(types);
      }
    });
  }

  useEffect(() => {
    getTypes();
  }, []);

  if (!user) {
    return (
      <Loading>
        <Loader />
      </Loading>
    );
  }

  return (
    <Page>
      <Header pageTitle="Dashboard" />
      <Price>
        $ {calculateExpenses(expenses)} <Pill>+8%</Pill>
      </Price>
      <p>Out of $4,000 budgeted for this month</p>
      <FloatingButton onClick={onOpen}>+ Add Expense</FloatingButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Container></Container>
        <ModalContent>
          <ModalHeader>Add Expense</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormBlock>
              <FormLabel>Expense Type</FormLabel>
              <Select
                placeholder="Select Expense Type"
                value={selectedExpenseType as unknown as string}
                onChange={(e) => setSelectedExpenseType(e.target.value)}
              >
                {expenseTypes?.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
                <option value="add-new">+ Add New Type</option>
              </Select>
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
            <FormBlock>
              <FormLabel>Amount</FormLabel>
              <Input
                placeholder="10"
                type="number"
                value={amount as number}
                onChange={(e) => setAmount(e.target.value as unknown as number)}
              />
            </FormBlock>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleOnClick}>+ Add Expense</Button>
            <Button onClick={handleClose} type="outline">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {expenses.map((expense) => {
        return (
          <p>
            type: {expense.expenseType}, amount: {expense.amount}
          </p>
        );
      })}
    </Page>
  );
}
