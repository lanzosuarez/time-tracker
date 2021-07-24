import React, { createContext, useState, useMemo, useContext } from "react";
import { EntryFormData } from "components/EntryForm";

export type UpdateEntry = EntryFormData & { id: string };

type UpdateEntryProviderValue = [UpdateEntry, (entry) => void];

const UpdateEntryContext = createContext<UpdateEntryProviderValue | null>(null);
UpdateEntryContext.displayName = "UpdateEntryProvider";
export const UpdateEntryConsumer = UpdateEntryContext.Consumer;

const UpdateEntryProvider = ({ children }) => {
  const [entry, setEntry] = useState(null);
  const onSetEntry = (entry: UpdateEntry | null) => setEntry(entry);
  const value = useMemo<UpdateEntryProviderValue>(
    () => [entry, onSetEntry],
    [entry]
  );
  return (
    <UpdateEntryContext.Provider value={value}>
      {children}
    </UpdateEntryContext.Provider>
  );
};

export const useUpdateEntry = () => {
  const context = useContext(UpdateEntryContext);
  if (context === undefined) {
    throw new Error("useUpdateEntry should be within an UpdateEntryProvider");
  }
  return context;
};

export default UpdateEntryProvider;
