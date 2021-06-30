import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";

const Authenticated = () => {
  return (
    <Grid
      w="100%"
      h="100%"
      templateRows="1fr"
      templateColumns={["0fr 4fr", "0fr 4fr", "1fr 4fr", "1fr 4fr"]}
    >
      <GridItem bg="white" />
      <GridItem bg="whitesmoke" />
    </Grid>
  );
};

export default Authenticated;
