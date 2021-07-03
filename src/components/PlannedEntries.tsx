import React, { FC } from "react";
import Layout from "./Layout";
import Header from "./Header";
import { EntriesGroupBy } from "./Entries";
import { Entry } from "types";

const PlannedEntries: FC = () => {
  const filterImportant = (entry: Entry) => !!entry.dueDate;
  return (
    <Layout
      Right={
        <>
          <Header title="Planned" />
          <EntriesGroupBy filterFn={filterImportant} />
        </>
      }
    />
  );
};

export default PlannedEntries;
