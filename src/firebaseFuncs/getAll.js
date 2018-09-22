import firebase from "firebase";

export function getAll() {
  return firebase
    .database()
    .ref()
    .once("value");
}
