import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import styled from 'styled-components';
import { Expense } from '../services/api/expense';

const ExpenseLineItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Expenses = ({ expenses }: { expenses: Expense[] }) => {
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
