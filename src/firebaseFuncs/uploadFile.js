import firebase from "firebase";

export function uploadFile(key, file, name, extention) {
  var storageRef = firebase.storage().ref();
  var newImageRef = storageRef.child(
    `${key}/${name}${extention ? "." + extention : ""}`
  );
  return newImageRef.put(file).then(() => {
    return newImageRef.getDownloadURL();
  });
}
