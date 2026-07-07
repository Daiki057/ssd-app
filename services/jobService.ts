import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebaseConfig";



export interface Job {

  id?: string;

  shopName: string;

  salary: string;

  description: string;

  latitude: number;

  longitude: number;

  createdBy: string;

  createdAt?: any;

  updatedAt?: any;

}



// 作成
export async function createJob(
  job: Job
) {

  await addDoc(

    collection(db, "jobs"),

    {

      ...job,

      createdAt: serverTimestamp(),

      updatedAt: serverTimestamp(),

    }

  );

}



// リアルタイム取得
export function listenJobs(

  callback: (jobs: Job[]) => void

) {

  const q = query(

    collection(db, "jobs"),

    orderBy("createdAt", "desc")

  );



  return onSnapshot(

    q,

    snapshot => {

      callback(

        snapshot.docs.map(doc => ({

          id: doc.id,

          ...(doc.data() as Job),

        }))

      );

    }

  );

}



// 更新
export async function updateJob(

  id: string,

  data: Partial<Job>

) {

  await updateDoc(

    doc(db, "jobs", id),

    {

      ...data,

      updatedAt: serverTimestamp(),

    }

  );

}



// 削除
export async function deleteJob(

  id: string

) {

  await deleteDoc(

    doc(db, "jobs", id)

  );

}