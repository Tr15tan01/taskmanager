import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  FormErrorMessage,
  FormHelperText,
  Button,
} from "@chakra-ui/react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <Container maxW="800px" boxShadow="lg" p="6" m="5">
      <form onSubmit={handleSubmit}>
        <Stack spacing={5}>
          <FormControl>
            <h3>Sign Up</h3>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              size="md"
              variant="flushed"
              placeholder="Email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password:</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              size="md"
              variant="flushed"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <Button
              colorScheme="blue"
              width="100%"
              type="submit"
              disabled={isLoading}
              m="4"
            >
              Sign Up
            </Button>
            {error && <div className="error">{error}</div>}
          </FormControl>
        </Stack>
      </form>
    </Container>
  );
};

export default Signup;
