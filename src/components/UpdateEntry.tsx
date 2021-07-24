import React, { FC } from "react";
import { updateUserEntry } from "lib/firestore";
import EntryForm, { EntryFormData } from "./EntryForm";
import {
  UpdateEntry as UpdateEntryType,
  useUpdateEntry,
} from "context/UpdateEntryProvider";
import { useToast } from "@chakra-ui/react";

interface UpdateEntryProps {
  entry: UpdateEntryType;
}

const UpdateEntry: FC<UpdateEntryProps> = ({ entry }) => {
  const toast = useToast();
  const [, setToUpdateEntry] = useUpdateEntry();
  const onSubmit = async (data: EntryFormData) => {
    setToUpdateEntry(null);
    await updateUserEntry(data, entry.id);
    toast({
      title: "Entry Updated",
      status: "success",
      duration: 1000,
    });
  };

  const { activity, dueDate, timeSpent, tags } = entry;

  return (
    <EntryForm
      onSubmit={onSubmit}
      defaultValues={{ activity, dueDate, timeSpent, tags }}
    />
  );
};

export default UpdateEntry;
