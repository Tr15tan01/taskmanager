import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { AlertDialogBox } from "../hooks/alertDialog";
import { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Center,
  Text,
  Box,
  Heading,
  Stack,
  StackDivider,
  SimpleGrid,
  useToast,
  CircularProgress,
  CircularProgressLabel,
  useDisclosure,
} from "@chakra-ui/react";
// import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { DeleteIcon, AddIcon } from "@chakra-ui/icons";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TaskDetails = ({ task }) => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const toast = useToast();
  const [boxOpen, setBoxOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/tasks/" + task._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: json });
      toast({
        title: "Task Deleted.",
        description: "A  task is deleted.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const handleAddTask = () => {
    console.log("task not added yet");
  };

  return (
    <Card w="100%" boxShadow="2xl">
      <CardHeader>
        <Text fontSize="4xl" textTransform="uppercase">
          {task.title}
        </Text>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="sm" textTransform="uppercase">
              Description
            </Heading>
            <SimpleGrid
              columns={2}
              spacing={10}
              style={{ border: "1px solid gray" }}
            >
              <Box height="90px">
                <Text pt="2" fontSize="sm">
                  {task.description}
                </Text>
              </Box>
              <SimpleGrid
                columns={2}
                spacing={10}
                style={{ border: "1px solid gray" }}
              >
                <Center height="90px">
                  <Text pt="2" fontSize="sm">
                    Progress
                  </Text>
                </Center>
                <Center height="90px">
                  <CircularProgress value={40} color="green.400">
                    <CircularProgressLabel>40%</CircularProgressLabel>
                  </CircularProgress>
                </Center>
              </SimpleGrid>
            </SimpleGrid>
          </Box>
          <Box>
            <Heading size="sm" textTransform="uppercase">
              Deadline
            </Heading>
            <Text pt="2" fontSize="sm">
              {task.deadline}
            </Text>
            <p>
              Created{" "}
              {formatDistanceToNow(new Date(task.createdAt), {
                addSuffix: true,
              })}
            </p>
            <span className="icons" onClick={handleAddTask}>
              <AddIcon boxSize={6} />
            </span>

            <AlertDialogBox onOpen={onOpen} onDelete={handleDelete} />
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default TaskDetails;
