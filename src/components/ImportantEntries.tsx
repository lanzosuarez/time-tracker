import React, { FC } from "react";
import Layout from "./Layout";
import Header from "./Header";
import { EntriesGroupBy } from "./Entries";
import { Entry } from "types";
import { StarIcon } from "@chakra-ui/icons";
import UpdateEntryProvider from "context/UpdateEntryProvider";

const ImportantEntries: FC = () => {
  const filterImportant = (entry: Entry) => entry.important;
  return (
    <UpdateEntryProvider>
      <Layout
        Right={
          <>
            <Header title="Important" icon={<StarIcon mr={4} />} />
            <EntriesGroupBy filterFn={filterImportant} />
          </>
        }
      />
    </UpdateEntryProvider>
  );
};

export default ImportantEntries;
