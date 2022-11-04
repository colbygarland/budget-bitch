import { Flex, Box, Stack, Button, Heading, useColorModeValue, Center, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Logo } from '../components/Logo';
import { googleLogin } from '../services/firebase';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const [error, setError] = useState('');
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} px={6}>
        <Stack align={'center'}>
          <Logo />
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            {error && (
              <Box backgroundColor="red.100" p={4} rounded={8}>
                <Heading textAlign="center" as="h2" size="md" color="red">
                  {error}
                </Heading>
              </Box>
            )}
            <Stack spacing={10} pt={2}>
              <Button
                w={'full'}
                variant={'outline'}
                leftIcon={<FcGoogle />}
                onClick={async () => {
                  const success = await googleLogin();
                  if (!success) {
                    setError('Uh oh, you are not authorized to login!');
                  }
                }}
              >
                <Center>
                  <Text>Sign in with Google</Text>
                </Center>
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
