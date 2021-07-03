import { Entry } from "types";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import firebase from "lib/firebase";

export const dayName = (day: number) => {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      throw new Error("Invalid day");
  }
};

export const sortEntries = (entries: Entry[]) =>
  entries.sort((e1, e2) => e2.createDate.valueOf() - e1.createDate.valueOf());

export const filterByDate = (
  entries: Entry[],
  { min, max }: { min: Date; max: Date }
) =>
  entries.filter(
    ({ createDate }) => isAfter(createDate, min) && isBefore(createDate, max)
  );

export const mapEntryDocs = (
  entry: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
) => ({
  id: entry.id,
  ...entry.data(),
  createDate: (
    entry.data().createDate as firebase.firestore.Timestamp
  ).toDate(),
});

export const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
