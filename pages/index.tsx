import { SITE_TITLE } from '../strings';
import { Container, Heading, Button } from '@chakra-ui/react';
import { useUser } from '../services/auth/useUser';
import styled from 'styled-components';

const Title = styled.h1`
  color: green;
`;

export default function Home() {
  const { user, logout } = useUser();
  return (
    <Container>
      <Heading as="h1">{SITE_TITLE}</Heading>
      <Title>Welcome, {user?.displayName}</Title>
      <Button onClick={logout}>Logout</Button>
    </Container>
  );
}
