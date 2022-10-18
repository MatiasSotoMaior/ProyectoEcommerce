// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    onSnapshot,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARwzin8f5hk3RYGfSLnGmCdX11ruHyZDQ",
    authDomain: "ecommercebebidasm.firebaseapp.com",
    projectId: "ecommercebebidasm",
    storageBucket: "ecommercebebidasm.appspot.com",
    messagingSenderId: "575799466378",
    appId: "1:575799466378:web:9ce11e3e97de2cea1a9073"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()

export const saveTask = (title, id, price, img, type) =>
    addDoc(collection(db, `tasks`), { title, id, price, img, type });

export const getTasks = () => getDocs(collection(db, "tasks"))

export const onGetTasks = (callback) =>
    onSnapshot(collection(db, "tasks"), callback);

export const getTask = id => getDoc(doc(db, "tasks", id));