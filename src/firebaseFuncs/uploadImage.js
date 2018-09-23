import firebase from "firebase";

export function uploadImage(key, file, name) {
  var storageRef = firebase.storage().ref();
  var newImageRef = storageRef.child(`${key}/${name}.jpg`);
  return newImageRef.put(file).then(() => {
    return newImageRef.getDownloadURL();
  });
}
