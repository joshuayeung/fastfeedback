import firebase from "./firebase";

const db = firebase.firestore();

export function createUser(uid, data) {
  return db
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createSite(data) {
  return db.collection("sites").add(data);
}

export default db;
