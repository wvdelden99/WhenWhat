// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, initializeAuth} from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDPmSUnnvydMtec0mdJdzM586DxRN7Fek",
    authDomain: "whenwhat-ed816.firebaseapp.com",
    projectId: "whenwhat-ed816",
    storageBucket: "whenwhat-ed816.appspot.com",
    messagingSenderId: "419814848452",
    appId: "1:419814848452:web:526ed3ecd3756faaa81691"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Save User Login 1:02:00
// export const initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage)
// })

export const auth = getAuth(app);

export const db = getFirestore(app);
export const userRef = collection(db, 'users');
export const groupRef = collection(db, 'groups');
export const roomRef = collection(db, 'rooms');
export const chatRef = collection(db, 'chats');
export const agendaRef = collection(db, 'agendas');