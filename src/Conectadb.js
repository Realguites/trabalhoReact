import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDzwpwBytATtpAMwcwduIJaM4wn0iKtPD4",
    authDomain: "clubes-e27c6.firebaseapp.com",
    projectId: "clubes-e27c6",
    storageBucket: "clubes-e27c6.appspot.com",
    messagingSenderId: "211499618542",
    appId: "1:211499618542:web:705e09c74687097fec63ff"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);