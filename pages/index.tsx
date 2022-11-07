import { useUser } from '../services/auth/useUser';
import styled from 'styled-components';
import { Loader } from '../components/Loader';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';
import { Button } from '../components/Button';
import { useEffect, useState } from 'react';
import { addExpense, Expense, getExpenseTypes } from '../services/api/expense';
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

const FormBlock = styled(FormControl)`
  margin-bottom: 10px;
`;

export default function Home() {
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [expenseTypes, setExpenseTypes] = useState<string[]>([]);
  // @ts-ignore
  const [selectedExpenseType, setSelectedExpenseType] = useState<Expense | null>('');
  const [amount, setAmount] = useState(null);

  function handleOnClick() {
    if (selectedExpenseType === null || amount === null) {
      return; // TODO: add error handling
    }
    // @ts-ignore
    addExpense(selectedExpenseType, amount);
    onClose();
  }

  useEffect(() => {
    getExpenseTypes().then((types) => {
      // @ts-ignore
      setExpenseTypes(types);
    });
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
        $ 1,460.50 <Pill>+8%</Pill>
      </Price>
      <p>Out of $4,000 budgeted for this month</p>
      <Button onClick={onOpen}>+ Add Expense</Button>
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
                // @ts-ignore
                value={selectedExpenseType}
                // @ts-ignore
                onChange={(e) => setSelectedExpenseType(e.target.value)}
              >
                {expenseTypes.map((type) => (
                  <option value={type}>{type}</option>
                ))}
              </Select>
            </FormBlock>
            <FormBlock>
              <FormLabel>Amount</FormLabel>
              <Input
                placeholder="10"
                type="number"
                // @ts-ignore
                value={amount}
                // @ts-ignore
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormBlock>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleOnClick}>+ Add Expense</Button>
            <Button onClick={onClose} type="outline">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Page>
  );
}
