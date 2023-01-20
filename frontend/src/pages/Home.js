import { useEffect } from "react";
import { tasksContext, useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ModalComponent from "../components/Modal";
import { Stack, HStack, VStack, Box } from "@chakra-ui/react";

// components
import TaskDetails from "../components/TaskDetails";
// import WorkoutForm from "../components/WorkoutForm";

import { Button, Container } from "@chakra-ui/react";

const Home = () => {
  const { tasks, dispatch } = useTasksContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        console.log({ json });
        dispatch({ type: "SET_TASKS", payload: json });
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [dispatch, user]);

  return (
    <Container maxW="container.lg">
      <ModalComponent />
      <HStack spacing="12px">
        <VStack spacing="24px" w="100%">
          {tasks &&
            tasks.map((task) => (
              <Box key={task._id} w="100%" borderRadius="lg" m={3}>
                <TaskDetails task={task} />
              </Box>
            ))}
        </VStack>
      </HStack>
    </Container>
  );
};

export default Home;
