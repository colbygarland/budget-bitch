import { SITE_TITLE } from '../strings';
import { Container, Heading } from '@chakra-ui/react';
import { useUser } from '../services/auth/useUser';

export default function Home() {
  const { user } = useUser();
  return (
    <Container>
      <Heading as="h1">{SITE_TITLE}</Heading>
      <p>Welcome, {user?.displayName}</p>
    </Container>
  );
}
