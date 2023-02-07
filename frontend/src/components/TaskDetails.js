import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { AlertDialogBox } from "../hooks/alertDialog";
import { useEffect, useState } from "react";

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

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { SubTasks } from "./SubTasks";
import AddSubtask from "./AddSubtask";

const TaskDetails = ({ task }) => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const toast = useToast();
  // const [boxOpen, setBoxOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_TASKS", payload: json });
    }
  };

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

  // console.log("task subtasks", task.children);

  const completedSubtasks = () => {
    let completedTasksValue = 0;
    for (var i = 0; i < task.children.length; i++) {
      if (task.children[i].completed === true) {
        completedTasksValue += 1;
      }
    }
    return Math.round((completedTasksValue / task.children.length) * 100);
  };

  // useEffect(() => {
  //   completedSubtasks();
  // });

  // completedSubtasks();
  // console.log("the completed carlue is", completedSubtasks());
  console.log("task details rendered");

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
              style={{ background: "lightgray", borderRadius: "6px" }}
            >
              <Box height="90px">
                <Text pt="2" fontSize="sm">
                  {task.description}
                </Text>
              </Box>
              <SimpleGrid
                columns={2}
                spacing={10}
                // style={{ border: "1px solid gray" }}
              >
                <Center height="90px">
                  <Text pt="2" fontSize="sm">
                    Progress
                  </Text>
                </Center>
                <Center height="90px">
                  <CircularProgress
                    value={completedSubtasks()}
                    color="green.400"
                  >
                    <CircularProgressLabel>
                      {completedSubtasks()}
                    </CircularProgressLabel>
                  </CircularProgress>
                </Center>
              </SimpleGrid>
            </SimpleGrid>
          </Box>
          {/* map throu subtasks */}
          {task.children &&
            task.children.map((subTask) => {
              return (
                <SubTasks
                  key={subTask._id}
                  subTasks={subTask}
                  id={task._id}
                  completed={completedSubtasks()}
                />
              );
            })}

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

            <AddSubtask task={task} />

            <AlertDialogBox onOpen={onOpen} onDelete={handleDelete} />
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default TaskDetails;
