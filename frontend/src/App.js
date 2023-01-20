import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { Container } from "@chakra-ui/react";

// pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useAuthContext();

  return (
    <Container maxW="container.lg" maxH="container.lg" height="100vh">
      <BrowserRouter>
        <Navbar />
        <Container maxW="container.lg" p="6">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </Container>
  );
}

export default App;
