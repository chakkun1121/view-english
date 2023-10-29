// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD6AUU9m__QiHbfsamfx_Gf5AhqaxqV3FI',
  authDomain: 'view-english-399003.firebaseapp.com',
  projectId: 'view-english-399003',
  storageBucket: 'view-english-399003.appspot.com',
  messagingSenderId: '490221897187',
  appId: '1:490221897187:web:e60db391cf31e0739c8cd6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
