import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { AddIcon } from "@chakra-ui/icons";

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
  Box,
  Checkbox,
  Center,
} from "@chakra-ui/react";

export default function AddSubtask({ task }) {
  const { dispatch } = useTasksContext();
  const fetchTasks = async () => {
    const response = await fetch("/api/tasks", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_TASKS", payload: json });
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     fetchTasks();
  //   }
  // }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const inputRef = React.useRef(null);
  // const finalRef = React.useRef(null);
  const { user } = useAuthContext();

  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const subTask = { subtaskTitle };

    const response = await fetch("/api/tasks/" + task._id, {
      method: "PATCH",
      body: JSON.stringify(subTask),
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
      setSubtaskTitle("");
      setDescription("");
      setError(null);
      setEmptyFields([]);
      fetchTasks();

      // dispatch({ type: "SET_TASKS", payload: json });
      // dispatch({ type: "CREATE_SUBTASK", payload: json });
      toast({
        title: "SubTask created.",
        description: "A new subtask is createda.",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    }
    onClose();
  };

  return (
    <>
      <span className="icons" onClick={onOpen}>
        <AddIcon boxSize={6} />
      </span>

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
          <ModalHeader>Create New Subtask</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Subtask Title"
                  ref={inputRef}
                  onChange={(e) => setSubtaskTitle(e.target.value)}
                  value={subtaskTitle}
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
