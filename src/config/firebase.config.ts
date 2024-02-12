import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD38D-K5LNYBt3f7Fi2v1h1TB5MGPnlYH0",
  authDomain: "club-ecommerce-14.firebaseapp.com",
  projectId: "club-ecommerce-14",
  storageBucket: "club-ecommerce-14.appspot.com",
  messagingSenderId: "171809436567",
  appId: "1:171809436567:web:24ab7ef9e67d5380998ad2",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
