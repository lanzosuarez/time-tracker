import firebase from "lib/firebase";

export interface User {
  id: string;
  entries: Entry[];
}

export interface Entry {
  id?: string;
  user: string;
  activity: string;
  tags: string;
  timeSpent: string;
  dueDate?: string;
  createDate: Date;
  completed: boolean;
  important: boolean;
}

export interface EntriesFilter {
  dateRange?: {
    min: Date;
    max: Date;
  };
}
