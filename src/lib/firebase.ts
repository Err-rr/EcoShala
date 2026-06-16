import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA317nxeg5WS0R7ahN4uUdJp2Xg6wFXMVg",
  authDomain: "ecoshala1.firebaseapp.com",
  projectId: "ecoshala1",
  storageBucket: "ecoshala1.firebasestorage.app",
  messagingSenderId: "1069986708964",
  appId: "1:1069986708964:web:b92fa8cc270bf6697f5bf1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
void setPersistence(auth, browserLocalPersistence);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
