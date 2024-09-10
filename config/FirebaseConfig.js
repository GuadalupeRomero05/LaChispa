// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUml_S2CQadA4ldbSlhZvAF1BdLrsIAbA",
  authDomain: "lachispa-d0295.firebaseapp.com",
  projectId: "lachispa-d0295",
  storageBucket: "lachispa-d0295.appspot.com",
  messagingSenderId: "366050594321",
  appId: "1:366050594321:web:932a7825c6c93d3cb22bb0",
  measurementId: "G-ET6M95JFBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Solo inicializa Analytics si el entorno es un navegador
if (typeof window !== "undefined") {
  const { getAnalytics } = require("firebase/analytics");
  const analytics = getAnalytics(app);
}

// Export auth para ser utilizado en otros archivos
export { auth };
