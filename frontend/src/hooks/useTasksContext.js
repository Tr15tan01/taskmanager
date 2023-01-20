import { TasksContext } from "../context/TaskContext";
import { useContext } from "react";

export const useTasksContext = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw Error("tasksContext must be used inside an TasksContextProvider");
  }

  return context;
};
