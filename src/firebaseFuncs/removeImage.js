import firebase from "firebase";

export function removeImage(key,name) {
  var storageRef = firebase.storage().ref();
  var imageRef = storageRef.child(`${key}/${name}.jpg`);
  return imageRef.delete();
}
