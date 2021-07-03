import React, { FC } from "react";
import Layout from "./Layout";
import Header from "./Header";
import AddEntry from "./AddEntry";
import { EntriesMyDay } from "./Entries";
import { dayName } from "lib/utils";
import getDay from "date-fns/getDay";
import format from "date-fns/format";
import startOfDay from "date-fns/startOfDay";
import endOfDay from "date-fns/endOfDay";

const MyDay: FC = () => {
  return (
    <Layout
      Right={
        <>
          <Header
            title="My Day"
            subtitle={`${dayName(getDay(new Date()))}, ${format(
              new Date(),
              "MMM d"
            )}`}
          />
          <EntriesMyDay
            dateRange={{
              min: startOfDay(new Date()),
              max: endOfDay(new Date()),
            }}
          />
          <AddEntry />
        </>
      }
    />
  );
};

export default MyDay;
