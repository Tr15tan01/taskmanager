import React from "react";
import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
// import { useCustomToast } from "../hooks/useToast";
import format from "date-fns/format";

import {
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Center,
} from "@chakra-ui/react";

export default function ModalComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // const initialRef = React.useRef(null);
  // const finalRef = React.useRef(null);
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  // const [load, setLoad] = useState("");
  // const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const task = { title, description, deadline };

    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setDescription("");
      // setReps("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_TASK", payload: json });
      toast({
        title: "Task created.",
        description: "A new task is createda.",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    }
    onClose();
  };

  return (
    <>
      <Button
        w="96%"
        m="3"
        size="lg"
        variant="outline"
        onClick={onOpen}
        colorScheme="twitter"
      >
        Add New Task
      </Button>

      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Task Title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Task Description</FormLabel>
                <Input
                  placeholder="Task Details"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Task Datw</FormLabel>
                <Input
                  type="date"
                  placeholder={format(new Date(), "dd-mm-yyyy")}
                  onChange={(e) => setDeadline(e.target.value)}
                  value={deadline}
                />
              </FormControl>

              <Center>
                <Button colorScheme="blue" size="md" w="45%" type="submit">
                  Save
                </Button>
                <Button
                  colorScheme="red"
                  variant="outline"
                  size="md"
                  w="45%"
                  m={6}
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Center>
            </form>
          </ModalBody>

          <ModalFooter></ModalFooter>
          {error && <div className="error">{error}</div>}
        </ModalContent>
      </Modal>
    </>
  );
}
