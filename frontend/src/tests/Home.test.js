import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TasksContextProvider } from "../context/TaskContext";
import { AuthContextProvider } from "../context/AuthContext";

import "@testing-library/jest-dom";
import Home from "../pages/Home";
describe("Home page tests", () => {
  test("loads and displays button", async () => {
    render(
      <AuthContextProvider>
        <TasksContextProvider>
          <Home />
        </TasksContextProvider>
      </AuthContextProvider>
    );
    expect(screen.getByRole("button")).toBeEnabled();
  });
  test("text on the button", async () => {
    render(
      <AuthContextProvider>
        <TasksContextProvider>
          <Home />
        </TasksContextProvider>
      </AuthContextProvider>
    );
    expect(screen.getByText("Add New Task")).toBeInTheDocument();
  });
});
