import firebase from "lib/firebase";
import { Entry } from "types";
export const db = firebase.firestore();

export const getUserEntries = (user: firebase.User) => {
  // pass empty string when user is undefined
  return db.collection("entries").where("user", "==", user.uid ?? "");
};

export const addNewUserEntry = (data: Partial<Entry>, user: firebase.User) =>
  db.collection("entries").add({
    ...data,
    user: user.uid,
    createDate: new Date(),
    completed: false,
  } as Entry);

export const updateUserEntry = (data: Partial<Entry>, id: string) => {
  db.collection("entries").doc(id).update(data);
};

export const deleteUserEntry = (id: string) =>
  db.collection("entries").doc(id).delete();
