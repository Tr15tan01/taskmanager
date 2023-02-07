import { useAuthContext } from "../hooks/useAuthContext";
import { useTasksContext } from "../hooks/useTasksContext";

import { Checkbox, Grid, GridItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const SubTasks = ({ subTasks, id, completed }) => {
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const [isChecked, setIsChecked] = useState(subTasks.completed);
  const { dispatch } = useTasksContext();

  // const fetchTasks = async () => {
  //   await fetch("/api/tasks/" + id + "/subtask/" + subTasks._id, {
  //     method: "PATCH",
  //     body: JSON.stringify({ id: id, isChecked: !isChecked }),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${user.token}`,
  //     },
  // //   });

  //   const response = await fetch("/api/tasks", {
  //     headers: { Authorization: `Bearer ${user.token}` },
  //   });
  //   const json = await response.json();
  //   console.log("tasks fetched");
  //   if (response.ok) {
  //     dispatch({ type: "SET_TASKS", payload: json });
  //   }
  // };

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

    console.log("response id herer");
    const json = await response.json();
    if (response.ok) {
      await dispatch({ type: "SET_TASKS", payload: json });
    }
    console.log(json, "after checkling 😂");
  };

  return (
    <Grid h="16" templateColumns="repeat(4, 1fr)" gap={6} p="4">
      <GridItem colSpan={1}>
        <Checkbox
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
