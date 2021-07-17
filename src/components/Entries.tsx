import React, { FC, memo } from "react";
import {
  Skeleton,
  Stack,
  Flex,
  Checkbox,
  Tag,
  Box,
  Badge,
  Text,
  useBoolean,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CalendarIcon,
  DeleteIcon,
  StarIcon,
} from "@chakra-ui/icons";
import {
  deleteUserEntry,
  getUserEntries,
  updateUserEntry,
} from "lib/firestore";
import { ErrorMessage } from "./Common";
import { EntriesFilter, Entry } from "types";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuth } from "context/AuthProvider";
import { dayName, filterByDate, mapEntryDocs, sortEntries } from "lib/utils";
import groupby from "lodash.groupby";
import format from "date-fns/format";
import { getDay } from "date-fns";

const Completed: FC<{ entries: Entry[]; allComplete: boolean }> = ({
  entries,
  allComplete,
}) => {
  const [showEntries, setShowEntries] = useBoolean();
  return (
    // to add !important to supercede the spacing of the Stack
    // remove if all entry are mark as completed
    <Box marginTop={!allComplete && "1rem !important"}>
      <Tag
        _hover={{
          bgColor: "rgba(0,0,0,0.1)",
        }}
        onClick={setShowEntries.toggle}
        fontWeight="normal"
        mb={2}
        cursor="pointer"
        colorScheme="blackAlpha"
        size="lg"
      >
        <ChevronRightIcon
          transition="100ms linear"
          transform={showEntries && "rotate(90deg)"}
          onClick={setShowEntries.toggle}
          mt="1"
          fontSize="lg"
        />
        Completed
        <Box as="span" ml={2}>
          {entries.length}
        </Box>
      </Tag>
      {showEntries && <EntryList entries={entries} />}
    </Box>
  );
};

const EntryList: FC<{ entries: Entry[] }> = ({ entries }) => {
  return (
    <Stack>
      {/* saw createDate is causing an unnecessary rerender of entry item saw i ommited it for now cuz its not being used anyway*/}
      {entries.map(({ createDate, ...entryProps }) => (
        <EntryItem key={entryProps.id} {...entryProps} />
      ))}
    </Stack>
  );
};

let EntryItem: FC<Omit<Entry, "createDate">> = ({
  activity,
  tags,
  dueDate,
  timeSpent,
  id,
  completed,
  important,
}) => {
  const {
    isOpen,
    onOpen: openConfirmDelete,
    onClose: closeConfirmDelete,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const onCheck = async () => {
    await updateUserEntry({ completed: !completed }, id!);
    console.log("entry completed");
  };

  return (
    <Box
      _hover={{
        boxShadow: "md",
      }}
      rounded="sm"
      boxShadow="sm"
      bgColor="white"
      px="4"
      py="2"
    >
      <Flex alignItems="center" justifyContent="flex-start">
        <Checkbox
          defaultIsChecked={completed}
          onChange={onCheck}
          cursor="pointer"
          colorScheme="green"
          mr={4}
        />
        <Badge mr="2">{timeSpent.replace(".0", "")} hr / s</Badge>
        <Text justifySelf="flex-end" wordBreak="break-word" fontSize="md">
          #{tags.split(",").join(" ")} {activity}
        </Text>
        {!!important && (
          <Badge ml="2" colorScheme="red">
            Important
          </Badge>
        )}
        <Menu placement="bottom-end">
          <MenuButton
            size="xs"
            ml="auto"
            as={IconButton}
            variant="unstyled"
            icon={<ChevronDownIcon />}
          />
          <MenuList>
            <MenuItem onClick={openConfirmDelete}>
              <DeleteIcon mr="2" />
              Delete Entry
            </MenuItem>
            <MenuItem
              onClick={() => updateUserEntry({ important: !important }, id)}
            >
              <StarIcon mr="2" />
              {`${important ? "Unm" : "M"}ark`} as important
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {!!dueDate && (
        <Flex ml="8" mt="2" alignItems="center">
          <CalendarIcon fontSize="xs" />
          <Text ml="2" fontSize="xs">
            {dueDate}
          </Text>
        </Flex>
      )}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeConfirmDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Entry
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeConfirmDelete}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteUserEntry(id);
                  closeConfirmDelete();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

// memoize entry item
EntryItem = memo(EntryItem);

const Entries: FC<{ entries: Entry[] }> = ({ entries }) => {
  const unCompletedEntries: Entry[] = entries.filter(
    (entry) => !entry.completed
  );

  const completedEntries: Entry[] = entries.filter((entry) => entry.completed);

  return (
    <>
      <EntryList entries={sortEntries(unCompletedEntries)} />
      {!!completedEntries.length && (
        <Completed
          allComplete={!unCompletedEntries.length}
          entries={sortEntries(completedEntries)}
        />
      )}
    </>
  );
};

export const EntriesMyDay: FC<EntriesFilter> = ({ dateRange }) => {
  const user = useAuth();
  const [entries, loading, error] = useCollection(getUserEntries(user.uid));

  const render = () => {
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

    let entriesDocs = entries
      ? (entries?.docs.map(mapEntryDocs) as Entry[])
      : [];

    entriesDocs = filterByDate(entriesDocs, dateRange);

    return <Entries entries={entriesDocs} />;
  };

  return (
    <Stack overflow="auto" p="1rem 2rem" position="relative">
      {render()}
    </Stack>
  );
};

const GroupedEntries: FC<{ entries: Entry[]; date: string }> = ({
  entries,
  date,
}) => {
  const [showEntries, setShowEntries] = useBoolean(true);
  return (
    <Box key={date}>
      <Text
        d="flex"
        alignItems="center"
        color="gray.700"
        mb={4}
        fontSize="md"
        fontWeight="medium"
      >
        <ChevronRightIcon
          transition="100ms linear"
          transform={showEntries && "rotate(90deg)"}
          onClick={setShowEntries.toggle}
          mt="1"
          fontSize="lg"
        />
        {date}

        <Box as="span" ml={2}>
          ({entries.length})
        </Box>
      </Text>
      {showEntries && <Entries entries={entries} />}
    </Box>
  );
};

export const EntriesGroupBy: FC<{ filterFn?: (entry: Entry) => boolean }> = ({
  filterFn,
}) => {
  const user = useAuth();
  const [entries, loading, error] = useCollection(getUserEntries(user.uid));

  const render = () => {
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

    let entriesDocs = entries
      ? (entries?.docs.map(mapEntryDocs) as Entry[])
      : [];

    // if there is a filterFn, filter the docs using the filterFn
    entriesDocs = filterFn ? entriesDocs.filter(filterFn) : entriesDocs;

    const groupedEntries = groupby(
      entriesDocs.map((entry) => ({
        ...entry,
        formattedCreateDate: `${dayName(getDay(entry.createDate))}, ${format(
          entry.createDate,
          "MMM d, y"
        )}`,
      })),
      "formattedCreateDate"
    );

    return Object.entries(groupedEntries).map(([date, entries]) => (
      <GroupedEntries key={date} date={date} entries={entries} />
    ));
  };

  return (
    <Stack overflow="auto" p="1rem 2rem" position="relative">
      {render()}
    </Stack>
  );
};
