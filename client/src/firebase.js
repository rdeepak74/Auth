// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-auth-7ce0d.firebaseapp.com',
  projectId: 'mern-auth-7ce0d',
  storageBucket: 'mern-auth-7ce0d.appspot.com',
  messagingSenderId: '1012825774300',
  appId: '1:1012825774300:web:64819369391ab8666bbc19',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
