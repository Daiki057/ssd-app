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



export interface Spot {

  id?: string;

  name: string;

  category: string;

  description: string;

  latitude: number;

  longitude: number;

  imageUrl?: string;

  createdBy: string;

  createdAt?: any;

  updatedAt?: any;

}



// 作成
export async function createSpot(
  spot: Spot
) {

  await addDoc(

    collection(db, "spots"),

    {

      ...spot,

      createdAt: serverTimestamp(),

      updatedAt: serverTimestamp(),

    }

  );

}



// リアルタイム取得
export function listenSpots(

  callback: (spots: Spot[]) => void

) {

  const q = query(

    collection(db, "spots"),

    orderBy("createdAt", "desc")

  );



  return onSnapshot(

    q,

    snapshot => {

      callback(

        snapshot.docs.map(doc => ({

          id: doc.id,

          ...(doc.data() as Spot),

        }))

      );

    }

  );

}



// 更新
export async function updateSpot(

  id: string,

  data: Partial<Spot>

) {

  await updateDoc(

    doc(db, "spots", id),

    {

      ...data,

      updatedAt: serverTimestamp(),

    }

  );

}



// 削除
export async function deleteSpot(

  id: string

) {

  await deleteDoc(

    doc(db, "spots", id)

  );

}