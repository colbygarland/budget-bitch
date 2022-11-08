import { useUser } from '../services/auth/useUser';
import styled from 'styled-components';
import { Loader } from '../components/Loader';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';
import { Button } from '../components/Button';
import { Expense, useGetExpenses } from '../services/api/expense';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Container,
} from '@chakra-ui/react';
import { zIndex } from '../theme/zIndex';
import { AddExpenseForm } from '../components/forms/AddExpenseForm';

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

  const expenses = useGetExpenses();

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
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <Container></Container>
        <ModalContent>
          <ModalHeader>Add Expense</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddExpenseForm onClose={onClose} />
          </ModalBody>
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
