import React, { FC } from "react";
import Layout from "./Layout";
import Header from "./Header";
import { Flex, Text, Skeleton, SimpleGrid, Stack, Box } from "@chakra-ui/react";
import { BarChartViz, LineChartViz } from "./DataViz";
import { useAuth } from "context/AuthProvider";
import { getUserEntries } from "lib/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { mapEntryDocs } from "lib/utils";
import { Entry } from "types";
import { ErrorMessage } from "./Common";
import groupBy from "lodash.groupby";
import format from "date-fns/format";

const Insights: FC = () => {
  const user = useAuth();
  const [entries, loading, error] = useCollection(getUserEntries(user.uid));

  const entriesDocs = entries
    ? (entries?.docs.map(mapEntryDocs) as Entry[])
    : [];

  if (loading)
    return (
      <>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </>
    );

  if (error) {
    <ErrorMessage message="Error loading your entries" />;
  }

  const groupByTag = groupBy(entriesDocs, "tags");
  const dataForBarChart = Object.entries(groupByTag).map(([key, entries]) => {
    return {
      name: key,
      ["Time Spent"]: entries.reduce((acc, currEl) => {
        return acc + parseFloat(currEl.timeSpent);
      }, 0),
    };
  });

  const groupedByDate = groupBy(
    entriesDocs.map((entry) => ({
      ...entry,
      formattedCreateDate: `${format(entry.createDate, "MM/d/y")}`,
    })),
    "formattedCreateDate"
  );

  const dataForLineChart = Object.entries(groupedByDate).map(
    ([key, entries]) => {
      return {
        name: key,
        ["Time Spent"]: entries.reduce((acc, currEl) => {
          return acc + parseFloat(currEl.timeSpent);
        }, 0),
      };
    }
  );

  return (
    <Layout
      Right={
        <>
          <Header title="Insights" />
          <Box>
            <SimpleGrid column={2}>
              <Box p="8" pb="4">
                <Stack h="300px" spacing={4} alignItems="center">
                  <Text fontSize="lg" fontWeight="medium">
                    How much time you spent on your activities
                  </Text>
                  <BarChartViz
                    data={dataForBarChart}
                    dataKeys={["Time Spent"]}
                  />
                </Stack>
              </Box>
              <Box p="8">
                <Stack h="300px" spacing={4} alignItems="center">
                  <Text fontSize="lg" fontWeight="medium">
                    Your work trend
                  </Text>
                  <LineChartViz
                    data={dataForLineChart}
                    dataKeys={["Time Spent"]}
                  />
                </Stack>
              </Box>
            </SimpleGrid>
          </Box>
        </>
      }
    />
  );
};

export default Insights;
