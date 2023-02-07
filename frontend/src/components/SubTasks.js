import { useAuthContext } from "../hooks/useAuthContext";
import { useTasksContext } from "../hooks/useTasksContext";

import { Checkbox, Grid, GridItem, Text } from "@chakra-ui/react";
import { useState } from "react";

export const SubTasks = ({ subTasks, id, completed }) => {
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const [isChecked, setIsChecked] = useState(subTasks.completed);
  const { dispatch } = useTasksContext();

  const handleCheck = async (e) => {
    setIsChecked(!isChecked);
    console.log(isChecked, "after setischecked");
    // await fetchTasks();

    if (!user) {
      setError("you must be logged in");
    }

    const response = await fetch(
      "/api/tasks/" + id + "/subtask/" + subTasks._id,
      {
        method: "PATCH",
        body: JSON.stringify({ id: id, isChecked: !isChecked }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();
    if (response.ok) {
      await dispatch({ type: "SET_TASKS", payload: json });
    }
  };

  return (
    <Grid h="16" templateColumns="repeat(4, 1fr)" gap={6} p="2">
      <GridItem colSpan={1}>
        <Checkbox
          size="lg"
          colorScheme="green"
          isChecked={isChecked}
          onChange={handleCheck}
        />
      </GridItem>
      <GridItem colSpan={3}>
        <Text> {subTasks.subtaskTitle}</Text>
      </GridItem>
    </Grid>
  );
};
