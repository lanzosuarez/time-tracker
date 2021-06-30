import React from "react";
import { Flex, Center, Spinner } from "@chakra-ui/react";

// for full page fallback
export const FullPageSpinner = () => (
  <Flex height="100%" width="100%">
    <Center>
      <Spinner size="xl" color="blue.500" />
    </Center>
  </Flex>
);
