import { useUser } from '../services/auth/useUser';
import styled from 'styled-components';
import { Loader } from '../components/Loader';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';
import { Button } from '../components/Button';
import { Expense, useGetExpenses } from '../services/api/expense';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import { zIndex } from '../theme/zIndex';
import { AddExpenseForm } from '../components/forms/AddExpenseForm';
import { Modal } from '../components/Modal';
import { useState } from 'react';
import { getBeginningOfMonth, getCurrentMonth, getEndOfMonth, getMonthName, getYear } from '../utils/date';
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

const FloatingButton = styled(Button)`
  position: fixed;
  margin: 0;
  bottom: 40px;
  right: 40px;
  z-index: ${zIndex[100]};
`;

const ExpenseLineItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CalendarButton = styled(HiCalendar).attrs({ size: 30 })``;

const Expenses = ({ expenses }: { expenses: Expense[] }) => {
  const expenseTypes = new Set(expenses.map((e) => e.expenseType));
  return (
    <Accordion>
      {[...expenseTypes].sort().map((type, index) => {
        return (
          <AccordionItem key={index}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {type as string}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              {expenses.map((e, index) => {
                if (e.expenseType === type) {
                  return (
                    <ExpenseLineItem key={index}>
                      <span>$ {e.amount}</span>
                      <span>{e.createdAt}</span>
                    </ExpenseLineItem>
                  );
                }
              })}
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

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

  const expenses = useGetExpenses(from, getEndOfMonth(to));

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
      <FloatingButton onClick={addExpenseOnOpen}>+ Add Expense</FloatingButton>
    </Page>
  );
}
