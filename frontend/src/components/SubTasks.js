import { Box, Checkbox, Grid, GridItem, Text } from "@chakra-ui/react";

export const SubTasks = () => {
  return (
    <Grid bg="tomato" h="16" templateColumns="repeat(4, 1fr)" gap={6} p="4">
      <GridItem colSpan={1}>
        <Checkbox colorScheme="green" />
      </GridItem>
      <GridItem colSpan={3}>
        <Text>new subtask to do so murher sfucker</Text>
      </GridItem>
    </Grid>
  );
};
