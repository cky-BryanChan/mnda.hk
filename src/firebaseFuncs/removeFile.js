import firebase from "firebase";

export function removeFile(key, name, extention) {
  var storageRef = firebase.storage().ref();
  var imageRef = storageRef.child(
    `${key}/${name}${extention ? "." + extention : ""}`
  );
  return imageRef.delete();
}
