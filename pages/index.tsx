import { useUser } from '../services/auth/useUser';
import styled from 'styled-components';
import { Loader } from '../components/Loader';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';
import { useGetExpenses } from '../services/api/expense';
import { useDisclosure } from '@chakra-ui/react';
import { AddExpenseForm } from '../components/forms/AddExpenseForm';
import { Modal } from '../components/Modal';
import { useState } from 'react';
import { getBeginningOfMonth, getCurrentMonth, getEndOfMonth, getMonthName, getYear } from '../utils/date';
import { HiCalendar } from 'react-icons/hi';
import { ChangeDatePeriodForm } from '../components/forms/ChangeDatePeriodForm';
import { Expenses } from '../components/Expenses';
import { calculateTotalBudgetedPrice, calculateTotalPrice } from '../utils/expenses';
import { FloatingButton } from '../components/FloatingButton';

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
  font-size: 46px;
  margin-bottom: 0;
`;

const OutOf = styled.p`
  font-size: 16px;
  margin-bottom: 40px;
  margin-left: 40px;
`;

const CalendarButton = styled(HiCalendar).attrs({ size: 30 })``;

export default function Home() {
  const { user } = useUser();
  const { isOpen: addExpenseIsOpen, onOpen: addExpenseOnOpen, onClose: addExpenseOnClose } = useDisclosure();
  const { isOpen: calendarIsOpen, onOpen: calendarOnOpen, onClose: calendarOnClose } = useDisclosure();
  const [to, setTo] = useState(getCurrentMonth());
  const from = getBeginningOfMonth(to);
  const expenses = useGetExpenses(from, getEndOfMonth(to));
  const totalMonthBudget = calculateTotalBudgetedPrice(expenses);

  const title = `${getMonthName(to)} ${getYear(to)}`;

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
      <Price>$ {calculateTotalPrice(expenses)}</Price>
      <OutOf>spent out of $ {totalMonthBudget}</OutOf>

      <Expenses expenses={expenses} />

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
      <FloatingButton onClick={addExpenseOnOpen} title="+ Add Expense" />
    </Page>
  );
}
