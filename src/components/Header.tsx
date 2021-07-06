import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useLayout } from "./Layout";

const Header = ({
  title,
  subtitle,
  icon = null,
}: {
  title: string;
  subtitle?: string;
  icon?: JSX.Element;
}) => {
  const { sideNavHidden, toggleDrawer } = useLayout();
  return (
    <Box boxShadow="sm" bgColor="white" p="2rem 2rem 1rem" w="100%">
      <HamburgerIcon
        display={sideNavHidden ? "none" : "block"}
        cursor="pointer"
        role="button"
        onClick={toggleDrawer}
      />
      <Box>
        <Text
          d="flex"
          alignItems="center"
          color="gray.700"
          fontWeight="medium"
          mt="2"
          fontSize="2xl"
        >
          {icon}
          {title}
        </Text>
        {subtitle && (
          <Text color="gray.700" fontSize="sm">
            {subtitle}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Header;
