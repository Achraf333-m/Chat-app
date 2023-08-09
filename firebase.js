// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLMkQy6x3u6i0vJRWOub62MoOAde1wuZ0",
  authDomain: "awesome-chat-dffda.firebaseapp.com",
  projectId: "awesome-chat-dffda",
  storageBucket: "awesome-chat-dffda.appspot.com",
  messagingSenderId: "45588086800",
  appId: "1:45588086800:web:11e48dcf9a3fab337eca95",
  measurementId: "G-TH31RF9118"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

export default app
export { auth }