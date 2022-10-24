import { Container, Button } from '@chakra-ui/react';
import { googleLogin } from '../services/firebase';

export default function Login() {
  return (
    <Container>
      <Button onClick={googleLogin} colorScheme="blue">
        Login with Google
      </Button>
    </Container>
  );
}
