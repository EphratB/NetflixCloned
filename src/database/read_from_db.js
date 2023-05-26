import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./config";

export async function load() {
  try {
    console.log("loading ...");
    const collectionRef = collection(db, "movies");
    const querySnapshot = await getDocs(collectionRef);

    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id,
      });
      console.log(data, "my data");
    });
    return data; // this is not returning the data rather it is returning a promise and the App.js async will handle the result
  } catch (err) {
    throw new Error("Failed to load the database");
  }
}

// loading per ID
export async function loadById(id) {
  try {
    console.log("Load Id:", id);

    const docRef = doc(db, "movies", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log(`No such document with id ${id}`);
    }
  } catch (err) {
    console.error("Error loading movie by id:", err);
  }
  return null;
}
