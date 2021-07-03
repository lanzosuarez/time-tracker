import React, { FC, FormEvent } from "react";
import {
  Button,
  Flex,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Image from "next/image";
import logo from "/public/assets/logo.png";

import { signinWithGitHub, signinWithGoogle } from "lib/auth";
import { useState } from "react";
import { GithubIcon, GoogleIcon } from "theme";

const UnAuthenticated: FC = () => {
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      h="100%"
      w="100%"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <Image src={logo} alt="timetracker" />
      <Button
        onClick={onOpen}
        size="sm"
        colorScheme="blackAlpha"
        variant="outline"
      >
        Log in
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setError(null);
          onClose();
        }}
        size="xs"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="gray.700">Continue with</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="6">
            <Stack spacing={3}>
              {!!error && (
                <Alert borderRadius="md" status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              <Button
                leftIcon={<GoogleIcon />}
                onClick={() => {
                  setError(null);
                  signinWithGoogle().catch((err) => {
                    setError(err.message);
                  });
                }}
                variant="outline"
                size="md"
                colorScheme="blackAlpha"
              >
                Google
              </Button>
              <Button
                leftIcon={<GithubIcon />}
                onClick={() => {
                  setError(null);
                  signinWithGitHub().catch((err) => {
                    setError(err.message);
                  });
                }}
                size="md"
                variant="outline"
                colorScheme="blackAlpha"
              >
                Github
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default UnAuthenticated;
