import { Container, Button, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { googleLogin } from '../services/firebase';

export default function Login() {
  const [error, setError] = useState('');
  return (
    <Container>
      <Button
        onClick={async () => {
          const success = await googleLogin();
          if (!success) {
            setError('Uh oh, you are not authorized to login!');
          }
        }}
        colorScheme="blue"
      >
        Login with Google
      </Button>
      {error && <Heading>{error}</Heading>}
    </Container>
  );
}
