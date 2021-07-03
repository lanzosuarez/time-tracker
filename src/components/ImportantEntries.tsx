import React, { FC } from "react";
import Layout from "./Layout";
import Header from "./Header";
import { EntriesGroupBy } from "./Entries";
import { Entry } from "types";

const ImportantEntries: FC = () => {
  const filterImportant = (entry: Entry) => entry.important;
  return (
    <Layout
      Right={
        <>
          <Header title="Entries" />
          <EntriesGroupBy filterFn={filterImportant} />
        </>
      }
    />
  );
};

export default ImportantEntries;
