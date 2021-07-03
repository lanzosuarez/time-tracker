import React, { FC } from "react";
import Layout from "./Layout";
import Header from "./Header";
import { EntriesGroupBy } from "./Entries";

const AllEntries: FC = () => {
  return (
    <Layout
      Right={
        <>
          <Header title="Entries" />
          <EntriesGroupBy />
        </>
      }
    />
  );
};

export default AllEntries;
