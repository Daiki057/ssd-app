import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebaseConfig";

type JobData = {
  shopName: string;
  salary: string;
  description: string;
  latitude: number;
  longitude: number;
  createdBy: string;
};

export async function createJob(data: JobData) {
  await addDoc(collection(db, "jobs"), data);
}

export async function updateJob(
  id: string,
  data: {
    shopName: string;
    salary: string;
    description: string;
  }
) {
  await updateDoc(
    doc(db, "jobs", id),
    data
  );
}

export async function deleteJob(id: string) {
  await deleteDoc(
    doc(db, "jobs", id)
  );
}