import firebase from "firebase";

export function setRecord(key, obj) {
  return firebase
    .database()
    .ref(`${key}/`)
    .set(obj);
}
