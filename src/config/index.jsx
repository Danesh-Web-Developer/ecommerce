import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCR-sGhjenZVYl7-cOOvAs7RkPregVGI04",
    authDomain: "ecommerce-66d9b.firebaseapp.com",
    projectId: "ecommerce-66d9b",
    storageBucket: "ecommerce-66d9b.firebasestorage.app",
    messagingSenderId: "66112493400",
    appId: "1:66112493400:web:bea8f58d1fb859d101b72d",
    measurementId: "G-Z034YSZ623"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth,db };
