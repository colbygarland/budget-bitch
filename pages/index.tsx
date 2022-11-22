import { useUser } from '../services/auth/useUser';
import styled from 'styled-components';
import { Loader } from '../components/Loader';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';
import { Button } from '../components/Button';
import { Expense, useGetExpenses } from '../services/api/expense';
import { useDisclosure } from '@chakra-ui/react';
import { zIndex } from '../theme/zIndex';
import { AddExpenseForm } from '../components/forms/AddExpenseForm';
import { Modal } from '../components/Modal';
import { useState } from 'react';
import { getBeginningOfMonth, getCurrentMonth, getMonthName, getYear } from '../utils/date';
import { HiCalendar } from 'react-icons/hi';
import { ChangeDatePeriodForm } from '../components/forms/ChangeDatePeriodForm';

const Page = styled.div`
  background-color: ${colors.primary};
  min-height: 100vh;
  color: ${colors.white};
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

const CalendarButton = styled(HiCalendar).attrs({ size: 30 })``;

function calculateExpenses(expenses: Expense[]) {
  let total = 0;
  expenses.map((expense) => {
    total += Number(expense.amount);
  });
  return total;
}

export default function Home() {
  const { user } = useUser();
  const { isOpen: addExpenseIsOpen, onOpen: addExpenseOnOpen, onClose: addExpenseOnClose } = useDisclosure();
  const { isOpen: calendarIsOpen, onOpen: calendarOnOpen, onClose: calendarOnClose } = useDisclosure();
  const [to, setTo] = useState(getCurrentMonth());
  const from = getBeginningOfMonth(to);

  const title = `${getMonthName(to)} ${getYear(to)}`;

  const expenses = useGetExpenses(from, to);

  if (!user) {
    return (
      <Loading>
        <Loader />
      </Loading>
    );
  }

  return (
    <Page>
      <Header
        onTitleClick={calendarOnOpen}
        pageTitle={title}
        leftActionButton={<CalendarButton onClick={calendarOnOpen} />}
      />
      <Price>$ {calculateExpenses(expenses)}</Price>
      <p>Out of $4,000 budgeted for this month</p>
      <FloatingButton onClick={addExpenseOnOpen}>+ Add Expense</FloatingButton>

      {expenses.map((expense, index) => {
        return (
          <p key={index}>
            type: {expense.expenseType}, amount: {expense.amount}
          </p>
        );
      })}
      <Modal
        title="Add Expense"
        body={<AddExpenseForm onClose={addExpenseOnClose} />}
        isOpen={addExpenseIsOpen}
        onClose={addExpenseOnClose}
      />
      <Modal
        title="Change Date Period"
        // @ts-ignore
        body={<ChangeDatePeriodForm date={to} setDate={setTo} close={calendarOnClose} />}
        isOpen={calendarIsOpen}
        onClose={calendarOnClose}
      />
    </Page>
  );
}
