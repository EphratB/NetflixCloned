import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./config";

// saving movies to database
export async function save(data) {
  console.log("Data to be saved:", data);
  try {
    const docRef = await addDoc(collection(db, "movies"), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
}

// getting specific movie with id
export async function get(id) {
  const querySnapshot = await getDocs(
    query(collection(db, "movies"), where("id", "==", id))
  );
  const movies = querySnapshot.docs.map((doc) => doc.data());
  return movies.length > 0 ? movies[0] : null;
}

//remove movie from database
export async function remove(id) {
  console.log("write.js", id);
  try {
    await deleteDoc(doc(db, "movies", id));
    console.log("Movie deleted successfully!");
    return true;
  } catch {
    console.log("Failed to delete movie.");
    return false;
  }
}
