import React, { FC } from "react";
import Layout from "./Layout";
import Header from "./Header";
import { EntriesGroupBy } from "./Entries";
import { Entry } from "types";
import { CalendarIcon } from "@chakra-ui/icons";

const PlannedEntries: FC = () => {
  const filterImportant = (entry: Entry) => !!entry.dueDate;
  return (
    <Layout
      Right={
        <>
          <Header title="Planned" icon={<CalendarIcon mr={4} />} />
          <EntriesGroupBy filterFn={filterImportant} />
        </>
      }
    />
  );
};

export default PlannedEntries;
