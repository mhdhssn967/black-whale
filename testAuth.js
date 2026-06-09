import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3-2GbzNSBHv__hfaJzvqIdgV_ozvVgfE",
  authDomain: "interlix-2d61f.firebaseapp.com",
  projectId: "interlix-2d61f",
  storageBucket: "interlix-2d61f.firebasestorage.app",
  messagingSenderId: "106645468469",
  appId: "1:106645468469:web:e4ffc62c4d7eb6e9a8087c",
  measurementId: "G-KPY7Z9GJEX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkAuth() {
  const docRef = doc(db, 'auth', 'MSiseIpVLNgF0Y6ktaa09ONmZ6q2');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    console.log("Document data:", snap.data());
  } else {
    console.log("No such document!");
  }
}
checkAuth();
