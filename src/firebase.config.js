import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCfurAK1ex50wxIZ5dgpg7dTrcse35gD9A",
  authDomain: "social-media-e2c4e.firebaseapp.com",
  projectId: "social-media-e2c4e",
  storageBucket: "social-media-e2c4e.appspot.com",
  messagingSenderId: "202296813743",
  appId: "1:202296813743:web:f014f214ca76812db88c5a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
