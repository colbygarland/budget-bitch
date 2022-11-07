import { SITE_TITLE } from '../strings';
import { Container, Heading, Button } from '@chakra-ui/react';
import { useUser } from '../services/auth/useUser';
import styled from 'styled-components';
import { addExpense, Expense, getExpense } from '../services/api/expense';
import { useState } from 'react';

const Title = styled.h1`
  color: green;
`;

export default function Home() {
  const { user, logout } = useUser();
  const [expense, setExpense] = useState<Expense | null>(null);

  async function handleOnClick() {
    await addExpense('gas', 120);
    const exp = await getExpense('gas');
    setExpense(exp);
  }

  if (!user) {
    return null;
  }

  return (
    <Container>
      <Heading as="h1">{SITE_TITLE}</Heading>
      <Title>Welcome, {user?.displayName}</Title>
      {expense?.amount}
      <Button onClick={handleOnClick}>Add expense</Button>
      <Button onClick={logout}>Logout</Button>
    </Container>
  );
}
