import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import App from "./App";
import { TasksContextProvider } from "./context/TaskContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthContextProvider>
        <TasksContextProvider>
          <App />
        </TasksContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
