import { SITE_TITLE } from '../strings';
import { Container, Heading, Button } from '@chakra-ui/react';
import { useUser } from '../services/auth/useUser';

export default function Home() {
  const { user, logout } = useUser();
  return (
    <Container>
      <Heading as="h1">{SITE_TITLE}</Heading>
      <p>Welcome, {user?.displayName}</p>
      <Button onClick={logout}>Logout</Button>
    </Container>
  );
}
