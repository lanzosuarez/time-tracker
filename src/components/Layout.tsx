import React, { FC, useContext, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/layout";
import Link from "next/link";
import {
  useBreakpointValue,
  useBoolean,
  Divider,
  SimpleGrid,
  ListItem,
  List,
  Text,
  Box,
} from "@chakra-ui/react";
import { Z_INDEXES } from "../constants";
import { Overlay } from "./Common";
import UserDetails from "./UserDetails";
import { useRouter } from "next/router";
import { SunIcon, StarIcon, CalendarIcon, ViewIcon } from "@chakra-ui/icons";
import useIsMdUp from "hooks/useIsMdUp";

const LayoutContext = React.createContext({
  sideNavHidden: false,
  isDrawerOpen: false,
  toggleDrawer: () => {},
});

const navItems = [
  {
    route: "/",
    name: "My Day",
    icon: <SunIcon />,
  },
  {
    route: "/entries",
    name: "Entries",
    icon: <ViewIcon />,
  },
  {
    route: "/important",
    name: "Important",
    icon: <StarIcon />,
  },
  {
    route: "/planned",
    name: "Planned",
    icon: <CalendarIcon />,
  },
];

const insights = [
  {
    route: "/insights",
    name: "Insights",
  },
];

const GRID_TEMPLATE_CO_SM_DOWN = "0px 1fr";
const GRID_TEMPLATE_CO_MD_UP = "300px 1fr";

// layout for the whole app
const Layout: FC<{ Right: JSX.Element }> = ({ Right }) => {
  // hide left when sm breakpoint was reached
  const isMdUp = useIsMdUp();
  const [isDrawerOpen, toggleDrawer] = useBoolean();
  const { pathname } = useRouter();

  useEffect(() => {
    // hide nav if open and screen became larger
    const isNavOpenAndisMDorHigher = isMdUp && isDrawerOpen;
    if (isNavOpenAndisMDorHigher) {
      toggleDrawer.toggle();
    }
  }, [isMdUp, isDrawerOpen, toggleDrawer]);

  // hightight item when route is active
  const isActive = (route: string) => route === pathname;
  const isNotMDandIsDrawerOpen = !isMdUp && !isDrawerOpen;

  const providerValue = {
    sideNavHidden: isMdUp,
    isDrawerOpen,
    toggleDrawer: toggleDrawer.toggle,
  };

  return (
    <LayoutContext.Provider value={providerValue}>
      <Grid
        position="relative"
        w="100%"
        h="100%"
        templateRows="1fr"
        templateColumns={
          isMdUp ? GRID_TEMPLATE_CO_MD_UP : GRID_TEMPLATE_CO_SM_DOWN
        }
        sx={{
          "#side-nav[aria-hidden=true]": {
            position: "absolute",
            height: "100%",
            transform: "translateX(-100%)",
          },
        }}
      >
        <GridItem
          width={300}
          as="aside"
          transition="transform 300ms"
          boxShadow="lg"
          position="relative"
          zIndex={Z_INDEXES.sideNav}
          aria-hidden={isNotMDandIsDrawerOpen}
          id="side-nav"
          bg="white"
          overflow="hidden"
        >
          <Box m="4">
            <UserDetails />
            <Divider mt={4} />
            <List mt={4}>
              {navItems.map((i, idx) => (
                <ListItem px="3" py="1" key={i.name} mt={idx > 0 && 2}>
                  <Link href={i.route}>
                    <Text
                      d="flex"
                      alignItems="center"
                      _hover={{
                        fontWeight: "medium",
                      }}
                      fontWeight={isActive(i.route) ? "medium" : "normal"}
                      color="gray.700"
                      cursor="pointer"
                      fontSize="md"
                    >
                      {i.icon}
                      <Box as="span" ml={4}>
                        {i.name}
                      </Box>
                    </Text>
                  </Link>
                </ListItem>
              ))}
            </List>
            <Divider mt={4} />
            <List mt={4}>
              {insights.map((i, idx) => (
                <ListItem px="3" py="1" key={i.name} mt={idx > 0 && 2}>
                  <Link href={i.route}>
                    <Text
                      _hover={{
                        fontWeight: "medium",
                      }}
                      fontWeight={isActive(i.route) ? "medium" : "normal"}
                      color="gray.700"
                      cursor="pointer"
                      fontSize="md"
                    >
                      {i.name}
                    </Text>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </GridItem>
        <GridItem
          gridColumn={isNotMDandIsDrawerOpen ? "1/-1" : ""} // extend the main content container from start of the grid line to the end
          as="main"
          className="main-content"
          bg="whitesmoke"
        >
          <SimpleGrid
            height="100%"
            maxH="100vh"
            position="relative"
            templateRows="auto 1fr auto"
          >
            {Right}
          </SimpleGrid>
        </GridItem>
      </Grid>

      {isDrawerOpen && <Overlay onClick={toggleDrawer.toggle} />}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }

  return context;
};

export default Layout;
