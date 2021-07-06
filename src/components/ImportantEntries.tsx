import React, { FC } from "react";
import Layout from "./Layout";
import Header from "./Header";
import { EntriesGroupBy } from "./Entries";
import { Entry } from "types";
import { StarIcon } from "@chakra-ui/icons";

const ImportantEntries: FC = () => {
  const filterImportant = (entry: Entry) => entry.important;
  return (
    <Layout
      Right={
        <>
          <Header title="Important" icon={<StarIcon mr={4} />} />
          <EntriesGroupBy filterFn={filterImportant} />
        </>
      }
    />
  );
};

export default ImportantEntries;
