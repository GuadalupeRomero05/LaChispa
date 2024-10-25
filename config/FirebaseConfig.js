// Importa solo los módulos necesarios
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBUml_S2CQadA4ldbSlhZvAF1BdLrsIAbA",
  authDomain: "lachispa-d0295.firebaseapp.com",
  projectId: "lachispa-d0295",
  storageBucket: "lachispa-d0295.appspot.com",
  messagingSenderId: "366050594321",
  appId: "1:366050594321:web:932a7825c6c93d3cb22bb0",
  measurementId: "G-ET6M95JFBY"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Inicializa Analytics solo en el entorno del navegador
let analytics;
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  }).catch((error) => {
    console.error("Error al cargar Firebase Analytics:", error);
  });
}

// Exporta auth y firestore para usarlos en otros archivos
export { auth, firestore, analytics };
