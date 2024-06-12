// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAbwLUa4gxUnAFUCV-iOu0_q_CyehC3jj8",
  authDomain: "e-commerce-26e72.firebaseapp.com",
  projectId: "e-commerce-26e72",
  storageBucket: "e-commerce-26e72.appspot.com",
  messagingSenderId: "941443061490",
  appId: "1:941443061490:web:9e2733aa529b6077d0a26b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
