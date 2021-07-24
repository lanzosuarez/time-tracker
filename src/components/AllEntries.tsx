import React, { FC } from "react";
import Layout from "./Layout";
import Header from "./Header";
import { EntriesGroupBy } from "./Entries";
import { ViewIcon } from "@chakra-ui/icons";
import UpdateEntryProvider from "context/UpdateEntryProvider";

const AllEntries: FC = () => {
  return (
    <UpdateEntryProvider>
      <Layout
        Right={
          <>
            <Header title="Entries" icon={<ViewIcon mr={4} />} />
            <EntriesGroupBy />
          </>
        }
      />
    </UpdateEntryProvider>
  );
};

export default AllEntries;
