import { collection } from "firebase/firestore";
import { db } from "./init-firebase";

export const moviesCollectionRef = collection(db, 'events')
export const leadsCollectionRef = collection(db, 'leads')
export const resourcesCollectionRef = collection(db, 'resources')
export const newsCollectionRef = collection(db, 'news')
