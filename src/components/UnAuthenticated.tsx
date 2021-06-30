import React from "react";
import {
  Button,
  Flex,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import Image from "next/image";
import logo from "../../public/assets/logo.png";

const UnAuthenticated = () => {
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
        Sign in
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="gray.700">Sign in with</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="6">
            <Stack spacing={3}>
              <Button
                variant="outline"
                onClick={onOpen}
                size="sm"
                colorScheme="blackAlpha"
              >
                Sign in with Google
              </Button>
              <Button onClick={onOpen} size="sm" colorScheme="blackAlpha">
                Sign in with Github
              </Button>
              <Button
                onClick={onOpen}
                size="sm"
                colorScheme="twitter"
                variant="outline"
              >
                Sign in with Twitter
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default UnAuthenticated;
