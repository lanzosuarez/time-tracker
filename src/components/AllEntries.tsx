import React, { FC } from "react";
import Layout from "./Layout";
import Header from "./Header";
import { EntriesGroupBy } from "./Entries";
import { ViewIcon } from "@chakra-ui/icons";

const AllEntries: FC = () => {
  return (
    <Layout
      Right={
        <>
          <Header title="Entries" icon={<ViewIcon mr={4} />} />
          <EntriesGroupBy />
        </>
      }
    />
  );
};

export default AllEntries;
