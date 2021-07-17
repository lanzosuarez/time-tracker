import React from "react";
import { useAuth } from "context/AuthProvider";
import { addNewUserEntry } from "lib/firestore";
import EntryForm, { EntryFormData } from "./EntryForm";

const AddEntry = () => {
  const user = useAuth();
  const onSubmit = async (data: EntryFormData) => {
    await addNewUserEntry(data, user);
    console.log("entry added");
  };

  return <EntryForm onSubmit={onSubmit} />;
};

export default AddEntry;
