import React, { FC } from "react";
import { Flex, Center, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { FallbackProps } from "react-error-boundary";
import styled from "@emotion/styled";
import { Z_INDEXES } from "../constants";

export const ErrorMessage: FC<{ message: string }> = ({ message }) => (
  <Alert status="error">
    <AlertIcon />
    {message}
  </Alert>
);

export const FallbackErrorMessage: FC<Partial<FallbackProps>> = ({ error }) => (
  <ErrorMessage message={error.message} />
);

// for full page fallback
export const FullPageSpinner = () => (
  <Flex height="100vh" w="100%">
    <Center w="100%">
      <Spinner size="xl" color="gray" />
    </Center>
  </Flex>
);

// for full page fallback
export const FallbackFullPageError: FC<FallbackProps> = ({ error }) => (
  <Flex height="100vh" w="100%">
    <Center w="100%">
      <FallbackErrorMessage error={error} />
    </Center>
  </Flex>
);

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: ${Z_INDEXES.sideNavOverlay};
  display: block;
  background: rgba(0, 0, 0, 0.5);
`;
