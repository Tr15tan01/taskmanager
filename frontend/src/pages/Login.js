import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    console.log("submitted");
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Container maxW="800px" boxShadow="lg" p="6" m="5">
      <form onSubmit={handleSubmit}>
        <Stack spacing={5}>
          <FormControl>
            <h3>Log In</h3>
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
              m="4"
              disabled={isLoading}
            >
              Log in
            </Button>
            {error && <div className="error">{error}</div>}
          </FormControl>
        </Stack>
      </form>
    </Container>
  );
};

export default Login;
