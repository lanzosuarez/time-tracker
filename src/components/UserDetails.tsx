import { Avatar, Button, SimpleGrid, Text } from "@chakra-ui/react";
import { useAuth } from "context/AuthProvider";
import { logout } from "lib/auth";
import React, { FC } from "react";

const UserDetails: FC = () => {
  const user = useAuth();
  return (
    <SimpleGrid templateColumns="1fr 3fr">
      <Avatar name={user?.email} src={user?.photoURL} />
      <div>
        <Text fontSize="sm">{user?.email}</Text>
        <Button variant="link" size="xs" onClick={logout}>
          Sign out
        </Button>
      </div>
    </SimpleGrid>
  );
};

export default UserDetails;
