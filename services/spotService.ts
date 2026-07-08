import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebaseConfig";

type SpotData = {
  name: string;
  category: string;
  description: string;
  latitude: number;
  longitude: number;
  createdBy: string;
};

export async function createSpot(data: SpotData) {
  await addDoc(collection(db, "spots"), data);
}

export async function updateSpot(
  id: string,
  data: {
    name: string;
    category: string;
    description: string;
  }
) {
  await updateDoc(
    doc(db, "spots", id),
    data
  );
}

export async function deleteSpot(id: string) {
  await deleteDoc(
    doc(db, "spots", id)
  );
}