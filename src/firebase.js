import { initializeApp } from 'firebase/app'
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCY6uEOlzW-9Wzz7-57NyPubJ4OFWxxh6U",
  authDomain: "study-tracker-20e5f.firebaseapp.com",
  projectId: "study-tracker-20e5f",
  storageBucket: "study-tracker-20e5f.firebasestorage.app",
  messagingSenderId: "365957958829",
  appId: "1:365957958829:web:f364a44473f75f21c54a24",
  databaseURL: "https://study-tracker-20e5f-default-rtdb.firebaseio.com/"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
setPersistence(auth, browserLocalPersistence);