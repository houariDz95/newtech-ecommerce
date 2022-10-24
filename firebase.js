import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBOXWZiIU_V2ykJvixnYWqv0PUbEpexgiE",
  authDomain: "newtech-commerce.firebaseapp.com",
  projectId: "newtech-commerce",
  storageBucket: "newtech-commerce.appspot.com",
  messagingSenderId: "650319030039",
  appId: "1:650319030039:web:1b88f056e8aa83c897b952",
  measurementId: "G-L3EE8H0S7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db