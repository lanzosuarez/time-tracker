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
} from "@chakra-ui/react";
import { Z_INDEXES } from "../constants";
import { Overlay } from "./Common";
import UserDetails from "./UserDetails";
import { useRouter } from "next/router";

const LayoutContext = React.createContext({
  sideNavHidden: false,
  isDrawerOpen: false,
  toggleDrawer: () => {},
});

const navItems = [
  {
    route: "/",
    name: "My Day",
  },
  {
    route: "/entries",
    name: "Entries",
  },
  {
    route: "/important",
    name: "Important",
  },
];

const insights = [
  {
    route: "/insights",
    name: "Insights",
  },
];

// layout for the whole app
const Layout: FC<{ Right: JSX.Element }> = ({ Right }) => {
  // hide left when sm breakpoint was reached
  const sideNavHidden = useBreakpointValue({ base: false, md: true }, "md");
  const [isDrawerOpen, toggleDrawer] = useBoolean();
  const { pathname } = useRouter();

  useEffect(() => {
    // hide nav if open and screen became larger
    const isNavOpenAndisMDorHigher = sideNavHidden && isDrawerOpen;
    if (isNavOpenAndisMDorHigher) {
      toggleDrawer.toggle();
    }
  }, [sideNavHidden, isDrawerOpen, toggleDrawer]);

  const props = {
    sideNavHidden,
    isDrawerOpen,
    toggleDrawer: toggleDrawer.toggle,
  };

  // hightight item when route is active
  const isActive = (route: string) => route === pathname;

  return (
    <LayoutContext.Provider value={props}>
      <Grid
        position="relative"
        w="100%"
        h="100%"
        templateRows="1fr"
        templateColumns={["0px 1fr", "0px 1fr", "300px 1fr", "300px 1fr"]}
        sx={{
          "#side-nav[aria-hidden=false]": {
            width: 300,
            padding: "1rem",
            display: "block",
            position: "relative",
          },
        }}
      >
        <GridItem
          boxShadow="lg"
          position="relative"
          zIndex={Z_INDEXES.sideNav}
          aria-hidden={!sideNavHidden && !isDrawerOpen}
          id="side-nav"
          bg="white"
          overflow="hidden"
          px={[0, 0, 4, 4]}
          py={[0, 0, 4, 4]}
        >
          <UserDetails />
          <Divider mt={4} />
          <List mt={4}>
            {navItems.map((i, idx) => (
              <ListItem px="3" py="1" key={i.name} mt={idx > 0 && 2}>
                <Link prefetch href={i.route}>
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
          <Divider mt={4} />
          <List mt={4}>
            {insights.map((i, idx) => (
              <ListItem px="3" py="1" key={i.name} mt={idx > 0 && 2}>
                <Link prefetch href={i.route}>
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
        </GridItem>
        <GridItem className="main-content" bg="whitesmoke">
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
    throw new Error("Your component should be wrapped around a LayoutProvider");
  }

  return context;
};

export default Layout;
