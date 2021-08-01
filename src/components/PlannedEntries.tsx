import React, { FC } from "react";
import Layout from "./Layout";
import Header from "./Header";
import { EntriesGroupBy } from "./Entries";
import { Entry } from "types";
import { CalendarIcon } from "@chakra-ui/icons";
import UpdateEntryProvider from "context/UpdateEntryProvider";

const PlannedEntries: FC = () => {
  const filterImportant = (entry: Entry) => !!entry.dueDate;
  return (
    <UpdateEntryProvider>
      <Layout
        Right={
          <>
            <Header title="Planned" icon={<CalendarIcon mr={4} />} />
            <EntriesGroupBy filterFn={filterImportant} />
          </>
        }
      />
    </UpdateEntryProvider>
  );
};

export default PlannedEntries;
