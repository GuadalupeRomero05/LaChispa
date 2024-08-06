// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAawuO_eyIlFBkPeT0P21iTd6da-BqypZg",
  authDomain: "proyecto-inasistencias.firebaseapp.com",
  projectId: "proyecto-inasistencias",
  storageBucket: "proyecto-inasistencias.appspot.com",
  messagingSenderId: "340773008672",
  appId: "1:340773008672:web:445e2241c0bdf0c0b49345",
  measurementId: "G-VZ7DVZN8LB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);